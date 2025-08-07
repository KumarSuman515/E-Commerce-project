// app/layout.js or app/layout.tsx (Next.js)
import AuthContextProvider from "../../../contexts/authContext"

export default function RootLayout({children}) {
  return (
    
      <>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </>
    
  );
}
