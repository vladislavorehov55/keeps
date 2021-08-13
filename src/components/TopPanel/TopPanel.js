import React from "react";
import {useDispatch} from "react-redux";
import Menu from "../Menu/Menu";
import {closeTopPanel, deselectNote} from '../../redux/actions'
import styles from './TopPanel.module.css';

const TopPanel = ({count}) => {
    const dispatch = useDispatch();
    const onClickClose = () => {
        dispatch(closeTopPanel())
        dispatch(deselectNote());
    }
    return (
        <div className={styles.wrap}>
            <div className={styles.leftGroup}>
                <img onClick={onClickClose} src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwMDAwIj4KICA8cGF0aCBkPSJNMTkgNi40MUwxNy41OSA1IDEyIDEwLjU5IDYuNDEgNSA1IDYuNDEgMTAuNTkgMTIgNSAxNy41OSA2LjQxIDE5IDEyIDEzLjQxIDE3LjU5IDE5IDE5IDE3LjU5IDEzLjQxIDEyIDE5IDYuNDF6Ii8+Cjwvc3ZnPgo=' alt=""/>
                Выбрано {count}
            </div>
            <div className={styles.rightGroupWrap}>
                <Menu inAddForm={false} inTopPanel={true}/>
            </div>

        </div>
    )
}
export default TopPanel