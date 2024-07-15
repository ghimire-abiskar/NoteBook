import { useState } from "react";
import notecontext from "./noteContext";

let Notestate = (props) => {
    const host = "http://localhost:5000"
    const saved_notes = [];

    const [notes, setnotes] = useState(saved_notes);

    //login ID



    //get all notes
    const fetchnotes = async () => {
        const url = `${host}/api/notes/fetchallnotes`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3OTRlNGEzMjRjOWRjMTcwOTBiMDQ2In0sImlhdCI6MTcxOTY0MjI0MH0.Ko2_yqzNv80vXK91_Ll93s9syy19s17hyjlRgvHqkyY"
                },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            setnotes(json);
        } catch (error) {
            console.error(error.message);
        }
    }
    const addNote = async (title, description, tag) => {
        const note = {
            title: title,
            description: description,
            tag: tag
        };
        const url = `${host}/api/notes/addnote`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3OTRlNGEzMjRjOWRjMTcwOTBiMDQ2In0sImlhdCI6MTcxOTY0MjI0MH0.Ko2_yqzNv80vXK91_Ll93s9syy19s17hyjlRgvHqkyY"
                },
                body: JSON.stringify({ title, description, tag })
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log("Hello")
            setnotes(notes.concat(json));
        } catch (error) {
            console.error(error.message);
        }
    };


    const editNote = async (title, description, tag, id) => {
        //API CALLS
        const url = `${host}/api/notes/updatenote/${id}`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3OTRlNGEzMjRjOWRjMTcwOTBiMDQ2In0sImlhdCI6MTcxOTY0MjI0MH0.Ko2_yqzNv80vXK91_Ll93s9syy19s17hyjlRgvHqkyY"
                },
                body: JSON.stringify({ title, description, tag })
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error.message);
        }

        //logic for frontend
        const newnotes= JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
            if (newnotes[index]._id == id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;
            }
        }
        setnotes(newnotes);
    }
    const deleteNote = async (id) => {
        const url = `${host}/api/notes/deletenote/${id}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3OTRlNGEzMjRjOWRjMTcwOTBiMDQ2In0sImlhdCI6MTcxOTY0MjI0MH0.Ko2_yqzNv80vXK91_Ll93s9syy19s17hyjlRgvHqkyY"
                },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error.message);
        }

        //logic for frontend
        const newnotes = notes.filter((note) => { return note._id !== id });
        setnotes(newnotes);
    }
    return (

        <notecontext.Provider value={{ notes, addNote, editNote, deleteNote, fetchnotes }}>
            {props.children}
        </notecontext.Provider>

    );
}

export default Notestate;