
import Container from "react-bootstrap/esm/Container"
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import { FixtureAPI } from "../service/fixtureService"

export default function MatchDetail(props) {
    const {state} = useLocation();
    const [matchDetail, setMatchDetail] = useState([]);

    useEffect(() => {
        getMatchDetail()
    }, []);

    const getMatchDetail = () => {
        FixtureAPI.getMatchDetail(state.fixtureId,state.championshipId,state.matchDay,state.homeTeam,state.awayTeam, true).then((myjson) => {
            let  cw;
            setMatchDetail(myjson.result);
            // cw = myjson.result.slice(0, 10)
            // setCurrentview(cw);
        })

    }

    return (
        <Container>
            <p>MatchDetail {state.fixtureId} - {state.championshipId} - {state.matchDay} </p>
        </Container>
    )   
}