import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "../graphqlClient";

const DELETE_BOOK = gql`
  mutation DeleteBook($input: DeleteBookInput!) {
    deleteBook(input: $input) {
      id
    }
  }
`;

export function useDeleteBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      client.request(DELETE_BOOK, { input: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
}
