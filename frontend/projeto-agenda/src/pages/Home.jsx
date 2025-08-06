import Header from "../templates/Header"
import Agenda from "../components/Agenda/Agenda"

export default function Home(){
    return(

            <main className=" w-full h-[80vh] lg:h-[800px] flex justify-center">
                <Agenda/>
            </main>
      
    )
}