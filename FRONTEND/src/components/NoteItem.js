import React, { useContext, useState } from 'react'
import context from '../context/noteContext'
const NoteItem = (props) => {
    const { deleteNote } = useContext(context);
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className=" card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className='card-text'>{note.tag}</p>
                    <i className="mx-2 fa-regular fa-pen-to-square" onClick={() => {
                        props.updatenote(note);
                    }}></i>

                    <i className='mx-2 far fa-trash-alt' onClick={() => {
                        deleteNote(note._id)
                    }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
