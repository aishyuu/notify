import { useParams } from 'react-router-dom'

export default function Folder() {
    const { folder } = useParams()
    return(
        <div>
            <h1>Folder Page {folder} Beep</h1>
        </div>
    )
}