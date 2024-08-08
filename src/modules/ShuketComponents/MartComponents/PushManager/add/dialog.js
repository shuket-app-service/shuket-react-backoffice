import { ButtonView, Dialog, View, Plugin } from "ckeditor5";
import { icon, imageData } from "../helper/types";
import { width } from "@mui/system";


export class MyIconDialog extends Plugin {
   // Make sure the "Dialog" plugin is loaded.
   get requires() {
      return [Dialog, ButtonView, View];
   }

   init() {
      this.editor.ui.componentFactory.add("MyIconDialog", (locale) => {
         const editor = this.editor;
         console.log("editor", editor);
         const buttonView = new ButtonView(locale);

         buttonView.set({
            icon: icon,
            label: "Title",
            tooltip: true,
            // withText: true
         });

         // Define the button behavior on press.
         buttonView.on("execute", () => {
            const dialog = this.editor.plugins.get("Dialog");

            // If the button is turned on, hide the dialog.
            if (buttonView.isOn) {
               dialog.hide();
               buttonView.isOn = false;

               return;
            }

            // Tell the plugin to display a dialog with the title, content, and one action button.
            const ListImg = new View(locale);

            let ImageChildren = imageData.map((image) => {
               let ImgButton = new ButtonView(locale);

               ImgButton.set({
                  label: image.title,
                  tooltip: true,
                  withText: false,
               });

               ImgButton.on("execute", () => {
                  dialog.hide(); // close the dialog
                  const imageUtils = editor.plugins.get( 'ImageUtils' );
                  imageUtils.insertImage( { src: image.url, width: 25, height: 25, alt: image.title },  );
               });

               ImgButton.labelView.setTemplate({
                  tag: "img",
                  attributes: {
                     class:'ck-my-icon-custom',
                     src: image.url,
                     text: image.title,
                  },
               });
               return ImgButton;
            });

            ListImg.setTemplate({
               tag: "div",
               attributes: {
                  style: {
                     padding: "var(--ck-spacing-large)",
                     whiteSpace: "initial",
                     width: "100%",
                     maxWidth: "500px",
                  },
               },
               children: ImageChildren,
            });

            buttonView.isOn = true;
            dialog.show({
               title: "Dialog",
               content: ListImg,

               actionButtons: [
                  {
                     label: "OK",
                     class: "ck-button-action",
                     withText: true,
                     onExecute: () => dialog.hide(),
                  },
               ],
               onHide() {
                  buttonView.isOn = false;
               },
            });
         });

         return buttonView;
      });
   }
}
