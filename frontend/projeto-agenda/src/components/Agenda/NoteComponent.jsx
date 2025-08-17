/*Como utilizar o note component?
Deve-se passar como prop um objeto contendo os seguintes valores: 
    title: Título da nota
    content: Conteúdo da nota
    creation: Data de criação da nota
    expiration: Data da expiração da nota
    state: Estado da nota
    needState: Verificação se a nota precisa do uso de estado
    _id: Id para referenciar a nota no bd

    state: Estado da nota('Em andamento', 'expired', 'true', 'false' e '')
    Notas adicionais sobre stateNote:
    Pending: Nota que está em execução,
    Expired: Nota expirada pelo tempo
    true: Nota Resolvida
    false: Nota cancelada
    '': Nota que não necessita de estado


*/

import { useState } from "react";
import editImg from '../../../public/ferramenta-lapis.png'
import lixeiraImg from '../../../public/excluir.png'
import FormNote from "../FormNote/FormNote";

export default function NoteComponent({note, onReload}) {
    

    const creationDate = new Date(note.creation);
    const expirationDate = new Date(note.expiration);
    
    const padTo2Digits = num => num.toString().padStart(2, '0');
    const formattedCreation = `${padTo2Digits(creationDate.getUTCDate())}/${padTo2Digits(creationDate.getUTCMonth() + 1)}/${creationDate.getUTCFullYear()}`;

    const formattedExpiration = `${padTo2Digits(expirationDate.getUTCDate())}/${padTo2Digits(expirationDate.getUTCMonth() + 1)}/${expirationDate.getUTCFullYear()}`;


    const [patching, setPatching] = useState(false)

     const activePatching = () => setPatching(true)
    

    const handleFinishPatch = () => {
        setPatching(false)
        if (onReload) onReload()
    }

    const exitFromPatch = () =>{
        setPatching(false)
        if(onReload) onReload()
    }

    const deleteNote = async () =>{

         try {

            const response = await fetch(`http://localhost:3000/agenda/${note._id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if(response.ok){
                onReload()
            }
            else {
                const error = await response.json();
                alert("Erro: " + error.message)
            }
        }
        catch(e){

            console.log(e)
        }

        

    }

   

    return patching ? (
        <FormNote 
        methodUse={'PATCH'} 
        styleFixed={"bg-blue-500 h-[35rem] w-80 flex flex-col p-4 rounded-xl gap-4 relative overflow-auto justify-center pt-10"}
        useNote={
           {
            title:note.title,
            content:note.content,
            expiration:note.expiration,
            needState:note.needState,
            _id:note._id,
            state:note.state

           }  
        }
        onFinishPatch={handleFinishPatch}
        exitButtonAction = {exitFromPatch}
        
        ></FormNote>
        
        
    )
        :
        (
         <div className="bg-blue-500 h-[28rem] w-80 flex flex-col p-4 rounded-xl gap-4 relative" id={`${note._id}`}>
            <button className={`absolute -top-2 -right-2 cursor-pointer ${note.state === 'Resolvida' ? 'hidden' : ''}`} onClick={activePatching}><img src={editImg} className="h-6 hover:-translate-y-1 duration-300" alt="" /></button>

            <button className={`absolute -top-2 -left-2 cursor-pointer`} onClick={deleteNote}><img src={lixeiraImg} className="h-7 hover:-translate-y-1 duration-300 hover:bg-red-900 rounded-full" alt="" /></button>

            <p className={`text-2xl tracking-wider font-medium rounded-t-xl h-10 flex text-blue-500 justify-center items-center  ${note.needState ? '' : 'hidden'} ${note.state === 'Resolvida' ? 'bg-green-900 ' : 'bg-blue-900' }`}>
                {note.state}
            </p>


            <h2 className="text-xl font-bold">{note.title}</h2>

            <div className="w-full flex-grow overflow-y-auto break-words text-justify pr-2">
                <p className="text-sm">{note.content}</p>
            </div>

            <div className="w-full place-items-center flex justify-around text-xs h-[30px] font-bold bg-blue-900 rounded-b-xl mt-auto">
                <div className="text-white">
                    <p className="text-[8px]">Criação</p>
                    <p>{formattedCreation}</p>
                </div>

                {note.state === 'Resolvida' ?
                ''
                :
                
                <div className={`text-red-700 ${note.state === 'Resolvida' ? 'hidden' : ''} ${formattedExpiration === '01/01/1970' ? 'hidden' : ''}`}>
                    <p className="text-[8px]">Expiração</p>
                    <p>{formattedExpiration}</p>
                </div>
                }

                
            </div>
        </div>

    )
     

        
}