# generator-cordova-plugin-devbed

> [Yeoman](http://yeoman.io) cordova(http://cordova.apache.org) plugin generator


## Getting Started

### Cordova plugin devbed �Ƃ́H

 Cordova plugin �y�сA���̃e�X�g���s�����߂̃A�v���P�[�V������ scaffolding ����c�[���B

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

* test runner �ɂ���
  cordova-plugin-test-framework (https://github.com/apache/cordova-plugin-test-framework) ���̗p
  Jasmine-2.0.0 �����s���Ă���

* generator �̍�Ɠ��e
1. plugin �̐���
  plugman �ɂ��ACordova plugin �̂ЂȌ`�쐬
  �ЂȌ`�̂����Aplugin.xml �̈ꕔ���C���B
  <plugin><js-module><crobbers @target> �̒l�� cordova.plugins.<plugin��> ���� <plugin ID> �ɕύX
  �� JavaScript ����A�N�Z�X����ۂ� object �� plugin ID �Ŏ����ʒu (ex: org.cool.plugin) �ɒu�����悤�ɂȂ�
1. plugin �� platform ��ǉ�
  plugman �ɑ΂��� platform (ex: android/ios) ��ǉ�
1. test plugin ��ǉ�
  plugin �ɑ΂��� cordova-plugin-test-framework �p�� plugin �R�[�h��ǉ�����
1. �e�X�g�p�A�v���P�[�V��������
  cordova create �����̍�Ƃɂ��A�A�v���P�[�V�����ЂȌ`�𐶐�
1. �A�v���� platform ��ǉ�
  cordova platform add �����̍��
1. �A�v���� plugin ��ǉ�
  ��ɍ쐬���� plugin ���A�v���ɒǉ�
  cordova plugin add ����
1. �A�v���Ƀe�X�g plugin ��ǉ�
  cordova-plugin-test-framework �ŎQ�Ƃ���e�X�g plugin ���A�v���ɒǉ�
1. cordova-plugin-test-framework ��ǉ�
  cordova plugin add http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git ����
  �܂��Aconfig.xml �̈ꕔ���C��
  <widget><content @src> �� index.html ���� cdvtests/index.html �ɕύX


## License

MIT
