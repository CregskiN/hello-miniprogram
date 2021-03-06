// component/item/item.js

let itemList: string[] = [];

Component({
	/**
	 * 组件的属性列表
	 */
  properties: {
    team: Object,
    docCount: Number,
    imgCount: Number,
    type: String,
    userInfo: Object,
    isAuthorized: Boolean,
  },
  options: {
    addGlobalClass: true
  },
	/**
	 * 组件的初始数据
	 */
  data: {

  },

	/**
	 * 组件的方法列表
	 */
  methods: {
		/**
	 * "更多"按钮点击事件
	 * @param e 点击事件
	 */
    onMore(e: any) {
      switch (this.properties.type) {

        case 'official': {
          const { tid } = this.properties.team;
          const isAuthorized = this.properties.isAuthorized;
          wx.showActionSheet({
            itemList: ['分享', '退出'],
            success: (res: WechatMiniprogram.ShowActionSheetSuccessCallbackResult) => {
              switch (res.tapIndex) {
                case 0: {
                  this.triggerEvent('share', {
                    selectTeam: this.properties.team
                  });
                  break;
                }
                case 1: {
                  if (!isAuthorized) {
                    // 如果没有授权，弹出授权窗口
                    this.triggerEvent('showAuthorizeWindow');
                  } else {
                    // 如果已经授权，正常退出
                    this.triggerEvent('dropOut', {
                      tid
                    })
                  }
                  break;
                }
              }
            },
            fail: (res) => {
              console.log('fail');
            }
          })
          break;
        }
        case 'create': {
          const { tid } = this.properties.team;
          const { uid } = this.properties.userInfo;
          wx.showActionSheet({
            itemList: ['邀请加入口袋', '重命名', '解散口袋'],
            success: (res: WechatMiniprogram.ShowActionSheetSuccessCallbackResult) => {
              switch (res.tapIndex) {
                case 0: {
                  this.triggerEvent('share', {
                    selectTeam: this.properties.team
                  })
                  break;
                }
                case 1: {
                  this.triggerEvent('rename', {
                    teamInfo: this.data.team
                  })
                  break;
                }
                case 2: {
                  this.triggerEvent('disband', {
                    tid,
                    uid,
                    type: this.properties.type
                  })
                }
              }

            },
            fail: (res: WechatMiniprogram.GeneralCallbackResult) => {
              console.log('fail');
            }
          })
          break;
        }
        case 'join': {
          const { tid } = this.properties.team;
          const { uid } = this.properties.userInfo;
          console.log('我加入的项目组')
          wx.showActionSheet({
            itemList: ['邀请加入口袋', '退出口袋'],
            success: (res: WechatMiniprogram.ShowActionSheetSuccessCallbackResult) => {
              switch (res.tapIndex) {
                case 0: {
                  this.triggerEvent('share', {
                    selectTeam: this.properties.team
                  })
                  break;
                }
                case 1: {
                  this.triggerEvent('dropOut', {
                    tid,
                    uid: this.properties.userInfo.uid
                  })
                  break;
                }
              }

            },
            fail: (res: WechatMiniprogram.GeneralCallbackResult) => {
              console.log('fail');
            }
          })
          break;
        }
      }
    },

    toDetail() {
      wx.navigateTo({
        url: `/pages/detail/detail?tid=${this.data.team.tid}`
      })
    },

    /**
     * 项目组选择器 - 选择事件
     */
    onSelect() {
      this.triggerEvent('select', {
        tid: this.properties.team.tid
      })
    },
  }
})
