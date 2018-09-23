var postsData = require('../../data/posts-data.js')
// require 脚本文件的時候 路径必须用相对路径不能用绝对路径 (原因未知，可能是bug)

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		// 小程序总是会读取data对象来做数据绑定，这个动作称之为动作A
		// 而这个动作A的执行，是在onload事件执行之后发生的
	},
	/**
	 * 生命周期函数--监听页面加载 第一个输出
	 */
	onLoad: function (options) {
		// 页面初始化，options为页面跳转所带来的参数
		this.setData({
			posts_key: postsData.postList
		}); // 这句等同于把post_content1里面的数据写到data{}中
	},

	// 
	onPostTap: function (event) {
		var postId = event.currentTarget.dataset.postid;
		// console.log("id is "+postId); 获取id号
		wx.navigateTo({
			url: "post-detail/post-detail?id=" + postId
		})
	},
	
	onSwiperTap:function (event) {
		var postId = event.target.dataset.postid;
		wx.navigateTo({
			url: "post-detail/post-detail?id=" + postId
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成 第三个输处
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示 第二个输出
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		console.log("onpulldownredresh");

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		console.log("onreachbottom");

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		console.log("onshareappmessage");

	}
})