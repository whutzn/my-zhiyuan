import {get,post} from './request';
//登陆
export const  login= (login)=>post('admin/login',login)
//上传
export const  upload=(upload)=>post('admin/uploadcustomerfile',upload)

export const  submitInfo=(submitInfo)=>post('admin/addinfo',submitInfo)  