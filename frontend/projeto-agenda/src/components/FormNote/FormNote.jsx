import { useEffect, useState } from "react"

export default function FormNote({ methodUse, styleFixed,
    useNote, onFinishPatch
}) {

    const [form, setForm] = useState(() => {

        if (useNote) {
            const expirationDateObject = new Date(useNote.expiration)
            const yearExp = expirationDateObject.getFullYear()
            const monthExp = String(expirationDateObject.getMonth() + 1).padStart(2, 0)
            const dayExp = String(expirationDateObject.getDate()).padStart(2, '0')

            return {
                title: useNote.title,
                content: useNote.content,
                expiration: `${yearExp}-${monthExp}-${dayExp}`,
                needState: useNote.needState
            }
        }

        return {
            title: '',
            content: '',
            expiration: ``,
            needState: false
        }

    })

    console.log(form.expiration)



    const [canSubmit, setCanSubmit] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
        console.log(form)
    }


    useEffect(() => {
        const { title, content, expiration } = form;
        const isExpirationValid = expiration && new Date(expiration) > new Date() && new Date(expiration).getFullYear() < new Date().getFullYear() + 110

        if (!title || !content || !isExpirationValid) {
            setCanSubmit(false)
        }
        if (title && content && isExpirationValid) {
            setCanSubmit(true)
        }
    }, [form])


    let urlFetch = ''
    if(methodUse === 'PATCH'){
        urlFetch = `http://localhost:3000/agenda/${useNote._id}`
    }
    if(methodUse === 'POST'){
        urlFetch = `http://localhost:3000/agenda`
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Formulário enviado:", form) // <-- Adicione aqui

        try {
            const formToSend = {...form}

            const response = await fetch(urlFetch, {
                method: methodUse,
                headers: {
                    "Content-Type": "application/json"
                },
                
                body: JSON.stringify(formToSend)
            })

            if (response.ok) {
                alert("Nota Postada!");
                setForm({
                    title: "",
                    content: "",
                    expiration: "",
                    needState: false
                })
                if(onFinishPatch) onFinishPatch()
            }
            else {
                const error = await response.json();
                alert("Erro: " + error.message)
            }

        }
        catch (e) {
            console.error(`Houve um erro no envio: ${e}`)
            alert('Erro na conexão com a API')
        }
    }



    return (
        <form onSubmit={handleSubmit} action="/" method={methodUse} className={styleFixed ?
            `${styleFixed}` : "w-[400px] h-[70%] rounded-2xl bg-blue-800 p-5 flex flex-col items-baseline gap-5 overflow-auto"}>
            {methodUse === 'POST' ? <h1 className="text-4xl text-center cursor-default text-white">Criação de nota</h1> : ""
            }

            <div className="flex flex-col text-left w-full">
                <label htmlFor="">Título</label>
                <input type="text" placeholder="Título da nota" className="border-1 border-white focus:border-white focus:border-1 duration-300 rounded-[5px] p-1" name="title" value={form.title} onChange={handleChange} />
            </div>

            <div className="flex flex-col text-left w-full">
                <label htmlFor="">Conteúdo</label>
                <textarea type="text" placeholder="Conteúdo da nota" className="border-1 border-white focus:border-white focus:border-1 duration-300 rounded-[5px] p-1 h-20" name="content" value={form.content} onChange={handleChange} />
            </div>


            <div className="flex flex-col text-left w-full">
                <label htmlFor="">Data da expiração</label>
                <input type="date" placeholder="Conteúdo da nota" className="border-1 border-white focus:border-white focus:border-1 duration-300 rounded-[5px] p-1" name="expiration" value={form.expiration} onChange={handleChange} />
            </div>

            <div className="flex flex-col text-left w-full">
                <label htmlFor="">Utiliza estado?</label>
                <select name="needState" id="needState" className="border-1 border-white focus:border-white  focus:bg-blue-950 focus:border-1 duration-300 rounded-[5px] p-1" value={form.needState} onChange={handleChange}>
                    <option value={false} className="rounded-2xl">Não</option>
                    <option value={true}>Sim</option>
                </select>
            </div>

            {form.needState ?
                <div className="flex flex-col text-left w-full">
                    <label htmlFor="">Estado Atividade</label>
                    <select name="needState" id="needState" className="border-1 border-white focus:border-white  focus:bg-blue-950 focus:border-1 duration-300 rounded-[5px] p-1" value={form.needState} onChange={handleChange}>
                        <option value={false} className="rounded-2xl">Não</option>
                        <option value={true}>Sim</option>
                    </select>
                </div>
                :
                ""}



            <button
                type="submit"
                disabled={!canSubmit}
                className={`border-1 w-20 border-white rounded-[5px] p-1 self-center ${canSubmit ? 'hover:w-full transition-all duration-500' : 'opacity-50'}`}>Postar</button>



        </form>
    )
}