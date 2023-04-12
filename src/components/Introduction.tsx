import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@mui/material';

export default function Introduction() {
    return(
        <div className="text-center">
            <h1 className="text-3xl bold mb-2">Welcome!</h1>
            <p className="mb-16">Top left should lead you to where you want to go</p>
            <h2 className="text-2xl underline">Features</h2>
            <ul className="mb-16">
                <li>Folder System (Adding and Deleting Folders)</li>
                <li>Multiple notes in folders</li>
                <li>Full MarkDown support</li>
            </ul>
            <a href='https://github.com/aishyuu/notify' target='_blank'>
                <Button variant="outlined">
                    <GitHubIcon />
                    <span>Source Code</span>
                </Button>
            </a>
        </div>
    )
}