import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoMdMenu } from "react-icons/io";
import SwitchStatus from "../../../Common/SwitchStatus";
import { MdOutlineModeEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { headersEditLocate } from "../locate";

const AppDisplayEditTable = ({ locale, detail, handleDragEndCallback}) => {
   const [headers, setHeaders] = useState([]);

   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headersEditLocate.kr);
      } else {
         setHeaders(headersEditLocate.en);
      }
   }, [locale]);


   const handleDragEnd = (e) => {
      if (!e.destination) return;
      let tempData = Array.from(detail?.sc_detail_data);
      let [source_data] = tempData.splice(e.source.index, 1);
      tempData.splice(e.destination.index, 0, source_data);
      handleDragEndCallback(tempData);
   };
   return (
      <DragDropContext onDragEnd={handleDragEnd}>
         <Table sx={{ minWidth: 650}} aria-label="simple table">
            <TableHead>
               {headers.map((head) => (
                  <TableCell key={head} align="center">
                     {head}
                  </TableCell>
               ))}
            </TableHead>
            <Droppable droppableId="droppable-1">
               {(provider) => (
                  <TableBody ref={provider.innerRef} {...provider.droppableProps}>
                     {detail?.sc_detail_data &&
                        detail.sc_detail_data?.map((item, index) => (
                           <Draggable key={item.templateSEQ} draggableId={`${item.templateSEQ}`} index={index}>
                              {(provider) => (
                                 <TableRow {...provider.draggableProps} ref={provider.innerRef}>
                                    <TableCell {...provider.dragHandleProps} align="center">
                                       <IoMdMenu size={25} />
                                    </TableCell>
                                    <TableCell align="center">{item.tmpl_order}</TableCell>
                                    <TableCell align="center">{item.tmpl_name}</TableCell>
                                    <TableCell align="center">
                                       <p> {item.tmpl_template_title}</p> <br />
                                       <p> {item?.tmpl_template_sub_title}</p>
                                       <br />
                                       {item?.tmpl_sdate && item?.tmpl_edate ? (
                                          <p>
                                             {item?.tmpl_sdate} ~ {item?.tmpl_edate}
                                          </p>
                                       ) : null}
                                    </TableCell>
                                    <TableCell align="center">
                                       <img alt="" src={item.tmpl_smp_img} style={{ width: 60 }} />
                                    </TableCell>
                                    <TableCell align="center">
                                       <SwitchStatus status={item.isActive ? "A" : "C"} handleChangeStatus={() => {}}></SwitchStatus>
                                    </TableCell>
                                    <TableCell align="center">
                                       <Stack direction="row" gap={2}>
                                          <MdOutlineModeEdit color="white" size={35} style={{ backgroundColor: "#F1C40F", padding: 5 }} />
                                          <TiDeleteOutline color="white" size={35} style={{ backgroundColor: "#ED6B75", padding: 5 }} />
                                       </Stack>
                                    </TableCell>
                                 </TableRow>
                              )}
                           </Draggable>
                        ))}
                     {provider.placeholder}
                  </TableBody>
               )}
            </Droppable>
         </Table>
      </DragDropContext>
   );
};

export default AppDisplayEditTable;
