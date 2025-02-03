import Header from "@/components/header";
import { promises as fs } from "fs";

export default async function BlogLayout({ children }) {
    const file = await fs.readFile(
        process.cwd() + "/public/translations/en.json",
        "utf-8"
    );
    const data = JSON.parse(file);

    return (
        <main className="flex min-h-screen flex-col items-center py-24 px-6 lg:px-24">
            <div className="z-2 w-full max-w-5xl font-mono text-sm flex flex-col lg:flex-row justify-between">
                <Header data={data.general}></Header>
                {children}
            </div>
        </main>
    );
} 