import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';

export default function NoteList({ notes }: { notes: Note[] }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => {
        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button 
                className={css.button} 
                onClick={() => mutation.mutate(note.id.toString())}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}