import {
    CHANGE_ADD_NOTE_FORM_BACKGROUND,
    CHOOSE_ADD_NOTE_FORM_PICTURE,
    CLOSE_ADD_NOTE_FORM,
    OPEN_ADD_NOTE_FORM
} from "../types";

const defaultState = {
    isOpen: false,
    backgroundColor: 'white',
    imgsSrc: []
}
export const addNoteFormReducer = (state = defaultState, action) => {
    switch (action.type) {
        case OPEN_ADD_NOTE_FORM:
            return {...state, isOpen: true};
        case CLOSE_ADD_NOTE_FORM:
            return {...state, ...defaultState};
        case CHANGE_ADD_NOTE_FORM_BACKGROUND:
            return {...state, backgroundColor: action.payload};
        case CHOOSE_ADD_NOTE_FORM_PICTURE:
            return {...state, imgsSrc: action.payload}
        default:
            return state
    }
}