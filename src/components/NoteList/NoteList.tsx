import React from "react";
import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";

interface NoteListProps {
  notes: Note[];
  onDeleteSuccess?: () => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDeleteSuccess }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onDeleteSuccess?.();
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <li className={css.listItem} key={n.id}>
          <h2 className={css.title}>{n.title}</h2>
          <p className={css.content}>{n.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{n.tag}</span>
            <button
              className={css.button}
              onClick={() => {
                if (window.confirm("Delete this note?")) {
                  mutation.mutate(n.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
