import {
    CREATE_NOTE,
    CHANGE_NOTE,
    CHANGE_NOTE_COLOR,
    DELETE_IMAGE,
    DELETE_NOTE,
    ADD_TO_ARCHIVE,
    ADD_TO_ARCHIVE_IN_NOTE, SELECT_NOTE, UNSELECT_NOTE, ADD_PHOTO_IN_NOTE_COM
} from "./actionsTypes";

const initialState =  localStorage.getItem('notes') !== null ?
    {

        notes: JSON.parse(localStorage.getItem('notes')),
        chosenNotes: [],
    } :
    {
        notes:{
            home: [{
                id: new Date().getTime(),
                title: 'Vlad',
                text: 'Vlad',
                titleHeight:'',
                textHeight:'',
                backgroundColor:'white',
                imgSrc: [],
                isVisibleSolidBorder: false
            }],
            archive: [],
            trash: []
        },
        chosenNotes: [],
    };
export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE:
            return {...state, notes: {...state.notes, home: [...state.notes.home, action.payload]}};

        case CHANGE_NOTE:
            const {id, propertyName, content, height } = action.payload;
            return {...state, notes: {...state.notes, [action.payload.noteType]:
            state.notes[action.payload.noteType].map(note => {
                if (note.id === id) {
                    note[propertyName] = content;
                    note[propertyName + 'Height'] = height;
                }
                return note
            })}}
        case CHANGE_NOTE_COLOR:
            return {...state, chosenNotes: [], notes: {...state.notes, [action.payload.noteType]:
                    state.notes[action.payload.noteType].map(note => {
                        if (action.payload.idList.includes(note.id)){
                            note.backgroundColor = action.payload.newColor;
                            note.isVisibleSolidBorder = false
                            }
                        return note})}};
        case DELETE_IMAGE:


            return {...state, notes: {...state.notes, [action.payload.noteType] : state.notes[action.payload.noteType].map(note => {
                        if (note.id === action.payload.id) {
                            note.imgSrc = note.imgSrc.filter((el, ind) => ind !== action.payload.index )
                        }
                        return note
                    })}}
        case ADD_TO_ARCHIVE:
            return {...state, notes:{...state.notes,archive: [...state.notes.archive, action.payload]}};

        case ADD_TO_ARCHIVE_IN_NOTE:
            return {...state,chosenNotes: [], notes: {...state.notes, archive: [...state.notes.archive,
                        ...state.notes[action.payload.noteType].filter(note => action.payload.idList.includes(note.id))],
                [action.payload.noteType]: state.notes[action.payload.noteType].filter(note => !action.payload.idList.includes(note.id))}};

        case DELETE_NOTE:
            if (action.payload.noteType === 'home' || action.payload.noteType === 'archive') {
                const newTrash = [];
                for (let note of state.notes[action.payload.noteType]) {
                    if (action.payload.idList.includes(note.id)) {
                        note.isVisibleSolidBorder = false;
                        newTrash.push(note)
                    }
                }
                return {...state, notes: {...state.notes, trash: [...state.notes.trash, ...newTrash],
                        [action.payload.noteType]: state.notes[action.payload.noteType].filter(note => !action.payload.idList.includes(note.id))}}
            }
            else
                return {...state, notes: {...state.notes, trash: state.notes.trash.filter(note => !action.payload.idList.includes(note.id))}}
        case SELECT_NOTE:
            const chosenNotes = [...state.chosenNotes];
            const q = {...state.notes}
            q[action.payload.noteType].forEach(note => {
                if (action.payload.id === note.id) {
                    note.isVisibleSolidBorder = !note.isVisibleSolidBorder;
                    chosenNotes.push(note.id)
                }
            })
            return {notes: q, chosenNotes}
        case UNSELECT_NOTE:
            return {...state, chosenNotes: []};
        case ADD_PHOTO_IN_NOTE_COM:
            return {...state, notes: {[action.payload.noteType]: state.notes.noteType.map(note => {
                if (note.id === action.payload.id) {
                    note.imgSrc = action.payload.imgSrc
                }
                return note
                    })}}
        default: return state
    }
};