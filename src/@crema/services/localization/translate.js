export const translate = (locale, ele) =>{
   return locale.locale == "ko" ? ele.kr : ele.en
}