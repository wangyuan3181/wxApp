Page({
	// 手指触碰事件 wx.navigateTo 实现跳转
	onTap: function (event) {
		// 路由的跳转
		// wx.navigateTo({
		// 要写成对象的形式 才能跳转 也不要.wxml后缀 不过这是当做首页的子页面跳转   
		// url: "../posts/post"
		// });


		// redirectTo
		wx.navigateTo({
			// 两个页面之间的跳转像是兄弟页面之间的  不存在父子关系
			url: "../posts/post",
			success: function (res) {
				// 成功的时候，执行的函数
			},
			fail: function () {
				// 失败的时候，执行的函数
			},
			complete: function () {
				// 无论失败or成功 都会执行的函数
			}
		})
	},

	// onUnload: function () {
	// 	console.log("当事件是redirectTo的时候 触摸跳转兄弟页面时，触发onUnload 也就是关闭&卸载时");
	// },

	// onHide: function () {
	// 	console.log("当事件是navigate的时候 触摸跳转父子页面时，触发onhide 也就相当于隐藏时");
	// }
})