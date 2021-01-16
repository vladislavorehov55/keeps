import React from 'react'
import MenuNote from "../menu-note/MenuNote";
import styles from './AddNote.css'
import {connect} from 'react-redux'
import {
    createNote,
    enterNoteContent,
    getAddNoteInitState,
    openAddNote,
} from "../../redux/actionsCreator";
import {saveNotes} from "../../../functions";

class AddNote extends React.Component{

    elAddNoteRef = React.createRef();

    componentDidMount() {
        document.addEventListener('click', this.closeAddNote)
    }
    closeAddNote = (e) => {
        if (e.target.tagName === 'circle') {}
        else if (!this.elAddNoteRef.current.contains(e.target) || e.target.className === 'MenuNote__menu-right-items___2t5It') {
            if (!this.props.addNote.title && !this.props.addNote.text && this.props.addNote.imgSrc.length === 0) {
                this.props.getAddNoteInitState();
            }
            else {
                this.props.createNote({...this.props.addNote, id: new Date().getTime()});
                saveNotes(this.props.notes)
                this.props.getAddNoteInitState();
            }
        }
    };
    focusInputHandler = () => {
        this.props.openAddNote()
    };
    changeInputHandler = (e) => {
        this.props.enterNoteContent({contentName: e.target.name, text: e.target.value, height: e.target.scrollHeight})
    };


    render() {
        return(
            <div className={styles.wrapper} ref={this.elAddNoteRef}
                 style={this.props.noteType === 'home' ? {backgroundColor: this.props.addNote.backgroundColor, display:''} :
                     {backgroundColor: this.props.addNote.backgroundColor, display: 'none'}}>
                {
                    this.props.addNote.imgSrc.length !== 0 &&
                    <div className={styles.imgWrapper}>
                        {
                            this.props.addNote.imgSrc.map((src,index) => <img alt='' className={styles.img} src={src} key={index}/> )
                        }
                    </div>
                }

                {
                    this.props.addNote.isVisibleTitleInput &&
                    <textarea style={{height: this.props.addNote.titleHeight, backgroundColor: this.props.addNote.backgroundColor}}
                              className={styles.title}
                              name='title'
                              value={this.props.addNote.title}
                              placeholder='Введите заголовок'
                              onFocus={this.focusInputHandler}
                              onChange={this.changeInputHandler}/>
                }
                <textarea style={{height:this.props.addNote.textHeight, backgroundColor:this.props.addNote.backgroundColor}}
                          className={styles.text}
                          name='text'
                          value={this.props.addNote.text}
                          placeholder='Заметка'
                          onFocus={this.focusInputHandler}
                          onChange={this.changeInputHandler}
                />
                {
                    this.props.addNote.isVisibleTitleInput &&
                    <MenuNote isVisibleMenuNote={true}
                              inAddNote={true}
                              isVisibleCloseBtn={true}
                              isVisibleDelBtn={false}
                    />
                }
            </div>
        )
    }
}
const mapStateToProps = state => (
    {notes: state.notes.notes, addNote: state.addNote, noteType: state.app.noteType}
);
const mapDispatchToProps = {createNote, openAddNote, enterNoteContent, getAddNoteInitState};
export default connect(mapStateToProps, mapDispatchToProps)(AddNote)