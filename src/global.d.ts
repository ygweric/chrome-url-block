// eslint-disable-next-line no-underscore-dangle
declare const __DEV__: boolean;
/** Extension name, defined in packageJson.name */
// eslint-disable-next-line no-underscore-dangle
declare const __NAME__: string;

declare module '*.vue' {
  const component: any;
  export default component;
}
