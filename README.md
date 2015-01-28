# generator-cordova-plugin-devbed

> [Yeoman](http://yeoman.io) cordova(http://cordova.apache.org) plugin generator


## Getting Started

### Cordova plugin devbed とは？

 Cordova plugin 及び、そのテストを行うためのアプリケーションの scaffolding するツール。

### Getting started

To install generator-cordova-plugin-devbed from npm, run:

```bash
npm install -g git://ghe.am.sony.com/sandbox/generator-cordova-plugin-devbed
```

Next, initiate the generator:

```bash
yo cordova-plugin-devbed
```

### Getting To Know This Generator

* test runner について
  cordova-plugin-test-framework (https://github.com/apache/cordova-plugin-test-framework) を採用
  Jasmine-2.0.0 を実行している

* generator の作業内容
1. plugin の生成
  plugman により、Cordova plugin のひな形作成
  ひな形のうち、plugin.xml の一部を修正。
  <plugin><js-module><crobbers @target> の値を cordova.plugins.<plugin名> から <plugin ID> に変更
  ⇒ JavaScript からアクセスする際の object が plugin ID で示す位置 (ex: org.cool.plugin) に置かれるようになる
1. plugin に platform を追加
  plugman に対して platform (ex: android/ios) を追加
1. test plugin を追加
  plugin に対して cordova-plugin-test-framework 用の plugin コードを追加する
1. テスト用アプリケーション生成
  cordova create 相当の作業により、アプリケーションひな形を生成
1. アプリに platform を追加
  cordova platform add 相当の作業
1. アプリに plugin を追加
  先に作成した plugin をアプリに追加
  cordova plugin add 相当
1. アプリにテスト plugin を追加
  cordova-plugin-test-framework で参照するテスト plugin をアプリに追加
1. cordova-plugin-test-framework を追加
  cordova plugin add http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git 相当
  また、config.xml の一部を修正
  <widget><content @src> を index.html から cdvtests/index.html に変更


## License

MIT
