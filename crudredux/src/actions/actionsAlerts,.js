import { HIDDEN_ALERT, SHOW_ALERT } from "../types";

export function showAlert(alert) {
    return (dispatch) => {
        dispatch(showAlertError(alert))
    }
}

const showAlertError = (alert) => ({
    type: SHOW_ALERT,
    payload: alert
})

export function hiddrenAlertAction(alert) {
    return (dispatch) => {
        dispatch(hiddenAlert())
    }
}

const hiddenAlert = (alert) => ({
    type: HIDDEN_ALERT,
    payload: null
})
