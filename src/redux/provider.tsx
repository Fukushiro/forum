"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { SnackbarProvider } from "notistack";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider>
      <CookiesProvider>
        <Provider store={store}>{children}</Provider>
      </CookiesProvider>
    </SnackbarProvider>
  );
}
