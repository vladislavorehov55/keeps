import {CHANGE_ACTIVE_BTN, OPEN_AND_CLOSE_LEFT_PANEL} from "../types";

const defaultState = {
    isShown: false,
    activeBtnInd: 0
}
export const leftPanelReducer = (state = defaultState, action) => {
    switch (action.type) {
        case OPEN_AND_CLOSE_LEFT_PANEL:
            return {...state, isShown: !state.isShown};

        case CHANGE_ACTIVE_BTN:
            return {isShown: false, activeBtnInd: action.payload}
        default:
            return state
    }
}