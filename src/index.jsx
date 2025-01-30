
import { useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route,Link  } from "react-router-dom";
import AddPost from './components/addPost';
import ChampionshipBoard from './components/championshipBoard';
import PrevisionList from './components/previsionList';
import Championship from './components/championship';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import './index.css';
import MatchDetail from './components/matchDetail';
import Tabs from './components/tabs';
import { Provider } from 'react-redux';
import store , { persistor } from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import Journey from './components/journey';


function App() {


    const [posts, setPosts] = useState([]);
    const [team, setTeam] = useState([]);
    const [champ, setChampionship] = useState([]);
    const [championshipList, setChampionshipList] = useState([]);

    const fetchPosts = () => {
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=4")
            .then((response) => response.json())
            .then((data) => setPosts(data))
    }

    const fetchChampionship = () => {
        let d = [];
        d.push({ "id": "135", "name": "Serie A" });
        d.push({ "id": "2", "name": "Premier" });
        setChampionshipList(d)
    }

    useEffect(() => {
        fetchChampionship()
    }, []);

    useEffect(() => {
        fetchPosts()
    }, []);


    return (

        <main>
            <BrowserRouter>
                {/* <nav>
                    <Link to="/">Home</Link> | <Link to="/previsionList">previsionList</Link>| <Link to="/journey">journey</Link>
                </nav> */}
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<ChampionshipBoard />} />
                        {/* <Route path="previsionList" element={<PrevisionList />} /> */}
                        <Route path="previsionList" element={<Tabs />} />
                        {/* <Route path="contact" element={<Contact />} /> */}
                        <Route path="journey" element={<Journey />} />
                        <Route path="details" element={<MatchDetail />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
    )
}

// ReactDOM.createRoot(document.getElementById('root')).render(<App />); 
const root = ReactDOM.createRoot(document.getElementById('root'));
// const store = createStore(rootReducer)
root.render(<Provider store={store}>
       <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
       <App />
       </PersistGate>
     </Provider>);

