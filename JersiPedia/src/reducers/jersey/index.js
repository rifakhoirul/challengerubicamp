import {
    DELETE_PARAMETER_JERSEY,
    GET_LIST_JERSEY,
    GET_LIST_JERSEY_BY_LIGA,
    SAVE_KEYWORD_JERSEY
} from "../../actions/JerseyAction";

const initialState = {
    getListJerseyLoading: false,
    getListJerseyResult: false,
    getListJerseyError: false,

    idLiga: false,
    namaLiga: false,
    keyword: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIST_JERSEY:
            return {
                ...state,
                getListJerseyLoading: action.payload.loading,
                getListJerseyResult: action.payload.data,
                getListJerseyError: action.payload.error,
            }
        case GET_LIST_JERSEY_BY_LIGA:
            return {
                ...state,
                idLiga: action.payload.idLiga,
                namaLiga: action.payload.namaLiga,
            }
        case DELETE_PARAMETER_JERSEY:
            return {
                ...state,
                idLiga: false,
                namaLiga: false,
                keyword:false
            }
        case SAVE_KEYWORD_JERSEY:
            return {
                ...state,
                keyword:action.payload.data
            }
        default:
            return state
    }
}