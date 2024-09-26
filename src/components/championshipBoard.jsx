import { useState, useEffect } from 'react';
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { FixtureAPI } from "../service/fixtureService" 
import Championship from './championship';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ChampionshpBoardItem from './championshopBoardItem';

export default function ChampionshipBoard(props) {
    //  let currentMatchDay =1;
    const [currentMatchDay, setCurrentMatchDay] = useState([]);
    const [currentview, setCurrentview] = useState([]);

    const [champBoard, setChampionshipBoard] = useState([]);

    const [championshipList, setChampionshipList] = useState([]);
    // currentview=[]

    useEffect(() => {
        fetchChampionship()
        setCurrentMatchDay(1)
        let cw
        if (props.data && props.data.length > 0) {
            cw = props.data.slice(0, 10)
        } else
            cw = []

        setCurrentview(cw);

    }, []);

    const fetchChampionship = () => {
        let d = [];
        d.push({ "id": "135", "name": "Serie A" });
        d.push({ "id": "39", "name": "Premier" });
        setChampionshipList(d)
    }


    const back = (e) => {
        setCurrentMatchDay(currentMatchDay - 1)
        let start, end, cw;
        if (currentMatchDay == 0) {
            cw = champBoard.slice(0, 10)
        } else {
            cw = champBoard.slice(10 * currentMatchDay, 10 * currentMatchDay + 10)
        } setCurrentview(cw);
    }
    const forward = (e) => {
        setCurrentMatchDay(currentMatchDay + 1)
        let start, end, cw;
        if (currentMatchDay == 0) {
            cw = champBoard.slice(0, 10)
        } else {
            cw = champBoard.slice(10 * currentMatchDay, 10 * currentMatchDay + 10)
        }

        setCurrentview(cw);
    }

    const getChampionshipById = (id) => {
        FixtureAPI.get(id, true).then((myjson) => {
            let  cw;
            setChampionshipBoard(myjson.result);
            cw = myjson.result.slice(0, 10)
            setCurrentview(cw);
        })

    }

    return (
        <div className="post-card">
            <Container>
                <Row>
                    {championshipList.map((champ) =>
                        <Column xs>
                            <Championship id={champ.id} name={champ.name} getChampionshipById={getChampionshipById} />
                        </Column>
                    )}
                </Row>
            </Container>
            <Container>
                <Row>
                    <Column>    <button
                        onClick={() => back()}
                    >back</button></Column>
                    <Column>   <button
                        onClick={() => forward()}
                    >forward</button></Column>
                </Row>
            </Container>

            <p className="post-body">{currentview.map((c) => {
                return <ChampionshpBoardItem
                homeTeam={c.teams.home}
                awayTeam={c.teams.away}
                score={c.score}
                fixture={c.fixture}
                />

            })}</p>
        </div>
    )
}