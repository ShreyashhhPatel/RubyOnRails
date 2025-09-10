import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function withQueryClient(Wrapped: React.ComponentType) {
  return function ProviderWrapper(props: any) {
    return (
      <QueryClientProvider client={queryClient}>
        <Wrapped {...props} />
      </QueryClientProvider>
    );
  };
}
