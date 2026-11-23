import { ApolloClient, ApolloProvider, InMemoryCache, type NormalizedCacheObject } from "@apollo/client";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactElement, ReactNode } from "react";
import { apolloClient as defaultApolloClient } from "@/lib/apollo";

export interface RenderWithProvidersOptions
  extends Omit<RenderOptions, "wrapper"> {
  initialEntries?: string[];
  client?: ApolloClient<NormalizedCacheObject>;
}

export const createTestApolloClient = () =>
  new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache(),
  });

/**
 * Renders a component inside the same providers the app uses.
 * Supports configurable initial route entries and custom or fresh ApolloClient.
 */
export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderWithProvidersOptions
) => {
  const {
    initialEntries = ["/"],
    client = defaultApolloClient,
    ...renderOptions
  } = options ?? {};

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </ApolloProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
