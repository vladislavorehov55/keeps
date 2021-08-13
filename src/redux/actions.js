import {
    SEARCH_NOTES,
    CANCEL_SEARCH_NOTE,
    CLOSE_ADD_NOTE_FORM,
    ADD_NOTE,
    CHANGE_NOTES_DISPLAY,
    OPEN_AND_CLOSE_LEFT_PANEL,
    CHANGE_PAGE,
    CHANGE_ACTIVE_BTN,
    OPEN_ADD_NOTE_FORM,
    CHANGE_ADD_NOTE_FORM_BACKGROUND,
    CHOOSE_ADD_NOTE_FORM_PICTURE,
    CHANGE_NOTE_BACKGROUND,
    ADD_NOTE_TO_ARCHIVE,
    ADD_NOTE_TO_TRASH,
    RETURN_FROM_ARCHIVE,
    DELETE_NOTE,
    RETURN_FROM_TRASH,
    CHOOSE_NOTE,
    CLOSE_TOP_PANEL,
    OPEN_MODAL_EDIT_FORM,
    CLOSE_MODAL_EDIT_FORM,
    EDIT_NOTE,
    CHANGE_NOTE_BACKGROUND_IN_MODAL,
    CHOOSE_NOTE_PICTURE,
    DELETE_IMAGE,
    CHANGE_HEADER_TITLE,
    CHANGE_ADD_NOTE_FORM_INPUT,
    INCREMENT_TOP_PANEL_COUNT,
    DESELECT_NOTE, SET_NOTES,
} from './types';

export const setNotes = (notes) => {
    return {type: SET_NOTES, payload: notes}
}

export const searchNote = (page, text) => {
    return {type: SEARCH_NOTES, payload: {page, text}}
}
export const cancelSearchNote = () => {
    return {type: CANCEL_SEARCH_NOTE}
}
export const openAddNoteForm = () => {
    return {type: OPEN_ADD_NOTE_FORM}
}
export const changeAddNoteFormInput = (data) => {
    return {type: CHANGE_ADD_NOTE_FORM_INPUT, payload: data}
}
export const closeAddNoteForm = () => {
    return {type: CLOSE_ADD_NOTE_FORM}
}
export const changeAddNoteFormBackground = (color) => {
    return {type: CHANGE_ADD_NOTE_FORM_BACKGROUND, payload: color}
}
export const chooseAddNoteFormPicture = (files) => {
    return (dispatch) => {
        const srcList = [];
        for (let file of files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                srcList.push(reader.result);
                if (srcList.length === files.length) {
                    dispatch({type: CHOOSE_ADD_NOTE_FORM_PICTURE, payload: srcList})
                }
            }
        }
    }
}
export const addNote = (note) => {
    return {type: ADD_NOTE, payload: note}
}
export const changeNotesDisplay = (display) => {
    return {type: CHANGE_NOTES_DISPLAY, payload: display}
}

export const openAndCloseLeftPanel = () => {
    return {type: OPEN_AND_CLOSE_LEFT_PANEL}
}

export const changePage = (pageName) => {
    return {type: CHANGE_PAGE, payload: pageName}
}
export const changeActiveBtn = (ind) => {
    return {type: CHANGE_ACTIVE_BTN, payload: ind }
}
export const changeHeaderTitle = ind => {
    return {type: CHANGE_HEADER_TITLE, payload: ind}
}

export const changeNoteBackground = (id, color) => {
    return {type: CHANGE_NOTE_BACKGROUND, payload: {id, color}}
}

export const changeBackground = (type, color, id = null) => {
    const payload = id !== null ? {id, color} : {color}
    return {type, payload}
}
export const addNoteToArchive = (id) => {
    return {type: ADD_NOTE_TO_ARCHIVE, payload: id}
}
export const addNoteToTrash = (noteId) => {
    return {type: ADD_NOTE_TO_TRASH, payload: noteId}
}

export const returnFromArchive = (noteId) => {
    return {type: RETURN_FROM_ARCHIVE, payload: noteId}
}
export const deleteNote = (noteId) => {
    return {type: DELETE_NOTE, payload: noteId}
}
export const returnFromTrash = (noteId) => {
    return {type: RETURN_FROM_TRASH, payload: noteId}
}
export const chooseNote = (noteId) => {
    return {type: CHOOSE_NOTE, payload: noteId}
}
export const deselectNote = () => {
    return {type: DESELECT_NOTE}
}
export const incrementChosenNotes = (count) => {
    return {type: INCREMENT_TOP_PANEL_COUNT, payload: count}
}
export const closeTopPanel = () => {
    return {type: CLOSE_TOP_PANEL}
}

export const openModalEditForm = (note) => {
    return {type: OPEN_MODAL_EDIT_FORM, payload: note}
}
export const changeNoteBackgroundInModal = (color) => {
    return {type: CHANGE_NOTE_BACKGROUND_IN_MODAL, payload: color}
}
export const closeModalEditForm = () => {
    return {type: CLOSE_MODAL_EDIT_FORM}
}
export const editNote = (note) => {
    return {type: EDIT_NOTE, payload: note}
}
export const choosePicture = (type, files, id= null) => {
    return (dispatch) => {
        const srcList = [];
        for (let file of files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                srcList.push(reader.result);
                if (srcList.length === files.length) {
                    const payload = id !== null ? {id, srcList} : srcList;
                    dispatch({type, payload})
                }
            }
        }
    }
}

export const deleteImage = (src) => {
    return {type: DELETE_IMAGE, payload: src}
}

