
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteList.module.css'
import type { Note } from '../../types/note';
import { deleteNote } from '../../services/noteService';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

interface NoteListProps{
    notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']})
        },
        onError: () => {
            iziToast.error({
                title: 'Error',
                message: 'Failed to delete note. Please try again.',
                position: 'topRight',
                messageColor: '#ffffff',
                messageSize: '16px',
                backgroundColor: '#ef4040',
            })
        },
    })

    return (
        <ul className={css.list}>
            {notes.map(note => {
                return (
                    <li key={note.id} className={css.listItem}>
                        <h2 className={css.title}>{note.title}</h2>
                        <p className={css.content}>{note.content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{note.tag}</span>
                            <button className={css.button} onClick={()=>mutation.mutate(note.id)}>Delete</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}