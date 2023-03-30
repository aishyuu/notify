export type NoteType = {
    id: number
    text: string
    title: string
}

export type FolderType = {
    id: number
    title: string
    notes: NoteType[]
}

export type AllType = {
    folders: FolderType[]
}