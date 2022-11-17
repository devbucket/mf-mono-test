import type { Compilation, container } from 'webpack';

export type ModuleFederationPluginOptions = ConstructorParameters<typeof container.ModuleFederationPlugin>['0'];

export { ModuleFederationPluginOptions };

export type FederatedTypesPluginOptions = {
  disableTypeCompilation?: boolean;
  disableDownloadingRemoteTypes?: boolean;
  federationConfig: ModuleFederationPluginOptions;
  typescriptFolderName?: string;
  additionalFilesToCompile?: string[];
}

export type TypesStatsJson = {
  publicPath: string;
  files: Record<string, string>;
}

export type CompilationParams = Compilation['params'] & {
  federated_types: Record<string, string>;
};
