export const setDate = (value, dateActionType) =>  dispatch => {
    dispatch({
      type: dateActionType,
      data: value
    })
}
