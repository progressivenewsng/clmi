"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type RichTextEditorProps = {
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-64 px-4 py-4 text-[15px] leading-relaxed text-charcoal outline-none",
      },
    },
    onUpdate: ({ editor: updatedEditor }) => onChange(updatedEditor.getJSON()),
  });

  if (!editor) {
    return <div className="min-h-64 border border-line bg-white/50" />;
  }

  return (
    <div className="border border-line bg-white/50">
      <div className="flex flex-wrap gap-1 border-b border-line p-2">
        {[
          ["Bold", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold")],
          ["Italic", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic")],
          ["H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 })],
          ["List", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList")],
        ].map(([label, action, active]) => (
          <button
            key={label as string}
            type="button"
            onClick={action as () => void}
            className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest ${active ? "bg-ink text-parchment" : "text-indigo hover:bg-parchment-dim"}`}
          >
            {label as string}
          </button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
