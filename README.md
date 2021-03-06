# generator-cordova-plugin-devbed

> [Yeoman](http://yeoman.io) [cordova](http://cordova.apache.org) plugin generator


## Getting Started

### What's cordova plugin devbed？

Yeoman generator that provides simple cordova plugin and test bed application for the plugin.

### Getting started

To install generator-cordova-plugin-devbed from npm, run:

```bash
npm install -g generator-cordova-plugin-devbed
```

Next, initiate the generator:

```bash
yo cordova-plugin-devbed
```

- Precondition
 - You need to install Android SDK if you want to choice Android as a target
 - You should run the generator on Mac OS if you want to choice iOS as a target
 
### Getting To Know This Generator

- test runner
  - The test app includes [cordova-plugin-test-framework](https://github.com/apache/cordova-plugin-test-framework)
  - They use Jasmine-2.0.0

- How the cordova-plugin-devbed generator works
  1. Create plugin itself
    - Kicks plugman to create simple cordova plugin
    - Modify plugin.xml
      - Change <plugin><js-module><clobbers @target> value from 'cordova.plugins.<pluginName>' to '<plugin ID>'
      - As a result, cordova locates the plugin object at the pluginID value (ex: org.cool.plugin)
  1. Add platform into the plugin
    - Kick plugman to add platform (ex: android/ios) into the plugin
  1. Add package.json to plugin
    - The generator adds package.json and some recommended files into plugin directory.
  1. Add test plugin
    - The generator adds the test plugin files for cordova-plugin-test-framework
  1. Create test application
    - The generator kicks cordova to create application
  1. Add platform into the application
    - Call cordova-lib as 'cordova platform add'
  1. Add the plugin to the test app
    - Call as like 'cordova plugin add'
  1. Add test plugin into test app
    - cordova-plugin-test-framework requires test plugin to testing target plugin
  1. Add cordova-plugin-test-framework
    - 'cordova plugin add http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git'
    - Modify config.xml
      - Change <widget><content @src> value from 'index.html' to 'cdvtests/index.html'

#### JP
- test runner について
  - [cordova-plugin-test-framework](https://github.com/apache/cordova-plugin-test-framework) を採用
  - Jasmine-2.0.0 を実行している

- generator の作業内容
  1. plugin の生成
    - plugman により、Cordova plugin のひな形作成
    - ひな形のうち、plugin.xml の一部を修正。
      - <plugin><js-module><clobbers @target> の値を cordova.plugins.<plugin名> から <plugin ID> に変更
      - JavaScript からアクセスする際の object が plugin ID で示す位置 (ex: org.cool.plugin) に置かれるようになる
  1. plugin に platform を追加
    - plugman に対して platform (ex: android/ios) を追加
  1. package.json を追加
  　- plugin に対して package.json 等の recommended ファイルを追加
  1. test plugin を追加
    - plugin に対して cordova-plugin-test-framework 用の plugin コードを追加する
  1. テスト用アプリケーション生成
    - cordova create 相当の作業により、アプリケーションひな形を生成
  1. アプリに platform を追加
    - cordova platform add 相当の作業
  1. アプリに plugin を追加
    - 先に作成した plugin をアプリに追加
    - cordova plugin add 相当
  1. アプリにテスト plugin を追加
    - cordova-plugin-test-framework で参照するテスト plugin をアプリに追加
  1. cordova-plugin-test-framework を追加
    - cordova plugin add http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git 相当
    - config.xml の一部を修正
      - <widget><content @src> を index.html から cdvtests/index.html に変更

## Known problem
- [2015.6.8] Cordova CLI recommend using 'cordova-plugin-cool-coolplugin' style for plugin ID.
 - http://cordova.apache.org/announcements/2015/04/21/plugins-release-and-move-to-npm.html
 - But current plugman does not accept such style when adding android platform
  - package %pluginID%; in base.java, it causes compile error due to the ID includes minus(-) in it.
 - Since the generator uses plugman to add platform, I keep the old style id until the problem will be resolved.

## Contribution
We're welcome your contribution to our project.
- If you find a bug or mistake, please submit a ticket to the issue
 - Of cause publishing Pull Request is welcome
- If you want to add or modify the feature, please submit issue
 - Publishing Pull Request without discussing the feature change on the issue would be ignored.
 - Please explain the aim of the new feature on the issue and let us discuss the rough architecture to realize the feature.

## License

Copyright 2015 Sony Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

