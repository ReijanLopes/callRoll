import React from "react";

function Thead(props){
    
    return(
        <thead>
            <tr>
                <td>{props.headerBirthday}</td>
                <td>{props.headerName}</td>
                <td>{props.headerPhoneN}</td>
                {props.headerLastMeetings.map(ele => (
                    <td key={ele._id}>{ele.MeetingDate}</td>
                ))}

                <td>
                    <p>Hoje</p>
                    <p>{props.headerToday}</p>
                </td>
            </tr>
        </thead>
    )
}

export default Thead