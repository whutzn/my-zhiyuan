import {get,post} from './request';
//登陆
export const  login= (login)=>post('admin/login',login)
//上传图片
export const  upload=(upload)=>post('admin/uploadcustomerfile',upload)
//上传新闻
export const  submitInfo=(submitInfo)=>post('admin/addinfo',submitInfo)
//获取新闻列表
export const  getInfoList=(getInfoList)=>post('admin/getinfolist',getInfoList)
//删除指定新闻
export const  removeInfo=(removeInfo)=>post('admin/removeinfo',removeInfo)