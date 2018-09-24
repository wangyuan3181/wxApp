# 前言

## 项目起因

通过自学和参考官方 API,尝试做一个小小的 demo,水平有限，但是也有一定的参考价值。

## 项目描述

主要是诗词欣赏(无人更新数据),音乐鉴赏(无人撰写),电影评价(后期完成)

## 项目主要功能

收藏,轮播,音乐播放,页面跳转 音乐列表鉴赏(待续),热播电影推荐(待续)...

---

# 项目中遇到的问题

## 音乐在 Android 手机上的播放问题

官方音乐播放 API

```
wx.playBackgroundAudio({
		dataUrl: "",
		title: "",
		coverImgUrl:""
	})
```

就是 dataUrl coverImgUrl 只能是链接,流媒体,小程序程序不能大于 1MB,
另外,dataUrl 得是 mp3 格式的音乐,m4a 格式的安卓机不支持,无法真机播放

## 具有 Tab 的小程序页面跳转问题

若想实现跳转,必须在首页的 js 文件中的页面跳转部分采用 wx.switchTab(OBJECT)来实现跳转

# 项目小技巧

## 编辑器选择
首先,如果你是其他编辑器的中度使用者(本人独爱 vscode),你可以使用 vsc 打开对应目录的小程序,然后写代码,用微信开发者工具进行调试,观察效果 PS:(如果用其他编辑器编写代码时,微信开发者工具中-->设置-->编辑设置-->文件保存的修改文件自动保存一定不要勾选,否则,vscode编写并保存后,无法刷新模拟器页面)

## vscode 写微信小程序 插件推荐

### vscode-wechat 
修改用户设置中的文件关联,将.wxml 映射到.html,.wxss 映射到.css，语法高亮和 emmet 就都搞定 (牛人开发的) ps:(其他插件够全的话,这个别下载,下载反而不太好看,亲测)

### vscode weapp api

### vscode wxml

### Easy WXLESS

### 小程序助手

## 一次性建 4 个文件

.js .json .wxss .wxml 建个文件夹需要连续点击 4 个,很烦！莫慌可以现在 aapp.json 中配置你要建的文件夹。如：

```
"pages": [
    "pages/music/music"
  ]
```
如果在vscode中保存如上代码 需要在微信开发者工具再保存一次 当然也可以直接在开发者工具编写并保存

## tabbar 中 position
如果设置成 "position"："top" ,则list[{}]中的iconPath,selectedIconPath则无效,默认值："position":"bottom"

# 演示
![avatar](https://github.com/wangyuan3181/wxApp/blob/master/wxApp1%E5%BC%80%E5%8F%91%E7%89%88/images/show/show.gif)

# 未完待续...