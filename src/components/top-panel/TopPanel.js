import React from 'react'
import styles from './TopPanel.css'
import MenuNote from "../menu-note/MenuNote";
import {connect} from 'react-redux'
import {unselectNotes} from "../../redux/actionsCreator";
class TopPanel extends React.Component{
    getPhrase = (countOfNotes) => {
        if (countOfNotes === 1 || (countOfNotes % 100 !== 11 && countOfNotes % 10 === 1)) {
            return `Выбрана ${countOfNotes} заметка`
        }
        else if ([5,6,7,8,9].includes(countOfNotes % 10) || (countOfNotes % 10 === 0) ||
            [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,].includes(countOfNotes % 100)){
            return `Выбрано ${countOfNotes} заметок`
        }
        else if ([2,3,4].includes(countOfNotes) || (countOfNotes > 21 && [2,3,4].includes(countOfNotes % 10))) {
            return `Выбрано ${countOfNotes} заметки`
        }
    };
    onClickUnselectNotes = () => {
        this.props.unselectNotes(this.props.noteType, this.props.chosenNotes)
    }
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.leftItems}>
                    <div className={styles.imgWrapper}
                         onClick={this.onClickUnselectNotes}
                    >
                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAcwAAAHMBY8FD/gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACISURBVDiNrZPRDYAgDERfnE4QdnFpd4Cv+tOYitWQVJImpNxdr0ABduAAqogwE0BVzo5uBOhAmSAXxYpyqSbRge2DvA3Y6ql2IDvkPGCKiPCm3oBkzpLmHi69Ks2IrBo2d3Pn9ZkGQvNcvQqoiK16ufGwC9H1awuhSww9I5GPRPQr88Mwhcb5BAVxpaYUaKiKAAAAAElFTkSuQmCC'/>
                    </div>
                    {<span>{this.getPhrase(this.props.chosenNotes.size)}</span>}
                </div>
                <MenuNote isVisibleMenuNote={true} inTopPanel={true} isVisibleDelBtn={true}/>
            </div>
        )
    }
}
const mapStateToProps = state => ({chosenNotes: new Set(state.notes.chosenNotes), noteType: state.app.noteType})
const mapDispatchToProps = {unselectNotes}
export default connect(mapStateToProps,mapDispatchToProps)(TopPanel)