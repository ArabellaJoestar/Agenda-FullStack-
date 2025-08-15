import { useEffect, useState } from "react"
import NoteComponent from "./NoteComponent"

export default function Agenda(){

    const [notas, setNotas] = useState([])
    const [reload, setReload] = useState(false)

    const agendaData = async () =>{
        try{
            const response = await fetch('http://localhost:3000/agenda',
                {
                    method:"GET"
                }
            )
            const data = await response.json()
            setNotas(data) 
        }
        catch(e){
            console.error(e)
        }
    }

    useEffect(() =>{
        agendaData()
    }, [reload])

    const handleReload = () => setReload(r=> !r)


    return (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3
        h-full w-full gap-5 p-10 justify-center place-items-center overflow-auto">
                
              {notas.map((nota) =>{
                return <NoteComponent
                note={nota}
                onReload={handleReload}
                />
              })}

        </div>
    )
}