import * as httpRequest from '../utils/httpRequest';

export const getListIngredient = async (token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get('shop/listIngredientShop');
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
