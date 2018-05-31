---
layout:     post
title:      "Webpack Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Web
    - Front End
    - Webpack
---

* [Webpack Basic Notes](#webpack-basic-notes)
	* [Optimization](#optimization)
	* [Plugin](#plugin)
	* [Options](#options)
	* [Advanced](#advanced)

# Webpack Basic Notes

## Optimization

-   cdn
-   服务器端渲染
-   生产环境全局变量(去除不必要的build用 lib/plugin, 如 react-hot-loader)
-   提取公共库(common.js)
-   代码压缩: 压缩js(去除注释/空行/替换变量名等)
-   代码分割: 按需加载js
-   代码分割: chunk
-   代码分离: 分离css(extract-text-webpack-plugin

## Plugin

```js
commonsPlugin =
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity);
uglifyJsPlugin =
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            warnings: false
        }
    });
definePlugin =
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    });
providePlugin =
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    });
cleanUpPlugin = 
    new WebpackCleanupPlugin({
        exclude: ['stats.json', 'important.js']
    });
dllPlugin = new Webpack.DllPlugin({
        path: 'manifest.json',
        name: '[name]',
        context: __dirname
    });
dllReferencePlugin = new Webpack.DllReferencePlugin({
        manifest: require('./manifest.json'),
        context: __dirname
    });
```

-   imageMinPlugin

## Options

-  --progress
-  --colors
-  -p

## Advanced

code split: require.ensure([], () => {});
