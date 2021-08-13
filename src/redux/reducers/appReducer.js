import {CHANGE_PAGE} from '../types'
const defaultState = {
    page: 'notes',
}
export const appReducer = (state = defaultState, action) => {
    if (action.type === CHANGE_PAGE) {
        const pageName = ['notes', 'archive', 'trash'];
        return {...state, page: pageName[action.payload]}
    }

    return state
}