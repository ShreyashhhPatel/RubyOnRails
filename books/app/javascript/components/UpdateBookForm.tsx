import React, { useState } from "react";
import { useUpdateBook } from "../hooks/useUpdateBook";

export default function UpdateBookForm({
  bookId, currentTitle, currentAuthor, currentYear,
}: { bookId: string; currentTitle?: string | null; currentAuthor?: string | null; currentYear?: number | null }) {
  const { mutate: updateBook, isPending, error } = useUpdateBook();
  const [title, setTitle] = useState(currentTitle ?? "");
  const [author, setAuthor] = useState(currentAuthor ?? "");
  const [year, setYear] = useState(currentYear ? String(currentYear) : "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: { id: string; title?: string; author?: string; publishedYear?: number } = { id: bookId };

    if (title !== (currentTitle ?? "")) payload.title = title.trim() || undefined;
    if (author !== (currentAuthor ?? "")) payload.author = author.trim() || undefined;
    const parsed = year ? Number(year) : undefined;
    if (parsed !== (currentYear ?? undefined)) payload.publishedYear = parsed;

    updateBook(payload);
  };

  return (
    <form onSubmit={submit} style={{ marginTop: 8 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
      <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
      <button type="submit" disabled={isPending}>{isPending ? "Updating…" : "Update"}</button>
      {error instanceof Error && <p style={{ color: "crimson" }}>Error: {error.message}</p>}
    </form>
  );
}
