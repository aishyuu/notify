import { useParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";
import { dummyData } from "../data/dummyData";
import React from "react";

export default function Note() {
    const { folder, note } = useParams()

    let currentData = dummyData.folders.find(x => x.id === parseInt(folder!))?.notes.find(y => y.id === parseInt(note!))

    const [noteTitle, setNoteTitle] = React.useState(currentData?.title)
    
    function handleTitleChange(newTitle : string) {
        setNoteTitle(newTitle)
        currentData!.title = newTitle
    }

    return(
        <div>
            <NavLink to={`/${folder}`}>
                <ArrowBackIcon />
            </NavLink>
            <input type="text" className="my-4 text-4xl block" value={currentData?.title} onChange={newTitle => handleTitleChange(newTitle.target.value)} />
            <span>{currentData?.text}</span>
        </div>
    )
}