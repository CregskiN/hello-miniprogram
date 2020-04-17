"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = __importDefault(require("../utils/https"));
var User = (function () {
    function User() {
    }
    User.login = function () {
        return new Promise(function (resolve, reject) {
            wx.checkSession({
                success: function (res) {
                },
                fail: function (err) {
                },
                complete: function () {
                    wx.login({
                        success: function (res) {
                            console.log('wx.login res', res);
                            var data = { code: res.code };
                            var options = {
                                url: '/wxma_auth/code_to_session',
                                method: 'GET',
                                data: data
                            };
                            var loginRes = https_1.default.request(options);
                            loginRes.then(function (res) {
                                console.log(res);
                                var openid_sessionKey = res.data;
                                console.log('login接口获取的openid_sessionKey', openid_sessionKey);
                                User.setOpenidSessionKeyStorage(openid_sessionKey);
                                resolve(openid_sessionKey);
                            }).catch(function (err) {
                                console.log('login逻辑有误 - ', err);
                                reject(err);
                            });
                        },
                        fail: function (err) {
                            console.log('wx.login接口调用失败', err);
                            reject(err);
                        }
                    });
                }
            });
        });
    };
    User.getAuthorize = function () {
        return new Promise(function (resolve, reject) {
            wx.getSetting({
                success: function (res) {
                    console.log(res);
                    if (res.authSetting['scope.userInfo']) {
                        var userInfo = null;
                        var userInfoStorage = User.getUserInfoStorage();
                        if (userInfoStorage) {
                            userInfo = userInfoStorage;
                            resolve(userInfo);
                            return;
                        }
                        else {
                            wx.getUserInfo({
                                success: function (res) {
                                    User.setUserInfoStorage(res.userInfo);
                                    resolve(res.userInfo);
                                    return;
                                },
                                fail: function (err) {
                                    reject(err);
                                    return;
                                }
                            });
                        }
                    }
                    else if (!res.authSetting['scope.userInfo']) {
                        resolve({});
                        return;
                    }
                },
                fail: function (err) {
                    reject(err);
                    return;
                }
            });
        });
    };
    User.setUserInfoStorage = function (userInfo) {
        var oUserInfo = this.getUserInfoStorage();
        var nUserInfo = __assign(__assign({}, oUserInfo), userInfo);
        delete nUserInfo['username'];
        wx.setStorageSync('USERINFO', nUserInfo);
    };
    User.getOpenidSessionKeyStorage = function () {
        return wx.getStorageSync('OPENID_SESSIONKEY');
    };
    User.setOpenidSessionKeyStorage = function (openid_sessionKey) {
        var oOpenid_sessionKey = this.getOpenidSessionKeyStorage();
        var nOpenid_sessionKey = __assign(__assign({}, oOpenid_sessionKey), openid_sessionKey);
        wx.setStorageSync('OPENID_SESSIONKEY', nOpenid_sessionKey);
    };
    User.getUserInfoStorage = function () {
        try {
            return wx.getStorageSync('USERINFO');
        }
        catch (err) {
            console.log('USERINFO提取失败', err);
            return {};
        }
    };
    User.getUserInfo = function () {
        try {
            var userInfo = wx.getStorageSync('userInfo');
            if (userInfo !== '') {
                userInfo = JSON.parse(userInfo);
            }
            else {
                userInfo = {};
            }
            return userInfo.userInfo;
        }
        catch (err) {
            console.log(err);
            return {};
        }
    };
    User.setUserInfo = function (userInfo) {
        try {
            var oldInfo = this.getUserInfo() || {};
            var newUserInfo = __assign(__assign({}, oldInfo), { userInfo: userInfo });
            wx.setStorageSync('userInfo', JSON.stringify(newUserInfo));
        }
        catch (err) {
            console.log(err);
        }
    };
    return User;
}());
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFtQztBQWdCbkM7SUFBQTtJQTZNQSxDQUFDO0lBdk1VLFVBQUssR0FBWjtRQUNJLE9BQU8sSUFBSSxPQUFPLENBQXdCLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdEQsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDWixPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQU1iLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLFVBQUMsR0FBRztnQkFFVixDQUFDO2dCQUNELFFBQVEsRUFBRTtvQkFDTixFQUFFLENBQUMsS0FBSyxDQUFDO3dCQUNMLE9BQU8sRUFBRSxVQUFDLEdBQUc7NEJBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBRWpDLElBQU0sSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDaEMsSUFBTSxPQUFPLEdBQUc7Z0NBQ1osR0FBRyxFQUFFLDRCQUE0QjtnQ0FDakMsTUFBTSxFQUFFLEtBQWM7Z0NBQ3RCLElBQUksRUFBRSxJQUFJOzZCQUNiLENBQUE7NEJBQ0QsSUFBTSxRQUFRLEdBQUcsZUFBSyxDQUFDLE9BQU8sQ0FBc0QsT0FBTyxDQUFDLENBQUM7NEJBQzdGLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFRO2dDQUVuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUVqQixJQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0NBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQ0FDOUQsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0NBQ25ELE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFD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aW1wb3J0IHsgT3BlbmlkX1Nlc3Npb25LZXlUeXBlLCBDdXN0b21Vc2VySW5mbyB9IGZyb20gJy4uL3V0aWxzL3R5cGluZyc7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJy4uLy4uL3R5cGluZ3MvcmVzcG9uc2UnO1xuXG5cbmludGVyZmFjZSBHZXRVc2VySW5mb1Jlc3VsdCB7XG4gICAgYXZhdGFyVXJsPzogc3RyaW5nO1xuICAgIGNpdHk/OiBzdHJpbmc7XG4gICAgY291bnRyeT86IHN0cmluZztcbiAgICBnZW5kZXI/OiAwIHwgMSB8IDI7XG4gICAgbGFuZ3VhZ2U/OiAnZW4nIHwgJ3poX0NOJyB8ICd6aF9UVyc7XG4gICAgbmlja05hbWU/OiBzdHJpbmc7XG4gICAgcHJvdmluY2U/OiBzdHJpbmc7XG59XG5cbmNsYXNzIFVzZXIge1xuXG5cbiAgICAvKipcbiAgICAgKiDnmbvpmYbvvJogd3guY2hlY2tTZXNzaW9u5qOA5p+l5piv5ZCm6L+H5pyfIO+8nyB3eC5sb2dpbiArIOWKoOWFpee8k+WtmCA6IOS7jue8k+WtmOaPkOWPlm9wZW5pZCArIHNlc3Npb25fa2V5XG4gICAgICovXG4gICAgc3RhdGljIGxvZ2luKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8T3BlbmlkX1Nlc3Npb25LZXlUeXBlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB3eC5jaGVja1Nlc3Npb24oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3d4LmNoZWNrU2Vzc2lvbuaIkOWKnycscmVzKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChyZXMuZXJyTXNnID09PSAnY2hlY2tTZXNzaW9uOm9rJykge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmVzb2x2ZShVc2VyLmdldE9wZW5pZFNlc3Npb25LZXlTdG9yYWdlKCkpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd3gubG9naW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3eC5sb2dpbiByZXMnLCByZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHsgY29kZTogcmVzLmNvZGUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvd3htYV9hdXRoL2NvZGVfdG9fc2Vzc2lvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcgYXMgXCJHRVRcIiwgLy8gdHPnsbvlnovmjqjmlq3kuI3lh7rmnaVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2dpblJlcyA9IEh0dHBzLnJlcXVlc3Q8UmVxdWVzdC5Db2RlVG9TZXNzaW9uUmVxLCBSZXNwb25zZS5Db2RlVG9TZXNzaW9uUmVzPihvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpblJlcy50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmraTlpITlupTor6XmoKHpqoxyZXPmmK/lkKblkIjms5VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wZW5pZF9zZXNzaW9uS2V5ID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dpbuaOpeWPo+iOt+WPlueahG9wZW5pZF9zZXNzaW9uS2V5Jywgb3BlbmlkX3Nlc3Npb25LZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VyLnNldE9wZW5pZFNlc3Npb25LZXlTdG9yYWdlKG9wZW5pZF9zZXNzaW9uS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvcGVuaWRfc2Vzc2lvbktleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dpbumAu+i+keacieivryAtICcsIGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3d4LmxvZ2lu5o6l5Y+j6LCD55So5aSx6LSlJywgZXJyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmjojmnYPkv6Hmga9cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QXV0aG9yaXplKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Q3VzdG9tVXNlckluZm8+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5bey5o6I5p2D5aSE55CG5aaC5LiLXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXNlckluZm8gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlckluZm9TdG9yYWdlID0gVXNlci5nZXRVc2VySW5mb1N0b3JhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VySW5mb1N0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlt7LmjojmnYPvvIzkuJTmnInnvJPlrZhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyA9IHVzZXJJbmZvU3RvcmFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOS9huaXoOe8k+WtmFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXIuc2V0VXNlckluZm9TdG9yYWdlKHJlcy51c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy51c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6IChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5Zug572R57uc6Zeu6aKYXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgICAgICAgICAgLy8gd3guZ2V0U2V0dGluZyh7XG4gICAgICAgICAgICAvLyBcdHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAvLyBcdFx0aWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgICAgLy8gXHRcdFx0Ly8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensO+8jOS4jeS8muW8ueahhlxuICAgICAgICAgICAgLy8gXHRcdFx0d3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgLy8gXHRcdFx0XHRzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgLy8gXHRcdFx0XHRcdC8vIOWPr+S7peWwhiByZXMg5Y+R6YCB57uZ5ZCO5Y+w6Kej56CB5Ye6IHVuaW9uSWRcbiAgICAgICAgICAgIC8vIFx0XHRcdFx0XHR0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cblxuICAgICAgICAgICAgLy8gXHRcdFx0XHRcdC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXG4gICAgICAgICAgICAvLyBcdFx0XHRcdFx0Ly8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxuICAgICAgICAgICAgLy8gXHRcdFx0XHRcdGlmICh0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gXHRcdFx0XHRcdFx0dGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzKVxuICAgICAgICAgICAgLy8gXHRcdFx0XHRcdH1cbiAgICAgICAgICAgIC8vIFx0XHRcdFx0fSxcbiAgICAgICAgICAgIC8vIFx0XHRcdH0pXG4gICAgICAgICAgICAvLyBcdFx0fVxuICAgICAgICAgICAgLy8gXHR9LFxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgfSlcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6K6+572udXNlcmluZm/nvJPlrZhcbiAgICAgKiBAcGFyYW0gdXNlckluZm8gXG4gICAgICovXG4gICAgc3RhdGljIHNldFVzZXJJbmZvU3RvcmFnZSh1c2VySW5mbzogQ3VzdG9tVXNlckluZm8pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb1VzZXJJbmZvID0gdGhpcy5nZXRVc2VySW5mb1N0b3JhZ2UoKTtcbiAgICAgICAgY29uc3QgblVzZXJJbmZvID0ge1xuICAgICAgICAgICAgLi4ub1VzZXJJbmZvLFxuICAgICAgICAgICAgLi4udXNlckluZm9cbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgblVzZXJJbmZvWyd1c2VybmFtZSddO1xuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnVVNFUklORk8nLCBuVXNlckluZm8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlm9wZW5pZF9zZXNzaW9uS2V557yT5a2YXG4gICAgICovXG4gICAgc3RhdGljIGdldE9wZW5pZFNlc3Npb25LZXlTdG9yYWdlKCk6IE9wZW5pZF9TZXNzaW9uS2V5VHlwZSB7XG4gICAgICAgIHJldHVybiB3eC5nZXRTdG9yYWdlU3luYygnT1BFTklEX1NFU1NJT05LRVknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva5vcGVuaWRfc2Vzc2lvbktleee8k+WtmFxuICAgICAqIEBwYXJhbSBvcGVuaWRfc2Vzc2lvbktleSBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0T3BlbmlkU2Vzc2lvbktleVN0b3JhZ2Uob3BlbmlkX3Nlc3Npb25LZXk6IE9wZW5pZF9TZXNzaW9uS2V5VHlwZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBvT3BlbmlkX3Nlc3Npb25LZXkgPSB0aGlzLmdldE9wZW5pZFNlc3Npb25LZXlTdG9yYWdlKCk7XG4gICAgICAgIGNvbnN0IG5PcGVuaWRfc2Vzc2lvbktleSA9IHtcbiAgICAgICAgICAgIC4uLm9PcGVuaWRfc2Vzc2lvbktleSxcbiAgICAgICAgICAgIC4uLm9wZW5pZF9zZXNzaW9uS2V5XG4gICAgICAgIH07XG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdPUEVOSURfU0VTU0lPTktFWScsIG5PcGVuaWRfc2Vzc2lvbktleSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDojrflj5Z1c2VyaW5mb+e8k+WtmFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRVc2VySW5mb1N0b3JhZ2UoKTogQ3VzdG9tVXNlckluZm8ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHd4LmdldFN0b3JhZ2VTeW5jKCdVU0VSSU5GTycpXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1VTRVJJTkZP5o+Q5Y+W5aSx6LSlJywgZXJyKTtcbiAgICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o+Q5Y+W57yT5a2Y5Lit55qEdXNlckluZm8o5LiN5YyF5ousb3Blbl9pZClcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0VXNlckluZm8oKTogR2V0VXNlckluZm9SZXN1bHQge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJyk7XG4gICAgICAgICAgICBpZiAodXNlckluZm8gIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdXNlckluZm8gPSBKU09OLnBhcnNlKHVzZXJJbmZvKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdXNlckluZm8gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1c2VySW5mby51c2VySW5mbztcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5a2Y5YKodXNlckluZm8o5LiN5YyF5ousb3Blbl9pZCnvvIzlop7ph4/lrZjlgqjjgILnsbvkvLzkuo50aGlzLnNlckRhdGFcbiAgICAgKiBAcGFyYW0gdXNlckluZm8gXG4gICAgICovXG4gICAgc3RhdGljIHNldFVzZXJJbmZvKHVzZXJJbmZvOiBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb2xkSW5mbyA9IHRoaXMuZ2V0VXNlckluZm8oKSB8fCB7fTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1VzZXJJbmZvID0ge1xuICAgICAgICAgICAgICAgIC4uLm9sZEluZm8sXG4gICAgICAgICAgICAgICAgdXNlckluZm9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycsIEpTT04uc3RyaW5naWZ5KG5ld1VzZXJJbmZvKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlcjtcbiJdfQ==