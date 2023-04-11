import { useParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";
import { AllType, FolderType, NoteType } from "../types/All.types";
import { Switch } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import React from "react";

export default function Note(props) {
    const { folder, note } = useParams()

    const [viewMarkdown, setViewMarkdown] = React.useState(true)

    let allData : AllType = props.allData

    let currentData = allData.folders.find(x => x.id === parseInt(folder!))?.notes.find(y => y.id === parseInt(note!))

    const [noteTitle, setNoteTitle] = React.useState(currentData?.title)

    const [noteContent, setNoteContent] = React.useState(currentData?.text)
    
    function handleTitleChange(newTitle : string) {
        setNoteTitle(newTitle)
        currentData!.title = newTitle
        localStorage.setItem("localUserData", JSON.stringify(allData))
    }

    function handleContentChange(newText : string) {
        setNoteContent(newText)
        currentData!.text = newText
        localStorage.setItem("localUserData", JSON.stringify(allData))
    }

    return(
        <div>
            <NavLink to={`/${folder}`} className="block">
                <ArrowBackIcon />
            </NavLink>
            <div className="flex float-right">
                <Switch
                    defaultChecked
                    onChange={() => setViewMarkdown(prev => !prev)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="float-right"
                />
            </div>
            <input type="text" className="my-4 text-4xl block w-4/5" value={currentData?.title} onChange={newTitle => handleTitleChange(newTitle.target.value)} />
            <MDEditor 
                preview={viewMarkdown ? 'preview' : 'edit'}
                value={noteContent}
                onChange={(newText) => handleContentChange(newText!)}
            />
        </div>
    )
}