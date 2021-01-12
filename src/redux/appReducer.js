import {SHOW_LEFT_PANEL} from "./actionsTypes";

const initialState = {isVisibleLeftPanel: false, noteType: 'home'}
export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LEFT_PANEL:
            return {...state, isVisibleLeftPanel: action.payload};

        default: return state
    }
}