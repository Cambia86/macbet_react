

import Container from "react-bootstrap/esm/Container"

import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import Col from "react-bootstrap/Col";

export default function PrevisionItemContent(props) {

    return (
        <Container style={{padding:2}} >
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
           
                {props.picchettoItem.prev1!=null && props.picchettoItem!="" &&
                     <Row>
                        <Column>{props.picchettoItem.prev1}</Column>
                        <Column>%{props.picchettoItem.prev1quotaPerc}</Column>
                        <Column>Hist{props.picchettoItem.prev1historyprob.toFixed(2)}</Column>
                        <Column>
                            <Row>
                                <Column>H {props.picchettoItem.success1Home}/{props.picchettoItem.fail1Home}</Column>
                                <Column>A {props.picchettoItem.success1Away}/{props.picchettoItem.fail1Away}</Column>
                            </Row>
                        </Column>
                         </Row>
                }
           
        </Container>
    )
}