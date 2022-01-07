import { GET_LIST_LIGA } from "../../actions/LigaAction";

const initialState = {
    getListLigaLoading: false,
    getListLigaResult: false,
    getListLigaError: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIST_LIGA:
            return {
                ...state,
                getListLigaLoading: action.payload.loading,
                getListLigaResult: action.payload.data,
                getListLigaError: action.payload.error,
            }
        default:
            return state
    }
}