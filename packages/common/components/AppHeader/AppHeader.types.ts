export type MenuItemConfig = {
  path: string
  dataTestId: string
  icon: string
  label: string,
  hasPermission: boolean,
}

export type AppLogoProps = {
  height?: number
  width?: number
  isKeyAccounts?: boolean
  isKeyPeople?: boolean
  isMedicalInsights?: boolean
  isScientificAwareness?: boolean
  isSiteBase?: boolean
  isTrialBase?: boolean
}

export type AppsConfigItem = {
  domainId: string
  domain: string
  title: string
  Logo: (props: AppLogoProps) => JSX.Element;
  logoProps?: AppLogoProps,
  renderedLogo?: string,
  neededPermission: string
}

export type AppsConfig = {
  [key: string]: AppsConfigItem
}
