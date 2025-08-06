export default function Header() {
    return (
        <header className="w-full h-20 bg-blue-800 rounded-br-2xl rounded-bl-2xl overflow-x-hidden mb-10">

            <nav className="
            w-full h-full grid grid-cols-2 place-items-center">

                <a href="/" className="w-full h-full flex place-items-center justify-center text-[#242424] hover:bg-blue-500 hover:text-white duration-300 text-2xl">
                    <p>
                        Agenda
                    </p>
                </a>

                <a href="/wrNotes" className="w-full h-full flex place-items-center justify-center text-[#242424] hover:bg-blue-500  hover:text-white duration-300 text-2xl"> 
                    <p>
                       Nova Nota
                    </p>
                </a>
            </nav>


        </header>
    )
}