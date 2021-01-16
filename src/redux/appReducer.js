import {
    CANCEL_SEARCH_NOTE,
    CHANGE_FLEX_DIRECTION,
    CHANGE_PAGE,
    GET_SEARCHED_NOTES,
    SHOW_LEFT_PANEL
} from "./actionsTypes";

const initialState = {isVisibleLeftPanel: false, noteType: 'home', isSearchedNotes: false,
    isFlexDirectionColumn: true};
export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LEFT_PANEL:
            return {...state, isVisibleLeftPanel: action.payload};
        case GET_SEARCHED_NOTES:
            return {...state, isSearchedNotes: true};
        case CANCEL_SEARCH_NOTE:
            return {...state, isSearchedNotes: false};
        case CHANGE_FLEX_DIRECTION:
            return {...state, isFlexDirectionColumn: !state.isFlexDirectionColumn};
        case CHANGE_PAGE:
            return {...state, noteType: action.payload, isVisibleLeftPanel: false};
        default: return state
    }
}