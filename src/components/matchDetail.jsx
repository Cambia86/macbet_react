
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
    const [infoMatch, setInfoMatch] = useState({});
    let showDetail = false;
    const [showPage, setShowPage] = useState(false);
    useEffect(() => {
        setShowPage(false);
        setMatchDetail({})
        getMatchDetail()
        // getfixturestats
        // api/fixtures/statsByTeamId/:champId/fixtureid(is teamId) ->hometeam
        // api/fixtures/statsByTeamId/:champId/fixtureid(is teamId) -awayteam
    }, []);

    const getMatchDetail = () => {
        setInfoMatch({
            championshipId: state.championshipId,
            matchDay: state.matchDay,
            homeTeam: state.homeTeam,
            awayTeam: state.awayTeam,
            score: state.score
        })
        FixtureAPI.getMatchDetail(state.fixtureId, state.championshipId, state.matchDay, state.homeTeam, state.awayTeam, true).then((myjson) => {
            let cw;
            setMatchDetail(myjson.result);
            let cw2;
            setShowPage(true);
            // cw = myjson.result.slice(0, 10)
            // setCurrentview(cw);
        })

    }

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
                        <td>1-3</td>
                        <th>{matchDetail.multi_casa_13.quotaPerc}</th>
                        <th>{matchDetail.multi_trasf_13.quotaPerc}</th>
                    </tr>
                    <tr>
                        <td>1-4</td>
                        <th>{matchDetail.multi_casa_14.quotaPerc}</th>
                        <th>{matchDetail.multi_trasf_14.quotaPerc}</th>
                    </tr>
                    <tr>
                        <td>2-4</td>
                        <th>{matchDetail.multi_casa_24.quotaPerc}</th>
                        <th>{matchDetail.multi_trasf_24.quotaPerc}</th>
                    </tr>
                    <tr>
                        <td>3-9</td>
                        <th>{matchDetail.multi_casa_39.quotaPerc}</th>
                        <th>{matchDetail.multi_trasf_39.quotaPerc}</th>
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
                            <th>{matchDetail.under_051T.quotaPerc}</th>
                            <th>{matchDetail.over_051T.quotaPerc}</th>
                        </tr>
                        <tr>
                            <td>0,5</td>
                            <th>{matchDetail.under_05.quotaPerc}</th>
                            <th>{matchDetail.over_05.quotaPerc}</th>
                        </tr>
                        <tr>
                            <td>1,5</td>
                            <th>{matchDetail.under_15.quotaPerc}</th>
                            <th>{matchDetail.over_15.quotaPerc}</th>
                        </tr>
                        <tr>
                            <td>2,5</td>
                            <th>{matchDetail.under_25.quotaPerc}</th>
                            <th>{matchDetail.over_25.quotaPerc}</th>
                        </tr>
                        <tr>
                            <td>3,5</td>
                            <th>{matchDetail.under_35.quotaPerc}</th>
                            <th>{matchDetail.over_35.quotaPerc}</th>
                        </tr>
                        <tr>
                            <td>4,5</td>
                            <th>{matchDetail.under_45.quotaPerc}</th>
                            <th>{matchDetail.over_45.quotaPerc}</th>
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
                            <th>{matchDetail.casaSegna0Goal.quotaPerc}</th>
                            <th>{matchDetail.fuoriSegna0Goal.quotaPerc}</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <th>{matchDetail.casaSegna1Goal.quotaPerc}</th>
                            <th>{matchDetail.fuoriSegna1Goal.quotaPerc}</th>
                        </tr>
                        <tr>
                            <td>2</td>
                            <th>{matchDetail.casaSegna2Goal.quotaPerc}</th>
                            <th>{matchDetail.fuoriSegna2Goal.quotaPerc}</th>
                        </tr>
                        <tr>
                            <td>3</td>
                            <th>{matchDetail.casaSegna3Goal.quotaPerc}</th>
                            <th>{matchDetail.fuoriSegna3Goal.quotaPerc}</th>
                        </tr>
                        <tr>
                            <td>4</td>
                            <th>{matchDetail.casaSegna4Goal.quotaPerc}</th>
                            <th>{matchDetail.fuoriSegna4Goal.quotaPerc}</th>
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
                            <th>{matchDetail.winHomeTiriTotali.quotaPerc}</th>
                            <th>{matchDetail.drawTiriTotali.quotaPerc}</th>
                            <th>{matchDetail.winAwayTiriTotali.quotaPerc}</th>
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
                            <th>{matchDetail.winHomeTiriPorta.quotaPerc}</th>
                            <th>{matchDetail.drawTiriPorta.quotaPerc}</th>
                            <th>{matchDetail.winAwayTiriPorta.quotaPerc}</th>
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
                            <th>{matchDetail.winHomeCorner.quotaPerc}</th>
                            <th>{matchDetail.drawCorner.quotaPerc}</th>
                            <th>{matchDetail.winAwayCorner.quotaPerc}</th>
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
                            <th>{matchDetail.winHomeFalli.quotaPerc}</th>
                            <th>{matchDetail.drawFalli.quotaPerc}</th>
                            <th>{matchDetail.winAwayFalli.quotaPerc}</th>
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
                            <th>{matchDetail.winHomeFuorigioco.quotaPerc}</th>
               
                            <th>{matchDetail.drawFurigioco.quotaPerc}</th>
                            <th>{matchDetail.winAwayFuorigioco.quotaPerc}</th>
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
                            <th>{matchDetail.winHomeCartellini.quotaPerc}</th>
                            <th>{matchDetail.drawCartellini.quotaPerc}</th>
                            <th>{matchDetail.winAwayCartellini.quotaPerc}</th>
                        </tr>
                    </tbody>
                </Table>
            }

        </Container>

    )
}