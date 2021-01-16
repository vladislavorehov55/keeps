import {
    CREATE_NOTE,
    CHANGE_NOTE,
    CHANGE_NOTE_COLOR,
    SELECT_NOTE,
    DELETE_IMAGE,
    DELETE_NOTE,
    ENTER_NOTE_CONTENT,
    SHOW_LEFT_PANEL,
    OPEN_ADD_NOTE,
    CHANGE_ADD_NOTE_COLOR,
    GET_ADD_NOTE_INIT_STATE,
    CHOOSE_ADD_NOTE_PHOTO,
    ADD_TO_ARCHIVE,
    ADD_TO_ARCHIVE_IN_NOTE,
    UNSELECT_NOTE,
    ADD_PHOTO_IN_NOTE_COMPONENT,
    DELETE_NOTE_FOREVER,
    SEARCH_NOTE,
    GET_SEARCHED_NOTES,
    CANCEL_SEARCH_NOTE,
    CHANGE_FLEX_DIRECTION,
    CHANGE_PAGE,
    RETURN_FROM_ARCHIVE, RETURN_FROM_TRASH,
} from "./actionsTypes";

export function showLeftPanel(flag) {
    return {type: SHOW_LEFT_PANEL, payload: flag}
}

export function openAddNote() {
    return {type: OPEN_ADD_NOTE}
}
export function enterNoteContent(content) {
    return {type: ENTER_NOTE_CONTENT, payload: content}
}
export function changeAddNoteColor(colorName) {
    return {type: CHANGE_ADD_NOTE_COLOR, payload: colorName}
}
export function getAddNoteInitState() {
    return {type: GET_ADD_NOTE_INIT_STATE}
}
export function chooseAddNotePhoto(files) {
    return dispatch => {
        const promises = [];
        for (let file of files) {
            promises.push(new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result)}))
        }
        Promise.all(promises)
            .then(srcList => dispatch({type: CHOOSE_ADD_NOTE_PHOTO, payload: srcList}))
    }
}
export function addPhotoInNote(noteType, id, files) {
    return dispatch => {
        const promises = [];
        for (let file of files) {
            promises.push(new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result)}))
        }
        Promise.all(promises)
            .then(srcList => dispatch({type: ADD_PHOTO_IN_NOTE_COMPONENT, payload: {noteType, id, srcList}}))
    }
}
export function addNoteToArchive(note) {
    return {type: ADD_TO_ARCHIVE, payload: note}
}

export function createNote(newNote) {
    return {type: CREATE_NOTE, payload: newNote}
}
export function addNoteToArchiveInNote(noteType, idList) {
    return {type: ADD_TO_ARCHIVE_IN_NOTE, payload: {noteType, idList}}
}


export function changeNote(noteType, id, propertyName, content, height) {
    return {type: CHANGE_NOTE, payload: {noteType, id, propertyName, content, height}}
}
export function deleteImage(noteType, id, index) {

    return {type: DELETE_IMAGE, payload: {noteType, id, index}}
}
export function changeNoteColor(noteType, idList, newColor) {
    return {type: CHANGE_NOTE_COLOR, payload: {noteType, idList, newColor}}
}
export function deleteNote(noteType, idList) {
    return {type: DELETE_NOTE, payload:  {noteType, idList} }
}
export function selectNotes(noteType, id) {
    return {type: SELECT_NOTE, payload:{noteType, id}}
}
export function unselectNotes(noteType, idList) {
    return {type: UNSELECT_NOTE, payload: {noteType, idList}}
}

export function deleteNoteForever(noteType, idList) {
    return {type: DELETE_NOTE_FOREVER, payload: {noteType,idList}}
}

export function searchNote(noteType, text) {
    return {type: SEARCH_NOTE, payload: {noteType, text}}
}
export function getSearchedNotes() {
    return {type: GET_SEARCHED_NOTES}
}
export function cancelSearchNote() {
    return {type: CANCEL_SEARCH_NOTE}
}
export function changeFlexDirection() {
    return {type: CHANGE_FLEX_DIRECTION}
}

export function changePage(pageName) {
    return {type: CHANGE_PAGE, payload: pageName}
}

export function returnFromArchive(idList) {
    return {type: RETURN_FROM_ARCHIVE, payload: idList}
}
export function returnFromTrash(idList) {
    return {type: RETURN_FROM_TRASH, payload: idList}
}



