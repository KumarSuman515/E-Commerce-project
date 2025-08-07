// app/layout.js or app/layout.tsx (Next.js)
import AuthContextProvider from "../../../contexts/authContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </>
    
  );
}
