
import Container from "react-bootstrap/esm/Container"
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { FixtureAPI } from "../service/fixtureService"
import { useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner";

// :champid/:matchDay/:homeTeamId/:awayTeamId
export default function ChampionshpBoardItem(props) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const navigatePage = () => {
        navigate('/details',
            {
                state: {
                    fixtureId: props.fixture.id,
                    championshipId: props.league.id,
                    matchDay: props.currentMatchDay,
                    homeTeam: props.homeTeam,
                    awayTeam: props.awayTeam,
                    score: props.score,
                    statistics_home: props.homeTeamStats,
                    statistics_away: props.awayTeamStats,
                }
            });
    }

    const visualDate = (value) => {
        return (new Date(value)).toLocaleString();
    }

    const downloadStats = (obj) => {
        setLoading(true);
        FixtureAPI.getFixturesStats(obj.fixture.id, obj.league.id).then((myjson) => {
            setLoading(false);
            props.refreshData()
        })
    }

    return (

        <Container>
            {loading ? (
                <TailSpin color="red" radius={"8px"} />
            ) :
                <div>
                    <Row style={{ padding: 10, textAlign: "center" }} key={props.fixture.date} >
                        <Column style={{ flex: 10 }}>{visualDate(props.fixture.date)}</Column>
                        {props.score != undefined && props.score.fulltime != undefined && props.score.fulltime.home != undefined && props.homeTeamStats == undefined && props.awayTeamStats == undefined &&
                            <Column>{
                                <button className="buttonaction"
                                    onClick={() => downloadStats(props)}
                                >stats</button>}</Column>}
                    </Row>
                    <Row style={{ padding: 10 }} key={props.fixture.id} onClick={navigatePage}>
                        <div className="logoSize"> <img className="logoSize" src={props.homeTeam.logo} /></div>
                        <Column style={{ textAlign: "center" }}>{props.homeTeam.name}</Column>
                        <Column style={{ textAlign: "center" }}>{props.score.fulltime.home} - {props.score.fulltime.away}</Column>
                        <Column style={{ textAlign: "center" }}>{props.awayTeam.name}</Column>
                        <div className="logoSize">  <img className="logoSize" src={props.awayTeam.logo} /></div>
                    </Row>
                </div>
            }
        </Container>
    )
}