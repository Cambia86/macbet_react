import Row from 'react-bootstrap/Row';
export default function Championship(props) {
    return (

        <button 
            // className="btn-delete" 
            onClick={() => props.getChampionshipById(props.id)}
        >{props.name}:{props.id}</button> 
       
      
    )   
}