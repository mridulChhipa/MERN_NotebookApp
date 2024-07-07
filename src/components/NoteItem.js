import { useContext } from 'react'

import NoteContext from '../context/notes/NoteContext'

export default function NoteItem(props) {
    const { note } = props
    const context = useContext(NoteContext)
    const { deleteNote } = context
    return (
        <div className="card mx-2 mb-3" style={{ maxWidth: '540px', height: "100%" }}>


            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">
                    {note.description}
                </p>
                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>

                <button className="btn btn-sm btn-secondary me-2" onClick={() => { props.updateNote(note) }}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => { deleteNote(note._id) }}>Delete</button>
            </div>


        </div>
    )
}
