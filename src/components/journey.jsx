
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Container from "react-bootstrap/esm/Container"

export default function Journey(props) {
    // const selectJourney = state => state.journey
    // const journeys = useSelector(selectJourney)
    // const survayers = useSelector(state => state.journey.currentJourney);
    const count = useSelector((state) => state.journey.currentJourney);

    return (
        <div className="">
             <Container>
                <p>test</p>
             </Container>
        </div>
    );
}