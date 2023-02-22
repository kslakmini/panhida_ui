import React, { Fragment, useState, useEffect } from 'react';
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.css';

const TextEditor = (props) => {
  const [text, setText] = useState('Hi');

  // use effect hook
  useEffect(() => {
    setText(props.text);
  }, [props.text]); // eslint-disable-line react-hooks/exhaustive-deps

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(text))
    )
  );

  const saveContent = (content) => {
    window.localStorage.setItem(
      'content',
      JSON.stringify(convertToRaw(content))
    );

    setText(JSON.stringify(convertToRaw(content)));
  };

  const handleEditorChange = (state) => {
    const contentState = editorState.getCurrentContent();

    saveContent(contentState);
    setEditorState(state);
  };

  return (
    <Fragment>
      {JSON.stringify(text)}
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName='wrapper-class'
        editorClassName='editor-class'
        toolbarClassName='toolbar-class'
        toolbar={{
          options: ['inline', 'fontSize', 'list', 'remove', 'history'],
          inline: {
            options: ['bold', 'italic', 'underline'],
          },
          list: {
            options: ['unordered', 'ordered'],
          },
        }}
      />
    </Fragment>
  );
};
export default TextEditor;
