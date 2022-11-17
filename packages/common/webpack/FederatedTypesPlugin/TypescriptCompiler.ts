/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs';
import path from 'path';

import {
  createProgram,
  createCompilerHost,
  flattenDiagnosticMessageText,
  sys,
} from 'typescript';
import type { CompilerOptions, Diagnostic } from 'typescript';

import Logger from '../Logger';

import TypesCache from './Caching';
import type { NormalizeOptions } from './normalizeOptions';
import type {
  FederatedTypesPluginOptions,
  ModuleFederationPluginOptions,
} from './types';

export default class TypescriptCompiler {
  private compilerOptions!: CompilerOptions;

  private tsDefinitionFilesObj: Record<string, string> = {};

  private logger = Logger.getLogger();

  constructor(private options: NormalizeOptions) {
    const tsConfigCompilerOptions = this.getTSConfigCompilerOptions();

    this.compilerOptions = {
      ...tsConfigCompilerOptions,
      ...options.tsCompilerOptions,
    };
  }

  generateDeclarationFiles(
    exposedComponents: ModuleFederationPluginOptions['exposes'],
    additionalFilesToCompile: FederatedTypesPluginOptions['additionalFilesToCompile'] = [],
  ) {
    const exposeSrcToDestMap: Record<string, string> = {};

    const normalizedExposedComponents = this.normalizeFiles(
      Object.entries(exposedComponents!),
      ([exposeDest, exposeSrc]) => {
        const pathWithExt = this.getNormalizedPathWithExt(exposeSrc);
        exposeSrcToDestMap[pathWithExt] = exposeDest;
        return pathWithExt;
      },
    );

    const normalizedAdditionalFiles = this.normalizeFiles(
      additionalFilesToCompile,
      this.getNormalizedPathWithExt,
    );

    const host = this.createHost(exposeSrcToDestMap);

    const program = createProgram(
      [...normalizedAdditionalFiles, ...normalizedExposedComponents],
      this.compilerOptions,
      host,
    );

    const { diagnostics, emitSkipped } = program.emit();

    if (!emitSkipped) {
      return this.tsDefinitionFilesObj;
    }

    diagnostics.forEach(this.reportCompileDiagnostic);

    throw new Error('something went wrong generating declaration files');
  }

  // eslint-disable-next-line class-methods-use-this
  private normalizeFiles<T, U extends string>(files: T[], mapFn: (value: T, index: number, array: T[]) => U) {
    return files.map(mapFn).filter((entry) => /\.tsx?$/.test(entry));
  }

  private getNormalizedPathWithExt(exposeSrc: string) {
    const cwd = this.options.webpackCompilerOptions.context || process.cwd();

    const [rootDir, entry] = exposeSrc.split(/\/(?=[^/]+$)/);

    const normalizedRootDir = path.resolve(cwd, rootDir);
    const filenameWithExt = this.getFilenameWithExtension(
      normalizedRootDir,
      entry,
    );

    const pathWithExt = path.resolve(normalizedRootDir, filenameWithExt);
    return pathWithExt;
  }

  private createHost(exposeSrcToDestMap: Record<string, string>) {
    const host = createCompilerHost(this.compilerOptions);

    const originalWriteFile = host.writeFile;

    const rewritePathsWithExposedFederatedModules = (
      sourceFilename: string,
    ) => {
      const destFile = exposeSrcToDestMap[sourceFilename];

      return (
        destFile
        && path.join(this.compilerOptions.outDir as string, `${destFile}.d.ts`)
      );
    };

    host.writeFile = (
      filepath,
      text,
      writeOrderByteMark,
      onError,
      sourceFiles,
      data,
    ) => {
      // for exposes: { "./expose/path": "path/to/file" }
      // force typescript to write compiled output to "@mf-typescript/expose/path"
      const sourceFilename = sourceFiles?.[0].fileName || '';

      // Try to rewrite the path with exposed federated modules,
      // failing so, use the default filepath emitted by TS Compiler.
      // This second case is valid for 'additionalFileToCompiler' added through Plugin Options.
      const normalizedFilepath = rewritePathsWithExposedFederatedModules(sourceFilename) ?? filepath;

      this.tsDefinitionFilesObj[normalizedFilepath] = text;

      originalWriteFile(
        normalizedFilepath,
        text,
        writeOrderByteMark,
        onError,
        sourceFiles,
        data,
      );
    };

    return host;
  }

  private reportCompileDiagnostic(diagnostic: Diagnostic): void {
    const { line } = diagnostic.file!.getLineAndCharacterOfPosition(
      diagnostic.start!,
    );

    this.logger.log(
      'TS Error',
      diagnostic.code,
      ':',
      flattenDiagnosticMessageText(diagnostic.messageText, sys.newLine),
    );
    this.logger.log(
      '         at',
      `${diagnostic.file!.fileName}:${line + 1}`,
      sys.newLine, // '\n'
    );
  }

  private getTSConfigCompilerOptions(): CompilerOptions {
    const context = this.options.webpackCompilerOptions.context!;

    const tsconfigPath = path.resolve(context, 'tsconfig.json');

    if (!tsconfigPath) {
      this.logger.error('ERROR: Could not find a valid tsconfig.json');
      process.exit(1);
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require
    return require(tsconfigPath).compilerOptions;
  }

  // eslint-disable-next-line class-methods-use-this
  private getFilenameWithExtension(rootDir: string, entry: string) {
    // Check path exists and it's a directory
    if (!fs.existsSync(rootDir) || !fs.lstatSync(rootDir).isDirectory()) {
      throw new Error('rootDir must be a directory');
    }

    let filename;

    try {
      // Try to resolve exposed component using index
      const files = TypesCache.getFsFiles(path.join(rootDir, entry));

      filename = files?.find((file) => file.split('.')[0] === 'index');

      if (!filename) {
        throw new Error(`filename ${filename} not found`);
      }

      return `${entry}/${filename}`;
    } catch (err) {
      const files = TypesCache.getFsFiles(rootDir);

      // Handle case where directory contains similar filenames
      // or where a filename like `Component.base.tsx` is used
      filename = files?.find((file) => {
        const baseFile = path.basename(file, path.extname(file));
        const baseEntry = path.basename(entry, path.extname(entry));

        return baseFile === baseEntry;
      });

      if (!filename) {
        throw new Error(`filename ${filename} not found`);
      }

      return filename as string;
    }
  }
}
