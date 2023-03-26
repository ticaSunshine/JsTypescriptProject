import 'bootstrap/dist/css/bootstrap.min.css'
import { useMemo } from 'react';
import { Container } from 'react-bootstrap'
import {Routes, Route, Navigate} from 'react-router-dom'
import { NewNote } from './NewNote';
import { useLocalStorage } from './useLocalStorage';
import { uuid } from 'uuidv4';

export  type Note = {
  id: string
  & NoteData
}

export type RawNote = {
  id: string;
}& RawNoteData

export  type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export  type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}
function App() {

  const [notes, setNotes]=useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags]=useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return{...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes,tags]);

  function onCreateNote({tags, ...data}: NoteData){
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuid(), tagIds: tags.map(tag => tag.id)}]
    })
  }
  return (
    <Container className='my-4'>
   <Routes>
    <Route path='/' element={<h1>Hi</h1>}/>
    <Route path='/new' element={<NewNote onSubmit={onCreateNote}/>}/>
    <Route path='*' element={<Navigate to="/" />}/> {/*go back to home page when someone enter wrong url*/}
    <Route path='/:id'>
      <Route index element={<h1>Show</h1>}/>
      <Route path='edit' element={<h1>Edit</h1>}/>
    </Route>
   </Routes>
   </Container>
  )
}

export default App;
function uuidV4(): string {
  throw new Error('Function not implemented.');
}

