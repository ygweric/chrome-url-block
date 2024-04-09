# URL Block

github 地址 [https://github.com/ygweric/chrome-url-block](https://github.com/ygweric/chrome-url-block)

## 项目背景 
上班摸鱼时候，总喜欢看一下微博、观网、新闻网站，但自己觉得很无聊，但忍不住会打开。

## 插件功能
所以我开发了这个网站，能够屏蔽一些网站。


主要功能如下
* 根据域名屏蔽
* 根据地址屏蔽
* 暂停工作一会，划个水

## chrome地址 
[https://chromewebstore.google.com/detail/url-block/fdapkdfieimlngpkffldigiajemcamlb](https://chromewebstore.google.com/detail/url-block/fdapkdfieimlngpkffldigiajemcamlb)

离线crx下载地址 [https://github.com/ygweric/chrome-url-block/releases](https://github.com/ygweric/chrome-url-block/releases)

理论上也可以编译为 Firefox插件，但是我我懒得做~

## 技术栈

[vitesse](https://github.com/antfu/vitesse#variations) + vue3 + tailwindCSS

## 效果截图
![screenshot-1](/images/screenshot-1.jpg)
![screenshot-2](/images/screenshot-2.png)



## 编译

我使用pnpm，但yarn、npm都支持
***node version v18.20.0**

### 编译运行
```
pnpm i 
pnpm run dev
pnpm run build
```


## 现状

* 两年前用原生的js写了1.0版本，没怎么维护。最近有头脑发热想维护下，就更新了2.0，UI和框架都好了很多，感谢 Vitesse大神的模板。
* 主要自用很方便，纯自嗨
* 目前用户1.7k左右
![users-count](/images/users-count.png)

* 无广告，无盈利，没有更远的发展打算
* 欢迎PR

## 未来
* 没有未来
* 欢迎朋友们一块讨论加wx群
![wx-group](/images/wx-group.jpg)

## 开发tips
* 插件中的popup、options、background已经可以热更新了, 只有contentScript需要手动reload插件后，刷新页面
* manifest.ts修改后，需要手动卸载插件在安装才生效


