# Hiero

[![Gitter](https://camo.githubusercontent.com/079d8764b5eebffbb7158fb375df0959029ab2c3/68747470733a2f2f6261646765732e6769747465722e696d2f6865786f2d7468656d652d696e6469676f2f4c6f6262792e737667)](https://gitter.im/hexo-theme-hiker/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)       [![Build Status](https://travis-ci.org/iTimeTraveler/hexo-theme-hiero.svg?branch=master)](https://travis-ci.org/iTimeTraveler/hexo-theme-hiero)		[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/iTimeTraveler/hexo-theme-hiero/blob/master/LICENSE)


Hiero is an awesome magazine theme for your [Hexo] site.

[**☞ 点击预览**](https://itimetraveler.github.io/hexo-theme-hiero/)  |  [**Hiero问题交流**](https://gitter.im/hexo-theme-hiker/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)


![](https://raw.githubusercontent.com/iTimeTraveler/iTimeTraveler.github.io/master/gallery/hiero-demo-screen.png)

![](https://raw.githubusercontent.com/iTimeTraveler/hexo-theme-hiero/master/source/preview/mobile-preview.png)

![](https://raw.githubusercontent.com/iTimeTraveler/hexo-theme-hiero/master/source/preview/Hiero_home.png)


以上Demo站点的源文件在这里，大家有需要的可以参考：https://github.com/iTimeTraveler/hexo-theme-hiero/tree/site-source

<!--more-->

## 安装步骤

 1. 从Github上获取代码

 ```shell
 $ git clone https://github.com/iTimeTraveler/hexo-theme-hiero.git themes/hiero
 ```
 2. 启用主题

 Modify `theme` setting in `_config.yml` to `hiero`.
 ```
 # Extensions
 ## Plugins: http://hexo.io/plugins/
 ## Themes: http://hexo.io/themes/
 theme: hiero
 ```
 3. 更新主题

 ```shell
 $ cd themes/hiero
 $ git pull
 ```


## 特性


### 支持图片Logo

就像下面这样：

![](https://raw.githubusercontent.com/iTimeTraveler/hexo-theme-hiero/master/source/preview/logo-preview.jpg)

只用在hiero/_config.yml中设置 `avatar`字段的`eanble`为true，然后设置图片的`url`就好了。

```yml
# Put your avatar.jpg into `hexo-site/themes/hiero/source/` directory.
# url is target link (E.g. `url: https://hexo.io/logo.svg` or `url: css/images/mylogo.jpg`)
avatar: 
  enable: true
  width: 124
  height: 124
  bottom: 10
  url: https://hexo.io/logo.svg
```


### 代码高亮

Hiero 使用[Tomorrow Theme](https://github.com/chriskempson/tomorrow-theme) 作为代码主题. 共有以下六种选项: `default`, `normal`, `night`, `night blue`, `night bright`, `night eighties`

![code `default` theme Preview](https://raw.githubusercontent.com/iTimeTraveler/hexo-theme-hiero/master/source/preview/code-default-preview.png)

默认高亮配色如上图，另外的五种配色如下.

![code themes](https://github.com/iTimeTraveler/hexo-theme-hiero/blob/master/source/preview/code-theme.jpg?raw=true)

您可以在本主题的 hiero/_config.yml 文件中更改 `highlight_theme` 字段来选择.

```yml
# Code Highlight theme
# Available value:
#    default | normal | night | night eighties | night blue | night bright
# https://github.com/chriskempson/tomorrow-theme
highlight_theme: default
```



### 侧边栏

主题_config.yml文件中的 `sidebar` 字段可以设置为 `left`或`right`，用来控制侧边栏显示在页面左侧还是右侧。
Hipaper 有以下7个侧边栏组件:

- search （搜索框）
- social （社交网站链接）
- recent_posts （最新文章）
- category （分类）
- tag （标签）
- tagcloud （标签云）
- archive （归档栏）

以上组件在主题中均已默认启用. 您可以在 `widget` 字段中设置显示哪些以及顺序。


### 站内搜索

Hiero  使用 `Insight Search` 来帮助大家使用站内搜索.

```yml
# Search
search:
    insight: true # you need to install `hexo-generator-json-content` before using Insight Search
    swiftype: # enter swiftype install key here
    baidu: false # you need to disable other search engines to use Baidu search, options: true, false
```

> ！！注意: 使用搜索工具之前您必须使用 `hexo-generator-json-content` 来安装，在Hexo根目录下执行命令如下：

```bash
$ npm install -S hexo-generator-json-content
```


### Fancybox

Hiero 使用 [Fancybox] 来提供文章图片预览.

```
![img caption](img url)

{% fancybox img_url [img_thumbnail] [img_caption] %}
```

### 打赏捐赠按钮

![](https://github.com/iTimeTraveler/hexo-theme-hiker/blob/master/source/preview/donation-btn.png)

每篇文章最后显示打赏按钮，目前仅支持微信支付和支付宝两种打赏方式。您可以在文件 `hiero/_config.yml` 中配置您的微信、支付宝付款二维码图片的URL:


```yml
# donation button
donate:
    enable: true
    message: '如果觉得我的文章对您有用，请随意打赏。您的支持将鼓励我继续创作!'
    wechatImage: https://your_WECHAT_PAY_ImageUrl
    alipayImage: https://your_ALIPAY_ImageUrl
```

### 评论功能

Hiero 已完全支持网易云跟帖、多说、 Disqus评论功能. 您可以在 `hiero/_config.yml` 文件中更改以下字段:

```yml
# comment ShortName, you can choose only ONE to display.
gentie_productKey: #网易云跟帖your-gentie-product-key
duoshuo_shortname: iTimeTraveler
disqus_shortname: 
```

- #### 网易云跟帖说明

登陆 [网易云跟帖](https://gentie.163.com/) 获取你的 Product Key。请注意，您在**`云跟帖管理后台设置的域名必须跟您站点的域名一致`**。在本地测试时，需要做两步骤前置设定：

1. 修改 hosts 文件，将您域名的请求指向本地。例如：127.0.0.1 yoursite.com
2. 修改 Hexo 监听的端口为 80：`hexo s --debug -p 80`

测试完成后请将 hosts 文件中的域名映射删除即可。


## 支持的浏览器

![](https://github.com/iTimeTraveler/hexo-theme-hiero/blob/master/source/preview/browser-support.png?raw=true)


## 贡献

欢迎大家提issue或者pull request，开源项目也离不开大家的批评指正。


> 特别感谢Wordpress作者 ATHEMES, 本主题源于他们的 [Hiero for Wordpress](http://athemes.com/theme/hiero/).


## License

Hiero is under the MIT license. See the [LICENSE](https://github.com/iTimeTraveler/hexo-theme-hiero/blob/master/LICENSE) file for details.


[Hexo]: https://hexo.io/
[Fancybox]: http://fancyapps.com/fancybox/
[Font Awesome]: http://fontawesome.io/
