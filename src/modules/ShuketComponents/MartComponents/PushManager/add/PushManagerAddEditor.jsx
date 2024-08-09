import React, { useEffect, useRef, useState } from "react";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import {
   ClassicEditor,
   Context,
   Dialog,
   ContextWatchdog,
   Paragraph,
   Bold,
   Essentials,
   Italic,
   FontSize,
   FontColor,
   FontBackgroundColor,
   Link,
   ImageInsert,
   Image,
   ImageUpload,
   CKFinderUploadAdapter,
   CKFinder,
   ImageTextAlternative,
   ImageCaption,
   ImageResize,
   Alignment,
} from "ckeditor5";
import "../style/index.css";
import "ckeditor5/ckeditor5.css";
import { MyIconDialog } from "./iconDialog";
import { initialBackendNode } from "../../../../../@crema/constants/AppConst";
import PushManagerRaw from "./PushManagerRaw";

function PushManagerAddEditor({dataSelect}) {
   const [dataEditor, setDataEditor] = useState("");
   useEffect(()=>{
      if(dataSelect){
         setDataEditor(dataSelect?.push_content)
      }
   },[dataSelect])

   return (
      <CKEditorContext context={Context} contextWatchdog={ContextWatchdog}>
         <CKEditor
            editor={ClassicEditor}
            config={{
               fontSize: {
                  options: [10, 12, 20, "default", 24, 36, 72],
                  supportAllValues: true,
               },
               plugins: [
                  Essentials,
                  Alignment,
                  MyIconDialog,
                  Dialog,
                  Paragraph,
                  Bold,
                  Italic,
                  FontSize,
                  FontColor,
                  FontBackgroundColor,
                  Link,
                  CKFinder,
                  CKFinderUploadAdapter,
                  ImageInsert,
                  Image,
                  ImageResize,
                  ImageUpload,
               ],
               toolbar: ["fontColor", "fontBackgroundColor", "fontSize", "|", "bold", "italic", "|", "link", "uploadImage", "|", "MyIconDialog", "alignment"],
               ckfinder: {
                  uploadUrl: initialBackendNode + "/apppush/insertImageEditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&currentFolder=/event/description/",
               },
               image: {
                  insert: {
                     type: "auto",
                  },
               },
               link: {
                  decorators: {
                     openInNewTab: {
                        mode: "manual",
                        label: "Open in a new tab",
                        attributes: {
                           target: "_blank",
                           rel: "noopener noreferrer",
                        },
                     },
                  },
               },
            }}
            data={dataEditor}
            onReady={(editor) => {
               editor.editing.view.document.on("clipboardInput", (evt, data) => {
                  let divContentContainer = document.createElement("div");
                  divContentContainer.innerHTML = data.dataTransfer.getData("text/html");
                  let elementTableComponents = divContentContainer.querySelectorAll("td,th");

                  let newHTML = ``;
                  for (let i = 0; i < elementTableComponents.length; ++i) {
                     if (i % 2 != 0) {
                        continue;
                     } else {
                        newHTML += `<p>
                                    <span style="font-size:11pt">
                                       <span style="color:black">
                                          <span style="font-weight:400">
                                          <span style="font-style:normal">
                                             <span>
                                                <span style="font-family:Calibri,sans-serif">${elementTableComponents[i].innerHTML}</span>
                                             </span>
                                          </span>
                                          </span>
                                       </span>
                                    </span>
   
                                    <span style="font-size:11pt">
                                       <span style="color:black">
                                          <span style="font-weight:400">
                                          <span style="font-style:normal">
                                             <span>
                                                <span style="font-family:Calibri,sans-serif">${elementTableComponents[i + 1].innerHTML}</span>
                                             </span>
                                          </span>
                                          </span>
                                       </span>
                                    </span>
                                    </p>`;
                     }
                  }
                  divContentContainer.innerHTML = newHTML;
                  if (newHTML) {
                     evt.stop(); // preven insert default
                     editor.model.change((writer) => {
                        const content = divContentContainer.innerHTML;
                        const viewFragment = editor.data.processor.toView(content);
                        const modelFragment = editor.data.toModel(viewFragment);
                        editor.model.insertContent(modelFragment);
                     });
                  }
               });
            }}
            onChange={(event, editor) => {
               const data = editor.getData();
               // console.log({ event, editor, data });
               setDataEditor(data);
            }}
         />
         <PushManagerRaw dataEditor={dataEditor} />
      </CKEditorContext>
   );
}

export default PushManagerAddEditor;
