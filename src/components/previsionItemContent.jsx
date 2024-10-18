

import Container from "react-bootstrap/esm/Container"

import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import Col from "react-bootstrap/Col";
import { useNavigate } from 'react-router-dom'

export default function PrevisionItemContent(props) {
    const navigate = useNavigate();

    const navigatePage = () => {
        let seeprops=props.picchettoItem;
        let _currentRealMatchDay=parseInt(props.picchettoItem.match.league.round.substring(props.picchettoItem.match.league.round.length - 2, props.picchettoItem.match.league.round.length));
            
        navigate('/details',
            { state:  {
                   fixtureId: props.picchettoItem.match.fixture.id,
                   championshipId:props.picchettoItem.match.league.id,
                   matchDay:_currentRealMatchDay,//props.picchettoItem.match.league.round,
                   homeTeam:props.picchettoItem.match.teams.home,
                   awayTeam:props.picchettoItem.match.teams.away,
                   score:null,
                   previsionjson:props.picchettoItem.previsionjson
               }});
    }

    return (
        <Container style={{ padding: 2, margin: 10 }} onClick={navigatePage}>
            <Row>  <Column>
                <div className="logoSize"> <img className="logoSize" src={props.picchettoItem.match.teams.home.logo} /></div>
            </Column>
                <Column>
                    {props.picchettoItem.match.teams.home.name}
                </Column>
                <Column>
                    {props.picchettoItem.match.teams.away.name}
                </Column>
                <Column>
                    <div className="logoSize"> <img className="logoSize" src={props.picchettoItem.match.teams.away.logo} /></div>
                </Column>
            </Row>

            {props.picchettoItem != "" && props.picchettoItem.prev1 != "" &&
                <Row>
                    <Column>{props.picchettoItem.prev1}</Column>
                    <Column>%{props.picchettoItem.prev1quotaPerc}</Column>
                    <Column>Hist{props.picchettoItem.prev1historyprob != "" ? props.picchettoItem.prev1historyprob.toFixed(2) : 0}</Column>
                    <Column>
                        <Row>
                            <Column>H {props.picchettoItem.success1Home}/{props.picchettoItem.fail1Home}</Column>
                            <Column>A {props.picchettoItem.success1Away}/{props.picchettoItem.fail1Away}</Column>
                        </Row>
                    </Column>
                </Row>
            }
            {props.picchettoItem != "" && props.picchettoItem.prev2 != "" &&
                <Row>
                    <Column>{props.picchettoItem.prev2}</Column>
                    <Column>%{props.picchettoItem.prev2quotaPerc}</Column>
                    <Column>Hist{props.picchettoItem.prev2historyprob != "" ? props.picchettoItem.prev2historyprob.toFixed(2) : 0}</Column>
                    <Column>
                        <Row>
                            <Column>H {props.picchettoItem.success2Home}/{props.picchettoItem.fail2Home}</Column>
                            <Column>A {props.picchettoItem.success2Away}/{props.picchettoItem.fail2Away}</Column>
                        </Row>
                    </Column>
                </Row>
            }
            {props.picchettoItem != "" && props.picchettoItem.prev3 != "" &&
                <Row>
                    <Column>{props.picchettoItem.prev3}</Column>
                    <Column>%{props.picchettoItem.prev3quotaPerc}</Column>
                    <Column>Hist{props.picchettoItem.prev3historyprob != "" ? props.picchettoItem.prev3historyprob.toFixed(2) : 0}</Column>
                    <Column>
                        <Row>
                            <Column>H {props.picchettoItem.success3Home}/{props.picchettoItem.fail3Home}</Column>
                            <Column>A {props.picchettoItem.success3Away}/{props.picchettoItem.fail3Away}</Column>
                        </Row>
                    </Column>
                </Row>
            }
            {props.picchettoItem != "" && props.picchettoItem.prev4 != "" &&
                <Row>
                    <Column>{props.picchettoItem.prev4}</Column>
                    <Column>%{props.picchettoItem.prev4quotaPerc}</Column>
                    <Column>Hist{props.picchettoItem.prev4historyprob != "" ? props.picchettoItem.prev4historyprob.toFixed(2) : 0}</Column>
                    <Column>
                        <Row>
                            <Column>H {props.picchettoItem.success4Home}/{props.picchettoItem.fail4Home}</Column>
                            <Column>A {props.picchettoItem.success4Away}/{props.picchettoItem.fail4Away}</Column>
                        </Row>
                    </Column>
                </Row>
            }


        </Container>
    )
}