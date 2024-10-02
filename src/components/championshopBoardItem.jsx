
import Container from "react-bootstrap/esm/Container"

import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';

import { useNavigate } from 'react-router-dom'

 // :champid/:matchDay/:homeTeamId/:awayTeamId
export default function ChampionshpBoardItem(props) {
    const navigate = useNavigate();

    const navigatePage=()=>{
        navigate('/details',
            { state:  {
                   fixtureId: props.fixture.id,
                   championshipId:props.league.id,
                   matchDay:props.currentMatchDay,
                   homeTeam:props.homeTeam,
                   awayTeam:props.awayTeam,
                   score:props.score
               }});
    }
    return (
        <Container>
             <Row style={{padding:10}} key={props.fixture.id}  onClick={navigatePage}>
             <div className="logoSize"> <img className="logoSize" src={props.homeTeam.logo}/></div> 
                 <Column>{props.homeTeam.name}</Column>
                 <Column>{props.score.fulltime.home} - {props.score.fulltime.away}</Column>
                 <Column>{props.awayTeam.name}</Column>
                 <div className="logoSize">  <img className="logoSize" src={props.awayTeam.logo}/></div> 
             </Row>

        </Container>
    )   
}