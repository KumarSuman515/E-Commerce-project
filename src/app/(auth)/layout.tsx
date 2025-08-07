"use client";

import { ReactNode } from "react";
import AuthContextProvider from "../../../contexts/authContext";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
}
