import path from 'path';

import get from 'lodash.get';
import ts from 'typescript';
import type { Compiler } from 'webpack';

import {
  TYPESCRIPT_FOLDER_NAME,
  TYPES_INDEX_JSON_FILE_NAME,
} from './constants';
import { FederatedTypesPluginOptions } from './types';

export default function normalizeOptions(options: FederatedTypesPluginOptions, compiler: Compiler) {
  const { typescriptFolderName = TYPESCRIPT_FOLDER_NAME } = options;
  const webpackCompilerOptions = compiler.options;

  const distPath = get(webpackCompilerOptions, 'devServer.static.directory')
    || get(webpackCompilerOptions, 'output.path')
    || 'dist';

  const distDir = path.join(distPath, typescriptFolderName);
  const typesIndexJsonFilePath = path.join(distDir, TYPES_INDEX_JSON_FILE_NAME);

  const tsCompilerOptions: ts.CompilerOptions = {
    declaration: true,
    emitDeclarationOnly: true,
    outDir: path.join(distDir, '/'),
  };

  const webpackPublicPath = webpackCompilerOptions.output.publicPath;

  let publicPath = '';
  if (typeof webpackPublicPath === 'string') {
    publicPath = webpackPublicPath === 'auto' ? '' : webpackPublicPath;
  }

  const remoteEntryFilename = options.federationConfig.filename;

  const typesStatsFileName = remoteEntryFilename
    ? remoteEntryFilename.replace('remoteEntry.js', TYPES_INDEX_JSON_FILE_NAME)
    : TYPES_INDEX_JSON_FILE_NAME;

  return {
    distDir,
    publicPath,
    tsCompilerOptions,
    typesIndexJsonFileName: TYPES_INDEX_JSON_FILE_NAME,
    typesIndexJsonFilePath,
    typesStatsFileName,
    typescriptFolderName,
    webpackCompilerOptions,
  };
}

export type NormalizeOptions = ReturnType<typeof normalizeOptions>;
