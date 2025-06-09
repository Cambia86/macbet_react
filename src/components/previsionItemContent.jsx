

import Container from "react-bootstrap/esm/Container"
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import Col from "react-bootstrap/Col";
import { useNavigate } from 'react-router-dom'
import { FixtureAPI } from "../service/fixtureService"
import { useSelector, useDispatch } from 'react-redux'
// import journeySlice from '../store/slices/journeySlice'
import { addToJourney, removeFromJourney } from '../store/reducer/journeyReducer'
import { Journey } from '../class/journey'
import Button from '../sharedcomponent/button'

export default function PrevisionItemContent(props) {
    const navigate = useNavigate();
    const [currentProps, setCurrentProps] = useState([]);
    const [loading, setLoading] = useState(false);
    // const currentJourney = useSelector((state) => state.currentJourney)
    const dispatch = useDispatch();
    // const selectJourney = state => state.journey
    // const journeys = useSelector(selectJourney)
    const currentSelectedJourney = useSelector((state) => state.journey.currentJourney);

    const removeFromJourneyfn = (picchettoItem, prevision, percSuccess) => {
        if (props.currentPrevName.length > 0)
            dispatch(removeFromJourney(picchettoItem.match.fixture.id));
        else {
            // todo alert
        }
    }

    const addToJourneyfn = (picchettoItem, prevision, percSuccess) => {
        // dispatch(increment({picchettoItem,prevision}));
        if (props.currentPrevName.length > 0)
            dispatch(addToJourney(
                new Journey(props.currentPrevName, percSuccess, picchettoItem.match.fixture.id,
                    prevision, picchettoItem.match.teams.home,
                    picchettoItem.match.teams.away)));
        else {
            // todo alert
        }
    }

    const navigatePage = () => {
        let seeprops = props.picchettoItem;
        let _currentRealMatchDay = parseInt(props.picchettoItem.match.league.round.substring(props.picchettoItem.match.league.round.length - 2, props.picchettoItem.match.league.round.length));

        navigate('/details',
            {
                state: {
                    fixtureId: props.picchettoItem.match.fixture.id,
                    championshipId: props.picchettoItem.match.league.id,
                    matchDay: _currentRealMatchDay,//props.picchettoItem.match.league.round,
                    homeTeam: props.picchettoItem.match.teams.home,
                    awayTeam: props.picchettoItem.match.teams.away,
                    score: props.picchettoItem ? props.picchettoItem.result : null,
                    previsionjson: props.picchettoItem.previsionjson
                }
            });
    }

    const isdateOK = (props) => {
        const currentDate = new Date();
        const currdateadd1 = currentDate.setHours(currentDate.getHours() + 1)
        const givenDate = new Date(props.picchettoItem.match.fixture.date);

        if (givenDate <= currdateadd1) {
            return true;
        } else {
            return false;
        }
    }

    const isSelected = (picchetto, prev) => {
        let isselected = currentSelectedJourney.filter(d => d.fixtureId == picchetto.match.fixture.id && d.previsionType == prev);
        if (isselected.length > 0)
            return true;
        else
            return false;
    }

    const updateStats = (props) => {
        setLoading(true);
        if (props.picchettoItem && props.picchettoItem.match != undefined && props.currentPrevName && props.currentPrevName.length > 0) {
            let fixtureId = props.picchettoItem.match.fixture.id;
            let leagueId = props.picchettoItem.match.league.id;
            let prevName = props.currentPrevName
            FixtureAPI.updatePrevision(prevName, leagueId, fixtureId
            ).then((data) => {
                setLoading(false);
                props.picchettoItem.score = data.result;
                props.picchettoItem.result = data.result;
                // setRequestLineValue(data.result)
            }).finally(() => {
                setLoading(false);
            })
        }
        // let leagueId=props.match.league.id;
    }

    let canViewStatsButton = isdateOK(props);

    return (

        <Container style={{ padding: 2, margin: 10 }}>
            <Row>
                <Column>
                    {props.picchettoItem.result == undefined && canViewStatsButton &&
                        <button style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "5px 10px",
                            fontSize: "16px",
                            backgroundColor: "red",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                            onClick={() => updateStats(props)}>
                            stats
                        </button>}
                </Column>
                <Column>
                    <div className="logoSize"> <img className="logoSize" src={props.picchettoItem.match.teams.home.logo} /></div>
                </Column>
                <Column>
                    {props.picchettoItem.match.teams.home.name}
                </Column>
                {props.picchettoItem.result != undefined &&
                    <Column>
                        {props.picchettoItem.result.fulltime.home} - {props.picchettoItem.result.fulltime.away}
                    </Column>
                }
                <Column>
                    {props.picchettoItem.match.teams.away.name}
                </Column>
                <Column>
                    <div className="logoSize"> <img className="logoSize" src={props.picchettoItem.match.teams.away.logo} /></div>
                </Column>
                <Column>
                    <button style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "red",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }} onClick={navigatePage}>view</button>
                </Column>
            </Row>

            {props.picchettoItem != "" && props.picchettoItem.prev1 != undefined && props.picchettoItem.prev1 != "" &&
                <Row>
                    <Column>
                        {!isSelected(props.picchettoItem, props.picchettoItem.prev1) ? <Button value="+" color="blue" size="small" type="circle" onClick={() => addToJourneyfn(props.picchettoItem, props.picchettoItem.prev1, props.picchettoItem.prev1quotaPerc)}></Button>
                            : <Button value="-" color="red" size="small" type="circle" onClick={() => removeFromJourneyfn(props.picchettoItem, props.picchettoItem.prev1, props.picchettoItem.prev1quotaPerc)}></Button>}
                    </Column>
                    <Column>{props.picchettoItem.prev1}</Column>
                    <Column>%{props.picchettoItem.prev1quotaPerc}</Column>
                    <Column>Hist{(props.picchettoItem.prev1historyprob != "" && props.picchettoItem.prev1historyprob > 0) ? props.picchettoItem.prev1historyprob.toFixed(2) : 0}</Column>
                    <Column>
                        <Row>
                            <Column>H {props.picchettoItem.success1Home}/{props.picchettoItem.fail1Home}</Column>
                            <Column>A {props.picchettoItem.success1Away}/{props.picchettoItem.fail1Away}</Column>
                        </Row>
                    </Column>
                </Row>
            }
            {props.picchettoItem != "" && props.picchettoItem.prev2 != undefined && props.picchettoItem.prev2 != "" &&
                <Row>
                    <Column>
                        {!isSelected(props.picchettoItem, props.picchettoItem.prev2) ? <Button value="+" color="blue" size="small" type="circle" onClick={() => addToJourneyfn(props.picchettoItem, props.picchettoItem.prev2, props.picchettoItem.prev2quotaPerc)}></Button>
                            : <Button value="-" color="red" size="small" type="circle" onClick={() => removeFromJourneyfn(props.picchettoItem, props.picchettoItem.prev2, props.picchettoItem.prev2quotaPerc)}></Button>}
                    </Column>
                    <Column>{props.picchettoItem.prev2}</Column>
                    <Column>%{props.picchettoItem.prev2quotaPerc}</Column>
                    <Column>Hist{(props.picchettoItem.prev2historyprob != "" && props.picchettoItem.prev2historyprob > 0) ? props.picchettoItem.prev2historyprob.toFixed(2) : 0}</Column>
                    <Column>
                        <Row>
                            <Column>H {props.picchettoItem.success2Home}/{props.picchettoItem.fail2Home}</Column>
                            <Column>A {props.picchettoItem.success2Away}/{props.picchettoItem.fail2Away}</Column>
                        </Row>
                    </Column>
                </Row>
            }
            {props.picchettoItem != "" && props.picchettoItem.prev3 != undefined && props.picchettoItem.prev3 != "" &&
                <Row>
                    <Column>
                        {!isSelected(props.picchettoItem, props.picchettoItem.prev3) ? <Button value="+" color="blue" size="small" type="circle" onClick={() => addToJourneyfn(props.picchettoItem, props.picchettoItem.prev3, props.picchettoItem.prev3quotaPerc)}></Button>
                            : <Button value="-" color="red" size="small" type="circle" onClick={() => removeFromJourneyfn(props.picchettoItem, props.picchettoItem.prev3, props.picchettoItem.prev3quotaPerc)}></Button>}
                    </Column>
                    <Column>{props.picchettoItem.prev3}</Column>
                    <Column>%{props.picchettoItem.prev3quotaPerc}</Column>
                    <Column>Hist{(props.picchettoItem.prev3historyprob != "" && props.picchettoItem.prev3historyprob > 0) ? props.picchettoItem.prev3historyprob.toFixed(2) : 0}</Column>
                    <Column>
                        <Row>
                            <Column>H {props.picchettoItem.success3Home}/{props.picchettoItem.fail3Home}</Column>
                            <Column>A {props.picchettoItem.success3Away}/{props.picchettoItem.fail3Away}</Column>
                        </Row>
                    </Column>
                </Row>
            }
            {props.picchettoItem != "" && props.picchettoItem.prev4 != undefined && props.picchettoItem.prev4 != "" &&
                <Row>
                    <Column>
                        {!isSelected(props.picchettoItem, props.picchettoItem.prev4) ? <Button value="+" color="blue" size="small" type="circle" onClick={() => addToJourneyfn(props.picchettoItem, props.picchettoItem.prev4, props.picchettoItem.prev4quotaPerc)}></Button>
                            : <Button value="-" color="red" size="small" type="circle" onClick={() => removeFromJourneyfn(props.picchettoItem, props.picchettoItem.prev4, props.picchettoItem.prev4quotaPerc)}></Button>}

                    </Column>
                    <Column>{props.picchettoItem.prev4}</Column>
                    <Column>%{props.picchettoItem.prev4quotaPerc}</Column>
                    <Column>Hist{(props.picchettoItem.prev4historyprob != "" && props.picchettoItem.prev4historyprob > 0) ? props.picchettoItem.prev4historyprob.toFixed(2) : 0}</Column>
                    <Column>
                        <Row>
                            <Column>H {props.picchettoItem.success4Home}/{props.picchettoItem.fail4Home}</Column>
                            <Column>A {props.picchettoItem.success4Away}/{props.picchettoItem.fail4Away}</Column>
                        </Row>
                    </Column>
                </Row>
            }

            {props.picchettoItem != "" && props.picchettoItem.prev5 != undefined && props.picchettoItem.prev5 != "" &&
                <Row>
                    <Column>
                        {!isSelected(props.picchettoItem, props.picchettoItem.prev5) ? <Button value="+" color="blue" size="small" type="circle" onClick={() => addToJourneyfn(props.picchettoItem, props.picchettoItem.prev5, props.picchettoItem.prev5quotaPerc)}></Button>
                            : <Button value="-" color="red" size="small" type="circle" onClick={() => removeFromJourneyfn(props.picchettoItem, props.picchettoItem.prev5, props.picchettoItem.prev5quotaPerc)}></Button>}

                    </Column>
                    <Column>{props.picchettoItem.prev5}</Column>
                    <Column>%{props.picchettoItem.prev5quotaPerc}</Column>
                    <Column>Hist{(props.picchettoItem.prev5historyprob != "" && props.picchettoItem.prev5historyprob > 0) ? props.picchettoItem.prev5historyprob.toFixed(2) : 0}</Column>
                    <Column>
                        <Row>
                            <Column>H {props.picchettoItem.success5Home}/{props.picchettoItem.fail5Home}</Column>
                            <Column>A {props.picchettoItem.success5Away}/{props.picchettoItem.fail5Away}</Column>
                        </Row>
                    </Column>
                </Row>
            }
            {props.picchettoItem != "" && props.picchettoItem.prev6 != undefined && props.picchettoItem.prev6 != "" &&
                <Row>
                    <Column>
                        {!isSelected(props.picchettoItem, props.picchettoItem.prev6) ? <Button value="+" color="blue" size="small" type="circle" onClick={() => addToJourneyfn(props.picchettoItem, props.picchettoItem.prev6, props.picchettoItem.prev6quotaPerc)}></Button>
                            : <Button value="-" color="red" size="small" type="circle" onClick={() => removeFromJourneyfn(props.picchettoItem, props.picchettoItem.prev6, props.picchettoItem.prev6quotaPerc)}></Button>}

                    </Column>
                    <Column>{props.picchettoItem.prev6}</Column>
                    <Column>%{props.picchettoItem.prev6quotaPerc}</Column>
                    <Column>Hist{(props.picchettoItem.prev6historyprob != "" && props.picchettoItem.prev6historyprob > 0) ? props.picchettoItem.prev6historyprob.toFixed(2) : 0}</Column>
                    <Column>
                        <Row>
                            <Column>H {props.picchettoItem.success6Home}/{props.picchettoItem.fail6Home}</Column>
                            <Column>A {props.picchettoItem.success6Away}/{props.picchettoItem.fail6Away}</Column>
                        </Row>
                    </Column>
                </Row>
            }

        </Container>
    )
}