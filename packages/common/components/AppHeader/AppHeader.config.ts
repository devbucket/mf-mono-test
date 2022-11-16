import type { AppsConfig } from './AppHeader.types';
import Logo from './Logo';

let domainEnvIndicator = '';
const { host } = window.location;

if (host.match(/stage.veeva.link/) || host.match(/localhost/)) {
  domainEnvIndicator = 'stage.';
}

if (host.match(/dev.veeva.link/)) {
  domainEnvIndicator = 'dev.';
}

export const APPS_CONFIG: AppsConfig = {
  LINK_FOR_KEY_PEOPLE: {
    domainId: 'veeva.link',
    domain: `${domainEnvIndicator}veeva.link`,
    title: 'Link for Key People',
    Logo,
    logoProps: { isKeyPeople: true, width: 114 },
    neededPermission: 'access:LinkWebAppAuth',
  },
  LINK_FOR_KEY_ACCOUNTS: {
    domainId: 'key-accounts.veeva.link',
    domain: `key-accounts.${domainEnvIndicator}veeva.link`,
    title: 'Link for Key Accounts',
    Logo,
    logoProps: { isKeyAccounts: true, width: 129 },
    neededPermission: 'access:LFKA',
  },
  LINK_FOR_SCIENTIFIC_AWARENESS: {
    domainId: 'veeva.link/scientific-awareness',
    domain: `${domainEnvIndicator}veeva.link/scientific-awareness`,
    title: 'Link for Scientific Awareness',
    Logo,
    logoProps: { isScientificAwareness: true, width: 175 },
    neededPermission: 'medicalImpact:Access',
  },
  // Hides SiteBase menu item in production (empty string in `domainEnvIndicator` means production).
  // TODO: remove condition when SiteBase goes live
  ...(domainEnvIndicator !== '' && {
    LINK_SITE_BASE: {
      domainId: 'sitebase.veeva.link',
      domain: `sitebase.${domainEnvIndicator}veeva.link`,
      title: 'Link SiteBase',
      Logo,
      logoProps: { isSiteBase: true, width: 98 },
      neededPermission: 'access:LFS',
    },
  }),
};

export const appConfigCollection = Object.keys(APPS_CONFIG).map((key) => APPS_CONFIG[key]);
