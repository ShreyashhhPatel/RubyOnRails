import React from "react";
import Books from "./Books";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Books App 📚</h1>
      <Books />
    </QueryClientProvider>
  );
}
