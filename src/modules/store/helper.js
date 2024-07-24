export const remakeMenuLevel1 = (object) =>{
    return {
      id: object.group_code,
      title: object.group_names,
      messageId: "" + object.group_names.en.replaceAll(" ","_"),
      type: "group",
      static: false,
      children: object.hasOwnProperty('group_items') ?  object.group_items.map((menu) => {
        return remakeMenuLevel2(menu)
      }) : []
    };
  }
  
const remakeMenuLevel2 = (object) =>{
    return {
      id: object.code,
      title: object.name,
      messageId: "" + object.name.en.replaceAll(" ","_"),
      permittedRole: object.hasOwnProperty('sub_items') ? [] : ['admin','user'],
      type: object.hasOwnProperty('sub_items') ? "collapse" : "item",
      permittedRole:['admin','user'],
      icon: null,
      static: false,
      url: object.hasOwnProperty('sub_items') ? "" : object.route,
      children: object.hasOwnProperty('sub_items') ? object.sub_items.map((menu) => {
        return remakeMenuLevel3(menu)
      }) : []
    };
  }
  
  const remakeMenuLevel3 = (object) =>{
    return {
      id: object.code,
      title: object.name,
      messageId: "" + object.name.en.replaceAll(" ","_"),
      type: "item",
      static: false,
      permittedRole:['admin','user'],
      url:  object.route,
    };
  }