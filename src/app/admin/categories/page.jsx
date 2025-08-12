"use client";
import Form from "./components/form";
import ListView from "./components/ListView";

export default function Page(){
    return (
        <main className="p-5 flex  gap-5 text-black">
        <Form />
        <ListView />
        </main>
    )
}