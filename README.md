# 宝宝学英语小程序

一个基于 uni-app + Vue 开发的儿童英语学习小程序，帮助宝宝快乐学习英语。

## 功能特点

- 📚 **单词学习**: 多个分类的单词卡片学习（动物、颜色、数字、水果蔬菜等）
- 🎮 **趣味练习**: 互动答题游戏，巩固所学知识
- 🎨 **精美界面**: 色彩丰富、适合儿童的UI设计
- 🔊 **发音功能**: 点击可播放单词发音（待实现）
- 📊 **学习进度**: 实时显示学习进度

## 项目结构

```
uniapp/
├── pages/
│   ├── index/          # 首页（分类选择）
│   ├── learn/          # 学习页（单词卡片）
│   └── quiz/           # 练习页（趣味答题）
├── static/             # 静态资源
├── App.vue             # 应用入口
├── main.js             # 主入口文件
├── pages.json          # 页面配置
├── manifest.json       # 应用配置
└── package.json        # 依赖配置
```

## 安装运行

1. 安装依赖
```bash
npm install
```

2. 运行到微信小程序
```bash
npm run dev:mp-weixin
```

3. 运行到H5
```bash
npm run dev:h5
```

## 学习内容

### 单词分类
- 常用单词：Hello, Thank you, Goodbye等
- 动物世界：Dog, Cat, Bird等
- 颜色认知：Red, Blue, Green等
- 数字乐园：One, Two, Three等
- 水果蔬菜：Apple, Banana, Orange等

### 练习方式
- 看图识单词
- 中英文匹配
- 计分系统
- 即时反馈

## 技术栈

- uni-app 3.x
- Vue 3
- 支持微信小程序、H5等多端

## 后续优化

- [ ] 添加真实的语音合成
- [ ] 增加更多单词和分类
- [ ] 添加学习记录和统计
- [ ] 增加动画效果
- [ ] 家长监控功能

## License

MIT
# baobaoyingyu2
