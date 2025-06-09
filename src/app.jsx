import { useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./pages/Layout";
import ChampionshipBoard from './components/championshipBoard';
import Tabs from './components/tabs';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {

    const [posts, setPosts] = useState([]);
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
        // <div style={{ padding: 20 }}>
        //   <h1>Benvenuto su React + Vite!</h1>
        //   <p>Questo è il tuo progetto base pronto per deploy su Render.</p>
        // </div>
        <main>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<ChampionshipBoard />} />
                        <Route path="previsionList" element={<Tabs />} />
                        {/* <Route path="journey" element={<Journey />} />
                        <Route path="details" element={<MatchDetail />} />
                        <Route path="*" element={<NoPage />} /> */}
                    </Route>
                </Routes>
            </Router>
        </main>
    )
}