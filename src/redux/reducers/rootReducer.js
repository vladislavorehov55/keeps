import {appReducer} from './appReducer';
import {leftPanelReducer} from './leftPanelReducer';
import {addNoteFormReducer} from "./addNoteFormReducer";
import {combineReducers} from "redux";
import {modalEditFormReducer} from "./modalEditFormReducer";
import {notesListReducer} from "./notesListReducer";
import {headerReducer} from "./headerReducer";
import {topPanelReducer} from "./topPanelReducer";

const rootReducer = combineReducers({
    app: appReducer,
    topPanel: topPanelReducer,
    notesList: notesListReducer,
    header: headerReducer,
    leftPanel: leftPanelReducer,
    addNoteForm: addNoteFormReducer,
    modalEditForm: modalEditFormReducer
});

export {rootReducer}