
import Container from "react-bootstrap/esm/Container"

import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';

import { useNavigate } from 'react-router-dom'

 // :champid/:matchDay/:homeTeamId/:awayTeamId
export default function ChampionshpBoardItem(props) {
    const navigate = useNavigate()
    return (
        <Container>
             <Row key={props.fixture.id}  onClick={() =>navigate('/details',
             { state:  {
                    fixtureId: props.fixture.id,
                    championshipId:props.league.id,
                    matchDay:props.currentMatchDay
                }}
             )}>
             <div className="logoSize"> <img className="logoSize" src={props.homeTeam.logo}/></div> 
                 <Column>{props.homeTeam.name}</Column>
                 <Column>{props.score.fulltime.home} - {props.score.fulltime.away}</Column>
                 <Column>{props.awayTeam.name}</Column>
                 <div className="logoSize">  <img className="logoSize" src={props.awayTeam.logo}/></div> 
             </Row>

        </Container>
    )   
}