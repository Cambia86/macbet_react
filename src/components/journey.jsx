
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { BetType } from '../class/Bettypes'

export default function Journey(props) {
    // const selectJourney = state => state.journey
    // const journeys = useSelector(selectJourney)
    // const survayers = useSelector(state => state.journey.currentJourney);
    const [betType, setBetType] = useState([]);
    const [selectedBetType, setSelectedBetType] = useState([]);
    const journyList = useSelector((state) => state.journey.currentJourney);

    useEffect(() => {
        // getPrevisionList();
        setBetType(new BetType().getTypes());

    }, [])

    const handleChange = (value) => {
        setSelectedBetType(value);
    }
    return (
        <div className="">
            <Container>
                {journyList && journyList && journyList.length > 0 && journyList.map((pi, i) => {
                    return <div>
                        <Row>
                            <Column>
                                {betType && betType.length > 0 &&
                                // <div>betType</div>
                                <select
                                value={selectedBetType}
                                onChange={e => handleChange(e.target.value)}>
                                {betType.map(o => (
                                    <option key={o.type} value={o.type}>{o.type}</option>
                                ))}
                            </select>
                                    // <select
                                    //     value={selectedBetType}
                                    //     onChange={e => handleChange(e.target.value)}>
                                    //     {betType.map(o => (
                                    //         <option key={o} value={o}>{o}</option>
                                    //     ))}
                                    // </select>
                                }
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <div className="logoSize"> <img className="logoSize" src={pi.homeTeam.logo} /></div>
                            </Column>
                            <Column>
                                {pi.homeTeam.name}
                            </Column>

                            <Column>
                                {pi.awayTeam.name}
                            </Column>
                            <Column>
                                <div className="logoSize"> <img className="logoSize" src={pi.awayTeam.logo} /></div>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                {pi.previsionType}
                            </Column>
                            <Column>
                                {pi.percSuccess}
                            </Column>
                        </Row>
                    </div>
                })}
            </Container>
            {/* <Container>
                    return <div>
                        <Row>
                            <Column>
                                {betType && betType.length > 0 &&
                                    <select
                                        value={selectedBetType}
                                        onChange={e => handleChange(e.target.value)}>
                                        {betType.map(o => (
                                            <option key={o} value={o}>{o}</option>
                                        ))}
                                    </select>
                                }
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <div className="logoSize"> <img className="logoSize" src={pi.homeTeam.logo} /></div>
                            </Column>
                            <Column>
                                {pi.homeTeam.name}
                            </Column>

                            <Column>
                                {pi.awayTeam.name}
                            </Column>
                            <Column>
                                <div className="logoSize"> <img className="logoSize" src={pi.awayTeam.logo} /></div>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                {pi.previsionType}
                            </Column>
                            <Column>
                                {pi.percSuccess}
                            </Column>
                        </Row>
                    </div>
            </Container> */}
        </div>
    );
}