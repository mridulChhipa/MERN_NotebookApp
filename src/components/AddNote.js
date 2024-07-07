import { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function AddNote() {
    const context = useContext(NoteContext)
    const { addNote } = context
    const [note, setNote] = useState({})

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <form>
            <h1>Add notes</h1>

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input onChange={onChange} name='title' type="text" className="form-control" id="title" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" onChange={onChange} className="form-control" name='description' id="description" />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" onChange={onChange} className="form-control" name='tag' id="tag" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
    )
}
