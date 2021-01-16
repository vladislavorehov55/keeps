import React from 'react'
import styles from './MenuNote.css'
import {connect} from 'react-redux'
import {
    changeAddNoteColor,
    changeNoteColor,
    chooseAddNotePhoto,
    deleteNote,
    getAddNoteInitState,
    addNoteToArchiveInNote,
    addNoteToArchive,
    unselectNotes,
    addPhotoInNote,
    returnFromArchive,
    returnFromTrash
} from "../../redux/actionsCreator";


class MenuNote extends React.Component{
    state = {
        menuType: '',
        menuColor: {
            isVisible: false,
        },
        menuMore: {
            isVisible: false,
        }
    };
    closeAndOpenSubMenu = (menuType) => {
        if (menuType === 'menuColor') {
            this.setState({...this.state, menuColor: {isVisible: !this.state.menuColor.isVisible},
                menuMore:{isVisible: false}})
        }
        else {
            this.setState({...this.state, menuMore: {isVisible: !this.state.menuMore.isVisible},
                menuColor:{isVisible: false}})
        }
    };


    onClickChangeColor = (e) => {
        e.stopPropagation();
        if (this.props.inAddNote) {
            this.props.changeAddNoteColor(e.target.dataset.color);
            this.setState((prevState) => {return {...prevState, menuColor:{isVisible: false}, menuMore: {isVisible: false}}})
        }
        else {
            this.props.changeNoteColor(this.props.noteType,
                this.props.chosenNotesId.length !== 0 ? Array.from(this.props.chosenNotesId) : [this.props.id],
                e.target.dataset.color);

            this.setState((prevState) => ({...prevState, menuColor: {isVisible: false}}))
        }
    };

