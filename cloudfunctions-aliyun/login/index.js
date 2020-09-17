'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res = {
	}
	
		let  result = await db.collection('user_dtl').where({
			USER_NAME:event.userName,
			USER_PHONE:event.userPhone
	
	}).get()
	if(result.affectedDocs  ==  1){
		res = {
			code : 200,
			data:result.data,
			message:null,
			success:true
		}
	} else {
		res = {
			code : 400,
			data:result.data,
			message:null,
			success:false
		}
	}
	
	


	//返回数据给客户端
	return res
};