var postsData = require("../../../data/posts-data.js");
var app = getApp();

Page({
	data: {
		// isPlayingMusic: false
	},
	onLoad: function (option) {
		var postId = option.id;
		// console.log(postId);
		this.data.currentPostId = postId;
		var postData = postsData.postList[postId];
		// console.log(postData);
		this.setData({
			postData: postData
		})

		// 设置缓存 获取缓存
		// wx.setStorageSync('key', {
		// 	game: "王者荣耀",
		// 	developer: "腾讯"
		// })

		var postsCollected = wx.getStorageSync('posts_collected')
		if (postsCollected) {
			var postCollected = postsCollected[postId]
			if (postCollected) {
				this.setData({
					collected: postCollected
				})
			}
		} else {
			var postsCollected = {};
			postsCollected[postId] = false;
			wx.setStorageSync('posts_collected', postsCollected);
		}
		if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId=== postId) {
			this.setData({
				isPlayingMusic: true
			})
		}
		this.setMusicMonitor();
	},
	// 音乐播放器与总控开关 同步绑定更改
	setMusicMonitor: function () {
		var self = this;
		wx.onBackgroundAudioPlay(function () {
			self.setData({
				isPlayingMusic: true
			})
			app.globalData.g_isPlayingMusic = true;
			app.globalData.g_currentMusicPostId = self.data.currentPostId;
		});
		wx.onBackgroundAudioPause(function () {
			self.setData({
				isPlayingMusic: false
			})
			app.globalData.g_isPlayingMusic = false;
			app.globalData.g_currentMusicPostId = null;
		});
	},

	onColletionTap: function (event) {
		this.getPostsCollectedSyc();
		// this.getPostsCollectedAsy();  异步的调用
	},

	// 异步的方法
	getPostsCollectedAsy: function () {
		var that = this;
		wx.getStorage({
			key: "posts_collected",
			success: function (res) {
				var postsCollected = res.data;
				var postCollected = postsCollected[that.data.currentPostId];
				// 收藏变成未收藏，反之
				postCollected = !postCollected;
				postsCollected[that.data.currentPostId] = postCollected;
				that.showToast(postsCollected, postCollected);
			}
		})
	},

	// 同步的方法  小程序一般不要用异步的方法
	getPostsCollectedSyc: function () {
		var postsCollected = wx.getStorageSync('posts_collected');
		var postCollected = postsCollected[this.data.currentPostId];
		// 收藏变成未收藏，反之
		postCollected = !postCollected;
		postsCollected[this.data.currentPostId] = postCollected;
		this.showToast(postsCollected, postCollected);
	},

	showModal: function (postsCollected, postCollected) {
		var that = this;
		wx.showModal({
			title: "收藏",
			content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
			showCancel: "true",
			cancelText: "取消",
			cancelColor: "#333",
			confirmText: "确认",
			confirmColor: "#405f80",
			success: function (res) {
				if (res.confirm) {
					wx.setStorageSync('posts_collected', postsCollected);
					// 更新数据绑定变量，从而实现切换图片
					that.setData({
						collected: postCollected
					})
				}
			}
		})
	},

	showToast: function (postsCollected, postCollected) {
		// 更新文章是否的缓存值
		wx.setStorageSync('posts_collected', postsCollected);
		// 更新数据绑定变量，从而实现切换图片
		this.setData({
			collected: postCollected
		})
		wx.showToast({
			title: postCollected ? "收藏成功" : "取消成功",
			duration: 1000,
			icon: "success"
		})
	},

	onShareTap: function (event) {
		var itemList = [
			"分享给微信好友",
			"分享到朋友圈",
			"分享到QQ",
			"分享到微博"
		];
		wx.showActionSheet({
			itemList: itemList,
			itemColor: "#405f80",
			success: function (res) {
				// res.cancel 用户是不是点击了取消按钮
				// res.tapIndex 数组元素的序号，从0开始
				wx.showModal({
					title: "用户 " + itemList[res.tapIndex],
					content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
				})
			}
		})
	},

	// onShareTap: function (event) {
	// wx.removeStorageSync('key')   清除指定的缓存
	// 缓存的上限不得超过10MB
	// wx.clearStorageSync();        清除 所有的缓存
	// }

	onMusicTap: function (event) {
		var currentPostId = this.data.currentPostId;
		var postData = postsData.postList[currentPostId];
		var isPlayingMusic = this.data.isPlayingMusic;
		if (isPlayingMusic) {
			wx.pauseBackgroundAudio();
			this.setData({
				isPlayingMusic: false
			})
		} else {
			wx.playBackgroundAudio({
				dataUrl: postData.music.url,
				title: postData.music.title,
				coverImgUrl: postData.music.coverImg
			})
			this.setData({
				isPlayingMusic: true
			})
		}
	}
})