import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { dummyData } from '../data/dummyData'
import { NoteType, FolderType } from '../types/All.types'
import { AllType } from '../types/All.types'

export default function Folder(props) {
    // Get folder ID (id is attatched to the link -> '/{folder}')
    const { folder } = useParams()

    // Get current folder by finding the object that contains id of whatever our link says
    let currentData = JSON.parse(localStorage.getItem("localUserData")!).folders.find((x:FolderType) => x.id === parseInt(folder!))
    let allData : AllType = props.allData

    const [folderName, setFolderName] = React.useState(currentData?.title)

    // Function that changes the title
    function handleChange(folderTitle : string) {
        /*
            Set text bar to the folder title
            Change the folder title from allData object (contains all data) to new value
            Save the entire object to local storage
        */
        setFolderName(folderTitle);
        allData.folders.find((x:FolderType) => x.id === parseInt(folder!))!.title = folderTitle
        localStorage.setItem("localUserData", JSON.stringify(allData))
    }

    // Function that deletes a note
    function handleDelete(noteId : number) {
        /*
            Find the id of the note we're trying to delete
            Locate the index of the array
            Delete that index (probably with filter)
            Save all data to local storage
            Refresh the page <- Need to see if it updates
        */
        console.log(noteId)
        const filteredData = allData.folders.find((x:FolderType) => x.id === parseInt(folder!))!.notes.filter(function (note) {
            return note.id !== noteId;
        })
        allData.folders.find((x: FolderType) => x.id === parseInt(folder!))!.notes = filteredData

        localStorage.setItem("localUserData", JSON.stringify(allData))
        window.location.reload();
    }

    // Function that adds a note
    function handleAdd() {
        console.log("Add button")
        /*
            Create a new NoteType object that has id of a random number between 0 - 1,000,000
            Push the new note to the allData object in appropriate folder
            Save entire object to local storage
            Refresh the page to account the new note
        */
        const newNote : NoteType = {
            id: Math.floor(Math.random() * 1000000),
            title: 'New Note',
            text: 'New Note Starts Here'
        }
        allData.folders.find((x:FolderType) => x.id === parseInt(folder!))!.notes.push(newNote)
        localStorage.setItem("localUserData", JSON.stringify(allData))
        window.location.reload();
    }

    return(
        <div>
            <input className="text-4xl mb-2" type="text" id="FolderTitle" value={currentData?.title} onChange={newTitle => handleChange(newTitle.target.value)}/>
            <button className="block mb-6 border border-gray-500 px-2 py-1 rounded-xl hover:bg-gray-300" onClick={handleAdd}>
                New Note
            </button>
            <div className='p-2'>
                {currentData.notes.map((note: NoteType) => {
                    return(
                        <div className="mb-6" key={`${currentData?.id}/${note.id}`}>
                            <NavLink to={`/${currentData?.id}/${note.id}`} >
                                <div className="p-3 border border-blue-300 rounded-xl hover:bg-blue-100 flex">
                                    <span>{note.title}</span>
                                </div>
                            </NavLink>
                            <button onClick={() => handleDelete(note.id)} className="ml-auto border border-red-400 bg-red-300 hover:bg-red-500 rounded-md py-1 px-2">
                                <span>Delete</span>
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}