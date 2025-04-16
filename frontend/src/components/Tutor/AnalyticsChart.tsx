"use client";
import React, { useEffect } from "react";
import * as echarts from "echarts";

const AnalyticsChart = () => {
  useEffect(() => {
    const chartDom = document.getElementById("hoursChart");
    if (!chartDom) return;

    const chart = echarts.init(chartDom);
    chart.setOption({
      animation: false,
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
      yAxis: { type: "value" },
      series: [{
        name: "Hours Volunteered",
        type: "bar",
        barWidth: "60%",
        data: [10, 15, 12, 20, 18, 5],
        itemStyle: { color: "#4F46E5" },
      }]
    });

    const resize = () => chart.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
      <div className="h-64" id="hoursChart"></div>
      <p className="text-center text-xs text-gray-500 mt-2">Monthly Hours Volunteered (2025)</p>
    </div>
  );
};

export default AnalyticsChart;
