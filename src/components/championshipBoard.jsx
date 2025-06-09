import { useState, useEffect } from 'react';
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { FixtureAPI } from "../service/fixtureService"
import Championship from './championship';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ChampionshpBoardItem from './championshopBoardItem';
import { useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner";

export default function ChampionshipBoard(props) {
    //  let currentMatchDay =1;
    const [currentMatchDay, setCurrentMatchDay] = useState([]);
    const [currentview, setCurrentview] = useState([]);
    const [currentRealMatchDay, setRealCUrrentMatchday] = useState(1);
    const [currentChampioshipSelected, setCurrentChampioshipSelected] = useState([]);
    const [champBoard, setChampionshipBoard] = useState([]);
    const [selectedOption, setSelectedOption] = useState('135');
    const [loading, setLoading] = useState(false);

    const [championshipList, setChampionshipList] = useState([]);
    const navigate = useNavigate();
    // currentview=[]

    const saveToLocalStorage = (key, data) => {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    const getFromLocalStorage = (key) => {
        let _d = window.localStorage.getItem(key)
        if (_d != "")
            return JSON.parse(_d);
        else
            return null
    }

    useEffect(() => {
        fetchChampionship()
        setCurrentMatchDay(1)
        let cw
        let _currentMatchDay = getFromLocalStorage('currentMatchDay')

        let _currentmatches = window.localStorage.getItem('currentCahmpionshipMatches') != "" ? JSON.parse(window.localStorage.getItem('currentCahmpionshipMatches')) : null;
        if (_currentmatches && _currentmatches.length > 0) {
            cw = _currentmatches.filter(d => d.league.round.substring(d.league.round.length - 2, d.league.round.length) == _currentMatchDay
                && new Date(d.fixture.date).getTime() > new Date('2024-07-01').getTime())
            setChampionshipBoard(_currentmatches);
        } else {
            cw = []
        }
        if (cw && cw.length > 0) {
            let _currentRealMatchDay;
            if (currentChampioshipSelected == 2) {
                _currentRealMatchDay = _currentMatchDay
            } else {
                _currentRealMatchDay = parseInt(cw[0].league.round.substring(cw[0].league.round.length - 2, cw[0].league.round.length));
            }
            setRealCUrrentMatchday(_currentRealMatchDay)
            saveToLocalStorage('currentMatchDay', _currentRealMatchDay)
        }
        setCurrentview(cw);

    }, []);

    const fetchChampionship = () => {
        let d = [];
        d.push({ "id": "135", "name": "Serie A" });
        d.push({ "id": "39", "name": "Premier" });
        d.push({ "id": "140", "name": "Liga" });
        d.push({ "id": "61", "name": "Ligue1" });
        d.push({ "id": "78", "name": "BundesLiga" });
        d.push({ "id": "2", "name": "Champions League" });
        d.push({ "id": "15", "name": "Fifa world cup" });
        setChampionshipList(d)
    }


    const back = (e) => {
        setCurrentMatchDay(currentMatchDay - 1)
        let _currentRealMatchDay = currentRealMatchDay - 1
        setRealCUrrentMatchday(_currentRealMatchDay)
        let start, end, cw;
        if (currentMatchDay == 0) {
            cw = champBoard.slice(0, 10)
        } else {
            // cw = champBoard.slice(10 * currentRealMatchDay, 10 * currentRealMatchDay + 10)
            if (currentChampioshipSelected == 2) {
                start = currentMatchDay * 10;
                end = (currentMatchDay * 10) - 10;
                cw = champBoard.slice(end, start)
            }
            else {
                cw = champBoard.filter(d => d.league.round.substring(d.league.round.length - 2, d.league.round.length) == _currentRealMatchDay
                    && new Date(d.fixture.date).getTime() > new Date('2024-07-01').getTime())
            }

            // cw = champBoard.filter(d => d.league.round.substring(d.league.round.length - 2, d.league.round.length) == _currentRealMatchDay
            //     && new Date(d.fixture.date).getTime() > new Date('2024-07-01').getTime())
        }
        // setRealCUrrentMatchday(parseInt(cw[0].league.round.substring(cw[0].league.round.length - 2, cw[0].league.round.length)))
        setCurrentview(cw);
        saveToLocalStorage('currentMatchDay', _currentRealMatchDay)
    }

    const forward = (e) => {
        setCurrentMatchDay(currentMatchDay + 1)
        let _currentRealMatchDay = currentRealMatchDay + 1
        setRealCUrrentMatchday(_currentRealMatchDay)
        let start, end, cw;
        if (currentMatchDay == 0) {
            cw = champBoard.slice(0, 10)
        } else {
            if (currentChampioshipSelected == 2) {
                start = currentMatchDay * 10;
                end = (currentMatchDay * 10) + 10
                cw = champBoard.slice(start, end)
            }
            else {
                cw = champBoard.filter(d => d.league.round.substring(d.league.round.length - 2, d.league.round.length) == _currentRealMatchDay
                    && new Date(d.fixture.date).getTime() > new Date('2024-07-01').getTime())
            }

        }

        // setRealCUrrentMatchday(parseInt(cw[0].league.round.substring(cw[0].league.round.length - 2, cw[0].league.round.length)))
        setCurrentview(cw);
        saveToLocalStorage('currentMatchDay', _currentRealMatchDay)
    }


    const getChampionshipById = (id) => {
        setCurrentChampioshipSelected(id);
        setLoading(true);
        FixtureAPI.get(id, true).then((myjson) => {
            setLoading(false);
            let cw;
            let currMatchDay = 0;
            if (currentRealMatchDay != null) {
                let from = 10 * (currentRealMatchDay - 1)
                let to = from + 10
                cw = myjson.result.slice(from, to)
            } else {
                cw = myjson.result.slice(0, 10)
                currMatchDay = parseInt(cw[0].league.round.substring(cw[0].league.round.length - 2, cw[0].league.round.length))
                setRealCUrrentMatchday(currMatchDay)
            }

            setChampionshipBoard(myjson.result);


            setCurrentview(cw);
            window.localStorage.setItem('currentCahmpionshipMatches', JSON.stringify(myjson.result));
        })
    }


    const navigaHome = () => {
        navigate('/');
    }

    const navigaPrevision = () => {
        navigate('/previsionList');
    }

    const navigaJourney = () => {
        navigate('/journey');
    }

    // previsionList
    const navigatePage = () => {
        navigate('/previsionList',
            // { state:  {
            //        fixtureId: props.fixture.id,
            //        championshipId:props.league.id,
            //        matchDay:props.currentMatchDay,
            //        homeTeam:props.homeTeam,
            //        awayTeam:props.awayTeam,
            //        score:props.score
            //    }}
        );
    }

    const handleChange = (value) => {
        setSelectedOption(value)
        getChampionshipById(value)
    }

    const downloadResults = (value) => {
        setLoading(true);
        let _cwids = currentview.map(d => { return { "id": d.fixture.id } })

        FixtureAPI.downloadResults(selectedOption, _cwids, true).then((myjson) => {
            setLoading(false);
            getChampionshipById(currentChampioshipSelected)
        })
    }

    const refreshData = () => {
        getChampionshipById(currentChampioshipSelected)
    }

    return (

        <div className="">
            {loading ? (
                <TailSpin color="red" radius={"8px"} />
            ) : <div>
                <Container>

                    <Row style={{ "margin-top": 10 }} >
                        <Column>
                            {championshipList && championshipList.length > 0 &&
                                <select
                                    value={selectedOption}
                                    onChange={e => handleChange(e.target.value, setSelectedOption)}>
                                    {championshipList.map(o => (
                                        <option key={o.id} value={o.id}>{o.name}</option>
                                    ))}
                                </select>
                            }
                        </Column>
                        <Column xs>
                            <button class="buttonNavigation"
                                onClick={() => downloadResults()}>download</button>
                        </Column>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Column>    <button class="buttonNavigation"
                            onClick={() => back()}
                        >back</button></Column>
                        <Column>  <div>{currentRealMatchDay}</div>  </Column>
                        <Column>   <button class="buttonNavigation"
                            onClick={() => forward()}
                        >forward</button></Column>
                    </Row>
                </Container>

                <p className="post-body">{currentview.map((c) => {
                    return <ChampionshpBoardItem
                        homeTeam={c.teams.home}
                        awayTeam={c.teams.away}
                        score={c.score}
                        fixture={c.fixture}
                        league={c.league}
                        currentMatchDay={currentRealMatchDay}
                        homeTeamStats={c.statistics_home}
                        awayTeamStats={c.statistics_away}
                        refreshData={refreshData}
                    // navigateDetail={navigateDetail}
                    />

                })}</p>
            </div>}
        </div>
    )
}