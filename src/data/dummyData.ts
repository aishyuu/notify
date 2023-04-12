import { AllType } from "../types/All.types"

export const dummyData : AllType = {
    folders: [
      {
        id: 1,
        title: 'Notes',
        notes: [
          {
            id: 1,
            title: 'Note 1',
            text: 'This is the note'
          },
          {
            id: 2,
            title: 'Note 2',
            text: 'This is the second note in this folder!'
          }
        ]
      },
      {
        id: 2,
        title: 'More Notes',
        notes: [
          {
            id: 1,
            title: 'Note 1',
            text: 'This is note 1 for untitled 2 folder'
          },
          {
            id: 2,
            title: 'Note 2',
            text: 'This is note 2 for untitled 2 folder :)'
          }
        ]
      }
    ]
}