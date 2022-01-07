import { GET_LIST_JERSEY } from "../../actions/JerseyAction";

const initialState = {
    getListJerseyLoading: false,
    getListJerseyResult: false,
    getListJerseyError: false,
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
        default:
            return state
    }
}