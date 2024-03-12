


# ~~浏览器中优化逻辑~~  
**用不着**， 插件中的popup、options、background已经可以热更新了
只有contentScript需要手动reload插件后，刷新页面

只需要让**popup**,**options** 通过localhost访问，**background**不涉及UI，可以在浏览器调试

1. vite.config
```
AutoImport({
  imports: [
    'vue',
    // {  // ----- 注释这里
    //   'webextension-polyfill': [
    //     ['*', 'browser'],
    //   ],
    // },
  ],
  dts: r('src/auto-imports.d.ts'),
}),
```

2. src\logic\storage.ts
```
// import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'
// export const storageDemo = useWebExtensionStorage('webext-demo', 'Storage Demo')

export const storageDemo = 3 // 不使用 useWebExtensionStorage
```





