import React, {useMemo} from "react";
import Menu from '../../Menu/Menu';

import {useSelector, useDispatch} from "react-redux";
import {chooseNote, openModalEditForm} from '../../../redux/actions';
import styles from './NotesItem.module.css';

const NotesItem = ({note, openTopPanel}) => {
    const {notesListForm} = useSelector(state => state.notesList);
    const dispatch = useDispatch();

    const getOrientation = useMemo(() => {
        return notesListForm === 'list' ? styles.list : styles.grid
    },[notesListForm])

    const getBackground = useMemo(() => {
        return styles[note.background]
    },[note.background])

    const getBorderClass = useMemo(() => {
        return note.isChosen ? styles.thickBorder : ''
    },[note.isChosen])

    const onClickChooseNote = (e) => {
        e.stopPropagation();
        dispatch(chooseNote(note.id));
        openTopPanel()
    }
    const onClickNote = () => {
        dispatch(openModalEditForm(note))
    }
    return (
        <li className={`${styles.wrap} ${getOrientation} ${getBackground} ${getBorderClass}`}
            onClick={onClickNote}
        >
            <img alt="choose" className={styles.iconChoose} title='Выбрать заметку' onClick={onClickChooseNote} src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMTIsMiBDMTcuNTIsMiAyMiw2LjQ4IDIyLDEyIEMyMiwxNy41MiAxNy41MiwyMiAxMiwyMiBDNi40OCwyMiAyLDE3LjUyIDIsMTIgQzIsNi40OCA2LjQ4LDIgMTIsMiBaIE0xMCwxNC4yIEw3LjQsMTEuNiBMNiwxMyBMMTAsMTcgTDE4LDkgTDE2LjYsNy42IEwxMCwxNC4yIFoiIGlkPSJwYXRoLTEiPjwvcGF0aD4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJjaGVja19jaXJjbGVfMjRweCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBvbHlnb24gaWQ9ImJvdW5kcyIgcG9pbnRzPSIwIDAgMjQgMCAyNCAyNCAwIDI0Ij48L3BvbHlnb24+CiAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgZmlsbD0id2hpdGUiPgogICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgIDwvbWFzaz4KICAgICAgICA8dXNlIGlkPSJNYXNrIiBmaWxsPSIjMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgPC9nPgo8L3N2Zz4K'/>
            {
                note.imagesSrc.length ?
                    note.imagesSrc.map((src, ind) => <img alt="pic" key={ind} src={src} className={styles.image}/>)
                    : ''
            }
            <textarea style={{height: note.titleHeight}}
                      className={styles.textarea}
                      readOnly={true}
                      value={note.title}/>

            <textarea style={{height: note.textHeight}}
                      className={styles.textarea}
                      readOnly={true}
                      value={note.content}
            />

            <div className={styles.menuWrap}>
                <Menu noteId={note.id}/>
            </div>
        </li>
    )
}
export  default NotesItem