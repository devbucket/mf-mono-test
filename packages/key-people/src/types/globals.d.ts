declare module 'shell/App' {
  export default function App(): JSX.Element;
}
declare module 'workflows/SomeSharedComponent' {
  export default function SomeSharedComponent(): JSX.Element;
}

declare module 'workflows/AnotherSharedComponent' {
  export default function AnotherSharedComponent(): JSX.Element;
}
