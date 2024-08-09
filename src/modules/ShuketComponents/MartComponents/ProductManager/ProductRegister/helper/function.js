export const convertTagsStringToArray = (tages) =>{
    return tages.split("#").filter(Boolean);
  }
  