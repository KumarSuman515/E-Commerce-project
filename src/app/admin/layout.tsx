"use client"
import sidebar from "./components/sidebar"
export default function Layout(children){
    return (
<main className="flex">
 <div>
   <sidebar />
 </div>
    <section className="flex">{children}</section></main>
    )
}
