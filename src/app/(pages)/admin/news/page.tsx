"use server";

import NewsList from "@/components/admin/news/list";

export default async function News() {
    return (
        <div>
            <NewsList />
        </div>
    );
}
