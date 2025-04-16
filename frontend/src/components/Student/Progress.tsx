"use client";
import React, { useEffect } from "react";
import * as echarts from "echarts";

const Progress = () => {
  const completed = 12;
  const total = 20;

  useEffect(() => {
    const chartDom = document.getElementById("progress-chart");
    if (!chartDom) return;
    const chart = echarts.init(chartDom);
    chart.setOption({
      animation: false,
      series: [
        {
          name: "Progress",
          type: "pie",
          radius: ["60%", "80%"],
          label: { show: false },
          labelLine: { show: false },
          data: [
            { value: completed, name: "Completed", itemStyle: { color: "#7C3AED" } },
            { value: total - completed, name: "Remaining", itemStyle: { color: "#E5E7EB" } },
          ],
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
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">Your Progress</h3>
      </div>
      <div className="p-6">
        <div className="relative w-36 h-36 mx-auto">
          <div id="progress-chart" className="w-full h-full"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{completed}</span>
            <span className="text-sm text-gray-500">Lessons</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Progress;
