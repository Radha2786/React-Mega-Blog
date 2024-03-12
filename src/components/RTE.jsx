import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        // kese element render krte hai
        render={({ field: { onChange } }) => (  // is field k andar jo bhi change hota hai vo mujhe inform kar dena
          <Editor
            apiKey='lsdwj22tz40d1pedrd5oaafnbth4381wofxm3ld2qh2pqqik'
            initialValue={defaultValue}
            init={{
              initialvalue: defaultValue,
              height: 500,
              menubar: true,
              toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              plugins: ["image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ]
            }}
            onEditorChange={onChange}
          />
        )}
      />


    </div>
  )
}

// note :
// onEditorChange: This is a prop provided by the TinyMCE Editor component. It expects a function to be passed to it, which will be called whenever the content of the editor changes.
// So, when the content of the TinyMCE editor changes, the onEditorChange prop is triggered, and it calls the onChange function provided by react-hook-form. This, in turn, updates the
// form state with the new content of the editor. This ensures that the content of the TinyMCE editor is properly integrated with the form state managed by react-hook-form, allowing you to submit the form with the updated content.