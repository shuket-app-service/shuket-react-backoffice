import { Card } from "@mui/material";
import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
import './style/chart.css'
const NicepayChart = () => {
   const [typeChart, setTypeChart] = useState("line");
   // Data for the chart
   const series = [
      {
         name: "Column 1",
         type: typeChart,
         data: [0.2, 0, 0, 0, 0.6, 0, 0, 0, 0, 0.4, 0, 0, 0, 0.3, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
         name: "Column 2",
         type: typeChart,
         data: [0.2, 0.5, 0, 0, 0.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
   ];
   const options = {
      chart: {
         height: 350,
         toolbar: {
            show: true,
            tools: {
               download: false,
               selection: false,
               zoom: false,
               zoomin: false,
               zoomout: false,
               pan: false,
               reset: false,
               customIcons: [
                  {
                     icon: '<img src="/public/assets/images/chart/column.png">',
                     index: 1,
                     title: "column",
                     class: "icon-toolbar",
                     click: function (chart, options, e) {
                        setTypeChart("column");
                     },
                  },
                  {
                     icon: '<img src="/public/assets/images/chart/line.png">',
                     index: 2,
                     title: "line",
                     class: "icon-toolbar",
                     click: function (chart, options, e) {
                        setTypeChart("line");
                     },
                  },
               ],
            },
         },
      },

      stroke: {
         curve: "smooth",
      },
      title: {
         text: "Cashback order list",
         align: "left",
      },
      grid: {
         borderColor: "#e7e7e7",
         row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
         },
      },
      markers: {
         size: 1,
      },
      xaxis: {
         categories: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
         ],
         title: {
            text: "",
         },
      },
      yaxis: {
         title: {
            text: "",
         },
         min: 0,
         max: 1,
      },
      legend: {
         offsetY: -20,
         horizontalAlign: "center",
         floating: true,
         fontSize: "11px",
         fontFamily: "Helvetica, Arial",
         position: "top",
         verticalAlign: "top",
      },
   };

   return (
      <Card sx={{ borderRadius: 0, p: 5, mb: 5 }}>
         <ApexCharts options={options} series={series} height={350} />
      </Card>
   );
};

export default NicepayChart;
