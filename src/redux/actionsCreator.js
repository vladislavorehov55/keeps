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
    ADD_TO_ARCHIVE, ADD_TO_ARCHIVE_IN_NOTE, UNSELECT_NOTE, ADD_PHOTO_IN_NOTE_COM,
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
export function deleteImage(noteType, notes, id, src) {
    const index = notes.findIndex((element) => {
        return element.imgSrc.includes(src)
    });
    notes[noteType][index].imgSrc =  notes[noteType][index].imgSrc.filter(el => el !== src);
    return {type: DELETE_IMAGE, payload: notes}
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
export function unselectNotes() {
    return {type: UNSELECT_NOTE}
}
export function choosePhotoInNote(noteType, id, imgSrc) {
    return {type: ADD_PHOTO_IN_NOTE_COM, payload:{noteType, id, imgSrc}}
}




