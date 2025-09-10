import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "../graphqlClient";

const CREATE_BOOK = gql`
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
      id
      title
      author
      publishedYear
    }
  }
`;

type Book = { id: string; title: string; author?: string | null; publishedYear?: number | null; };

export default function AddBookForm() {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState<number | "">("");

  const createMutation = useMutation({
    mutationFn: async (vars: { title: string; author?: string; publishedYear?: number }) => {
      return client.request<{ createBook: Book }>(CREATE_BOOK, {
        input: {
          title: vars.title,
          author: vars.author || null,
          publishedYear: typeof vars.publishedYear === "number" ? vars.publishedYear : null,
        },
      });
    },
    onSuccess: () => {
      // refresh the books list
      qc.invalidateQueries({ queryKey: ["books"] });
      // reset form
      setTitle("");
      setAuthor("");
      setYear("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createMutation.mutate({
          title,
          author: author || undefined,
          publishedYear: typeof year === "number" ? year : undefined,
        });
      }}
      style={{ display: "grid", gap: 8, maxWidth: 360, marginBottom: 16 }}
    >
      <label>
        Title *
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <label>
        Author
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>

      <label>
        Year
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          value={year}
          onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
        />
      </label>

      <button type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? "Adding…" : "Add Book"}
      </button>

      {createMutation.isError && (
        <p style={{ color: "crimson", whiteSpace: "pre-wrap" }}>
          {(createMutation.error as Error).message}
        </p>
      )}
    </form>
  );
}
