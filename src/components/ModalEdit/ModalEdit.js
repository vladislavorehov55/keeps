import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {closeModalEditForm, deleteImage, editNote} from '../../redux/actions';
import Menu from "../Menu/Menu";
import styles from './ModalEdit.module.css';
const ModalEdit = () => {
    const editedNote = useSelector(state => state.modalEditForm.editedNote);
    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedNote.title);
    const [text, setText] = useState(editedNote.content);
    const [titleHeight, setTitleHeight] = useState(editedNote.titleHeight);
    const [textHeight, setTextHeight] = useState(editedNote.textHeight);

    const titleRef = useRef();
    const textRef = useRef();

    const onChangeInput = (e) => {
        e.target.name === 'title' ? setTitle(e.target.value) : setText(e.target.value)
    }

    const onClickClose = (e) => {
        e.preventDefault();
        dispatch(editNote({...editedNote, title, text, titleHeight, textHeight}))
        dispatch(closeModalEditForm());
    }
    const onClickDelImg = (src) => {
        dispatch(deleteImage(src));
    }
    const addToArchiveModal = () => {
        dispatch(editNote({...editedNote,  title, text, page: 'archive', titleHeight, textHeight}));
        dispatch(closeModalEditForm());
    }
    const returnFromArchiveModal = () => {
        dispatch(editNote({...editedNote, title, text, page: 'notes', titleHeight, textHeight}))
        dispatch(closeModalEditForm());
    }
    const addToTrashModal = () => {
        dispatch(editNote({...editedNote, title, text, titleHeight, textHeight, page: 'trash'}))
        dispatch(closeModalEditForm())
    }

    const returnFromTrashModal = () => {
        dispatch(editNote({...editedNote, title, text, titleHeight, textHeight, page: 'notes'}))
        dispatch(closeModalEditForm())
    }

    useEffect(() => {
        setTitleHeight(titleRef.current.scrollHeight);

    }, [title])

    useEffect(() => {
        setTextHeight(textRef.current.scrollHeight);
    }, [text])

    return(
        <div className={styles.wrap}>
            <form className={`${styles.form} ${styles[editedNote.background]}`}
                  onSubmit={onClickClose}
            >
                {
                    editedNote.imagesSrc.length ?
                        editedNote.imagesSrc.map((src, ind) => {
                            return(
                                <div key={ind} className={styles.imgWrap}>
                                    <img alt="pic" src={src} className={styles.img}/>
                                    <div className={styles.imgDelWrap}
                                         onClick={onClickDelImg.bind(null, src)}
                                    >
                                        <img src='data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0iI0ZGRkZGRiI+CiA8cGF0aCBkPSJtMTIgMzhjMCAyLjIxIDEuNzkgNCA0IDRoMTZjMi4yMSAwIDQtMS43OSA0LTR2LTI0aC0yNHYyNHptMjYtMzBoLTdsLTItMmgtMTBsLTIgMmgtN3Y0aDI4di00eiIvPgogPHBhdGggZD0ibTAgMGg0OHY0OGgtNDh6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=' alt=""/>
                                    </div>
                                </div>
                            )
                        }) : ''
                }
                <textarea style={{height: titleHeight}}
                          className={`${styles.textarea} ${styles.textareaTitle}`}
                          placeholder='Введите заголовок'
                          value={title}
                          name='title'
                          onChange={onChangeInput}
                          ref={titleRef}
                />
                <textarea style={{height: textHeight}}
                          className={`${styles.textarea} ${styles.textareaText}`}
                          placeholder='Введите заметку'
                          value={text}
                          name='text'
                          onChange={onChangeInput}
                          ref={textRef}
                />
                <div className={styles.menuWrap}>
                    <Menu noteId={editedNote.id}
                          addToArchiveModal={addToArchiveModal}
                          returnFromArchiveModal={returnFromArchiveModal}
                          addToTrashModal={addToTrashModal}
                          returnFromTrashModal={returnFromTrashModal}
                    />
                    <button className={styles.btnClose}>Закрыть</button>
                </div>

            </form>
        </div>
    )
}
export default ModalEdit