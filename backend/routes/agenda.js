const express = require("express")
const router = express.Router()
const Note = require('../models/note')

//Read
router.get("/", async (req, res) => {

    try {
        const notes = await Note.find()
        res.json(notes)
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }


})

router.get("/:id", getNote, (req, res) => {
    res.json(res.note)
})


//Create
router.post("/", async (req, res) => {
    const noteTitle = req.body.title
    const noteContent = req.body.content
    const strNoteExpiration = req.body.expiration
    const noteExpiration = new Date(strNoteExpiration)
    const noteState = req.body.state
    const needState = req.body.needState


    const note = new Note({
        title: noteTitle,
        content: noteContent,
        expiration: noteExpiration,
        needState: needState,
        state: noteState
    })

    try {
        const newNote = await note.save()
        res.status(201).json(newNote)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }
})

//Update
router.patch("/:id", getNote, async (req, res) => {

    const strNoteExpiration = req.body.expiration
    let noteExpiration

    if (strNoteExpiration) {
        const [day, month, year] = strNoteExpiration.split('-')
        noteExpiration = new Date(`${day}-${month}-${year}`)
    }

    console.log(req.body)



    if (req.body.title != null) {
        res.note.title = req.body.title
    }
    if (req.body.content != null) {
        res.note.content = req.body.content
    }
    if (noteExpiration != null) {
        res.note.expiration = noteExpiration
    }
    if (req.body.state != null) {
        res.note.state = req.body.state
    }
    if (req.body.needState != null) {
        res.note.needState = req.body.needState
    }

    try {
        const updatedNote = await res.note.save()
        res.json(res.note)
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }
})

//Delete
router.delete("/:id", getNote, async (req, res) => {
    try {
        await Note.findByIdAndDelete(res.note._id)
        res.json({ message: 'Deleted Note' })
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
})



async function getNote(req, res, next) {
    let note
    try {
        note = await Note.findById(req.params.id)
        if (note === null) {
            return res.status(404).json({ message: 'Nota não encontrada ERRO 404' })
        }
    }
    catch (e) {
        return res.status(500).json({ message: e.message })
    }

    res.note = note
    next()
}

module.exports = router