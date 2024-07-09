import React, { useEffect, useRef } from 'react'
import { useContext, useState } from 'react'
import context from '../context/noteContext'
import NoteItem from './NoteItem'
import Modal from './Modal'
const Notes = () => {
    const contextval = useContext(context);
    const { notes, fetchnotes, editNote } = contextval;
    const ref = useRef(null);
    const refclose=useRef(null);
    const [note, setnotes] = useState({ title: "", description: "", tag: "" ,id:""});
    const onchange = (e) => {
        setnotes({ ...note, [e.target.name]: e.target.value })
    }
    const { addNote } = useContext(context);

    const handleclick = (e) => {
        editNote(note.title, note.description, note.tag, note._id);
        refclose.current.click();
    }

    const updatenote = (currentNote) => {
        ref.current.click();
        setnotes(currentNote);
    }
    return (
        <div className="container">
            <button ref={ref} type="button" className="d-none btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit your note</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='container my-5'>
                                    <form className='container my-3'>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="title" value={note.title} name='title' onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="desc" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="tag" className="form-label">Tag</label>
                                            <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onchange} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button ref={refclose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleclick}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Notes!!!</h1>
            <button className='my-3' onClick={fetchnotes}>Get Notes</button>
            <h3 className='my-3 text-danger'>
                {notes.length===0 && "No Notes to Display!!"}
            </h3>
            <div className='row'>
                {notes.map((note) => {
                    return <NoteItem updatenote={updatenote} key={note._id} note={note} />;
                })}
            </div>
        </div>
    )
}

export default Notes
