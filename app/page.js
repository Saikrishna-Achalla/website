import React from "react";
import ProfileHeader from "@/components/profile-header";
import About from "@/components/about";
import NewsSection from "@/components/news-section";
import Publications from "@/components/publications/publications";
import Teaching from "@/components/teaching";
import Experience from "@/components/experience";
import Service from "@/components/service";
import Misc from "@/components/misc";
import { promises as fs } from "fs";

export default async function Home() {
    const file = await fs.readFile(
        process.cwd() + "/public/translations/en.json",
        "utf-8"
    );
    const data = JSON.parse(file);

    return (
        <main className="flex min-h-screen flex-col items-center py-12 px-6">
            <div className="w-full max-w-3xl">
                <ProfileHeader data={data.general} />
                <About data={data.general} />
                <NewsSection data={data.news} />
                <Publications data={data.publications} />
                <Teaching data={data.teaching} />
                <Experience data={data.experience} />
                <Service data={data.service} />
                <Misc data={data.misc} />
            </div>
        </main>
    );
}
