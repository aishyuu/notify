import { useParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";
import { AllType, FolderType, NoteType } from "../types/All.types";
import React from "react";

export default function Note(props) {
    const { folder, note } = useParams()

    let allData : AllType = props.allData
    console.log(allData)

    let currentData = allData.folders.find(x => x.id === parseInt(folder!))?.notes.find(y => y.id === parseInt(note!))

    const [noteTitle, setNoteTitle] = React.useState(currentData?.title)
    
    function handleTitleChange(newTitle : string) {
        setNoteTitle(newTitle)
        currentData!.title = newTitle
        localStorage.setItem("localUserData", JSON.stringify(allData))
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