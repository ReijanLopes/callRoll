import React, {useState, useMemo, useEffect} from "react";
import Table from "./Table";
import InputMask from "react-input-mask";


function SearchStudents(){

    const [DataDB, setDataDB] = useState([]);
    const [AlunosFliter, setAlunosFliter] = useState([]);
    const [DataReunion, setDataReunion] = useState([])
    const [Name, setName] = useState('');
    const [PhoneN, setPhoneN] = useState('');
    const [Birthday, setBirthday] = useState('');

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    useEffect(() => {
        async function data(){
                const send = await fetch(`/student/wednesday`,
                {
                    mode: 'cors',
                    method: 'GET',
                    headers: headers
                })
                let data = await send.json();
                
                setDataDB(data.dataStudents)
                setDataReunion(data.dataReunion)

                const filter = data.dataStudents.sort().filter((nam) => nam.Name)
                setAlunosFliter(filter)

                today(data.dataStudents, data.dataReunion)

            }

            data()       
    },[])
    

    useMemo(() => {
        const LowerBusca = Name.toLowerCase();
    
        let test = DataDB.sort().filter((nome) => nome.Name.toLowerCase().includes(LowerBusca));
        setAlunosFliter(test)
      }, [Name]);

    async function creatStudent(){

        let data

        if(Name && PhoneN){

            const myinit = {
                mode: 'cors',
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    Name,
                    PhoneN,
                    Birthday
                })
            }
           
            const send = await fetch(`/student/creat`, myinit)
            data = await send.json();
            }
            setDataDB([...DataDB, data]);
            setAlunosFliter([...DataDB, data])

            setName('');
            setPhoneN('');
            setBirthday('')
        }

   
        function today(studentDB, reunionDB){
            const today = new Date();
            let cloneStudent = [...studentDB];
            let cloneReunion = [...reunionDB];

            


            cloneReunion.map(meet => {
                let meeting = new Date(meet.MeetingDate) 

                if(today.getDate() === meeting.getDate() && today.getMonth() === meeting.getMonth() && today.getFullYear() === meeting.getFullYear()){
                   
                    cloneStudent.map(studente => {
                        let filterStudent = meet.Participants.find((Student) => Student == studente._id)
                      
                        if(filterStudent){studente.callRoll = 'P'}
                        else{studente.callRoll = 'F'}   
                    })

                    cloneReunion.splice(cloneReunion.indexOf(meet), 1)
                }
                
            })
            setDataReunion([...cloneReunion])
            setDataDB([...cloneStudent])
        }
       

        function handleRowClick(StudentID){

            let clone = [...DataDB];
            let filterStudent = clone.find((Student) => Student._id == StudentID)

            
            if(!filterStudent.callRoll || filterStudent.callRoll == 'F'){
                filterStudent.callRoll = 'P'
            }else if(filterStudent.callRoll == 'P'){
                filterStudent.callRoll = 'F'
            }

           setDataDB([...clone])
        }


        async function save(){
            const date = new Date()
            let d = date.getDate()
            let m = date.getMonth() + 1
            let y = date.getFullYear()
            
            if(d < 10){
                d = '0' + d
            }
            if(m < 10){
                d = '0' + d
            }

            const MeetingDate = new Date(`${y}-${m}-${d}`)
            let Participants = []

            let filterPartipants = DataDB.filter((Partipant)=> Partipant.callRoll == 'P')
            filterPartipants.map(StudentsID => Participants.push(StudentsID._id))
           
            const myinit = {
                mode: 'cors',
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    MeetingDate,
                    Participants
                })
            }
            
            const send = await fetch(`/reunion/creat`, myinit)

            let data = await send.json();
        }


    return(
        <section>
            <div className="container createStudent">
                <h1>Crie e pesquise o Aluno</h1>
                <input value={Name} placeholder="Nome" onChange={(ev) => (setName(ev.target.value))}></input>
                <InputMask mask='(99) 99999-9999' value={PhoneN}   placeholder="Número de telefone"  onChange={(ev) => (setPhoneN(ev.target.value))} />
                <InputMask mask='99/99/9999' value={Birthday} placeholder="Data de aniversário" onChange={(ev) => (setBirthday(ev.target.value))}/>
                <button className="buttonCreat" onClick={() => (creatStudent())}>Criar</button>
            </div>

            <Table DBR={DataReunion} handleRowClick={handleRowClick} DBS={AlunosFliter} />

            <button className="Button_save" onClick={() => save()}>
                salvar
            </button>
        </section>

    )

};


export default SearchStudents;

