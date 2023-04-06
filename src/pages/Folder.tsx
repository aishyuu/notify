import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { dummyData } from '../data/dummyData'

export default function Folder() {
    const { folder } = useParams()
    let currentData = dummyData.folders.find(x => x.id === parseInt(folder!))
    
    const [folderName, setFolderName] = React.useState(currentData?.title)

    function handleChange(folderTitle : string) {
        setFolderName(folderTitle);
        currentData!.title = folderTitle;
    }

    return(
        <div>
            <input className="text-4xl mb-6" type="text" id="FolderTitle" value={currentData?.title} onChange={newTitle => handleChange(newTitle.target.value)}/>
            <div className='p-2'>
                {currentData?.notes.map(note => {
                    return(
                        <NavLink to={`/${currentData?.id}/${note.id}`} key={`${currentData?.id}/${note.id}`}>
                            <div className="mb-4 p-3 border border-blue-300 rounded-xl hover:bg-blue-100 ">
                                <span>{note.title}</span>
                            </div>
                        </NavLink>
                        
                    )
                })}
            </div>
        </div>
    )
}