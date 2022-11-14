import type { MenuItemConfig } from '@link/common/components/AppHeader/AppHeader.types';
import ObjectivesIcon from './images/icon-objectives.svg';

const menu: MenuItemConfig[] = [
  {
    path: '/objectives',
    dataTestId: 'objectives-link',
    icon: ObjectivesIcon,
    label: 'Objectives',
    hasPermission: true,
  },
];

export default menu;
