import { useParams } from "react-router-dom"

export default function Note() {
    const { folder, note } = useParams()
    return(
        <div>
            <h1>Note Page {note} from {folder} folder</h1>
        </div>
    )
}