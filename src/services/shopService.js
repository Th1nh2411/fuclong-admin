import * as httpRequest from '../utils/httpRequest';

export const getInfoShop = async (token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get('shop/info', config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const editInfoShop = async (image, isActive, token) => {
    const config = {
        headers: { access_token: token },
        params: {
            image,
            isActive,
        },
    };
    try {
        const res = await httpRequest.put('shop/editInfo', config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const getListStaff = async (token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get('manager/getListStaff', config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
