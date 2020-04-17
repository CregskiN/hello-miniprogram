import Https from '../utils/https';
import { Response } from '../../typings/response';

export default class Team {
    /**
     * 获取官方项目组列表
     */
    static getOfficialTeamList() {
        return new Promise((resolve, reject) => {
            const options = {
                url: '/team/query_official_team_list',
                method: 'GET' as 'GET',
            };
            Https.request<Request.GetOfficialTeamListReq, Response.GetOfficialTeamListRes>(options).then(res => {
                console.log('成功获取官方项目组列表', res);
                resolve(res);
            }).catch(err => {
                console.log('获取官方项目组列表失败', err);
                reject(err);
            })
        })
    }

    /**
     * 获取我加入的项目组列表（不包括已管理项目组列表）
     * @param uid 
     */
    static getJoinedTeamList(uid: string) {
        return new Promise((resolve, reject) => {
            const options = {
                url: '/user/query_joined_team_list_by_uid',
                method: "GET" as "GET",
                data: {
                    uid: uid as string
                }
            };
            Https.request<Request.GetJoinedTeamListReq, Response.GetJoinedTeamListRes>(options).then(res => {
                console.log('成功获取我加入列表', res);
            }).catch(err => {
                console.log('获取我加入的项目组列表失败', err);
                reject(err);
            })
        })
    }

    /**
     * 获取我创建的项目列表
     * @param uid
     */
    static getCreatedTeamList(uid: string) {
        return new Promise((resolve, reject) => {
            const options = {
                url: '/user/query_created_team_list_by_uid',
                method: 'GET' as "GET",
                data: {
                    uid: uid
                }
            };
            Https.request<Request.GetCreatedTeamListReq, Response.GetCreatedTeamListRes>(options).then(res => {
                console.log('成功获取我创建的列表', res);
            }).catch(err => {
                console.log('获取我创建的列表失败', err);
                reject(err);
            })
        })
    }


    /**
     * 获取我管理的项目列表
     * @param uid 
     */
    static getManagedTeamList(uid: string) {
        return new Promise((resolve, reject) => {
            const options = {
                url: '/user/query_managed_team_list_by_uid',
                method: 'GET' as "GET",
                data: {
                    uid
                }
            };
            Https.request<Request.GetManagedTeamListReq, Response.GetManagedTeamListRes>(options).then(res => {
                console.log('成功获取我管理的项目列表', res);
            }).catch(err => {
                console.log('获取我管理的列表失败', err);
                reject(err);
            })
        })
    }

}