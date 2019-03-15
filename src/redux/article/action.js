import {GET_LIST, EDIT_ARTICLE, DELETE_ARTICLE} from "./constant";


export const getList = (action) => {
    return {type: GET_LIST, data:action}
};

export const editArticle = (action) => {
    return {type: EDIT_ARTICLE, action}
};
export const deleteArticle = (action) => {
    return {type: DELETE_ARTICLE, action}
};
