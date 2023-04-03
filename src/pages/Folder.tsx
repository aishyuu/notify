import { useParams } from 'react-router-dom'
import { dummyData } from '../data/dummyData'

export default function Folder() {
    const { folder } = useParams()
    let currentData = dummyData.folders.find(x => x.id === parseInt(folder!))
    console.log(currentData)

    return(
        <div>
            <h2 className="text-5xl">{currentData?.title}</h2>
            <div className='p-8'>
                {currentData?.notes.map(note => {
                    return(
                        <div>
                            <span>{note.title}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}