import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "../graphqlClient";

export type Book = {
  id: string;
  title?: string | null;
  author?: string | null;
  publishedYear?: number | null; // we’ll read camelCase from the API
};

type BooksResponse = { books: Book[] };

const BOOKS_QUERY = gql`
  query allBooks {
    books {
      id
      title
    }
  }
`;

export function useBooks() {
  return useQuery<BooksResponse>({
    queryKey: ["books"],
    queryFn: async () => client.request<BooksResponse>(BOOKS_QUERY),
  });
}
