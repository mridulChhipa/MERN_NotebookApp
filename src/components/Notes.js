import { useContext, useEffect, useRef, useState } from 'react'

import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'

export default function Notes() {
    const context = useContext(NoteContext)
    const { notes, getNotes, editNote } = context
    const [cnote, setCnote] = useState({ id: "", title: "", description: "", tag: "" })

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click()
        setCnote({
            id: currentNote._id,
            title: currentNote.title,
            description: currentNote.description,
            tag: currentNote.tag
        })
    }

    const handleClick = (e) => {
        editNote(
            cnote.id,
            cnote.title,
            cnote.description,
            cnote.tag
        )
        ref.current.click()

    }
    const onChange = (e) => {
        setCnote({ ...cnote, [e.target.name]: e.target.value })
    }

    return (
        <>
            <hr />
            <AddNote></AddNote>

            <button type="button" ref={ref} className="btn d-none btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" />


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input onChange={onChange} value={cnote.title} name='title' type="text" className="form-control" id="title" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" value={cnote.description} onChange={onChange} className="form-control" name='description' id="description" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" value={cnote.tag} onChange={onChange} className="form-control" name='tag' id="tag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <h1>Your notes</h1>
            <div className='row'>
                {
                    notes.length === 0 && 'No notes to display' 
                }
                {notes &&
                    notes.map((note) => {
                        return <div key={note._id} className='col-md-4'><NoteItem updateNote={updateNote} note={note} /></div>
                    })
                }
            </div>
        </>
    )
}
