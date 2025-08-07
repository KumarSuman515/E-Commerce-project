import { ReactNode } from "react";
import AuthContextProvider from "../../../contexts/authContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
}
