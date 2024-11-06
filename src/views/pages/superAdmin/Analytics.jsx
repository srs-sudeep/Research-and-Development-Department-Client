import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentDashboard = () => {
  // Sample data - replace with your actual data
  const students = [
    {
      name: "Arjun Mehta",
      id: "100001",
      mealStats: { total: 142, percentage: 78 },
      attendanceStats: { total: 165, percentage: 91 },
      flag: "green",
      remarks: "Excellent performance"
    },
    {
      name: "Priya Sharma",
      id: "100002",
      mealStats: { total: 98, percentage: 54 },
      attendanceStats: { total: 132, percentage: 73 },
      flag: "orange",
      remarks: "Needs improvement in meal attendance"
    },
    {
      name: "Rahul Patel",
      id: "100003",
      mealStats: { total: 65, percentage: 36 },
      attendanceStats: { total: 102, percentage: 56 },
      flag: "red",
      remarks: "Critical attention required"
    },
    { name: "Ananya Reddy", id: "100004", mealStats: { total: 120, percentage: 75 }, attendanceStats: { total: 158, percentage: 85 }, flag: "green", remarks: "Consistent attendance" },
    { name: "Karan Singh", id: "100005", mealStats: { total: 90, percentage: 58 }, attendanceStats: { total: 125, percentage: 70 }, flag: "orange", remarks: "Average performance" },
    { name: "Neha Pillai", id: "100006", mealStats: { total: 30, percentage: 20 }, attendanceStats: { total: 80, percentage: 45 }, flag: "red", remarks: "Needs urgent attention" },
    { name: "Siddharth Kumar", id: "100007", mealStats: { total: 110, percentage: 70 }, attendanceStats: { total: 140, percentage: 80 }, flag: "green", remarks: "Good attendance" },
    { name: "Isha Gupta", id: "100008", mealStats: { total: 75, percentage: 48 }, attendanceStats: { total: 115, percentage: 65 }, flag: "orange", remarks: "Improvement needed" },
    { name: "Vikas Joshi", id: "100009", mealStats: { total: 150, percentage: 85 }, attendanceStats: { total: 170, percentage: 90 }, flag: "green", remarks: "Excellent" },
    { name: "Pooja Naik", id: "100010", mealStats: { total: 60, percentage: 40 }, attendanceStats: { total: 95, percentage: 60 }, flag: "orange", remarks: "Focus needed" },
    { name: "Ravi Desai", id: "100011", mealStats: { total: 100, percentage: 65 }, attendanceStats: { total: 120, percentage: 75 }, flag: "yellow", remarks: "Steady improvement" },
    { name: "Sneha Bansal", id: "100012", mealStats: { total: 95, percentage: 60 }, attendanceStats: { total: 110, percentage: 70 }, flag: "orange", remarks: "Average" },
    { name: "Amit Chaudhary", id: "100013", mealStats: { total: 135, percentage: 82 }, attendanceStats: { total: 160, percentage: 88 }, flag: "green", remarks: "Outstanding" }
  ];

  const getFlagBadge = (flag) => {
    const variants = {
      green: "bg-green-500 hover:bg-green-600",
      yellow: "bg-yellow-500 hover:bg-yellow-600",
      orange: "bg-orange-500 hover:bg-orange-600",
      red: "bg-red-500 hover:bg-red-600"
    };

    return (
      <Badge className={`${variants[flag]} text-white`}>
        {flag.charAt(0).toUpperCase() + flag.slice(1)}
      </Badge>
    );
  };

  const getProgressBar = (percentage) => {
    const getColor = (value) => {
      if (value >= 80) return "bg-green-500";
      if (value >= 60) return "bg-yellow-500";
      if (value >= 40) return "bg-orange-500";
      return "bg-red-500";
    };

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Student Statistics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Student Name</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Meal Statistics</TableHead>
                <TableHead>Attendance Statistics</TableHead>
                <TableHead>Flag</TableHead>
                <TableHead className="w-[200px]">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">
                        {student.mealStats.total} meals ({student.mealStats.percentage}%)
                      </div>
                      {getProgressBar(student.mealStats.percentage)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">
                        {student.attendanceStats.total} days ({student.attendanceStats.percentage}%)
                      </div>
                      {getProgressBar(student.attendanceStats.percentage)}
                    </div>
                  </TableCell>
                  <TableCell>{getFlagBadge(student.flag)}</TableCell>
                  <TableCell>{student.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDashboard;
