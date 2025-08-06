
import FormNote from "../components/FormNote/FormNote"

export default function WrNotes() {
    return (
        < main className=" w-full h-[80vh] lg:h-[800px] flex justify-center p-10 place-items-center" >
            <FormNote methodUse={'POST'}/>
        </main >
    )
}