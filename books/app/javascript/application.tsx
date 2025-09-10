import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Books from "./components/Books";
import AddBookForm from "./components/AddBookForm";

const rootEl = document.getElementById("root");
if (rootEl) {
  const qc = new QueryClient();
  createRoot(rootEl).render(
    <React.StrictMode>
      <QueryClientProvider client={qc}>
        <h1>Books App 📚</h1>
        <AddBookForm />
        <Books />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
