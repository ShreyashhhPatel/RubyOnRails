import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "../graphqlClient";

const UPDATE_BOOK = gql`
  mutation UpdateBook($input: UpdateBookInput!) {
    updateBook(input: $input) {
      id
      title
      author
      publishedYear
    }
  }
`;

type UpdateBookInput = {
  id: string;
  title?: string;
  author?: string;
  publishedYear?: number;
};

// optional single-field helpers (update only one field without affecting others)
export function useUpdateBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateBookInput) =>
      client.request(UPDATE_BOOK, { input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
}

export function useUpdateBookTitle() {
  const { mutateAsync } = useUpdateBook();
  return (id: string, title: string) => mutateAsync({ id, title });
}
export function useUpdateBookAuthor() {
  const { mutateAsync } = useUpdateBook();
  return (id: string, author: string) => mutateAsync({ id, author });
}
export function useUpdateBookYear() {
  const { mutateAsync } = useUpdateBook();
  return (id: string, publishedYear: number) => mutateAsync({ id, publishedYear });
}
