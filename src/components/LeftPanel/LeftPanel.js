import React, {useMemo, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeActiveBtn, changeHeaderTitle, changePage} from '../../redux/actions';

import {leftPanelContent} from '../../data'
import styles from './LeftPanel.module.css';

const LeftPanel = () => {
    const isShown = useSelector(state => state.leftPanel.isShown);
    const activeBtnInd = useSelector(state => state.leftPanel.activeBtnInd);
    const dispatch = useDispatch();

    const wrapClasses = useMemo(() => {
        return isShown ? `${styles.wrap} ${styles.animated} ${styles.wrapShow}` : `${styles.wrap} ${styles.animated}`
    }, [isShown])

    const getBtnClasses = useCallback((ind) => {
        return activeBtnInd === ind ? `${styles.btn} ${styles.active}` : `${styles.btn}`
    }, [activeBtnInd])

    const onClick = (ind) => {
        dispatch(changeActiveBtn(ind));
        dispatch(changePage(ind));
        dispatch(changeHeaderTitle(ind))
    }

    return (
        <div className={wrapClasses}>
            {
                leftPanelContent.map((item, ind) => {
                    return (
                        <button key={ind} className={getBtnClasses(ind)} onClick={onClick.bind(null, ind)}>
                            <svg width='24px' height='24px' viewBox='0 0 24 24'>
                                <path d={item[0]}/>
                            </svg>
                            <span className={styles.title}>{item[1]}</span>
                        </button>
                    )
                })
            }
        </div>
    )
}
export default LeftPanel