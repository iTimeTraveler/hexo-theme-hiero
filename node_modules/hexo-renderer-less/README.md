# [Less] renderer

Add support for [Less].

## Install

``` bash
$ npm install hexo-renderer-less --save
```

[Less]: http://lesscss.org/

## Configure

You can specify a [less include paths](http://lesscss.org/usage/#command-line-usage-include-paths) as an array config in your theme configuration.

```yaml
// themes/yourtheme/_config.yml

less:
  paths:
    - bower_components/bootstrap/less
```

You can compress the output of the css with a config in your theme configuration.

```yaml
// themes/yourtheme/_config.yml

less:
  compress: true
```
