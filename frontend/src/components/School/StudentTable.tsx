import React from "react";

const students = [
  { name: "Anjali Mehta", class: "Class A", status: "Present" },
  { name: "Ravi Kumar", class: "Class B", status: "Absent" },
  { name: "Sneha Patel", class: "Class C", status: "Present" },
];

const StudentTable = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Student List</h3>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-500">
            <th className="pb-2">Name</th>
            <th className="pb-2">Class</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i} className="border-t text-gray-800">
              <td className="py-2">{s.name}</td>
              <td className="py-2">{s.class}</td>
              <td className={`py-2 ${s.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                {s.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
