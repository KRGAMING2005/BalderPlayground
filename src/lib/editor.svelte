<script lang="ts">

    import type monaco from 'monaco-editor';
    import { onMount } from "svelte";
    
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
    import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
    import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

    let divEl: HTMLDivElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Manoco;

    onMount(async () => {
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                if (label === 'json') {
                    return new jsonWorker();
                }
                if (label === 'css' || label === 'scss' || label === 'less') {
                    return new cssWorker();
                }
                if (label === 'html' || label === 'handlebars' || label === 'razor') {
                    return new htmlWorker();
                }
                if (label === 'typescript' || label === 'javascript') {
                    return new tsWorker();
                }
                return new editorWorker();
            }
        };

        Manoco = await import('monaco-editor');
        editor = Manoco.editor.create(divEl, {
            value: ['function helloWorld() {', '\tconsole.log("Hello From Monaco");', '};', '', 'helloWorld();'].join("\n"),
            language: 'typescript',
            theme: 'vs-dark'
        });
        
        editor.onDidChangeModelContent(async () => {
            let editorContent = editor.getValue();
            await sendToBackend(editorContent.split("\n"));
        });

        async function sendToBackend(monacoData: string[]) {
            await fetch("http://localhost:5173/api/save", {
                method: "POST",
                headers: {
                    'Content-Type': 'appliction/json'
                },
                body: JSON.stringify({content: monacoData})
            })
        }

        return (): void => {
            editor.dispose();
        }
    });



</script>

<div bind:this={divEl} id="editor"></div>

<style>
    #editor {
        height: 100dvh;
        width: 50dvw;
    }
</style>