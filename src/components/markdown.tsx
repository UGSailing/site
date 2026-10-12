import { emojify } from "node-emoji";
import "@uiw/react-md-editor/markdown-editor.css";

import dynamic from "next/dynamic";
import type { MDEditorProps } from "@uiw/react-md-editor";
import { A, H1, H2, H3, H4, Button, Quote } from "@/components";
import ReactMarkdown, { type Components } from "react-markdown";

const MDEditor = dynamic<MDEditorProps>(
    () => import("@uiw/react-md-editor"),
    {
        ssr: false,
        loading: () => (
            <div className="h-[600px] w-full rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400">
        Loading editor...
            </div>
        ),
    }
);

const components: Components = {
    a: ({ href, children }) => (
        <A href={href || "#"}>
            {children}
        </A>
    ),
    hr: () => <hr className="my-4 border-red-500" />,
    h1: ({ children }) => <H1>{children}</H1>,
    h2: ({ children }) => <H2>{children}</H2>,
    h3: ({ children }) => <H3>{children}</H3>,
    h4: ({ children }) => <H4>{children}</H4>,
    blockquote: ({ children }) => <Quote>{children}</Quote>,
    button: ({ children }) => <Button>{children}</Button>,
}

export const MarkdownPreview = ({ value = "" }: { value: string }) => {
    return (
        <ReactMarkdown
            components={components}
        >
            {value || "Preview will appear here..."}
        </ReactMarkdown>
    );
}

export default function Markdown({ value = "", onChange, ...props }: MDEditorProps) {
    return (
        <div className="flex gap-4 w-full">
            <div className="w-1/2">
                <MDEditor
                    value={emojify(value ?? "")}
                    height={600}
                    onChange={onChange}
                    preview="edit"
                    visibleDragbar={false}
                    {...props}
                />
            </div>
            <div className="w-1/2 border border-gray-200 rounded-md p-4 overflow-auto max-h-[600px] bg-white">
                <MarkdownPreview value={value} />
            </div>
        </div>
    );
}

