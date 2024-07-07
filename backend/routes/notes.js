const express = require('express')
const { body, validationResult } = require('express-validator');

const fetchUser = require('../middleware/fetchUser')

const Note = require('../models/Note')

const router = express.Router()

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {

    }

})

router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const result = validationResult(req)

        const { title, description, tag } = req.body

        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        res.json(savedNote)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Some internal server error occured')
    }

})

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body

    //Create new object
    const newNote = {}
    if (title) {
        newNote.title = title
    }
    if (description) {
        newNote.description = description
    }
    if (tag) {
        newNote.tag = tag
    }

    //find the note and update it
    try {
        let note = await Note.findById(req.params.id)
        if (!note) {
            res.status(404).send("Not found")
        }
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        )
        res.send(note)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Some internal server error occured')
    }
})

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    //find the note and delete it
    try {
        var note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({
            Success: "Note has been deleted",
            note: note
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Some internal server error occured')
    }

})

module.exports = router