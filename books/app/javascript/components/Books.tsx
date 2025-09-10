import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "../graphqlClient";
import { useCreateBook } from "../hooks/useCreateBook";
import { useUpdateBookAuthor, } from "../hooks/useUpdateBook"; // and useDeleteBook from its file
import { useDeleteBook } from "../hooks/useDeleteBook"; // and useDeleteBook from its file

const BOOKS_QUERY = gql`
  query allBooks {
    books { id title author publishedYear }
  }
`;

type Book = { id: string; title: string; author?: string; publishedYear?: number };
type BooksResponse = { books: Book[] };

export default function Books() {
  const { data, isLoading, error } = useQuery<BooksResponse>({
    queryKey: ["books"],
    queryFn: () => client.request<BooksResponse>(BOOKS_QUERY),
  });

  const createBook = useCreateBook();
  const updateAuthor = useUpdateBookAuthor();
  const deleteBook = useDeleteBook();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState<number | "">("");

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Books</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createBook.mutate({
            title,
            author: author || undefined,
            publishedYear: typeof year === "number" ? year : undefined,
          });
          setTitle(""); setAuthor(""); setYear("");
        }}
      >
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title *" required />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
        <input
          value={year}
          onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
          placeholder="Year"
          type="number"
        />
        <button type="submit" disabled={createBook.isPending}>Add</button>
      </form>

      <ul>
        {data?.books?.map((b) => (
          <li key={b.id}>
            <strong>{b.title}</strong> — {b.author ?? "Unknown"} ({b.publishedYear ?? "n/a"})
            <button onClick={() => updateAuthor(""+b.id, "New Author")} style={{ marginLeft: 8 }}>
              Set Author = “New Author”
            </button>
            <button onClick={() => deleteBook.mutate(""+b.id)} style={{ marginLeft: 8 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
