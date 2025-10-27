import { emojify } from "node-emoji";
import rehypeSanitize from "rehype-sanitize";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import dynamic from "next/dynamic";
import type { MDEditorProps } from "@uiw/react-md-editor";

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

export default function Markdown({ value = "", onChange, ...props }: MDEditorProps) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={emojify(value ?? "")}
        height={600}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

