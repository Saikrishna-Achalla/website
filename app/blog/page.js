import React from "react";
import Blog from "@/components/blog/blog";
import { promises as fs } from "fs";

export default async function BlogPage() {
    const file = await fs.readFile(
        process.cwd() + "/public/translations/en.json",
        "utf-8"
    );
    const data = JSON.parse(file);

    return (
        <div className="lg:pl-[50%]">
            <Blog data={data.blog}></Blog>
        </div>
    );
} 