import {CHANGE_NOTE_BACKGROUND_IN_MODAL, CLOSE_MODAL_EDIT_FORM, DELETE_IMAGE, OPEN_MODAL_EDIT_FORM} from "../types";

const defaultState = {
    isOpenedModalEditForm: false,
    editedNote: {
    id: null, title: null, content: null, page: null,
    background: null, imagesSrc: null, isChosen: null, titleHeight: null, textHeight: null}
}
export const modalEditFormReducer = (state = defaultState, action) => {
    switch (action.type) {
        case OPEN_MODAL_EDIT_FORM:
            return {isOpenedModalEditForm: true, editedNote: {...action.payload}};
        case CHANGE_NOTE_BACKGROUND_IN_MODAL:
            return {...state, editedNote: {...state.editedNote, background: action.payload}};
        case DELETE_IMAGE:
            const newImagesSrc = state.editedNote.imagesSrc.filter(src => src !== action.payload)
            return {...state, editedNote: {...state.editedNote, imagesSrc: newImagesSrc}}
        case CLOSE_MODAL_EDIT_FORM:
            return {...defaultState};
        default:
            return state
    }
}