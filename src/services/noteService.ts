import axios from "axios";
import type { Note } from "../types/note";

const BASE =
  import.meta.env.VITE_NOTEHUB_BASE ?? "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE,
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
    "Content-Type": "application/json",
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[]; 
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string; 
  tag: string;
}


export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "", tag } = params;
  const res = await instance.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
  });
  return res.data;
};

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const res = await instance.post<Note>("/notes", payload);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await instance.delete<Note>(`/notes/${id}`);
  return res.data;
};