import { useState, useEffect } from 'react';
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { FixtureAPI } from "../service/fixtureService"
import { TailSpin } from "react-loader-spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MultiplaStatistica(props) {
    const [prevList, setprevList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFromDate, setSelectedFromDate] = useState(null);
    const [selectedToDate, setSelectedToDate] = useState(null);

    const getMultipla = (fromdate, todate) => {
        setLoading(true);
        FixtureAPI.getMultipla(fromdate, todate).then((prevJson) => {
            setLoading(false);
            let prevreverse = prevJson.result;
            setprevList(prevreverse);

        }).finally(() => {
            setLoading(false);
        });
    }

    const onclick =()=>{
        getMultipla(selectedFromDate.toLocaleDateString("en-CA"),selectedToDate.toLocaleDateString("en-CA"))
    }

    useEffect(() => {
        // getMultipla("2024-12-10", "2024-12-18")
    }, [])

    return (
        <div> {loading ? (
            <TailSpin color="red" radius={"8px"} />
        ) :

            <Container>
                <Row>
                    <Column>
                        <DatePicker
                            selected={selectedFromDate}
                            onChange={(date) => setSelectedFromDate(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="FromDate"
                        />
                    </Column>
                    <Column>
                        <DatePicker
                            selected={selectedToDate}
                            onChange={(date) => setSelectedToDate(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="ToDate"
                        />
                    </Column>
                    <Column>
                        <button
                            className=""
                            onClick={() => onclick()}
                        >Cerca</button>
                    </Column>
                </Row>
                {prevList && prevList.length > 0 && prevList.map((pi, i) => {
                    return <div>
                        <Row>
                            <Column>{pi.dateFormatted}</Column>
                        </Row>
                        <Row>
                            <Column>
                                <div className="logoSize"> <img className="logoSize" src={pi.match.teams.home.logo} /></div>
                            </Column>
                            <Column>{pi.match.teams.home.name}</Column>
                            <Column>{pi.match.teams.away.name}</Column>
                            <Column>
                                <div className="logoSize"> <img className="logoSize" src={pi.match.teams.away.logo} /></div>
                            </Column>
                        </Row>
                        <Row>
                            {pi && pi.prevStatsFalli && <Column><p> {pi.prevStatsFalli}</p></Column>}
                            {pi && pi.prevStatsCorner && <Column><p> {pi.prevStatsCorner}</p></Column>}
                            {pi && pi.prevStatsTiriTotali && <Column><p> {pi.prevStatsTiriTotali}</p></Column>}
                            {pi && pi.prevStatsTiriPorta && <Column><p> {pi.prevStatsTiriPorta}</p></Column>}
                        </Row>
                    </div>
                })}

            </Container>


        }
        </div>
    );
}