import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { FixtureAPI } from "../service/fixtureService"
import PrevisionItemList from './previsionItemList';
import PrevisionItemContent from './previsionItemContent'
import { setNavigationDate } from '../store/reducer/navigationReducer'
import { TailSpin } from "react-loader-spinner";

export default function PrevisionList(props) {
    const [prevList, setprevList] = useState([]);
    const [picchettoItems, setpicchettoItems] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [loading, setLoading] = useState(false);
    // const dispatch = useDispatch();
    // const selectNavigation = state => state.navigation
    // const navigation = useSelector(selectNavigation)
    // const currPrevDay = useSelector((state) => state.navigation.currentPrevisionDay);

    const getPrevisionList = () => {
        setLoading(true);
        FixtureAPI.getPrevisionList().then((prevJson) => {
            setLoading(false);
            let prevreverse = prevJson.result.reverse();
            setprevList(prevreverse);
            saveToLocalStorage('currentPicchettiList', prevreverse)
        });
    }

    useEffect(() => {
        // getPrevisionList();
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
        // let _prevlist = ["2025-01-09_new",
        //     "2025-01-14_new_2",
        //     "2025-01-15_new",
        //     "2025-01-16_new",
        //     "2025-01-17_new",
        //     "2025-01-18_new",
        //     "2025-01-19_new",
        //     "2025-01-20_new"]
        //     setprevList(_prevlist)
        // getPrevisionList();
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
        // dispatch(setNavigationDate(value))
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
                                onChange={e => handleChange(e.target.value)}>
                                {prevList.map(o => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        }
                    </Column>
                </Row>
                {loading ? (
                    <TailSpin color="red" radius={"8px"} />
                ) :
                    <Row>
                        <Column>
                            {picchettoItems && picchettoItems.result && picchettoItems.result.length > 0 && picchettoItems.result.map((pi, i) => {
                                return <PrevisionItemContent key={i} picchettoItem={pi} currentPrevName={selectedOption}></PrevisionItemContent>
                            })}
                        </Column>
                    </Row>}
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