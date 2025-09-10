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

type CreateBookInput = {
  title: string;
  author?: string;
  publishedYear?: number;
};

export function useCreateBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateBookInput) =>
      client.request(CREATE_BOOK, { input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
}
