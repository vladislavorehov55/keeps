import React from 'react'

import LeftMenu from "./components/left-menu/LeftMenu";
import {connect} from 'react-redux'
import Header from "./components/header/Header";

import TopPanel from "./components/top-panel/TopPanel";

import AddNote from "./components/add-note/AddNote";
import styles from "./components/pages/Pages.css";
import Note from "./components/note/Note";
import {saveNotes} from "../functions";

class App extends React.Component{

    componentWillUpdate(nextProps, nextState, nextContext) {
        saveNotes(nextProps.notes)
    }
    render(){
        const noteType = this.props.noteType;
        return (
            <>
                {
                    this.props.isVisibleLeftPanel &&
                    <LeftMenu/>
                }
                {
                    this.props.chosenNotesId.length ? <TopPanel/> : <Header/>
                }

                <main>
                    <AddNote/>
                    <div className={`${styles.wrapper} ${this.props.isFlexDirectionColumn ? styles.column : styles.row}`}>
                        {
                            this.props.isSearched ?
                                this.props.searchedNotes.map((note) => <Note note={note} key={note.id}/>) :
                                this.props.notes[noteType].map((note) => <Note note={note} key={note.id}/>)}
                    </div>
                </main>
            </>
        )
    }
}
const mapStateToProps = (state) => (
    {
        isVisibleLeftPanel: state.app.isVisibleLeftPanel,
        notes: state.notes.notes,
        chosenNotesId: state.notes.chosenNotesId,
        searchedNotes: state.notes.searchedNotes,
        noteType: state.app.noteType,
        isSearched: state.app.isSearchedNotes,
        isFlexDirectionColumn: state.app.isFlexDirectionColumn
    }
);

export default connect(mapStateToProps)(App)
