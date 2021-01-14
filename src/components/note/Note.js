import React from 'react'
import MenuNote from "../menu-note/MenuNote";
import {connect} from 'react-redux'
import styles from './Note.css'
import {changeNote, deleteImage, deleteNoteForever, selectNotes} from "../../redux/actionsCreator";
import {saveNotes} from "../../../functions";

class Note extends React.Component{
    state = {
        title: this.props.note.title,
        text: this.props.note.text,
        isVisibleMenuNote: false,
    };
    titleRef = React.createRef();
    textRef = React.createRef();

    onChangeNote = (id,e) => {
        this.setState({...this.state, [e.target.name]: e.target.value}
        , () => {this.props.changeNote(this.props.noteType, id, e.target.name, e.target.value,
                e.target.scrollHeight);saveNotes(this.props.notes)})
    };
    onClickSelectNote = () => {
        this.props.selectNotes(this.props.noteType, this.props.note.id)
    };
    onClickDeleteImage = (index) => {
        if (!this.state.text && !this.state.title && this.props.note.imgSrc.length === 1) {
            return this.props.deleteNoteForever(this.props.noteType, [this.props.note.id])
        }
        this.props.deleteImage(this.props.noteType, this.props.note.id, index);
    };
    render() {
        const {titleHeight, textHeight, backgroundColor,imgSrc, id} = this.props.note;
        return (
            <div className={styles.note}
                 style={{backgroundColor: backgroundColor, border: this.props.note.isVisibleSolidBorder ? '3px solid black' : ''}}
                 onMouseEnter={() => this.setState({...this.state, isVisibleMenuNote: true})}
                 onMouseLeave={() => this.setState({...this.state, isVisibleMenuNote: false})}
            >
                <img className={styles.imgChooseBtn} alt=""
                     onClick={this.onClickSelectNote}
                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGNSURBVEiJvdY9btRAFAfw32x2OcN2OUJWoIhjpKGjAqVKwQ0iwZ6ABiFCFFEgJIp00V6AChAfV0gToU1F6yAeBc/ISmzHbFgsjUYe/z9m3nsz4xIRup5SyhR3cRt3sofP+JT9+4j41ikSEVcaxthHhcASC8yzLXIsErOPcatWi/gWviTxMTbbiIndTEyVnK1eA+wl+CtmXcItRrPkVNhrNciZV3iGyVDxBn+S3Kq5khIRSiljfETBdkRcdCat5ymlTPAhX7cj4kftXif0SgxXWMmsTnxdodM6oTcVb5jUiZ/CTpZbZ7X0CBU8xcuW6grsjPzePOcRcfqX8S54jkd41/yWWuep7QSLFWb+Aj/xsAOzSG1nmLcA3uAVNlrED/rEEzfH2agnCse4j9ellI1GWA6wi92IOBoSzs4Q4R4u8Ba3cHjdzNtC9ATLHmBtcjpUPHnL1L6+TNPkOx4MFP9TpgzcaBittNFyYG1Hxf857NJ5Lcf1ZdD6LpxLK1nPldkg/rNLv6RgV9Ju/NvyC4tcxF1tinBhAAAAAElFTkSuQmCC"/>
                    {
                        imgSrc.map((src, index) =>
                            <div className={styles.imgWrapper} key={index}>
                                <img src={src} className={styles.img} />
                                <img width="24" height="24" className={styles.imgDeleteBtn} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAI1QTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////6jkV6gAAAC10Uk5TAAF59XQY1qpnahce4msfHTnmfBrM4+H87lloqWlXDjNTmw12LmInKNur2ltWxViJgAAAAAFiS0dELlTTEIcAAAAJcEhZcwABOvYAATr2ATqxVzoAAAC/SURBVDjL7ZLZDoIwEEWLKFDoAC2rgOyLqPz/71nZTCyJL7yYeJJpbqcnaZMOQgvSQR5m5KOERE6KquERTVX0DcEgsEQgxruvm8aIZVPmTNFh1LamaOrI9QghPi8ahGQmDOjc9Fx0BojikGGAhNcETnixMI4ALuKdG2/aS0hZxuMl50vG0g3BIJjHouALnvaCAIsAf+H3hS/fXVY1j/lrYOqq3HsmG9qKQkubNXfXPsEfJP2tWwXp7g8C/mM8ewJj6R7xrBAbDwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wMy0wMlQxMDowMDo1OCswMDowMM5qZE0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDMtMDJUMTA6MDA6NTgrMDA6MDC/N9zxAAAARnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjcuOC05IDIwMTktMDItMDEgUTE2IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3JnQXviyAAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpoZWlnaHQANTEywNBQUQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA1MTIcfAPcAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE1ODMxNDMyNTiFzjAcAAAAE3RFWHRUaHVtYjo6U2l6ZQA1LjMxS0JCfzK5FwAAAF10RVh0VGh1bWI6OlVSSQBmaWxlOi8vLi91cGxvYWRzLzU2L053SWhBNDkvMjE2MS9pbnRlcmZhY2VfZGVsZXRlX3RyYXNoX2Jpbl9yZW1vdmVfaWNvbl8xMzMwMDQucG5niTpOPgAAAABJRU5ErkJggg=="
                                     onClick={this.onClickDeleteImage.bind(this, index)}
                                />
                            </div>
                        )
                    }
                <textarea className={styles.textarea}
                          ref={this.titleRef}
                          value={this.state.title}  style={{height: titleHeight, backgroundColor: backgroundColor}}
                          placeholder='Заголок'
                          name='title'
                          onChange={this.onChangeNote.bind(this, id)}
                />
                <textarea className={styles.textarea}
                          ref={this.textRef}
                          value={this.state.text}  style={{height: textHeight, backgroundColor: backgroundColor}}
                          placeholder='Заметка'
                          name='text'
                          onChange={this.onChangeNote.bind(this, id)}
                />
                {
                    this.state.isVisibleMenuNote &&
                    <MenuNote isVisibleCloseBtn={false}
                              inAddNote={false}
                              id={id}
                              isVisibleDelBtn={true}
                              isVisibleMenuNote={this.state.isVisibleMenuNote}
                    />
                }
            </div>
        );
    }
}
const mapDispatchToProps = {changeNote, selectNotes, deleteImage, deleteNoteForever};
const mapStateToProps = state => (
    {notes: state.notes.notes, noteType: state.app.noteType}
);
export default connect(mapStateToProps, mapDispatchToProps)(Note)