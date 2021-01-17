import React from 'react'
import {connect} from 'react-redux'
import styles from './Header.css'
import {
    showLeftPanel,
    searchNote,
    getSearchedNotes,
    cancelSearchNote,
    changeFlexDirection
} from "../../redux/actionsCreator";

class Header extends React.Component{
    state = {
        searchText:'',
    };
    onChange = (e) => {
        this.setState({searchText: e.target.value}
        ,() => {
            this.props.searchNote(this.props.noteType,this.state.searchText);
            this.props.getSearchedNotes()}
        )};
    cancelSearch = () => {
        this.setState({searchText: ''}, () => this.props.cancelSearchNote())
    };

    openAndCloseLeftMenu = () => {
        this.props.showLeftPanel(!this.props.isVisibleLeftPanel)
    };

    render() {
        return (
            <header className={styles.header}>
                <div className={styles.item}>
                    <svg className={styles.svg} onClick={this.openAndCloseLeftMenu}>
                        <path d='M 3 18 h 18 v -2 H 3 v 2 Z m 0 -5 h 18 v -2 H 3 v 2 Z m 0 -7 v 2 h 18 V 6 H 3 Z'/>
                    </svg>
                    {this.props.noteType === 'home' && <img src='https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png'/>}
                    {this.props.noteType === 'home' && <span className={styles.pageName}>Keep</span>}
                    {this.props.noteType === 'archive' && <span className={styles.pageName}>Архив</span>}
                    {this.props.noteType === 'trash' && <span className={styles.pageName}>Корзина</span>}
                </div>
                <div className={styles.item}>
                    <div className={styles.searchWrapper}>
                        <input placeholder='Поиск' className={styles.input} value={this.state.searchText}
                               onChange={this.onChange}
                        />
                        <svg className={styles.svg} onClick={this.cancelSearch}>
                            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
                        </svg>
                    </div>

                </div>
                <div className={styles.item} title={this.props.isFlexDirectionColumn ? 'сетка' : 'список'}
                     onClick={this.props.changeFlexDirection}
                >
                    {
                        this.props.isFlexDirectionColumn ?
                            <svg className={styles.svg} >
                                <path d="M3,3 L10,3 C10.55,3 11,3.45 11,4 L11,10 C11,10.55 10.55,11 10,11 L3,11 C2.45,11 2,10.55 2,10 L2,4 C2,3.45 2.45,3 3,3 Z M3,13 L10,13 C10.55,13 11,13.45 11,14 L11,20 C11,20.55 10.55,21 10,21 L3,21 C2.45,21 2,20.55 2,20 L2,14 C2,13.45 2.45,13 3,13 Z M14,3 L21,3 C21.55,3 22,3.45 22,4 L22,10 C22,10.55 21.55,11 21,11 L14,11 C13.45,11 13,10.55 13,10 L13,4 C13,3.45 13.45,3 14,3 Z M14,13 L21,13 C21.55,13 22,13.45 22,14 L22,20 C22,20.55 21.55,21 21,21 L14,21 C13.45,21 13,20.55 13,20 L13,14 C13,13.45 13.45,13 14,13 Z M9,9 L9,5 L4,5 L4,9 L9,9 Z M9,19 L9,15 L4,15 L4,19 L9,19 Z M20,9 L20,5 L15,5 L15,9 L20,9 Z M20,19 L20,15 L15,15 L15,19 L20,19 Z" id="path-1"/>
                            </svg>
                            : <svg className={styles.svg} >
                                <path d="M20,9 L4,9 L4,5 L20,5 L20,9 Z M20,19 L4,19 L4,15 L20,15 L20,19 Z M3,3 C2.45,3 2,3.45 2,4 L2,10 C2,10.55 2.45,11 3,11 L21,11 C21.55,11 22,10.55 22,10 L22,4 C22,3.45 21.55,3 21,3 L3,3 Z M3,13 C2.45,13 2,13.45 2,14 L2,20 C2,20.55 2.45,21 3,21 L21,21 C21.55,21 22,20.55 22,20 L22,14 C22,13.45 21.55,13 21,13 L3,13 Z" id="icon" fill="#000000" fill-rule="nonzero"/>
                            </svg>
                    }
                </div>
            </header>
        );
    }
}
const mapStateToProps = state => ({
    isVisibleLeftPanel: state.app.isVisibleLeftPanel,
    isFlexDirectionColumn: state.app.isFlexDirectionColumn,
    noteType: state.app.noteType})
const mapDispatchToProps = ({showLeftPanel, searchNote, getSearchedNotes, cancelSearchNote,changeFlexDirection});
export default connect(mapStateToProps, mapDispatchToProps)(Header)