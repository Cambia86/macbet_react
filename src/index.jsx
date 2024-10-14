
import { useState, useEffect ,createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPost from './components/addPost';
import Post from './components/post';
import ChampionshipBoard from './components/championshipBoard';
import PrevisionList from  './components/previsionList';
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

    const addPost = (title, body) => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: Math.random().toString(36).slice(2),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPosts((prevPosts) => [data, ...prevPosts])
            })
    };

    const getChampionshipById = (id) => {
        fetch(`https://macbet-be.glitch.me/api/fixtures/${id}`, {
            method: 'GET',
            headers: {

                "Content-Type": "application/json",
            },
        })
            .then(response => {
                return response.json();
            }).then(myjson => {
                setChampionship(myjson.result);
            })
            .then(data => console.log(data))
            .catch(error => console.error(error))

    }

    const deletePost = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.status === 200) {
                    setPosts(
                        posts.filter((post) => {
                            return post.id !== id;
                        })
                    )
                }
            })
    };

    return (

        <main>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<ChampionshipBoard />} />
                        <Route path="previsionList" element={<PrevisionList />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="details" element={<MatchDetail />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            {/* <h1>Consuming REST api tutorial</h1> */}
            {/* <Container>
                <Row>
                    {championshipList.map((champ) =>
                        <Column xs>
                            <Championship id={champ.id} name={champ.name} getChampionshipById={getChampionshipById} />
                        </Column>
                    )}
                </Row>
            </Container> */}
{/* 
            {
                (champ && champ != null && champ.length > 0)
                    ? <ChampionshipBoard data={champ} />
                    : <p>Loading...</p>
            } */}


            {/* <AddPost addPost={addPost} />
            <section className="posts-container">
                <h2>Posts</h2>
                {posts.map((post) =>
                    <Post
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        body={post.body}
                        deletePost={deletePost}
                    />
                )}
            </section> */}
        </main>
    )
}

// ReactDOM.createRoot(document.getElementById('root')).render(<App />); 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

