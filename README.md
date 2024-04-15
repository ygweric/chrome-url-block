# URL Block

GitHub address [https://github.com/ygweric/chrome-url-block](https://github.com/ygweric/chrome-url-block)

[中文文档](https://github.com/ygweric/chrome-url-block/blob/main-v2/README-ZH.md) | English Documentation


## Project Background
When I go to work, I always like to look at microblogging, watching the Internet, news sites, but I feel very bored, but I can not help but open.

## Plugin function
So I developed this website to block some websites.  

### The main functions are as follows:
* Shield according to the domain name
* Shield according to address
* Shield according to regular expression
* Pause the work for a while, a paddle



## Chrome address 
[https://chromewebstore.google.com/detail/url-block/fdapkdfieimlngpkffldigiajemcamlb](https://chromewebstore.google.com/detail/url-block/fdapkdfieimlngpkffldigiajemcamlb)

Offline crx download address [https://github.com/ygweric/chrome-url-block/releases](https://github.com/ygweric/chrome-url-block/releases)

Theoretically it could also be compiled as a Firefox plugin, but I'm I'm too lazy to do that~.

## Technology Stack

[vitesse](https://github.com/antfu/vitesse#variations) + vue3 + tailwindCSS

## Screenshots
![screenshot-1](/images/screenshot-1.png)
![screenshot-2](/images/screenshot-2.png)



## Compiling

I'm using **pnpm**, but **yarn** and **npm** are both supported

**node version v18.20.0**

### Compile and run
```
pnpm i 
pnpm run dev
pnpm run build
```


## Current status
* I wrote version 1.0 two years ago using native js and didn't maintain it much. Recently, I had a brainwave and wanted to maintain it, so I updated it to 2.0, and the UI and framework are much better, thanks to Vitesse's templates.
* It's very easy to use, purely for self-improvement.
* Currently about 1.7k users
![users-count](/images/users-count.png)

* No ads, no profit, no further development plan.
* Welcome to PR

## Future
* No future
* Welcome to discuss with friends and add wx group
![wx-group](/images/wx-group.jpg)

## Development Tips
* Plugin popup, options, background can be hot update, only contentScript need to manually reload the plugin, refresh the page.
* If you modify manifest.ts, you need to manually uninstall the plugin before installing it to take effect.


