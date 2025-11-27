"use client";

import React from 'react';
import { EventCreateSchema } from '@zenstackhq/runtime/zod/models';
import Form, { type SchemaInfo } from '@/components/form';


export default function Event() {
    // const [event, setEvent] = useState<EventType>({
    //     id: "",
    //     title: "Title",
    //     startDate: "",
    //     endDate: "",
    //     location: "The Docks, Ghent",
    //     intro: "Intro",
    //     description: "Description",
    //     image: "",
    //     registration: false,
    // });
    const schemaInfo: SchemaInfo = {
        schema: EventCreateSchema,
        name: "event",
        // formProps: {
        //     defaultValues: event
        // },
        formTitle: "Create new Event",
        endpoint: '/api/model/rest/event',
        formDescription: "Here you can create a new event.",
        fields: {
            title: {
                label: "Title",
                placeholder: "Event Title",
                type: 'text',
            },
            startDate: {
                label: "Start Date",
                type: 'datetime',
            },
            endDate: {
                label: "End Date",
                type: 'datetime',
            },
            location: {
                label: "Location",
                placeholder: "Event Location",
                type: 'text',
            },
            intro: {
                label: "Intro",
                placeholder: "Event Intro",
                type: 'text',
            },
            description: {
                label: "Description",
                placeholder: "Event Description",
                type: 'textarea',
            },
            registration: {
                label: "Registration",
                placeholder: "Event Registration",
                type: 'number',
            },
        },
        // onChange: (data) => {
        //     setEvent(data);
        // }
    };
    return (
        <>
            <div className="flex flex-row gap-4 w-full">
                <Form {...schemaInfo} />
            </div>
        </>
    );
}
