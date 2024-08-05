import {post} from '../axiosInstance';

export const sendfittingData = async (picture, cnt, clothesData, clothes) => {  
    try{
        //TODO : endpoint와 data 이름 수정 필요
        const respnse = await post({endPoint: '/ai/fitting', data: {picture, cnt, clothesData, clothes}});  
        return respnse;
    }
 
    catch (error){
        console.error('AI 옷 추천 중 에러발생 :', error);
    }
}       