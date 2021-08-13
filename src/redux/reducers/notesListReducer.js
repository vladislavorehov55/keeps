import {
    ADD_NOTE,
    ADD_NOTE_TO_ARCHIVE,
    ADD_NOTE_TO_TRASH,
    CANCEL_SEARCH_NOTE,
    CHANGE_NOTE_BACKGROUND,
    CHANGE_NOTES_DISPLAY,
    CHOOSE_NOTE,
    CHOOSE_NOTE_PICTURE,
    DELETE_NOTE, DESELECT_NOTE, EDIT_NOTE,
    RETURN_FROM_ARCHIVE,
    RETURN_FROM_TRASH,
    SEARCH_NOTES, SET_NOTES
} from "../types";


const defaultState = {
    notesListForm: 'list',
    notes: [
        {
            id:0, title: 'заголовок1', content: 'содержимое', page: 'notes',
            background: 'white', imagesSrc: [], isChosen: false, titleHeight: '', textHeight: ''
        },
        {
            id:1, title: 'заголовок2', content: 'содержимое', page: 'notes',
            background: 'white', imagesSrc: [], isChosen: false, titleHeight: '', textHeight: ''
        }
    ],
    searchedNotes: null,
    editedNote: null
}

export const notesListReducer = (state = defaultState, action) => {
    if (action.type === SET_NOTES) {
        return {...state, notes: action.payload}
    }
    else if (action.type === SEARCH_NOTES) {
        const regex = new RegExp(action.payload.text.toLowerCase());
        const searchedNotes = [];
        state.notes.forEach(note =>{
            if (note.page === action.payload.page && (note.title.toLowerCase().match(regex) || note.content.toLowerCase().match(regex))) {
                searchedNotes.push(note);
            }
        })
        return {...state, searchedNotes};
    }
    else if (action.type === CANCEL_SEARCH_NOTE) {
        return {...state, searchedNotes: null};
    }
    else if (action.type === CHANGE_NOTES_DISPLAY) {
        return {...state, notesListForm: action.payload};

    }
    else if (action.type === ADD_NOTE) {
        if (!action.payload.title && !action.payload.text && !action.payload.images.length) {
            return {...state}
        }
        return {...state, notes: [
                {id: new Date().getTime(), title: action.payload.title ? action.payload.title : ' ',
                    content: action.payload.text ? action.payload.text : ' ',
                    background: action.payload.color, page: 'notes', imagesSrc: action.payload.images,
                    titleHeight: action.payload.titleHeight, textHeight: action.payload.textHeight},
                ...state.notes]};
    }
    else if (action.type === CHANGE_NOTE_BACKGROUND) {
        const newNotes = state.notes.slice();
        if (state.notes.filter(note => note.isChosen === true).length) {
            newNotes.forEach(note => {
                if (note.isChosen) {
                    note.background = action.payload.color;
                    note.isChosen = false;
                }
            })
        }
        else {
            newNotes.forEach(note => {
                if (note.id === action.payload.id) {
                    note.background = action.payload.color;
                }
            });
        }
        return {...state, notes: newNotes};
    }
    else if (action.type === ADD_NOTE_TO_ARCHIVE) {
        const newNotes = state.notes.slice();
        if (state.notes.filter(note => note.isChosen === true).length) {
            newNotes.forEach(note => {
                if (note.isChosen) {
                    note.page = 'archive';
                    note.isChosen = false;
                }
            })
        }
        else {
            newNotes.forEach(note => {
                if (note.id === action.payload) {
                    note.page = 'archive'
                }
            })
        }
        return {...state, notes: newNotes}
    }
    else if (action.type === ADD_NOTE_TO_TRASH) {
        const newNotes = state.notes.slice();
        if (state.notes.filter(note => note.isChosen === true).length) {
            newNotes.forEach(note => {
                if (note.isChosen) {
                    note.page = 'trash';
                    note.isChosen = false;
                }
            })
        }
        else {
            newNotes.forEach(note => {
                if (note.id === action.payload) {
                    note.page = 'trash';
                }
            })
        }
        return {...state, notes: newNotes}
    }
    else if (action.type === RETURN_FROM_ARCHIVE) {
        const newNotes = state.notes.slice();
        if (state.notes.filter(note => note.isChosen === true).length) {
            newNotes.forEach(note => {
                if (note.isChosen && note.page === 'archive') {
                    note.page = 'notes';
                    note.isChosen = false;
                }
            })
        }
        else {
            newNotes.forEach(note => {
                if (note.id === action.payload) {
                    note.page = 'notes'
                }
            })
        }
        return {...state, notes: newNotes}
    }
    else if (action.type === DELETE_NOTE) {
        if (state.notes.filter(note => note.isChosen === true).length) {
            return {...state, notes: state.notes.filter(note => note.isChosen === false)}
        }
        else {
            return {...state, notes: state.notes.filter(note => note.id !== action.payload)}
        }
    }
    else if (action.type === RETURN_FROM_TRASH) {
        const newNotes = state.notes.slice();
        if (state.notes.filter(note => note.isChosen === true).length) {
            newNotes.forEach(note => {
                if (note.isChosen) {
                    note.page = 'notes';
                    note.isChosen = false;
                }
            })
        }
        else {
            newNotes.forEach(note => {
                if (note.id === action.payload) {
                    note.page = 'notes';
                }
            })
        }
        return {...state, notes: newNotes}
    }
    else if (action.type === CHOOSE_NOTE) {
        const newNotes = state.notes.slice();
        newNotes.forEach(note => {
            if (note.id === action.payload) {
                note.isChosen = !note.isChosen;
            }
        });
        return {...state, notes: newNotes}
    }
    else if (action.type === CHOOSE_NOTE_PICTURE) {
        const newNotes = state.notes.slice();
        for (let note of newNotes) {
            if (note.id === action.payload.id) {
                note.imagesSrc = action.payload.srcList;
                break;
            }
        }
        return {...state, notes: newNotes}
    }
    else if (action.type === DESELECT_NOTE) {
        const newNotes = state.notes.slice();
        newNotes.forEach(note => note.isChosen = false);
        return {...state, notes: newNotes}
    }
    else if (action.type === EDIT_NOTE) {
        const newNotes = state.notes.slice();
        for (let note of newNotes) {
            if (note.id === action.payload.id) {
                note.imagesSrc = action.payload.imagesSrc;
                note.title = action.payload.title;
                note.content = action.payload.content;
                note.background = action.payload.background;
                note.page = action.payload.page;
                note.isChosen = action.payload.isChosen;
                note.titleHeight = action.payload.titleHeight;
                note.textHeight = action.payload.textHeight;
                break;
            }
        }
        return {...state, notes: newNotes}
    }
    return state
}