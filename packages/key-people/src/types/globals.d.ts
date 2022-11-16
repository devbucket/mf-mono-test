declare module 'auth/Login' {
  export default function Login(): JSX.Element;
}

declare module 'workflows/menu' {
  import type { MenuItemConfig } from '@link/common/components/AppHeader/AppHeader.types';

  export default Array<MenuItemConfig>;
}

declare module 'workflows/routes' {
  import type { RouteObject } from 'react-router-dom';

  export default Array<RouteObject>;
}

declare module 'workflows/SomeSharedComponent' {
  export default function SomeSharedComponent(): JSX.Element;
}

declare module 'workflows/AnotherSharedComponent' {
  export default function AnotherSharedComponent(): JSX.Element;
}
