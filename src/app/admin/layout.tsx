"use client"
import Sidebar from "./components/sidebar"

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
<main className="flex">
 <div>
   <Sidebar />
 </div>
    <section className="flex">{children}</section></main>
    )
}
