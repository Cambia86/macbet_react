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
    const [selectedOption, setSelectedOption] = useState([]);

   
    const getPrevisionList = () => {
        FixtureAPI.getPrevisionList().then((prevJson) => {
            let prevreverse = prevJson.result.reverse();
            setprevList(prevreverse);
            saveToLocalStorage('currentPicchettiList', prevreverse)
        });
    }

    useEffect(() => {
        let _currentPicchetti = getFromLocalStorage('currentPicchettiList')
        let _currentPicchettoItem = getFromLocalStorage('currentPicchettoItem')
        if (_currentPicchetti != null) {
            setprevList(_currentPicchetti);
        } else {
            getPrevisionList();
        }
        if (_currentPicchettoItem) {
            setpicchettoItems(_currentPicchettoItem);
        }
    }, [])

    const getPrevisionbydate = (pItemDate) => {
        // alert(pItemDate)
        FixtureAPI.getPicchettiByName(pItemDate).then((prevJson) => {
            setpicchettoItems(prevJson);
            saveToLocalStorage('currentPicchettoItem', prevJson)
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

    const handleChange = (value) => {
        setSelectedOption(value)
        getPrevisionbydate(value);
    }




    return (
        <div className="">
            <Container>
                <Row>
                    <Column>
                        {prevList && prevList.length > 0 &&
                            <select
                                value={selectedOption}
                                onChange={e => handleChange(e.target.value, setSelectedOption)}>
                                {prevList.map(o => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        }
                    </Column>
                </Row>
                <Row>
                    <Column xs={12} md={8}>
                        {picchettoItems && picchettoItems.result && picchettoItems.result.length > 0 && picchettoItems.result.map((pi, i) => {
                            return <PrevisionItemContent key={i} picchettoItem={pi}></PrevisionItemContent>
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