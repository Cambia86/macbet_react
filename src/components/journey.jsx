
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';

export default function Journey(props) {
    // const selectJourney = state => state.journey
    // const journeys = useSelector(selectJourney)
    // const survayers = useSelector(state => state.journey.currentJourney);
    const journyList = useSelector((state) => state.journey.currentJourney);

    return (
        <div className="">
            <Container>
                {journyList && journyList && journyList.length > 0 && journyList.map((pi, i) => {
                    return <div>

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
        </div>
    );
}