import type { MenuItemConfig } from '@link/common/components/AppHeader/AppHeader.types';
import NewsfeedIcon from './images/icon-newsfeed.svg';
import FavoritesIcon from './images/icon-favorites.svg';

const menu: MenuItemConfig[] = [
  {
    path: '/newsfeed',
    dataTestId: 'newsfeed-link',
    icon: NewsfeedIcon,
    label: 'Newsfeed',
    hasPermission: true,
  },
  {
    path: '/network',
    dataTestId: 'favorites-link',
    icon: FavoritesIcon,
    label: 'Favorites',
    hasPermission: true,
  },
];

export default menu;
