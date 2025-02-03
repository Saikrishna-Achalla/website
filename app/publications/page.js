import React from "react";
import Publications from "@/components/publications/publications";
import { promises as fs } from "fs";

export default async function PublicationsPage() {
    const file = await fs.readFile(
        process.cwd() + "/public/translations/en.json",
        "utf-8"
    );
    const data = JSON.parse(file);

    return (
        <div className="lg:pl-[50%]">
            {/* <h1 className="text-4xl mb-8">Publications</h1> */}
            <Publications data={data.publications}></Publications>
        </div>
    );
} 