import {combineReducers} from "redux";
import {appReducer} from "./appReducer";
import {notesReducer} from "./notesReducer";
import {menuNoteReducer} from "./menuNoteReducer";
import {addNoteReducer} from "./addNoteReducer";


export const rootReducer = combineReducers({
    app: appReducer,
    addNote: addNoteReducer,
    notes: notesReducer});