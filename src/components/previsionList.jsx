import { useState, useEffect } from 'react';
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { FixtureAPI } from "../service/fixtureService"


export default function PrevisionList(props) {
    const [prevList, setprevList] = useState([]);


    const getPrevisionList = () => {
        FixtureAPI.getPrevisionList().then((prevJson) => {
            setprevList(prevJson.result);
        });
    }

    useEffect(() => {
        getPrevisionList();
    }, [])

    return (
        <div className="">
            <Container>
                
                <Row>
                    <Column>
                    <ul>
                   {  prevList && prevList.map((pl)=>{
                  return  <li className='noBullet'>{pl}</li>
                   })}
                   </ul>
                    </Column>
                </Row>
            </Container>
        </div>
    );
}