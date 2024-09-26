import Row from 'react-bootstrap/Row';
export default function Championship(props) {
    return (

        <button 
            // className="btn-delete" 
            onClick={() => props.getChampionshipById(props.id)}
        >{props.name}:{props.id}</button> 
       
        // <div className="post-card">
        //     <h2 className="post-title">{props.name}</h2>
        //     <p className="post-body">{props.id}</p>
            // {/* <button 
            //     className="btn-delete" 
            //     onClick={() => props.deletePost(props.id)}
            // >Delete</button> */}
        // </div>
    )   
}