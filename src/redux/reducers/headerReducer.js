import {CHANGE_HEADER_TITLE} from "../types";

const defaultState = {title: 'Keep'}
export const headerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_HEADER_TITLE:
            const titles = ['Keep', 'Archive', 'Trash']
            return {title: titles[action.payload]}
        default:
            return state
    }
}