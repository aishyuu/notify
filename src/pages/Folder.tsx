import React from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { NoteType, FolderType } from '../types/All.types'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { AllType } from '../types/All.types'

function SimpleDialog(props : any) {
    const { onClose, selectedValue, open } = props;
    const { folder } = useParams()
    const navigate = useNavigate();

    let allData = props.allData
    let filteredData = allData.folders.filter(function (indivFolder) {
        return indivFolder.id !== parseInt(folder!)
    })
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value: string) => {
      onClose(value);
    };

    function handleDelete() {
        allData.folders = filteredData
        localStorage.setItem("localUserData", JSON.stringify(allData));
        navigate("/");
    }
  
    return (
      <Dialog onClose={handleClose} open={open} fullWidth='sm'>
        <DialogTitle>Delete Folder?</DialogTitle>
        <div className="flex self-center gap-8 pb-6">
            <Button variant="outlined" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
            </Button>
        </div>
      </Dialog>
    );
  }

export default function Folder(props : any) {
    // Get folder ID (id is attatched to the link -> '/{folder}')
    const { folder } = useParams()

    // Get current folder by finding the object that contains id of whatever our link says
    let allData : AllType = props.allData
    let currentData = allData.folders.find((x:FolderType) => x.id === parseInt(folder!))

    const [folderName, setFolderName] = React.useState(currentData?.title)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };

    // Function that changes the title
    function handleChange(folderTitle : string) {
        /*
            Set text bar to the folder title
            Change the folder title from allData object (contains all data) to new value
            Save the entire object to local storage
        */
        setFolderName(folderTitle);
        currentData!.title = folderTitle
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
        const filteredData = currentData!.notes.filter(function (note) {
            return note.id !== noteId;
        })
        currentData!.notes = filteredData

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
        currentData!.notes.push(newNote)
        localStorage.setItem("localUserData", JSON.stringify(allData))
        window.location.reload();
    }

    return(
        <div>
            <input className="text-4xl mb-2" type="text" id="FolderTitle" value={currentData?.title} onChange={newTitle => handleChange(newTitle.target.value)}/>
            <button className="absolute bottom-20 right-10 mb-6 px-5 py-4 rounded-full hover:bg-red-300 text-2xl bg-red-400 text-white" onClick={handleClickOpen}>
                <DeleteIcon />
            </button>
            <button className="absolute bottom-0 right-10 mb-6 px-6 py-4 rounded-full hover:bg-gray-300 text-2xl bg-blue-400 text-white" onClick={handleAdd}>
                +
            </button>
            <SimpleDialog
                open={open}
                onClose={handleClose}
                allData={props.allData}
            />
            <div className='p-2'>
                {currentData!.notes.map((note: NoteType) => {
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