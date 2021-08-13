import React, {useState, useRef, useEffect, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    addNote,
    changeAddNoteFormBackground, changeBackground,
    choosePicture,
    closeAddNoteForm,
    openAddNoteForm
} from "../../redux/actions";

import styles from './AddNoteForm.module.css';
import Menu from "../Menu/Menu";
import {CHANGE_ADD_NOTE_FORM_BACKGROUND, CHOOSE_ADD_NOTE_FORM_PICTURE} from "../../redux/types";


const AddNoteForm = () => {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [titleHeight, setTitleHeight] = useState('');
    const [textHeight, setTextHeight] = useState('');


    const isOpen = useSelector(state => state.addNoteForm.isOpen);
    const backgroundColor = useSelector(state => state.addNoteForm.backgroundColor);
    const imgsSrc = useSelector(state => state.addNoteForm.imgsSrc);


    const formRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const colorRef = useRef('white');

    const dispatch = useDispatch();

    const onClickForm = () => {
        dispatch(openAddNoteForm());
    }
    const closeForm = (title, text, color, images, titleHeight, textHeight, e) => {
        if (e) e.stopPropagation();
        dispatch(addNote({title, text, color, images, titleHeight, textHeight}));
        dispatch(closeAddNoteForm());
        setTitle('');
        setText('');
        setTextHeight('');
        setTitleHeight('');
    }
    useEffect(() => {
        const clickOutside = (e) => {
            if (titleRef.current && e.target !== formRef.current && !formRef.current.contains(e.target)) {
                if (formRef.current[2].files.length) {
                    const srcList = [];
                    const files = formRef.current[2].files;
                    for (let file of files) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            srcList.push(reader.result);
                            if (srcList.length === files.length) {
                                closeForm(titleRef.current.value, textRef.current.value, colorRef.current, srcList, titleRef.current.scrollHeight, textRef.current.scrollHeight);
                            }
                        }
                    }
                }
                else {
                    closeForm(titleRef.current.value, textRef.current.value, colorRef.current, [], titleRef.current.scrollHeight, textRef.current.scrollHeight);
                }
            }
        }
        document.addEventListener('click', clickOutside);
        return () => {
            document.removeEventListener('click', clickOutside)
        }
    }, []);

    const changeAddFormBackground = (colorName) => {
        colorRef.current = colorName;
        dispatch(changeBackground(CHANGE_ADD_NOTE_FORM_BACKGROUND, colorName))
    }
    const onChangeTextareaHandler = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
            setTitleHeight(e.target.scrollHeight);
        }
        else {
            setText(e.target.value);
            setTextHeight(e.target.scrollHeight);
        }
    }
    const backgroundColorClass = useMemo(() => {
        return styles[backgroundColor]
    }, [backgroundColor]);

    return(

            <form className={`${styles.form} ${backgroundColorClass}`} ref={formRef} onClick={onClickForm}>
                {
                    imgsSrc.length ? imgsSrc.map((image, ind) => <img src={image} key={ind}/>) : ''
                }
                {
                    isOpen &&
                    <textarea style={{height: titleHeight}}
                              placeholder='Заголовок'
                              className={styles.textarea}
                              name='title'
                              value={title}
                              ref={titleRef}
                              onChange={onChangeTextareaHandler}
                    />
                }

                <textarea style={{height: textHeight}}
                          placeholder='Заметка'
                          className={styles.textarea}
                          value={text}
                          name='text'
                          ref={textRef}
                          onChange={onChangeTextareaHandler}
                />
                {
                    isOpen &&
                        <div className={styles.menuWrap}>
                            <Menu inAddForm={true}
                                  changeAddFormBackground={changeAddFormBackground}
                            />
                            <button className={styles.btn}
                                    onClick={closeForm.bind(null, title, text, colorRef.current, imgsSrc, titleHeight, textHeight)}
                            >
                                Закрыть
                            </button>
                        </div>
                }
            </form>

    )
}
export default AddNoteForm