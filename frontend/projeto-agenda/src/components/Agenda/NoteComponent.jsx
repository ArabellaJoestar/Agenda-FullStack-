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
import FormNote from "../FormNote/FormNote";

export default function NoteComponent({note}) {

    const creationDate = new Date(note.creation);
    const expirationDate = new Date(note.expiration);
    
    const padTo2Digits = num => num.toString().padStart(2, '0');
    const formattedCreation = `${padTo2Digits(creationDate.getDate())}/${padTo2Digits(creationDate.getMonth() + 1)}/${creationDate.getFullYear()}`;
    const formattedExpiration = `${padTo2Digits(expirationDate.getDate())}/${padTo2Digits(expirationDate.getMonth() + 1)}/${expirationDate.getFullYear()}`;

    const [patching, setPatching] = useState(false)

     const activePatching = () => setPatching(true)
    

    const handleFinishPatch = () => {
        setPatching(false)
        if (onReload) onReload()
    }

   

    return patching ? (
        <FormNote 
        methodUse={'PATCH'} 
        styleFixed={"bg-blue-500 h-[29rem] w-80 flex flex-col p-4 rounded-xl gap-4 relative overflow-auto"}
        useNote={
           {
            title:note.title,
            content:note.content,
            expiration:note.expiration,
            needState:note.needState,
            _id:note._id
           }
        }
        onFinishPatch={handleFinishPatch}/>
    )
        :
        (
         <div className="bg-blue-500 h-[28rem] w-80 flex flex-col p-4 rounded-xl gap-4 relative" id={`${note._id}`}>
            <button className="absolute -top-2 -right-2 cursor-pointer" onClick={activePatching}><img src={editImg} className="h-5 hover:-translate-y-1 duration-300" alt="" /></button>

            <p className={`text-xl text-white rounded-t-xl h-10 flex justify-center items-center bg-blue-900 ${note.needState ? '' : 'hidden'}`}>
                {note.state}
            </p>


            <h2 className="text-xl font-bold">{note.title}</h2>

            <div className="w-full flex-grow overflow-y-auto break-words text-justify pr-2">
                <p className="text-sm">{note.content}</p>
            </div>

            <div className="w-full place-items-center justify-center grid grid-cols-2 text-xs h-[30px] font-bold bg-blue-900 rounded-b-xl mt-auto">
                <div className="text-green-600">
                    <p>{formattedCreation}</p>
                </div>

                <div className="text-red-700">
                    <p>{formattedExpiration}</p>
                </div>
            </div>
        </div>

    )
     

        
}