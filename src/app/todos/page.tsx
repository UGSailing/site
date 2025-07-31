'use client';
import React from 'react';
import Head from "next/head";

import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

import todos from '@/data/todo';
import { statuses, priorities, type ToDo } from '@/data/todo';

const Todos = () => {
    const columns = useMemo<MRT_ColumnDef<ToDo, any>[]>(
        () => [
            {
                accessorKey: 'title',
                header: 'Title',
                filterVariant: 'autocomplete',
                size: 100,
                enableColumnOrdering: false
            },
            {
                accessorKey: 'completed',
                header: 'Completed',
                filterVariant: 'checkbox',
                size: 50,
            },
            {
                accessorKey: 'status.id',
                header: 'Status',
                filterVariant: 'multi-select',
                filterSelectOptions: statuses.map(status => ({
                    value: status.id,
                    label: status.name,
                })),
                Cell: ({ cell }) => {
                    const status = statuses.find(s => s.id === cell.getValue<string>());
                    return status ? (
                        <span 
                            style={{ color: status.color }}
                        >
                            {status.name}
                            <span dangerouslySetInnerHTML={{ __html: status.symbol }} />
                        </span>
                    ) : null;
                }
            },
            {
                accessorKey: 'priority.id',
                header: 'Priority',
                filterVariant: 'multi-select',
                filterSelectOptions: priorities.map(priority => ({
                    value: priority.id,
                    label: priority.name,
                })),
                Cell: ({ cell }) => {
                    const priority = priorities.find(p => p.id === cell.getValue<string>());
                    return priority ? (
                        <span 
                            style={{ color: priority.color }}
                        >
                            {priority.name}
                            <span dangerouslySetInnerHTML={{ __html: priority.symbol }} />
                        </span>
                    ) : null;
                }
            }
        ], []
    )

    const table = useMaterialReactTable({
        columns,
        data: todos,
        initialState: { showColumnFilters: true },
        enableColumnOrdering: true,
    });

    return <>
        <Head>
            <title>Todos - UGent Sailing</title>
            <meta name="description" content="Todos of UGent Sailing" />
        </Head>
        <MaterialReactTable table={table} />
        
    </>;
};

export default Todos;