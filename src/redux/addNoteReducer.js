import {
    ADD_TO_ARCHIVE,
    CHANGE_ADD_NOTE_COLOR,
    CHOOSE_ADD_NOTE_PHOTO,
    ENTER_NOTE_CONTENT,
    GET_ADD_NOTE_INIT_STATE,
    OPEN_ADD_NOTE
} from "./actionsTypes";

const initialState = {
    title:'',
    text: '',
    titleHeight: '',
    textHeight: '',
    isVisibleTitleInput: false,
    backgroundColor: 'white',
    imgSrc: [],
};
export const addNoteReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_ADD_NOTE:
            return {...state, isVisibleTitleInput: true};
        case ENTER_NOTE_CONTENT:
            return {...state, [action.payload.contentName]: action.payload.text,
                [action.payload.contentName + 'Height'] : action.payload.height};
        case CHANGE_ADD_NOTE_COLOR:
            return {...state, backgroundColor: action.payload};
        case GET_ADD_NOTE_INIT_STATE:
            return { title:'', text: '', titleHeight: '', textHeight: '', isVisibleTitleInput: false, backgroundColor: 'white',
                imgSrc: [],};
        case CHOOSE_ADD_NOTE_PHOTO:
            return {...state, imgSrc: action.payload};
        default: return state
    }
}