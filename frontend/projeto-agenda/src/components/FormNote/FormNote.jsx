import { useEffect, useState } from "react"

export default function FormNote({ methodUse, styleFixed,
    useNote, onFinishPatch, exitButtonAction
}) {

    const [form, setForm] = useState(() => {

        if (useNote) {
            const expirationDateObject = new Date(useNote.expiration)
            const yearExp = expirationDateObject.getUTCFullYear()
            const monthExp = String(expirationDateObject.getUTCMonth() + 1).padStart(2, 0)
            const dayExp = String(expirationDateObject.getUTCDate()).padStart(2, '0')


            return {
                title: useNote.title,
                content: useNote.content,
                expiration: `${yearExp}-${monthExp}-${dayExp}`,
                needState: useNote.needState,
                state: useNote.state,
            }
        }

        return {
            title: '',
            content: '',
            expiration: ``,
            needState: false,
            state: ''
        }

    })



    const [canSubmit, setCanSubmit] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;

        const finalValue = name === 'needState' ? value === 'true' : value;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: finalValue
        }))
    }

    useEffect(() => {
        if (form.needState === true && !form.state) {
            setForm(prevForm => ({
                ...prevForm,
                state: 'Em andamento'
            }));
        }
    }, [form.needState, form.state]);


    useEffect(() => {
        const { title, content, expiration, needState, state } = form;




        const hasRequiredFields = !!title && !!content;
        let isExpirationValid = expiration ? expiration && new Date(expiration) > new Date() && new Date(expiration).getFullYear() < new Date().getFullYear() + 110 :
            true

        const isStateValid = needState ? !!state : true

        const formIsValid = hasRequiredFields && isExpirationValid && isStateValid;

        setCanSubmit(formIsValid)
    }, [form])




    let urlFetch = ''
    if (methodUse === 'PATCH') {
        urlFetch = `http://localhost:3000/agenda/${useNote._id}`
    }
    if (methodUse === 'POST') {
        urlFetch = `http://localhost:3000/agenda`
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Formulário enviado:", form)

        try {
            const formToSend = {
                ...form,
                expiration: form.expiration || null
            }

            console.log(form.ToSend)
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
                    needState: false,
                })
                if (onFinishPatch) onFinishPatch()
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
            `${styleFixed}` : "w-[400px] h-[75%] rounded-2xl bg-blue-800 p-5 flex flex-col items-baseline gap-5 overflow-auto justify-center"}>

            {methodUse === 'PATCH' ? <button className="absolute top-0 p-3 right-0 bg-red-900 text-gray-400 rounded-[5px] w-5 h-5 text-center flex items-center justify-center hover:bg-red-800 hover:text-white duration-300" onClick={exitButtonAction}>X</button> : ""}

            {methodUse === 'POST' ? <h1 className="text-4xl text-center cursor-default text-white">Criação de nota</h1> : <h1 className="text-4xl text-center cursor-default text-white">Alteração de nota</h1>
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
                <label htmlFor="">Utiliza estado?</label>
                <select name="needState" id="needState" className="border-1 border-white focus:border-white  focus:bg-blue-950 focus:border-1 duration-300 rounded-[5px] p-1" value={form.needState} onChange={handleChange}>
                    <option value={false} className="rounded-2xl">Não</option>
                    <option value={true}>Sim</option>
                </select>
            </div>

            {form.needState ?
                <div className="flex flex-col text-left w-full">
                    <label htmlFor="">Data da expiração</label>
                    <input type="date" placeholder="Conteúdo da nota" className="border-1 border-white focus:border-white focus:border-1 duration-300 rounded-[5px] p-1" name="expiration" value={form.expiration} onChange={handleChange} />
                </div>
                :
                ''}






            {form.needState ?
                <div className="flex flex-col text-left w-full">
                    <label htmlFor="">Estado Atividade</label>
                    <select name="state" id="state" className="border-1 border-white focus:border-white  focus:bg-blue-950 focus:border-1 duration-300 rounded-[5px] p-1" value={form.state} onChange={handleChange}>
                        <option value={'Em andamento'} className="rounded-2xl">Em andamento</option>
                        <option value={'Resolvida'}>Resolvida</option>
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