import React, { useContext, useState } from 'react'
import context from '../context/noteContext'
const Addnote = () => {
    const [note, setnotes] = useState({ title: "", description: "", tag: "" });
    const onchange = (e) => {
        setnotes({ ...note, [e.target.name]: e.target.value })
    }
    const { addNote } = useContext(context);

    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnotes({ title: "", description: "", tag: "" });
    }

    return (
        <div className='container my-5'>
            <h1>Add Your Note</h1>
            <form className='container my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange} minLength={5} required />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote
