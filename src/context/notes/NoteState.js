import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    const getNotes = async () => {
        const response = await fetch('http://localhost:8000/api/notes/fetchallnotes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })

        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    const addNote = async (title, description, tag) => {
        const response = await fetch(`http://localhost:8000/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })

        const note = await response.json();
        setNotes(notes.concat(note))
    }

    const deleteNote = async (id) => {
        const response = await fetch(`http://localhost:8000/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })

        const newNotes = notes.filter((note) => {
            return note._id !== id
        })

        console.log(response.json())

        setNotes(newNotes)
    }

    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`http://localhost:8000/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                title, description, tag
            })
        })

        console.log(response.json())

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (var i = 0; i < notes.length; i++) {
            var element = newNotes[i];
            if (element._id === id) {
                newNotes[i].title = title
                newNotes[i].description = description
                newNotes[i].tag = tag
                break
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, setNotes, editNote, deleteNote, addNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState