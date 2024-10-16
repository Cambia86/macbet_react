import { useState, useEffect } from 'react';
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { FixtureAPI } from "../service/fixtureService"
import PrevisionItemList from './previsionItemList';
import PrevisionItemContent from './previsionItemContent'

export default function PrevisionList(props) {
    const [prevList, setprevList] = useState([]);
    const [picchettoItems, setpicchettoItems] = useState([]);


    const getPrevisionList = () => {
        FixtureAPI.getPrevisionList().then((prevJson) => {
            let prevreverse = prevJson.result.reverse();
            setprevList(prevreverse);
            saveToLocalStorage('currentPicchettiList', prevreverse)
        });
    }

    useEffect(() => {
        let _currentPicchetti = getFromLocalStorage('currentPicchettiList')
        if (_currentPicchetti != null) {
            setprevList(_currentPicchetti);
        } else {
            getPrevisionList();
        }
    }, [])

    const getPrevisionbydate = (pItemDate) => {
        // alert(pItemDate)
        FixtureAPI.getPicchettiByName(pItemDate).then((prevJson) => {
            setpicchettoItems(prevJson);

        });
    }


    const saveToLocalStorage = (key, data) => {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    const getFromLocalStorage = (key) => {
        let _d = window.localStorage.getItem(key)
        if (_d != null)
            return JSON.parse(_d);
        else
            return null
    }


    return (
        <div className="">
            <Container>
                <Row>
                    <Column xs={3} md={2}>
                        <ul>
                            {prevList && prevList.length > 0 && prevList.map((pl, i) => {
                                return <PrevisionItemList
                                    key={i}
                                    item={pl}
                                    getprevisionbydate={getPrevisionbydate}
                                />
                            })}
                        </ul>
                    </Column>
                    <Column xs={12} md={8}>
                        {picchettoItems && picchettoItems.result && picchettoItems.result.length > 0 && picchettoItems.result.map((pi,i) => {
                           return <PrevisionItemContent   key={i} picchettoItem={pi}></PrevisionItemContent>
                        })}
                    </Column>
                </Row>
            </Container>
        </div>
    );
}

// function previsionItemList(props) {
//     return (
//         // <Row style={{padding:10}} key={props.fixture.id}  onClick={navigatePage}>
//         <li className='noBullet'>{props.item}  onClick={getPrevisionbydate(props.item)}</li>
//     )
// }