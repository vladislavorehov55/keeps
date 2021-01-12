import React from 'react'

import LeftMenu from "./components/left-menu/LeftMenu";
import {connect} from 'react-redux'
import Header from "./components/header/Header";

import TopPanel from "./components/top-panel/TopPanel";

import AddNote from "./components/add-note/AddNote";
import styles from "./components/pages/Pages.css";
import Note from "./components/note/Note";

class App extends React.Component{
    state = {
        // chosenNotesId: [],
        flexDirection: 'column',
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        localStorage.setItem('notes', JSON.stringify(nextProps.notes))
    }
    render(){
        console.log('props', this.props)
        const noteType = this.props.noteType;
        return (
            <>
                {
                    this.props.isVisibleLeftPanel &&
                    <LeftMenu/>
                }
                {
                    <Header/>
                }

                <main>
                    <AddNote/>
                    <div className={`${styles.wrapper} ${this.state.flexDirection==='column' ? styles.column : styles.row}`}>
                        {this.props.notes[noteType].map((note) => <Note note={note} key={note.id}/>)}
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
        noteType: state.app.noteType
    }
);

export default connect(mapStateToProps)(App)
