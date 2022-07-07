import React from "react";
import Thead from './Thead'
import Tbody from "./Tbody";

function Table(props){

    const date = new Date()
    let getdate = date.getDate()
    let getmonth = date.getMonth() + 1
    let today;
    let month;
    if(getdate < 10){
        today = '0' + getdate
    }
    if(getmonth < 10){
        month = '0' + getmonth
    }



    return(
        <table>
            <Thead 
                headerBirthday='Data de aniversario' 
                headerName='Nome' 
                headerPhoneN='Numero de celular'  
                headerLastMeetings={props.DBR}
                headerToday={today + '/' + month}
                />
            <tbody>

            {props.DBS.map(ele => (
            <Tbody 
                key={ele._id} 
                idStudent={ele._id} 
                birthday={ele.Birthday} 
                name={ele.Name} 
                phoneN={ele.PhoneN}
                reunions={props.DBR}
                valueCallRoll={ele.callRoll}
                callRoll={()=> {props.handleRowClick(ele._id)}}/>
            ))}
            </tbody>
        </table>
    )
}

export default Table