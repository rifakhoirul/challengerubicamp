export const dispatchLoading = (dispatch,type) => {
    dispatch({
        type: type,
        payload: {
            loading: true,
            data: false,
            errorMessage: false,
        }
    })
}

export const dispatchSuccess = (dispatch,type,result) => {
    dispatch({
        type: type,
        payload: {
            loading: false,
            data: result,
            errorMessage: false,
        }
    })
}

export const dispatchError = (dispatch,type,error) => {
    dispatch({
        type: type,
        payload: {
            loading: false,
            data: false,
            errorMessage: error,
        }
    })
}

