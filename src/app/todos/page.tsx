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
                filterSelectionOptions: statuses.map(status => ({
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
                filterSelectionOptions: priorities.map(priority => ({
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
    });

    return <>
        <Head>
            <title>Todos - UGent Sailing</title>
            <meta name="description" content="Todos of UGent Sailing" />
        </Head>
        <MaterialReactTable table={table} />
        {/* <div>
            {
                todos?.map(todo => (
                    <div key={todo.id} className="todo-item">
                        <h3>{todo.title}</h3>
                        {
                            todo.status ? (
                                <p>
                                    Status: 
                                        <span 
                                            style={{ color: todo.status.color }} 
                                            dangerouslySetInnerHTML={{ __html: todo.status.symbol }}
                                        ></span> 
                                    <span style={{ color: todo.status.color }}>{todo.status.name}</span>
                                </p>
                            ) : (
                                <p></p>
                            )
                        }
                        {
                            todo.priority ? (
                                <p>
                                    Priority: 
                                        <span 
                                            style={{ color: todo.priority.color }} 
                                            dangerouslySetInnerHTML={{ __html: todo.priority.symbol }}
                                        ></span> 
                                    <span style={{ color: todo.priority.color }}>{todo.priority.name}</span>
                                </p>
                            ) : (
                                <p></p>
                            )
                        }
                        <p>Created At: {new Date(todo.createdAt).toLocaleDateString()}</p>
                        <p>Updated At: {new Date(todo.updatedAt).toLocaleDateString()}</p>
                        {todo.notes && <p>Notes: {todo.notes}</p>}
                        {todo.teams && todo.teams.length > 0 && (
                            <p>Teams: {todo.teams.map(team => team.name).join(', ')}</p>
                        )}
                    </div>
                ))
            }
        </div> */}
    </>;
};

export default Todos;