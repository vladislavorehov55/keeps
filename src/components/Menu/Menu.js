import React, {useMemo} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
    addNoteToArchive, addNoteToTrash, returnFromArchive, deleteNote, returnFromTrash,
    choosePicture, closeModalEditForm, changeBackground, closeTopPanel
} from "../../redux/actions";
import {circles} from '../../data';
import styles from './Menu.module.css';
import {
    CHANGE_NOTE_BACKGROUND,
    CHANGE_NOTE_BACKGROUND_IN_MODAL,
    CHOOSE_ADD_NOTE_FORM_PICTURE,
    CHOOSE_NOTE_PICTURE
} from "../../redux/types";

const Menu = ({noteId, inAddForm, changeAddFormBackground, inTopPanel, addToArchiveModal, returnFromArchiveModal, addToTrashModal, returnFromTrashModal}) => {

    const count = useSelector(state => state.topPanel.count);
    const page = useSelector(state => state.app.page);
    const isOpenedModalEditForm = useSelector(state => state.modalEditForm.isOpenedModalEditForm);
    const dispatch = useDispatch();

    const onClickChangeColor = (e) => {
        e.stopPropagation();
        if (isOpenedModalEditForm) {
            dispatch(changeBackground(CHANGE_NOTE_BACKGROUND_IN_MODAL, e.target.dataset.color));
            return
        }
        if (count) dispatch(closeTopPanel());
        inAddForm ?
            changeAddFormBackground(e.target.dataset.color) :
            dispatch(changeBackground(CHANGE_NOTE_BACKGROUND, e.target.dataset.color, noteId));

    }
    const onClickAddToArchive = (e) => {
        e.stopPropagation();
        if (count) dispatch(closeTopPanel());
        isOpenedModalEditForm ? addToArchiveModal() : dispatch(addNoteToArchive(noteId))
    }
    const onClickReturnFromArchive = (e) => {
        e.stopPropagation();
        if (count) dispatch(closeTopPanel());
        isOpenedModalEditForm ? returnFromArchiveModal() : dispatch(returnFromArchive(noteId))
    }
    const onClickChoosePicture = (e) => {
        e.stopPropagation();
        if (inAddForm) {
            dispatch(choosePicture(CHOOSE_ADD_NOTE_FORM_PICTURE, e.target.files))
        }
        else {
            dispatch(choosePicture(CHOOSE_NOTE_PICTURE, e.target.files, noteId));
        }
    }
    const onClickAddToTrash = (e) => {
        e.stopPropagation();
        if (count) dispatch(closeTopPanel());
        isOpenedModalEditForm ? addToTrashModal() : dispatch(addNoteToTrash(noteId))
    }
    const onClickDeleteNote = (e) => {
        e.stopPropagation();
        if (count) dispatch(closeTopPanel());
        dispatch(deleteNote(noteId));
        dispatch(closeModalEditForm())
    }
    const onClickReturnFromTrash = (e) => {
        e.stopPropagation();
        if (count) dispatch(closeTopPanel());
        isOpenedModalEditForm ? returnFromArchiveModal() : dispatch(returnFromTrash(noteId));
    }
    const moreSubmenuClasses = useMemo(() => {
        return `${styles.moreSubmenu} ${inTopPanel ? styles.moreSubmenuInTopPanel : ''}`
    }, [inTopPanel])
    return(
        <div className={styles.wrap}>
            {
                page !== 'trash' &&
                <>
                    <div className={`${styles.imgWrap} ${styles.colorImg}`} title='Изменить цвет'>
                        <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMTIgMjJDNi40OSAyMiAyIDE3LjUxIDIgMTJTNi40OSAyIDEyIDJzMTAgNC4wNCAxMCA5YzAgMy4zMS0yLjY5IDYtNiA2aC0xLjc3Yy0uMjggMC0uNS4yMi0uNS41IDAgLjEyLjA1LjIzLjEzLjMzLjQxLjQ3LjY0IDEuMDYuNjQgMS42N0EyLjUgMi41IDAgMCAxIDEyIDIyem0wLTE4Yy00LjQxIDAtOCAzLjU5LTggOHMzLjU5IDggOCA4Yy4yOCAwIC41LS4yMi41LS41YS41NC41NCAwIDAgMC0uMTQtLjM1Yy0uNDEtLjQ2LS42My0xLjA1LS42My0xLjY1YTIuNSAyLjUgMCAwIDEgMi41LTIuNUgxNmMyLjIxIDAgNC0xLjc5IDQtNCAwLTMuODYtMy41OS03LTgtN3oiLz48Y2lyY2xlIGN4PSI2LjUiIGN5PSIxMS41IiByPSIxLjUiLz4KICA8Y2lyY2xlIGN4PSI5LjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjE0LjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIxMS41IiByPSIxLjUiLz4KPC9zdmc+Cg==' alt=''/>
                        <div className={styles.colorSubmenu}>
                            <svg className={styles.colorSubmenuSvg}>
                                <circle cx="15" cy="15" r="12" fill="white" stroke='black' data-color='white'
                                        onClick={onClickChangeColor}
                                />
                                {
                                    circles.map((item, ind) => <circle r='12' cx={item.cx} key={ind}
                                                                       cy={item.cy}
                                                                       fill={item.fill}
                                                                       data-color={item['data-color']}
                                                                       onClick={onClickChangeColor}
                                    />)
                                }
                            </svg>
                        </div>
                    </div>

                    {
                        page === 'notes' ?
                            <div className={styles.imgWrap} title='Архивировать'
                                 onClick={onClickAddToArchive}
                            >
                                <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMjAuNTQgNS4yM2wtMS4zOS0xLjY4QzE4Ljg4IDMuMjEgMTguNDcgMyAxOCAzSDZjLS40NyAwLS44OC4yMS0xLjE2LjU1TDMuNDYgNS4yM0MzLjE3IDUuNTcgMyA2LjAyIDMgNi41VjE5YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNi41YzAtLjQ4LS4xNy0uOTMtLjQ2LTEuMjd6TTYuMjQgNWgxMS41MmwuODMgMUg1LjQybC44Mi0xek01IDE5VjhoMTR2MTFINXptMTEtNS41bC00IDQtNC00IDEuNDEtMS40MUwxMSAxMy42N1YxMGgydjMuNjdsMS41OS0xLjU5TDE2IDEzLjV6Ii8+Cjwvc3ZnPgo=' alt=''/>
                            </div> :
                            <div className={styles.imgWrap} title='Разархивировать'
                                 onClick={onClickReturnFromArchive}
                            >
                                <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMjAuNTQgNS4yM2wtMS4zOS0xLjY4QzE4Ljg4IDMuMjEgMTguNDcgMyAxOCAzSDZjLS40NyAwLS44OC4yMS0xLjE2LjU1TDMuNDYgNS4yM0MzLjE3IDUuNTcgMyA2LjAyIDMgNi41VjE5YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNi41YzAtLjQ4LS4xNy0uOTMtLjQ2LTEuMjd6TTYuMjQgNWgxMS41MmwuODMgMUg1LjQybC44Mi0xek01IDE5VjhoMTR2MTFINXptMy01LjVsNC00IDQgNC0xLjQxIDEuNDFMMTMgMTMuMzNWMTdoLTJ2LTMuNjdsLTEuNTkgMS41OUw4IDEzLjV6Ii8+Cjwvc3ZnPgo=' alt=''/>
                            </div>
                    }
                    {
                        !inTopPanel &&
                        <label className={styles.imgWrap} title='Добавить картинку'
                               onChange={onClickChoosePicture} onClick={e => e.stopPropagation()}
                        >
                            <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMTkgM0g1Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY1aDE0djE0em0tNS03bC0zIDMuNzJMOSAxM2wtMyA0aDEybC00LTV6Ii8+Cjwvc3ZnPgo=' alt=''/>
                            <input type="file" multiple={true} hidden={true}/>
                        </label>

                    }

                    <div  className={`${styles.imgWrap} ${styles.moreImg}`}>
                        <img width="24" height="24" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAASwCAQAAABBKHtEAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfjCQsCFCHnVjWZAAA1xklEQVR42u3deWCddZ3v8e9zkjYpULYgUBYpy7RlF1pEVqsgUNqEshQXFLwIBXXGZdTB0VE6Xse5jjMyjjhqFVzAUYhAm6QtFIapyL4qhUqLQMtSEIgUWmjS5Jzn/nHFKwpt0mZ5ltfrb6U5719yzuc85+QkAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKA0EgmA7GoZXWnqqcRm0RBRt2VE9aWI6I5X0urmna1r9AEMLID1mtw4emxtt8rYGJuOTXaMpmiKpmhYz/+hOzqjMzrj6VgRy2vL65a/tGJRl46AgQWU3KzK3XsmByT7p/vHgbF7VDbxP1eLR+PXyQPp4vT+SY/MqukLGFhAiRy3ecNBcUQcGYdF0yD9E6vj/rg5vaX+l3NW6Q0YWECBzahbd2g6JT0+Dor6Ifone+PeuC5dMOrO1qr+gIEFFMrUbepa0hPjXbHNMH0Bv4/r0/n1ba5nAQYWUAAztlp7UjIjjouRGfhiqnF78uOGK1pfdC6AgQXk0uT6LU9Mz44T1vu7gMOhK65NLx0134uGgIEF5MqUXerPiA/Hbhn+Ep+OH9dmz3vUWQEGFpCD+5WW49NPxrGb/KELQ6GWXF+9aN7CSB0bYGABGTVj5Nr3JJ+J/XL2ZT+cfKthduta5wcYWEDWxtUWXR+Lj8UOOf3yn45vdF+88GXnCBhYQEY0b5acm342dsz5zXg+/jW+2f6K8wQMLGCYTWkYcX4BxtWrno5/7p29oNu5AgYWMGymNSf/HnsU7EY9nn6h48fOFjCwgGHQclB6Uby9oDfuf9JPdvzaGQMGFjCEpm6TfDX5UC4+imFjVZPvVf7en9YBNkadBED/TWuuzEsmF/wpWiUmpR8c99wy17GAfnMFC+inU8b0fDNOLdEN7qh8ZO4Tzh3oD1ewgH5pObvaEQeV6iaPS88e/8yyXzl7oO9cwQL6bMZWXd+O95b0xl+1buZ1v/c9ABhYwIBqfmfyo3SXEgd4Ij2zY5HvA6AvvEQI9MGMuj3/Ob4TW5U6wlbJmeNHHviLJf4wNLBBrmABG3RyU+9P4106RETEovp3X/OsDICBBWyS5oPjqhirwx89UZkx9w4ZgPWpSACsz7T/FbeaV6+xa21Ry1kyAOvjPVjAG0taZsVFUS/En6mP6eO3fd/CRd6NBbzR3acEwOub0jDikvQMHd5Qa+NZrWtlAAwsoM+O33bkNXG0Dut1W+9JC56TATCwgD45cce662M/HTboofTYjqdkAAwsYMPzare6G2IvHfrksdqx8x6VATCwgPXPq3F1N8SuOvTZ4+mxHQ/LABhYwBtq3jduiB116JdnKsfMXSIDYGABr6tlr/QXsZMO/fZscnTbUhmAV/mgUeCPTto1vd682ijbp9dPHysDYGABf+bk7WsLfWb7Rtu1ev0pY2QA/h8vEQIRETF1m8ovY18dNsniuqPnrJIBcAULiIiImSMqrebVJtu/OmdKgwyAgQVERCTPfD+OkWEAvL3+OyIA/tgzEBEts9KPqzBA3jKhtvQmGcDAAkqu+X3xDe/HHECTxz207EEZoNzcqULJtRyQ3hab6TCg1iZHtN0nAxhYQElN3aZyV+ypw4D7bd0hfp8Qysyb3KHEZlUql5tXg2Kv6mWz3L9CiXkPFpTYlv8QM1UYJOOe6V56swxQVl4ihNJqPiRuiRE6DJreOKr9dhnAwAJKZMYWXffGX+kwqB5JDmpbLQOUkfcIQEl1XWxeDbo904tEgHJyBQtKqWVGeqUKQ3Ine2rb1SqAgQWUwMlNvUtiex2GxPOxd/vzMkDZeIkQSqj3IvNqyGwX/yIClI8rWFA6ze+MG/zsD6E0Ob7tehnAwAKKPK82i8Wxhw5Dann3fgtflgHKxEuEUDLphebVkBvb8PciQLm4ggWlMnWPypJo0GHIddXtPWe5DFAermBBuX7k/828GhaNVW91h1JxBQtKpOUd6Y0qDNvd7dvbblIBSvN0VgIoi1kVnys+nNKLZrnHBQMLKJq73xsHqjCMDr7nNBGgLLxECCUxo67rwRivw7De4S5r2Ke1qgOUgStYUBJrzzSvhls6bu17VICSPKGSAMpg5oinH/L5Vxnw29V7L+qVAYrPFSwohafPMq8yYa8tzxABDCygGJL4WxGyIf20Vw7AwAIKoXlq7K1CRuzXcrwIYGABRfApCbKj5jSgBFyqhsJrPjjuUSFTd7wHt92nAhSbK1hQfB+TIFvSv9EACv9ESgIothlbda2MzXTIlLV1O81ZJQMUmStYUPTH8vebV5kzqvpuEcDAAnIs+ZAGGXSOBGBgAbnVfEgcpEIGTWpxLmBgAbn1QQmyKXUyUGje5A4FNqOu66nYQYdMeqZxl9aqDFBUrmBBga2dbF5l1o7dR4gABhaQQ8npGmSY04Ei3/9KAEU1uX70U7G9Dpn1u8advUgIReUKFhTW6KPNq0zbwYuEYGAB+TNFgmyrnaABGFiAgcWASgwsKO7PtwRQ0HW1S/0TKmRcmuzStlIGKCJXsKCg6ly/ysFT3PQ4EcDAAvL0w+2hOw+cEhhYQJ6kR2qQA0dLAAYWkBvT94wdVciBnZvfLAIYWEBO9PqEpbxwUmBgAXmRHK5BTk7KwAIDC8iNwyTICQMLivnkSQIonikN9WuiXodc6GnconWdDFA0rmBBAdXva17lxojuCSKAgQXkQLK/BvlRc1pgYAF5kHrINocBAwsYYAdIkCMGFhhYQC54V0+e7C0BGFhA5s0cETupkCO7TvYrCWBgAVn37JujToUcqd9sZxHAwAIyrnesBvlS58TAwAKyLtldg5xxYmBgAZn3ZglyNonHagAGFpB1O0iQL+n2GoCBBWRdkwRODDCwgIG1nQRODDCwgIHleogTAwwsYIC5HuLEAAMLGGBbSpAzW0kABhaQdQ0S5MxICcDAAjJtRp0/lJPDgZWIAAYWkO0Ha3JnilMDAwswsBhYI5waGFhAlq3xUJ1DPY0agIEFZFhjTYP8qVU1AAMLyLDqOg3yJ+3WAAwsIMN6DKwcGuvUoGD8ajAU7qe6ueonO2dq7T5aAwrGFSwomjR6RcgZ16/AwAIyb60EOdMlARhYQNb9XoKc6ZQADCwg4xIP1wYWYGABA+x5CZwYYGABAyp1PSRvnBgYWEDmuR7ixAADCxhYyTMa5Ev6tAZgYAFZf7herkHO7oidGBhYQOY9JoETAwwsYEBVl2uQL645QvH4i2VQwJ/r5jWxmQy5sbp9SxGgaFzBguJJY7kIOeIFQjCwgFx4QAKnBRhYwIBKF2uQI04LDCwgDxIP2U4LMLCAAXa/BDkaWE4LiviTLQEU8Se7+cUYLUMuvNi+TaQyQNG4ggVFlMZdIuTEneYVGFhATiS3apCTLXyLBmBgAXl52DawcqLOwAIDC8jNw/ZtUVMhB6rr7hQBDCwgJ+asiiUq5MD9C14SAQwsIDeSX2iQA04JDCwgT2rXaZCDU7pWAzCwgBxZd2N0q5Bxaze7SQQwsIAcWfhy+ksVMm5R61oRwMAC8vXj7eWnrHNCYGABudMhQbYl8zUAAwvImbal/uhzpufVPW2/VQEMLCB/rpTA6QAGFjCg6n6mQYbvfq/SAAwsIIfmPBL3qZBRd855RAQwsIBcSlzDyqj0Cg3AwALy6kfRI0IGrRtxuQhgYAE51fa7xIc1ZNGca54VAQwsILfS72mQQZdIAAYWkGMTr4sVKmTM8ok3iAAGFpBjs2rp91XImO/NqokABhaQaz3/GS+rkCGv1H9XBDCwgJy77vfJZSpkyCXXdIoABhaQe7Wvh5eksqJa9w0RwMACCqDj4WhXIRuSa3yCOxhYQEGkX9UgGwcRTgIMLKAoOm6LBSpkQFvb3SKAgQUURu0LkaowzNLqLBHAwAIKZN490abC8Equmv8rFcDAAgolvdDvEg6rWvUfRQADCyiYjl8nl6swjH4w7wERwMACiufv4iURhsnqEV8QAcqjTgIoj6Uvj6tP3qnDcEi+OOc6FaA8XMGCUlnzr7FchWHwaI/PbwcDCyiqRV3pZ1QYBn+7oFsEMLCAwur4ecxVYYhd3a45GFhAsSUfiVUqDKGX0o+JAGXjTe5QOktXj1uTnKjDkA3aj7UvUgHKxhUsKKFJ345bVBgiN7V9TwQo4VMrCaCMpu5R+VWM1mHQrUkP7nhYBigfLxFCKT38wvhno0WHwZae2/E/KoCBBZTGsvvG7x376TCorur4vAhQTt6DBeV9fnV+PK7C4EmeXDdTBTCwgJKZsyr5QPTqMEh64j3X/V4GKO1TWAmgvJauGL8mjtdhUHyy/ecigIEFlNKy2yfsEQfqMOB+2n6BCFBmXiKEkuv6SDygwgBb3H2uCGBgASW28OX0lOjUYQA9X3fywpdlAAMLKLWOh2N6dOkwQLqS6XMekQEMLKD02m+Os6KmwwBI03Pa/BkiwJvcgYiIZQ+O741jdNhUyWfbv6MCYGABr06sX47fPg7RYVOkF7f/gwqAgQX86cRaMH7nOFiHjZX8eOL5i1IdAAMLeI0D5/eMS/x9wo1z9eoP/LAqA2BgAX9mSTq5bc1BMU6JflvYe9oNPTIAr0okAP7U5MbRrTFNh35pX336Ih90AfwJV7CA11jeu1Nrw+7+fE4/XDHmPVetkwEwsID1TazagW09uyQHKdEnl68+66peGQADC9iAJemy9vHbxqFKbEj6jY7zl/uIVsDAAvpm2YIJq+I479Nc37pKvtT+WRmA1+POE3hD005OLo/NdHhdXekHO66QATCwgH476dDa3NhBh7/QmZzkbw4Cb8wfewbWY+4ddW+Le3X4M3fHweYVYGABG23O8t7D4/s6/InLGo9uf1wGYH28RAj0wbQzk+/EKB2iO7mg7RsyAAYWMDAT663Jf8WeJY/wcPK+trt9LwAb5iVCoE867kwOitmlTnBZ48HmFdA3rmAB/dB8anw3mkp4w1fFR9p/6vwBAwsYFFN2qf9unFiyG92Rnt/xlLMHDCxgELXMSC+O7UtyY3+X/l3Hj5050D/+VA7Qb0uX/NUlyTZxcAmeorXG1I7bnDjQX65gARup+Z1xURxQ4LvHX6WfaP+FcwY2ht8iBDZS+40TD0rPit8V8sZ1Jp9omGReARv9FE0CYFNM37r2hfSj0VCgm9Qd32z8cuuLzhYwsIBhdNKutU/HeYUYWT3xs7iw/TFnChhYQAacuFvd5+LsqM/xTajFVcnn2n7rLAEDC8iQlr3iU+lZufybha/ED+u+PucRZwgYWEAGNW8XH4qPxU45+pKfTb6dXtz+vLMDDCwgwyY3jj4jzo1Dc/Cl3p5876X/WtTlzAADC8iFqXtXzooPxXYZ/fJWxZXVb8//lXMCDCwgZyY3bjk9fXecEI0Z+qK6kgW1K9bMdd0KMLCAHGveLD0m+UC0DPsHOXTH9Wlrdc6Cl5wJYGABhXDc5qMOqzXHSbHbMPzjz8T1SXvl+jmrnANgYAEFdNI+1ROSo+Ow2H4I/rFn49a4qXbtvN/oDhhYQAm0jE8PiyPj4NhnwF867I4lcU/cUr11/jKdAQMLKKHJ9VuNq+0XByT7xO7p2Nh6I/8zq5Ll6aPJknRxbfHLDy/q1RUwsAD+YOo2dWNrY5MxSVOtKWmKpmhK6tLNoiEitomIFyKiO3klrUZndKadlc60M1YmKyqPeXcVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAClkkgAZMfMEU/vkoxNd4udkqa0KZqiKWlK62NEbBERm0XEKxGxJnqS3rQzOqMz6Uw7Y2WyIl0+5snZPfoBBhZARERM2XLE/ul+cWDsHXvEzlG3kf+ZajwZj8WSuL+yeN0DC17SFTCwgNKZOeLpiXFYHBEHx+4D/h9PY3lyT3pr5dYd7nVdCzCwgMKbXL/5YZUTkqPSSTFqCP65tXFXclN63erbF/VqDxhYQOFM2zk5ITkhfVdsNQz/+KrkhvTaZEHbSucAGFhAITRvl5ySnhmHRWXY7/Luicui1cwCDCwgx6ZuU3lvvDuOHP5p9Sdq8cvkispP56xyPoCBBeRtXE2szIwzYvOMfnnd0VaZPfe/I3VSgIEF5MCMrbrPSc+N8Tn4Uh9KvzfqktYXnRlgYAEZNn1s9fw4L7bO0Ze8Ji6tfn3+CmcHGFhABrVMSj8Tp270R4UOp964Kv6l/V5nCBhYQIZM3a/yxTgt3/cp6Q3JBUYWYGABmXDSPrXPxhmZ+k3Bjd5YMa/6hfm/cqaAgQUMo1PG9HwlzizEuHpVLf1h7fPzn3G2gIEFDIMZI7s/nH4ptizgTXs5+deX/s+iLmcMGFjAkJp2WvK1GFvgG/ho+umOa5wzYGABQ+SUMT0XxykluKHzKh+e+4TzBvqrTgKgv0/MWmZW2+Itpbit49IPTVj73rsW+bx3oH93lBIA/dEyvnZpcnjJbvTN6dkdDzt7oO9cwQL6YdqZMTfZs3Q3+83JORPWLL3D+QN95QoW0EfN28X346QS311eU3fuNZ2+DwADCxgwJx1b+3GMKXmEp+LM9ht9LwAb5iVCoA9PxZovSH9QyM+76p8t4/0TKu+9yVvegQ3ebUoArF/L6PQHcaoOf9Te+IHWF2UADCxgo520T+3qGK/DazwUJ7c/JAPwxioSAG9s2jG1W82rvzAh7myeIgPwxrwHC3jjefW/kp/FZjq8joZ49/hnl90jBGBgAf2RtMyKi9xHvKFKTBu/7fsWesM78Lp3oRIAf2ly/ehL4wM6bNCPGj/UWpUBMLCADZoxsuu//N5g36Rt1dMXdOsAGFjAek1pqL+izJ/Y3m8LGk9tXSsDYGABb2jGFl1t8Q4d+uXGxpNa18gAGFjA68+rUV3zzKuNcEv38QtflgF4lc/BAv7/vBrZ1WpebZQjGq6e0iAD8Cq/gg28Oq/qun4SJ+uwkfas23fMVctrQgARrmABfzCr0v2jOF2HjZeevOUl3nYB/D+uYAERETH6n+PDKmyiA8fXL7tRBsDAAiIiovlD8S8qDICjJzy79G4ZAJezgZh6fKUj6nUYED0xrX2hDGBgASV30v61W2K0DgPmpTi8/UEZwMACSmzqNpW7Yk8dBtRv6w6Zs0oGKDO/RQilNqtSucy8GnB7VS+b5d4VSs2b3KHURs+Kc1UYBONW9i67SQYoLy8RQolNOzFpdx17kNRqJ867TgYwsICSOXn73vtjBx0GzXPVA+Y/IwOUk+euUNqnV72XmleD6k11P/AkFsrKe7CgpFo+Hh9TYZDtNe65ZXfJAKV8DisBlFHzvnFXjNJh0HVV3jp3sQxQPl4ihBKaXJ/8yLwaEo21S2Z4pQAMLKAMtvzbdKIKQ+SQLi/FQgl5iRBKp3n3WByb6zBkXqntP+9RGaBcXMGC0j2tSmebV0Nqs8r3PJkFAwsotJYzk2NVGGLvbH6vCFCy57ISQJnM2KJrWYzRYcg91T1+4csyQHm4ggWl0vV582pY7NzwdyJAmbiCBSXSvHssiUYdhsXa6t7zV8gAZeEKFpTJ18yrYTOq8n9EgPJwBQtKo2VSeqef+eGUHtpxpwpQDq5gQXke3r9iXg3zM9ovagCl+XmXAMqh5Yj0ZhWG3WHtt4sAZeAKFpRE+mUNMuBLEkA5uIIFpdD8zvhvFbKgdvS8X6oAxecKFpTDZyXIyJ3uBRpAGbiCBSUwdb/K/X7aMyKt7Dd3iQxQ+CdTEkAJftA/bV5l52lt7ZMiQAl+1CWAomvZIV3uA0YzpLs6dv4zMkDBn9hKAIX31+ZVpjTUfVgEKDpXsKDgJtePXhE76ZApTzXu1lqVAYrMFSwouNFTzavM2blrighgYAF5dq4EGXSOBFBsXiKEQpuyS/3yqNMhc3qT3dpWygDF5QoWFFrdB82rTKpPzxQBDCwgp5L3aJBRTgYMLCCfpu4X+6qQUQdO3VsEMLCAPP6Az9Agu+pO0wAMLCCPDKwMS0/XAAwsIHdO2j+8CJVl+3mREAwsIHdqUzXItroTNQADC8ibEyTI+AR2QlBYPmgUCmrKlvXPxwgdMm1dY1PrGhmgiFzBgoIacax5lXkjuyaLAAYWkCPp8RpkX+JFQjCwgFx5uwQ5mMFOCYr69EkCKKLm7eJZP995WFjrtrvu9zJA8biCBcV87nS4eZWPgxp5qAhgYAE5kR6uQU4cIQEYWEBOJAaWgQUYWMBAmlVJD1YhJyZ5MRcMLCAX7t4zNlchJ7ZoHisCGFhADiQHaJAjTgsMLCAXA2t/DfIjdVpgYAEesjGHAQMLymgfCXJkXwnAwAKyL4mxIuTIHn6PEAwsIPNaxkSjCjky6uQ3iQAGFpB1u0uQLzUnBgYWkPmH67Ea5EvViYGBBWRdspsGOTsxV7DAwAIy/3C9kwY5M0YCMLCAjKs1aZCzSezEwMACPFwzsFInBgYWkHnbSeDEAAMLGFiuhzgxwMACBtg2EuTMthKAgQVknc9xd2KAgQUMqCRGiJAzIyUAAwvItCkerHM4imcaxWBgAVk2wsDKoRcaNAADC8iw1EN1Dr1kFoOBBcDAGum+GAwsIMsaezTIn6RbAzCwgCxbJ0H+NBhYYGABWbavh+ocanXdEQwsIMtm1aJXhZxZF6kIYGAB2eYalhMDDCxggK2SIGdekAAMLCDrOiVwYoCBBXi4LrXUiYGBBWTe8xI4McDAAgZU4npI3u6InRgYWEDm/U6CfEmf1QAMLCDjais0yNnAWq4BGFhA1n+sPVznbWA9pgEYWEDWH64NrJypd2JgYAFZt/oJfywnV3pGrhQBDCwg4xb1xpMq5MiK1qoIYGAB2fcbCfIjXaIBGFhAHtwvQX4kizUAAwvIgdRDttMCDCxggH+wPWTnSJ3TAgMLyIMdfxPrVMiJ7h0eFgEMLCAHZvfEAyrkxOLZPSKAgQXkQnqrBjlxswRgYAE5kRhYeZnCt2gABhaQFx628+I2CcDAAnKi/fHEp7nnwWMdT4kABhaQGzXv7ckDpwQGFpAnyXUaZF/qlMDAAvKkem2kKmRcbcT1IoCBBeTI/GeSX6uQcXdf86wIYGABuVJboEHGXSsBGFhAzqQGVtZPyMACAwvIm0NuiZUqZFfy5KQ7VAADC8iZWbW4SoUMu3JWTQQwsIDcqbVqkF2p04ECSySAIv+ENy+PN8uQSU+07+aDNKC4XMGCIkvjahEy6grzCgwsIK8/4pdqkFE/lAAMLCCn5i6OO1XInvTW9gdVAAMLyO9D+fc1yCCnAgYWkGejfhqrVciYNaP8BiEYWECeta6Jn6qQLcnlrWtUAAMLyLeLwgdaZkla/Q8RwMACcq79obhOhQzpmPcbEcDAAnIv/TcNMsRpQAn4JHcoheZ74yAVMuHu9kNEgOJzBQtKwTWszPiaBGBgAQUx6mfhfT9Z8ODEn4sAZVAnAZTBknTc88lpOgy35MPfXaIClOKnXQIoy097831xoAzD6r72if7EM5SDlwihLNLkSyIMsy+aV1Ca57QSQHl+3ptvi0NlGDa3tB9lYEFZuIIF5ZFWPu4BftjU4pPqg4EFFNDcO+InKgyTH7XfJQIYWEAhpZ+Nl1UYBmtGfF4EKBMf0wClsmz1+Pp4hw5DLZk1Z4EKUCauYEHJ9H41fBLTUHuo5+sigIEFFNiC7vScqOkwhGrJOQu6ZYBy8RIhlM6yJyeMiUk6DJmL22eLAGXjChaUUM8FyZMqDJGVjV8QAQwsoAQWvFQ7z2cyDYm0dnbrizJA+XiJEEpp2cMT3hRv1WHQfaPjWyJAGbmCBSX10qdjsQqD7MHGz4kABhZQIou6au+LLh0GUXfyvta1MkA5eYkQSuvhZyesiRN0GCzpJ9o7VAADCyidpXdM2CMO1GFQ/LTjsyJAeXmJEEqt6yPxgAqDYHH3uSKAgQWU1MKX01NilQ4DbFVyykJ/VBsMLKC8Oh5OzvKncwZUNXl/229lgHLzHiwovaVLx61JjtdhwHyy/XIRwMACSm/ZbeOb4lAdBsR32/1pHMBLhEBEROMnY64KA2Be40dFACISCYCIiBlbdN0Yh+iwSe7oPsab2wEDC/gT07eu3hgH6bDRFq+bfN3vZQAMLOA1Tt6+d1HsrcNGebh69PxnZAAMLOAvTNml/qbYXYd+e6J61PwVMgCv8iZ34E8seLLuXWEo9Nfy2mTzCjCwgDc055HKUckyHfphaeXoeY/KABhYwHrMfSKOjvt16KMlyTvnPiEDYGABG9D2u/p3xt069MFd645qWykDYGABfXBNZ+M7okOH9Uuu6z3WBzMAr8efygFe15J1B15ZbYq3KvFG0u+tPuOGtToABhbQn4mVLp0/YVUc5+NcXm9dJV9q/9TymhDA63PHCaxXyynpD2O0Dq/xUpzVPkcGwMACNtqJ4+qujn11+KOlcWr7gzIA6+NN7sAGzF/W+LZo1eEP5jYeal4BG+IKFtCn+4qWz6RfjhElr7Au/fuOiyL17QAYWMAAaZkUP0nHlTjAQ3FG+72+D4C+8FuEQB8tXXnAJb2j49CS3vzLuk9a8LjvAqBvXMEC+mXaycl3YvuS3ejfxXntc5090HeuYAH9suyhfb6fbhsHl+jpWWtMbb/PyQP94QoWsBFajk5nx/gS3NBHK+fNvcF5A/3lChawEZauGH9p1MUhUV/gG9kVX21879XLnDbQf65gARvtpF1r/xQfKOiN66h9fN6jzhgwsIBhMG1y5aL0LQW7UffFJ9t/4WyBjeeT3IFN0rGoYVKcGb8tzLPOZen7J04yr4BNvC+RANh0syr3npp+JfbK+c1YkXzlpUsX9TpPwMACMmLGyO4Ppp+Ov8rpneGy9GtjfjS7xzkCBhaQMbMqd0+NjyXH5uyO8J7af4z6SWvV+QEGFpBZzW+LT8b0GJmDL3VdXJN+veNOZwYYWEAOTN2mbkb60Tggw1/i0vhB/Q+uedZZAQYWkCvNR8bZcXJsnbEv64X0msqlbbc4H8DAAnJqRt26d9TOjJbYKgNfzCsxL71s1HWt65wLYGABuTe5cYt3VU5MT4ixw/QFPBbXxvze6xd0OwvAwAIKpnlCnBDHxxExeoj+wdVxc3JdXNu2VHvAwAIKbUZd14TkiPTImBj7DNI/8XTcEzfHLWPu8NlWgIEFlMyUN9UdkOwf+8UBsXdssYn/sTWxJO5PHkgX9y5e8Jy2gIEFECdv3zM2dk/GJmPTHZOmtCmaoinq3+B/3Bud0Zl0pp3JM+nyeCxdPmK5j1wADCyAPpi+dU8yYqueSt2I6hYRdWuqPSNqPS9uVmt9URsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA8SSQAsmVW5e4xyU5JU60paYqmpCkdEXWxZUQ0RkRXRLwU1aQn7YzOtLPSmXamKyc9PaumG2BgAbxmUv1q994Dkn1i9xgbY2PXGNnP/8C6eDxdnqyIR2NJ3eI5j0aqKWBgASWdVXftUzkinZgcEPvGFgP4H14TD6SLK3dXbz1kiStbgIEFlMLMESuPqByVHh6HxVaD/E+tituS29Kbxtw6u0d3wMACCunEHSvHJdPiuEEfVn/u5fS2SkfvnPkrnAFgYAGFcdI+6enpabHvMH8ZD6Q/T6+c9xvnARhYQK6dOK7+3enpsV+GvqTF6ZVxRcfDzgYwsIDcmdIwoqU2Mzkmm/czyT0xu+snC192ToCBBeREywExMz0jts74l7kqvbzyvbb7nRdgYAEZ13xkXBBTc3Tvckv61Y4On50FGFhAJs0YufY9yd8N+1vZN8bDybcaZreudYaAgQVkalx1fzD9Yuyc45vwbHx99TcWdTlLwMACMmDmiJXvTS6MPQpwU55I/q3nOwu6nSlgYAHDei/S/J74ciHG1aseST/fcaX3ZAEGFjBMpk6s/HscWcAbdmf6iY7bnC9gYAFDrGWn9MI4JyoFvXlp/Dw+3f64cwY2Rp0EwMY8OWuZmbbF4QV+kpbEvnHe+OqBty/xYiGwEXchAP3UvG98P95Wjtua3prMbH/QmQP94woW0C8zRu75xbgsdivNs9Bd40Pj6g68bUnV2QP9uO+QAOi7qXtXLo+DS3jDH6i8b+5i5w/0lStYQJ9NO7MytzzXrl5j+/SDE9YsvdP3ANA3rmABfXLy9r2XxtRyN0jbqucseM73AmBgAQOiZVJ6VbxZh3gqneHzsYAN8xIhsOF5NTP9eWyrQ0Rsmbx/wuqldwgBrJ8rWMB6TW7c4lvJ2Tq8xuVxXvsrMgAGFrBRThnT0xaTdPgLd1Vb5j8jA2BgAf3WvG/MK+lvDW7YU+nUjl/LALy+igTA65t2TNxsXr2hnZNftpwgA/D6vMkdeF0tZ8UVsbkO69EQp49fsex+IQADC+iTaefH7KjXYYP3oNMnrPI7hYCBBfRBy9/Fv3uHZp8kccKE2tKbhAAMLGC9mi+Ir6rQD+8YP2rZDTIABhbwxvPqn+IfVeinI8ePWHajDICBBbz+vPp8XKjCRjh6wrqlN8sAGFjAX86rv4mvqbCRjpmwZqm/UggYWMBrTTs3+Za3tm+Cd014Yul9MgARPskd+IOWqelcT7k2UTVObZ8rA2BgARERMXVi5Rc+VnQAvJK+o+NOGQADC4gpu9TfHjvrMCCerh42f4UMUHb+FiGU3vSt6681rwbMmLqOKVvKAAYWUGqzKtXLY18dBtB+9T+Z5b4VSs5bWqHktrwwzlVhgI1b2bvMn8+BUvMeLCi15uNividag6AW09oXyAAGFlBC08dW744mHQbFC7VJ8x6VAcrK+wSgtCbXV68wrwbNNnVXzhwhAxhYQMmM/t/xVhUGTzrxmS+qAGXlJUIoqalHVf7Hu68GWS09pmORDGBgASUxfevqr2I3HQbdE7UD570gA5SPlwihlKrfNK+GxK6Vi0SAMnIFC0qo5YTURwgMnePbF4oABhZQcMdt3nB/7KHDkFnRuF/rGhmgXLxECKXT8BXzakjt1nWhCFA2rmBByZx0aO1WT62GWLV26Lx7ZIAycTcLJXtSVfsPP/dDrq5ysaezYGABhdVypg8XHRZva36vCFCqZ7MSQHnM2KJraeykw7Dc2T7ZNWHhyzpAWbiCBSXS9Vnzariku4z8tApQoidVEkBZTNs5eThG6TBsXhmx19VPywDl4AoWlOf51OfNq2G1Wc9nRYDS3ONKAOXQ/OZYFg06DKvu3r0WPCkDlIErWFAWXzSvhl1D/edEgHJwBQtKYfqe1d/ECB2GXU+Mb39MBig+V7CgFHovMK8yYUTyKRGgDFzBghKY8qb6Fd7gnhGvxG7tz8sARecKFpTAiI+aV5mxWXq+CFB8rmBB4U1pqF8RO+iQGc+u3m1RlwxQbK5gQeHVnWleZcr2o88QAQwsIOeSD2uQMV4kBAMLyLeWSXGQChkzqcWZgIEF5Fl6rgYZ9CEJoNi8yR0K7bjNG1bGljpkzouxU/srMkBxuYIFhdb4bvMqk7ZKTxMBDCwgp1K/r5bVO9/3aQBF5iVCKLApb6pfGfU6ZFJv/c7XPCsDFPZJlARQXHWnm1eZVV+dLgIYWEAOJTM0yK6a04Ei3/9KAEV1ypieJz2JyjAvEkKBufOFwuqZ6ic80+qrU0QAAwvImxMkyLaaE4LC8hIhFNTk+tHPxdY6ZNoLjW9qrcoAReQKFhTUloebV5m3TdchIoCBBeSIl5/yIHFKYGABuXrofqcG2ZceowEU9D5YAiiiGaO6VsVIHTKvu3erBd0yQPG4ggXFfNw+xLzKhYa6g0UAAwvIifRwDfIhOUIDMLCAvDCw8sLAAgMLyI1DJXBSgIEFDKBTxsT2KuTEmJOdFRhYQB707K9BfvTupwEYWEAeHCBBfiTmMBhYgIdsBlbqtMDAAnLxkO1FpzwxsMDAAnJhTwmcFmBgAQPo+G1jKxVypGnKliKAgQVk3MixGuTLCCcGBhaQdYmH67xxYmBgAVlX83CdN7tLAAYWkPUf6501yJd0Fw3AwAKy/nD9Jg1yZjsJwMACsq5JAicGGFjAwHI9xIkBBhYwwFwPyZnEiYGBBWTethLkS2pggYEFZN5mEjgxwMACBtZICZwYYGABA2jmiEhUyJm6GXUigIEFZNgLDRrkT5dTAwMLyLKXvNyUQ3VODQwsINM/1F5syqHuERqAgQVkWEOPBvmzxToNwMACMqzqoTqHnuvWAAwsIMNWG1g5NNmpQcH4dW4onOaqp04509vuPVhQMO6GoXhcDckbLxCCgQVk3moJnBhgYAED63kJnBhgYAEDq1MCJwYYWMDAcj3EiQEGFjDAXA9xYoCBBQyw5yTIGVewwMACMu8JCXLmcQnAwAIyLl2uQc48JgEYWEDG1RlYeZvEBhYYWEDWjXwsUhXytK/WeFEXDCwg61rXept7rqxc1CUCGFhA5iVLNcgRpwUGFpAL90uQH+liDcDAAjxkM6ASpwUGFpCLH2wP2eYwYGABA/6Q7fcI86I2aokIYGABOdC2Oh5VISceaV0jAhhYQD7cJkFO3CIBGFhATiS3amBgAQYW4GG7lGpOCgwsIC8OfiBeVCEHXjjEx4yCgQXkxaxacrsKOXDLrJoIYGABuZHeoEEOXC8BGFhAniyQIPuq12oAxZRIAEXVvCLerEKmPda+hwhQTK5gQWGl12mQca4ygoEFePhmgCewFwjBwALyJrkuXlYhw9aM8osIYGABedP+SsxXIcPaWteKAAYWkDvplRpkmNMBAwvIo2R+rFEho1av9ksIYGABedT+StqhQkbNXdQlAhhYQC4lP9bAyQAGFjCgJl4XK1TIoMcO/m8RwMACcmpWLfmhCtmTXuqPPIOBBeRYz/ejqkLGVOt+JAIYWECOLXgy/LZa5g5l7hMigIEF5NvFEmTMNyWAokskgOJr/nUcoEJmLG4/MFIZoNhcwYIyPJP6hgbZkf6reQUGFlAAPT+Jp1XIiJWjfiYCGFhAASzoTv9ThYz4j9Z1IoCBBRTCqG/G71XIgM7E1AUDCyiK1hfj6yoMv+Rf2larAAYWUBiN34hnVRhmzzW4fgUlUScBlMOSdeOS5F06DKt/uOYmEaAcXMGC0ki+FStVGMb+TzZ+VwUoC1ewoDSW9UzojOk6DJvzr7lPBCjNUyoJoEw/8c23x1tlGBa3tR/hA0ahPLxECGWSpp/wIK88YGABA6rjtvA54sPhxx13igAGFlBYIz4Vq1QYYi8mnxMBysWb3KFkfrNm3IvJNB2G1F+3+3gGKBlXsKB0Js1OfqnCEPpF+6UiQNn4LUIooRPH1f06GnUYEt3xlvaHZICy8RIhlNDDnRNqcYwOQ/Is9vPtc1WA8vESIZTSwV+NRSoMwbz6ZcO/qQCl/OmXAMppyi7198c2OgyqVdW3zF8hA5SRK1hQUgueTGeqMMjPYD9sXkFZeQ8WlNayJeP3igN0GDQ/bP8nEaCsXMGCEus+Px5QYZDcHx8VAQwsoIQWvpye4nPdB8WqulPaX5EBDCyglDoeTs+Mmg4DLE3PnvOIDFBm3oMFJbds2fiRcbQOA+p/d3xbBDCwgHJPrP8ZPy7212HAtE78m0WpDFBuPgcLiBmjuv47DtNhQNwVk737CjCwgIho3i5ujb/SYZM9Wn/YNc/KABhYQEREtIxPb41tddgkndXD5y+TAfBbhMAftC1NjvWRDZvkpZhiXgEGFvDaiXVfZWq8rMNGeiVpbr9LBsDAAv7M3Fsr06NLh42wLk5ru0kGwMACXm9i3RDviXU69HdeJTPaF8gA/H/e5A78meYpcVWM0qHPuuPd7XNlAAwsYL1ajk47YrQOffJyZfrcG2QADCxgwxNrUnptNOmwQavSEztukwH4c96DBbyOtrvTY+IpHTbgicrR5hVgYAF91vHr5K1xrw7rcX/liLmLZQAMLKAf2lY2vj06dHgDC3uPmvuEDMDrq5MAeCNL1u3U2vCmOESJP5dePOoDc31iGPCGvMkd2ICW96ffjc10+KOu+Ov2S2QADCxg0ybWQelVsbsOERHxRJzqT+IAG+I9WMAGtd0Xb43rdYiIBeveYl4BG+Y9WEAfLHtl2eUTXoh3RH2JI/QkX5543iWv+G4ANsxLhECfTd2v8l+xf0lv/G+SM9ru8z0A9I0rWECfPfzs+B8lTTGxdE/N0uQ/G0+7xocyAH3mChbQTy1Hp7NjfIlu8KOV8/y1QaB/XMEC+mnpigMvqfbG4aW4/+iNi7tPm7/UqQP94woWsFFaDkpnx6SC38g70vM6fu2sgf7zMQ3ARmm7r/2tyenxeGFv4MrkvImHm1fAxnEFC9gEx23e+Jn0gmgs2M1aF9/p/cKCl5wvYGABw6R59/jHeF9h3pFVTX5SuXDOcucKGFjAcI+sCfG5AoysWlyVfKHNW9oBAwvIipP2r10YJ+f2nZ21uCr+sf1B5wgYWEDGTN2j8vE4JzbL2ZfdHVfGV9ofcn6AgQVkVPN2yYfTj8YOOflyf5dePOLb13Q6N8DAAjJuxsi1xycfiFMy/a6sWnpjZXbD3NZ1zgswsIDcmD62enZ8MHbN4Jf2ePyweun8Fc4IMLCAXJo6sXJmnBY7ZeTLeT6ujssm3jqr5mQAAwvItVmVe45KT0tOjD2G8Yt4JOYnPz/4ZtMKMLCAQpm6R92x6bFxQowewn90bXpLckPthnn36A8YWEBhTW4cPSk5PD0yDovtBvGfeT69tXJL3NJz94JuzQEDCyjNPVDz+HRisn/sH/sP2FvhH48HYnHcH/f6XCvAwAJKbvrW6T7pHrWxydjYPcbGjn3+sNJX4pl4LJany+OxeLT+N3NWaQkYWACva8aoNU11TUlT0lSrVLaKiFFpY0TSFWsjai9Wamln2lnt3KKzda1WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADD6P8C4orDC+/R434AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDktMTFUMDI6MjA6MzMrMDA6MDCkyMv0AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA5LTExVDAyOjIwOjMzKzAwOjAw1ZVzSAAAAABJRU5ErkJggg=="/>
                        <div className={moreSubmenuClasses} onClick={onClickAddToTrash}>Удалить</div>
                    </div>
                </>
            }

            {
                page === 'trash' &&
                <div className={styles.trashIconsWrap}>
                    <div className={styles.imgWrap} title='Удалить навсегда' onClick={onClickDeleteNote}>
                        <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwMDAwMCI+CiAgICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDBWMHoiLz4KICAgIDxwYXRoIGQ9Ik02IDE5YzAgMS4xLjkgMiAyIDJoOGMxLjEgMCAyLS45IDItMlY3SDZ2MTJ6bTIuNDYtNy4xMmwxLjQxLTEuNDFMMTIgMTIuNTlsMi4xMi0yLjEyIDEuNDEgMS40MUwxMy40MSAxNGwyLjEyIDIuMTItMS40MSAxLjQxTDEyIDE1LjQxbC0yLjEyIDIuMTItMS40MS0xLjQxTDEwLjU5IDE0bC0yLjEzLTIuMTJ6TTE1LjUgNGwtMS0xaC01bC0xIDFINXYyaDE0VjR6Ii8+CiAgICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+Cjwvc3ZnPgo=' alt=''/>
                    </div>
                    <div className={styles.imgWrap} title='Вернуть из корзины' onClick={onClickReturnFromTrash}>
                        <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwMDAwMCI+CiAgICA8cGF0aCBkPSJNMTkgNGgtMy41bC0xLTFoLTVsLTEgMUg1djJoMTR6TTYgN3YxMmMwIDEuMS45IDIgMiAyaDhjMS4xIDAgMi0uOSAyLTJWN0g2em04IDd2NGgtNHYtNEg4bDQtNCA0IDRoLTJ6Ii8+CiAgICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+Cjwvc3ZnPgo=' alt=''/>
                    </div>
                </div>
            }
        </div>
    )
}
export default Menu