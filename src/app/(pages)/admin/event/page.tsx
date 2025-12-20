"use server";

import EventList from "@/components/admin/event/list";

export default async function Event() {
    return (
        <div>
            <EventList />
        </div>
    );
}
