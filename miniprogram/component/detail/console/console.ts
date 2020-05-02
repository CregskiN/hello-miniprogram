// component/detail/console/console.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    editting: Boolean,
    selectCount: Number,
    tid: Number,
    type: String, // 控制台类型：1.team 2.my_file 
    teamInfo: Object,
  },
  options: {
    addGlobalClass: true
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
        itemList: ['聊天文件', '本地图片'],
        success: (res) => {
          switch (res.tapIndex) {
            case 0: {
              wx.chooseMessageFile({
                count: 10,
                type: 'all',
                success: (res) => {
                  wx.showModal({
                    title: '提示',
                    content: `您将添加${res.tempFiles.length}个文件`,
                    success: () => {
                      this.triggerEvent('uploadMessageFile', {
                        fileObjects: res
                      })
                    }
                  })
                }
              })
              break;
            }
            case 1: {
              wx.chooseImage({
                count: 5,
                sourceType:['album'],
                success: (res) => {
                  this.triggerEvent('uploadLocalImg', {
                    chooseLocalImgs: res
                  })
                }
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
        url: `/pages/member/member?tid=${this.data.teamInfo.tid}`
      })
    },

    /**
     * 进入编辑状态
     */
    inEdit() {
      this.triggerEvent('inEdit');
    },

    /**
     * 邀请
     */
    onInvite() {
      this.triggerEvent('invite', {
        tid: this.data.tid
      })
    },

    /**
     * 分享已选文件
     */
    onShare() {
      this.triggerEvent('share');
    },

    /**
     * 删除已选
     */
    onDelete() {
      this.triggerEvent('delete');
    }
  }
})
