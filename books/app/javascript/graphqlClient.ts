import { GraphQLClient } from "graphql-request";

const endpoint =
  typeof window !== "undefined"
    ? `${window.location.origin}/graphql`
    : "http://localhost:3000/graphql";

// read the CSRF token from the meta tag Rails renders
const csrfToken =
  typeof document !== "undefined"
    ? (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content
    : undefined;

export const client = new GraphQLClient(endpoint, {
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
  },
});
