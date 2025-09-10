import React, { useState } from "react";
import { useCreateBook } from "../hooks/useCreateBook";

export default function CreateBookForm() {
  const { mutate: createBook, isPending, error } = useCreateBook();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    createBook(
      {
        title: title.trim(),
        author: author.trim() || undefined,
        publishedYear: year ? Number(year) : undefined,
      },
      { onSuccess: () => { setTitle(""); setAuthor(""); setYear(""); } }
    );
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <h3>Add Book</h3>
      <input placeholder="Title *" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
      <button type="submit" disabled={isPending}>{isPending ? "Adding…" : "Add"}</button>
      {error instanceof Error && <p style={{ color: "crimson" }}>Error: {error.message}</p>}
    </form>
  );
}
