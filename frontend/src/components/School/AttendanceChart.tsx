"use client";
import React, { useEffect } from "react";
import * as echarts from "echarts";

const AttendanceChart = () => {
  useEffect(() => {
    const chartDom = document.getElementById("attendance-chart");
    if (!chartDom) return;

    const chart = echarts.init(chartDom);
    chart.setOption({
      tooltip: {},
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [95, 88, 92, 96, 91],
          type: "bar",
          itemStyle: {
            color: "#2563EB",
          },
        },
      ],
    });

    const resize = () => chart.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Weekly Attendance</h3>
      <div id="attendance-chart" className="w-full h-64" />
    </div>
  );
};

export default AttendanceChart;
