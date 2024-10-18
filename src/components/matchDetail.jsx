
import Container from "react-bootstrap/esm/Container"
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import { FixtureAPI } from "../service/fixtureService"
import Table from 'react-bootstrap/Table';

export default function MatchDetail(props) {
    const { state } = useLocation();
    const [matchDetail, setMatchDetail] = useState({});
    const [homeTeamStats, setHomeTeamStats] = useState({});
    const [awayTeamStats, setAwayTeamStats] = useState({});
    const [infoMatch, setInfoMatch] = useState({});
    let showDetail = false;
    const [showPage, setShowPage] = useState(false);
    useEffect(() => {
        setShowPage(false);
        setMatchDetail({})
        getMatchDetail()
        // getfixturestats
      
    }, []);

    const getMatchDetail = () => {
        setInfoMatch({
            championshipId: state.championshipId,
            matchDay: state.matchDay,
            homeTeam: state.homeTeam,
            awayTeam: state.awayTeam,
            score: state.score
        })
        // if(state.previsionjson){
        //     setMatchDetail(state.previsionjson);
        // }else

        FixtureAPI.getMatchDetail(state.fixtureId, state.championshipId, state.matchDay, state.homeTeam, state.awayTeam, true).then((myjson) => {
            let cw;
            setMatchDetail(myjson.result);
            let cw2;
            setShowPage(true);

            FixtureAPI.getStatsByTeamId(state.championshipId,state.homeTeam.id).then((resHomeTeamStats) => {
                setHomeTeamStats(resHomeTeamStats);
            })
            FixtureAPI.getStatsByTeamId(state.championshipId,state.awayTeam.id).then((resAwayTeamStats) => {
                setAwayTeamStats(resAwayTeamStats);
            })
            
  // api/fixtures/statsByTeamId/:champId/fixtureid(is teamId) ->hometeam
        // api/fixtures/statsByTeamId/:champId/fixtureid(is teamId) -awayteam
        })

    }

    const checkColor = (value) => {
        let valInt= parseInt(value)
        if(valInt>=80)
            return "lightgreen";
        if(valInt<80 && valInt>=75)
            return "green"; 
        if(valInt<75 && valInt>=60)
            return "darkgreen"; 
        if(valInt<60 && valInt>=45)
                return "yellow";
        if(valInt<45 && valInt>=30)
            return "orange";
        if(valInt<30 && valInt>=15)
            return "red";
        if(valInt<15 )
            return "darkred";
      };

    return (
        <Container >
            {showPage &&
                <Row >
                    <Column> {infoMatch.homeTeam.name}</Column>
                    <Column> {infoMatch.score ? infoMatch.score.fulltime.home : null} ( {infoMatch.score ? infoMatch.score.halftime.home : null} ) -  ( {infoMatch.score ? infoMatch.score.halftime.away : null} ) {infoMatch.score ? infoMatch.score.fulltime.away : null} </Column>
                    <Column> {infoMatch.awayTeam.name}</Column>
                </Row>
            }
            {showPage &&
                <Row >
                    <Column> 1:{matchDetail.winHome.quotaPerc}</Column>
                    <Column> 1x:{matchDetail.winHomeOrDraw.quotaPerc}</Column>
                    <Column> X:{matchDetail.draw.quotaPerc}</Column>
                    <Column> x2:{matchDetail.winawayOrDraw.quotaPerc}</Column>
                    <Column> 2:{matchDetail.winAway.quotaPerc}</Column>
                </Row>
            }
            {showPage && <Row >
                <Column> Goal:{matchDetail.goal.quotaPerc}</Column>
                <Column> No-Goal:{matchDetail.nogoal.quotaPerc}</Column>
                <Column> C W un tempo:{matchDetail.casaVinceAlmenounTempo.quotaPerc}</Column>
                <Column> T W un tempo:{matchDetail.fuoriVinceAlmenounTempo.quotaPerc}</Column>
            </Row>
            }
            {showPage && <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Multigol</th>
                        <th>Casa</th>
                        <th>Trasferta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td  >1-3</td>
                        <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.multi_casa_13.quotaPerc)}` }}>{matchDetail.multi_casa_13.quotaPerc}</td>
                        <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.multi_trasf_13.quotaPerc)}` }}>{matchDetail.multi_trasf_13.quotaPerc}</td>
                    </tr>
                    <tr>
                        <td >1-4</td>
                        <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.multi_casa_14.quotaPerc)}` }}>{matchDetail.multi_casa_14.quotaPerc}</td>
                        <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.multi_trasf_14.quotaPerc)}` }}>{matchDetail.multi_trasf_14.quotaPerc}</td>
                    </tr>
                    <tr>
                        <td >2-4</td>
                        <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.multi_casa_24.quotaPerc)}` }}>{matchDetail.multi_casa_24.quotaPerc}</td>
                        <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.multi_trasf_24.quotaPerc)}` }}>{matchDetail.multi_trasf_24.quotaPerc}</td>
                    </tr>
                    <tr>
                        <td >3-9</td>
                        <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.multi_casa_39.quotaPerc)}` }}>{matchDetail.multi_casa_39.quotaPerc}</td>
                        <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.multi_trasf_39.quotaPerc)}` }}>{matchDetail.multi_trasf_39.quotaPerc}</td>
                    </tr>
                </tbody>
            </Table>}


            {showPage &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>U/O gol</th>
                            <th>under</th>
                            <th>over</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0,5 1T</td>
                            <td  style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.under_051T.quotaPerc)}` }}>{matchDetail.under_051T.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.over_051T.quotaPerc)}` }}>{matchDetail.over_051T.quotaPerc}</td>
                        </tr>
                        <tr>
                            <td>0,5</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.under_05.quotaPerc)}` }}>{matchDetail.under_05.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.over_05.quotaPerc)}` }}>{matchDetail.over_05.quotaPerc}</td>
                        </tr>
                        <tr>
                            <td>1,5</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.under_15.quotaPerc)}` }}>{matchDetail.under_15.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.over_15.quotaPerc)}` }}>{matchDetail.over_15.quotaPerc}</td>
                        </tr>
                        <tr>
                            <td>2,5</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.under_25.quotaPerc)}` }}>{matchDetail.under_25.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.over_25.quotaPerc)}` }}>{matchDetail.over_25.quotaPerc}</td>
                        </tr>
                        <tr>
                            <td>3,5</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.under_35.quotaPerc)}` }}>{matchDetail.under_35.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.over_35.quotaPerc)}` }}>{matchDetail.over_35.quotaPerc}</td>
                        </tr>
                        <tr>
                            <td>4,5</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.under_45.quotaPerc)}` }}>{matchDetail.under_45.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.over_45.quotaPerc)}` }}>{matchDetail.over_45.quotaPerc}</td>
                        </tr>
                    </tbody>
                </Table>
            }

            {showPage &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nr gol</th>
                            <th>Casa</th>
                            <th>Trasf</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.casaSegna0Goal.quotaPerc)}` }}>{matchDetail.casaSegna0Goal.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.fuoriSegna0Goal.quotaPerc)}` }}>{matchDetail.fuoriSegna0Goal.quotaPerc}</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.casaSegna1Goal.quotaPerc)}` }}>{matchDetail.casaSegna1Goal.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.fuoriSegna1Goal.quotaPerc)}` }}>{matchDetail.fuoriSegna1Goal.quotaPerc}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.casaSegna2Goal.quotaPerc)}` }}>{matchDetail.casaSegna2Goal.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.fuoriSegna2Goal.quotaPerc)}` }}>{matchDetail.fuoriSegna2Goal.quotaPerc}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.casaSegna3Goal.quotaPerc)}` }}>{matchDetail.casaSegna3Goal.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.fuoriSegna3Goal.quotaPerc)}` }}>{matchDetail.fuoriSegna3Goal.quotaPerc}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.casaSegna4Goal.quotaPerc)}` }}>{matchDetail.casaSegna4Goal.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.fuoriSegna4Goal.quotaPerc)}` }}>{matchDetail.fuoriSegna4Goal.quotaPerc}</td>
                        </tr>
                    </tbody>
                </Table>
            }

            {/* // tiri totali */}
            {showPage &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tiri Totali</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winHomeTiriTotali.quotaPerc)}` }}>{matchDetail.winHomeTiriTotali.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.drawTiriTotali.quotaPerc)}` }}>{matchDetail.drawTiriTotali.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winAwayTiriTotali.quotaPerc)}` }}>{matchDetail.winAwayTiriTotali.quotaPerc}</td>
                        </tr>
                    </tbody>
                </Table>
            }

            {/* tiri in porta */}
            {showPage &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tiri in porta</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winHomeTiriPorta.quotaPerc)}` }}>{matchDetail.winHomeTiriPorta.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.drawTiriPorta.quotaPerc)}` }}>{matchDetail.drawTiriPorta.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winAwayTiriPorta.quotaPerc)}` }}>{matchDetail.winAwayTiriPorta.quotaPerc}</td>
                        </tr>
                    </tbody>
                </Table>
            }

            {/* corner */}
            {showPage &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Corner</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winHomeCorner.quotaPerc)}` }}>{matchDetail.winHomeCorner.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.drawCorner.quotaPerc)}` }}>{matchDetail.drawCorner.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winAwayCorner.quotaPerc)}` }}>{matchDetail.winAwayCorner.quotaPerc}</td>
                        </tr>
                    </tbody>
                </Table>
            }

            {/* falli */}
            {showPage &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Falli</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winHomeFalli.quotaPerc)}` }}>{matchDetail.winHomeFalli.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.drawFalli.quotaPerc)}` }}>{matchDetail.drawFalli.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winAwayFalli.quotaPerc)}` }}>{matchDetail.winAwayFalli.quotaPerc}</td>
                        </tr>
                    </tbody>
                </Table>
            }

            {/* fuorigioco */}
            {showPage &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Fuorigioco</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winHomeFuorigioco.quotaPerc)}` }}>{matchDetail.winHomeFuorigioco.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.drawFurigioco.quotaPerc)}` }}>{matchDetail.drawFurigioco.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winAwayFuorigioco.quotaPerc)}` }}>{matchDetail.winAwayFuorigioco.quotaPerc}</td>
                        </tr>
                    </tbody>
                </Table>
            }

            {/* cartellin */}
            {showPage &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Cartellini</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winHomeCartellini.quotaPerc)}` }}>{matchDetail.winHomeCartellini.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.drawCartellini.quotaPerc)}` }}>{matchDetail.drawCartellini.quotaPerc}</td>
                            <td style={{ 'color': 'white', 'background-color': `${checkColor(matchDetail.winAwayCartellini.quotaPerc)}` }}>{matchDetail.winAwayCartellini.quotaPerc}</td>
                        </tr>
                    </tbody>
                </Table>
            }

        </Container>

    )
}