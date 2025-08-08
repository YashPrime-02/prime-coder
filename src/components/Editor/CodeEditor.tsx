import React from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

import './EditorLayout.css';

type CodeEditorProps = {
  activeTab: string;
  code: Record<string, string>;
  setCode: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ activeTab, code, setCode }) => {
  const monaco = useMonaco();

useEffect(() => {
  if (monaco) {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
      allowJs: true,
      checkJs: true,
      strict: false,
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    // ✅ Add React type declarations manually
    const reactTypes = `
      declare module "react" {
        export = React;
      }

      declare namespace React {
        function createElement(
          type: any,
          props?: any,
          ...children: any[]
        ): JSX.Element;
        interface FC<P = {}> {
          (props: P): JSX.Element;
        }
        namespace JSX {
          interface Element {}
          interface IntrinsicElements {
            [elemName: string]: any;
          }
        }
      }
    `;

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      reactTypes,
      "file:///node_modules/@types/react/index.d.ts"
    );
  }
}, [monaco]);

  return (
    <div className="code-editor">
      <Editor
        height="500px"
        theme="vs-dark"
        language={activeTab}
        value={code[activeTab]}
        onChange={(value) => {
          if (value !== undefined) {
            setCode((prev) => ({ ...prev, [activeTab]: value }));
          }
        }}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
