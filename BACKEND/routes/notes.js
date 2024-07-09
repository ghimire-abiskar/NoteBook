const express = require('express')
const Notes = require("../models/Notes")
const fetchUser = require('../middleware/fetchUser')
const router = express.Router();
const { body, validationResult } = require('express-validator')
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
})

//LOGIN IS REQUIRED HERE ALSO
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter valid description').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errors: "Please enter valid notes" })
    }
    try {
        const { title, description, tag } = req.body;
        const note = await Notes.create({
            title, description, tag, user: req.user.id
        })
        res.json(note);
    }
    catch (error) {
        res.status(400);
    }
})


router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    let newnote = {};

    try{
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };
    
        let note=await Notes.findById(req.params.id);
        if(!note) return res.status(404).send("Note not found !!!!");
        if(note.user.toString() !=req.user.id)
        {
            res.status(401).send("UnAuthorized Access!!")
        }
        note= await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
        res.json(note);
    }
    catch(error)
    {
        res.status(400).send(error+"There has been some error while updating")
    }
})

//Delete the note here!!!!

router.delete('/deletenote/:id',fetchUser,async (req,res)=>{
    try{
        let note = await Notes.findById(req.params.id);
        if(note.user.toString()!=req.user.id)
            {
                return res.status(404).send("Some Error Occured");
            }
            note= await Notes.findByIdAndDelete(req.params.id);
            res.json("Sucessfully deleted");
    }
    catch(error)
    {
        res.status(404).send(error+"There is some error while deleting the note");
    }
})
module.exports = router;