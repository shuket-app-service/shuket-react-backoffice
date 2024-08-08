import { initialFrontCurrent } from "../../../../../@crema/constants/AppConst";
const pathAppPush = "/public/assets/shuket/apppush/"
export const imageData = [
    {
       url: initialFrontCurrent + pathAppPush +  "emoji_018.png",
       title: "emoji1",
    },
    {
       url: initialFrontCurrent + pathAppPush +  "emoji_001.png",
       title: "emoji2",
    },
    {
       url:  initialFrontCurrent + pathAppPush +  "emoji_042.png",
       title: "emoji3",
    },
 ];
 
 export const icon = `<svg width="800px" height="800px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
 <circle opacity="0.5" cx="12" cy="12" r="10" />
 <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"/>
 <path d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"/>
 <ellipse cx="9" cy="10.5" rx="1" ry="1.5" />
 </svg>`;