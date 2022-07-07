import React from "react";

function Tbody(props){

    function Meets(reunion){
       let Meeting = reunion.Participants.find((Partipant) => Partipant == props.idStudent)
       if(Meeting){
        return 'P'
       }else{
        return 'F'
       }
  
    }

    return (
        <tr >
            <td className="TdBirthday">{props.birthday}</td>
            <td className="TdName">{props.name}</td>
            <td className="TdPhoneN">{props.phoneN}</td>
            {props.reunions.map(reunion => (
                
               <td>{Meets(reunion)}</td> 
            ))}
            <td className="TdButton">
                <button id={props.idStudent} className={"Button_CallRoll"+ ' ' + props.valueCallRoll} onClick={props.callRoll}>{props.valueCallRoll}</button>
            </td>
        </tr>
    )
}

export default Tbody