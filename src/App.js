import {useSelector} from "react-redux";

import Header from './components/Header/Header'
import LeftPanel from "./components/LeftPanel/LeftPanel";
import NotesList from "./components/NotesList/NotesList";
import AddNoteForm from "./components/AddNoteForm/AddNoteForm";
import TopPanel from "./components/TopPanel/TopPanel";
import ModalEdit from "./components/ModalEdit/ModalEdit";

import styles from './App.module.css';

const App = () => {
    const page = useSelector(state => state.app.page);
    const count = useSelector(state => state.topPanel.count);

    const {isOpenedModalEditForm} = useSelector(state => state.modalEditForm);

    return (
        <div className={styles.app}>
            {
                isOpenedModalEditForm && <ModalEdit/>
            }

            {
                count > 0 ? <TopPanel count={count}/> : <Header/>
            }

            <LeftPanel/>
            
            {
                page === 'notes' && <AddNoteForm/>
            }
            <NotesList/>
        </div>
    )
}
export default App