    onChangePhoto = (e) => {
        if (this.props.inAddNote) {
            this.props.chooseAddNotePhoto(e.target.files)
        }
        else {
            this.props.addPhotoInNote(this.props.noteType, this.props.id, e.target.files )
        }
    };
    onClickAddToArchive = (idList,e) => {
        e.stopPropagation();
        if (this.props.inAddNote) {
            if (!this.props.addNote.title && !this.props.addNote.text && this.props.addNote.imgSrc.length === 0) {
                return
            }
            this.props.addNoteToArchive(this.props.addNote);
        }
        else {
            this.props.addNoteToArchiveInNote(this.props.noteType,
                this.props.chosenNotesId.length !== 0 ? Array.from(this.props.chosenNotesId) : [this.props.id]);
            // saveNotes(this.props.notes)
        }
    };
    onClickDeleteNote = () => {
        this.props.deleteNote(this.props.noteType,
            this.props.chosenNotesId.length !== 0 ? Array.from(this.props.chosenNotesId) : [this.props.id])

    };
    render() {
        return(
            <div className={styles.menu}>
                <div className={styles.menuLeftItems}>
                    {
                        this.props.noteType !== 'trash' &&
                            <>
                                <div title='Сохранить напоминание'>
                                    <svg className={styles.svg}>
                                        <path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"/>
                                        <path d="M18 17v-6c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/>
                                    </svg>
                                </div>
                                <div title='Соавторы'>
                                    <svg className={styles.svg}>
                                        <path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z"/>
                                    </svg>
                                </div>
                            </>
                    }
                    {
                        this.props.noteType !== 'trash' &&
                        <div title='Изменить цвет' id='menu-color' className={styles.btnChangeColor}
                             onClick={this.closeAndOpenSubMenu.bind(this, 'menuColor')}>
                            <svg className={styles.svg}>
                                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z"/>
                                <circle cx="6.5" cy="11.5" r="1.5"/>
                                <circle cx="9.5" cy="7.5" r="1.5"/>
                                <circle cx="14.5" cy="7.5" r="1.5"/>
                                <circle cx="17.5" cy="11.5" r="1.5"/>
                            </svg>
                            {
                                this.state.menuColor.isVisible &&
                                <div className={styles.menuChangeColor}
                                     onClick={this.onClickChangeColor}
                                >
                                    <svg className={styles.menuChangeColorSvg}>
                                        <circle cx="15" cy="15" r="12" fill="white" stroke='black' data-color='white'/>
                                        <circle cx="15" cy="40" r="12" fill="grey" id='grey' data-color='grey'/>
                                        <circle cx="15" cy="65" r="12" fill="blue" data-color='blue'/>

                                        <circle cx="40" cy="15" r="12" fill="red" data-color='red'/>
                                        <circle cx="40" cy="40" r="12" fill="green" data-color='green'/>
                                        <circle cx="40" cy="65" r="12" fill="yellow" data-color='yellow'/>

                                        <circle cx="65" cy="15" r="12" fill="pink" data-color='pink'/>
                                        <circle cx="65" cy="40" r="12" fill="orange" data-color='orange'/>
                                        <circle cx="65" cy="65" r="12" fill='brown' data-color='brown'/>
                                    </svg>
                                </div>
                            }
                        </div>
                    }

                    {
                        !this.props.inTopPanel && this.props.noteType !== 'trash' &&
                        <label title='Добавить картинку'>
                            <svg className={styles.svg}>
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"/>
                            </svg>
                            <input type='file' id='photo' multiple hidden
                                   onChange={this.onChangePhoto}
                            />
                        </label>
                    }
                    {
                        this.props.noteType === 'home' &&
                        <div title='Архивировать'
                             onClick={this.onClickAddToArchive.bind(this, this.props.chosenNotesId ?
                                 this.props.chosenNotesId: [this.props.id])}
                        >
                            <svg className={styles.svg}>
                                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"/>
                            </svg>
                        </div>
                    }
                    {
                        this.props.noteType === 'archive' &&
                            <div title='Разархивировать'
                                 onClick={this.props.returnFromArchive.bind(this, this.props.chosenNotesId.length ?
                                this.props.chosenNotesId :[this.props.id])}
                            >
                                <svg className={styles.svg}>
                                    <path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm3-5.5l4-4 4 4-1.41 1.41L13 13.33V17h-2v-3.67l-1.59 1.59L8 13.5z'/>
                                </svg>
                            </div>
                    }

                    {
                        this.props.noteType !== 'trash' &&
                        <div title='Еще' id='menu-more' className={styles.btnMore}
                             onClick={this.closeAndOpenSubMenu.bind(this, 'menuMore')}>
                        <svg className={styles.svg}>
                            <path d="m9 5.5c1 0 1.8-0.8 1.8-1.8s-0.8-1.7-1.8-1.7-1.8 0.8-1.8 1.8 0.8 1.7 1.8 1.7zm0 1.7c-1 0-1.8 0.8-1.8 1.8s0.8 1.8 1.8 1.8 1.8-0.8 1.8-1.8-0.8-1.8-1.8-1.8zm0 5.3c-1 0-1.8 0.8-1.8 1.8s0.8 1.7 1.8 1.7 1.8-0.8 1.8-1.8-0.8-1.7-1.8-1.7z"/>
                        </svg>
                        {
                            this.state.menuMore.isVisible &&
                            <div className={styles.menuMore}
                                 style={this.props.inTopPanel ? {left:'-180px'} : {}}
                            >
                                {this.props.isVisibleDelBtn &&
                                <div className={styles.menuMoreItem}
                                     onClick={this.onClickDeleteNote}

                                >Удалить заметку</div>
                                }
                                <div className={styles.menuMoreItem}>Добавить рисунок</div>
                            </div>
                        }
                        </div>
                    }

                    {
                        this.props.noteType === 'trash' &&
                        <div className={styles.svgDelWrapper}>
                            <svg className={styles.svg} onClick={this.props.deleteNote.bind(this, this.props.noteType,
                                this.props.chosenNotesId.length !== 0 ? this.props.chosenNotesId : [this.props.id])}>
                                <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z'/>
                            </svg>
                            <svg className={styles.svg}
                                 onClick={this.props.returnFromTrash.bind(null, this.props.chosenNotesId.length ?
                                     this.props.chosenNotesId : [this.props.id])}
                            >
                                <path d='M19 4h-3.5l-1-1h-5l-1 1H5v2h14zM6 7v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm8 7v4h-4v-4H8l4-4 4 4h-2z'/>
                            </svg>
                        </div>
                    }
                </div>
                {
                    this.props.isVisibleCloseBtn &&
                    <div className={styles.menuRightItems}>Закрыть</div>
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({notes: state.notes.notes, noteType: state.app.noteType, addNote: state.addNote,
chosenNotesId: state.notes.chosenNotesId});

const mapDispatchToProps = ({changeAddNoteColor, changeNoteColor, deleteNote, chooseAddNotePhoto, addNoteToArchive,
    addNoteToArchiveInNote, unselectNotes, addPhotoInNote, returnFromArchive, returnFromTrash,
    getAddNoteInitState});
export default connect(mapStateToProps, mapDispatchToProps)(MenuNote)