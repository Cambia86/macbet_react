

import Container from "react-bootstrap/esm/Container"

import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';

export default function PrevisionItemList(props) {
    
    return (
        <Container>
             <Row style={{padding:2}} key={props.item}  onClick={()=>props.getprevisionbydate(props.item)}>
                <Column>{props.item}</Column>
             </Row>
        </Container>
    )
}