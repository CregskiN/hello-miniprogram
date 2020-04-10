// component/detail/console/console.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    editting: Boolean,
    selectCount: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    classes: {
      btns: {
        share: {
          active: 'detail_console_btn btn_share_active',
          normal: 'detail_console_btn btn_share_normal'
        },
        complete: {
          active: 'detail_console_btn btn_complete_active',
          normal: 'detail_console_btn btn_complete_normal'
        }
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {


    /**
       * 上传
       */
    onUpload() {
      wx.showActionSheet({
        itemList: ['群聊文件', '本地文件'],
        success: (res) => {
          switch (res.tapIndex) {
            case 0: {
              wx.chooseMessageFile({
                count: 100,
                type: 'file',
                success: (res) => {
                  const names = [];
                  for (let file of res.tempFiles) {
                    names.push(file.name);
                  }
                  wx.showModal({
                    title: '提示',
                    content: `您将添加文件${JSON.stringify(names)}`,
                    success: () => {
                      wx.showToast({
                        title: '添加成功'
                      })
                    }
                  })
                }
              })
              break;
            }
            case 1: {
              wx.showModal({
                title: '提示',
                content: '抱歉，微信小程序暂不支持此功能'
              })
              break;
            }
          }
        }
      })
    },

    /**
     * 跳转至成员页
     */
    toMember() {
      wx.navigateTo({
        url: '/pages/member/member?gid=1'
      })
    },

    /**
     * 进入编辑状态
     */
    inEdit() {
      this.triggerEvent('edit')
    },

    /**
     * 邀请
     */
    onInvite() {
      this.triggerEvent('invite')
    },

    /**
     * 分享已选文件
     */
    onShare() {
      this.triggerEvent('share')
    },

    /**
     * 删除已选
     */
    onDelete() {
      this.triggerEvent('delete')
    }
  }
})