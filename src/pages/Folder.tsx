import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { dummyData } from '../data/dummyData'
import { NoteType, FolderType } from '../types/All.types'
import { AllType } from '../types/All.types'

export default function Folder(props) {
    const { folder } = useParams()
    let currentData = JSON.parse(localStorage.getItem("localUserData")!).folders.find((x:FolderType) => x.id === parseInt(folder!))
    let allData : AllType = props.allData

    const [folderName, setFolderName] = React.useState(currentData?.title)

    function handleChange(folderTitle : string) {
        setFolderName(folderTitle);
        allData.folders.find((x:FolderType) => x.id === parseInt(folder!))!.title = folderTitle
        localStorage.setItem("localUserData", JSON.stringify(allData))
    }

    return(
        <div>
            <input className="text-4xl mb-6" type="text" id="FolderTitle" value={currentData?.title} onChange={newTitle => handleChange(newTitle.target.value)}/>
            <div className='p-2'>
                {currentData?.notes.map((note: NoteType) => {
                    return(
                        <NavLink to={`/${currentData?.id}/${note.id}`} key={`${currentData?.id}/${note.id}`}>
                            <div className="mb-4 p-3 border border-blue-300 rounded-xl hover:bg-blue-100 flex">
                                <span>{note.title}</span>
                                <div className="ml-auto border border-red-400 bg-red-300 hover:bg-red-500">
                                    <span>Delete</span>
                                </div>
                            </div>
                        </NavLink>
                        
                    )
                })}
            </div>
        </div>
    )
}