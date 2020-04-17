// component/common/authorize/authorize.js
import User from '../../../models/User';
import Https from '../../../utils/https';
import { Response } from '../../../../typings/response';

const app = getApp();

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		// title: String,
		// content: String,
		isAuthorized: Boolean,
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		title: '提示',
		content: '请授权我们使用您的昵称、头像'
	},

	/**
	 * 组件的方法列表
	 */
	methods: {

		/**
		 * 授权事件
		 * @param e 
		 */
		onAuthorize(e) {
			console.log(e);
			const userInfo = e.detail.userInfo;
			if (userInfo) {
				User.setUserInfoStorage(userInfo);
				const globalData = app.getGlobalData();
				const { openid } = globalData.openid_sessionKey;
				const { nickName, avatarUrl } = User.getUserInfoStorage();
				const options = {
					url: '/wxma_auth/login',
					method: 'POST' as "POST",
					data: {
						openid,
						username: nickName as string,
						avatarUrl: avatarUrl as string
					}
				}
				Https.request<Request.AuthorizeReq, Response.AuthorizeRes>(options).then(res => {
					// console.log('授权接口返回', res);
					User.setUserInfoStorage(res.data);
					const userInfo = User.getUserInfoStorage();
					app.setGlobalData({ userInfo, isAuthorized: true });
					// console.log('授权逻辑完成，globalData - ', app.globalData);
					this.triggerEvent('authorize');

				}).catch(err => {
					console.log('授权接口出错', err);

				})
			} else {
				wx.showToast({
					title: '授权失败'
				})
			}
		}
	}
})
