import React, {useMemo, useEffect}  from "react";
import {useSelector, useDispatch} from "react-redux";
import NotesItem from "./NotesItem/NotesItem";
import styles from './NotesList.module.css';
import {incrementChosenNotes, setNotes} from "../../redux/actions";

const NotesList = () => {
    const page = useSelector(state => state.app.page);
    const notes = useSelector(state => state.notesList.notes);
    const searchedNotes = useSelector(state => state.notesList.searchedNotes)
    const notesListForm = useSelector(state => state.notesList.notesListForm);
    const dispatch = useDispatch();

    const data = useMemo(() => {
        if (searchedNotes !== null) {
            return searchedNotes
        }
        return notes.filter(note => note.page === page)

    }, [notes, searchedNotes, page])

    const getClass = useMemo(() => {
        return notesListForm === 'list' ? styles.list : styles.grid
    }, [notesListForm]);

    const openTopPanel = () => {
        dispatch(incrementChosenNotes(notes.filter(note => note.isChosen === true).length))
    }
    useEffect(() => {
        const notesFromStorage = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : '';
        if (notesFromStorage) {
            notesFromStorage.forEach(item => item.isChosen = false);
            dispatch(setNotes(notesFromStorage));
        }
    },[])
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes])

    return (
        <ul className={`${styles.wrap} ${getClass}`}>
            {
                data.map((note, ind) => <NotesItem key={ind} note={note} openTopPanel={openTopPanel}/>)
            }
        </ul>
    )
}
export default NotesList