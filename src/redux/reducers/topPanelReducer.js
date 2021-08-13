import {CLOSE_TOP_PANEL, INCREMENT_TOP_PANEL_COUNT} from "../types";

const defaultState = {count: 0}
export const topPanelReducer = (state = defaultState, action) => {
    switch (action.type) {
        case INCREMENT_TOP_PANEL_COUNT:
            return {count: action.payload};
        case CLOSE_TOP_PANEL:
            return {count: 0}
        default:
            return state
    }
}