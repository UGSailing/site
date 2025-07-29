import React from 'react';
import Head from "next/head";

import todos from '@/data/todo';

const Todos = () => {
    return <>
        <Head>
            <title>Todos - UGent Sailing</title>
            <meta name="description" content="Todos of UGent Sailing" />
        </Head>
        <div>
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
        </div>
    </>;
};

export default Todos;