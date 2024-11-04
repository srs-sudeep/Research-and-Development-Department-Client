import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getBalance } from 'api/wallet/getBalance'
import { Calendar, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const fetchTodayAttendance = () => 4

const fetchAttendanceData = () => [
  {
    month: 'Jan',
    Mathematics: 85,
    Physics: 90,
    Chemistry: 88,
    Programming: 92,
  },
  {
    month: 'Feb',
    Mathematics: 88,
    Physics: 85,
    Chemistry: 90,
    Programming: 89,
  },
  {
    month: 'Mar',
    Mathematics: 90,
    Physics: 88,
    Chemistry: 85,
    Programming: 90,
  },
  {
    month: 'Apr',
    Mathematics: 85,
    Physics: 92,
    Chemistry: 87,
    Programming: 88,
  },
]

const Dashboard = () => {
  const [walletBalance, setWalletBalance] = useState(0)
  const todayAttendance = fetchTodayAttendance()
  const attendanceData = fetchAttendanceData()
  const userName = localStorage.getItem('user')

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getBalance()
        setWalletBalance(balance)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBalance()
  }, [])

  // useEffect(() => {
  //   const fetchMessName = async () => {
  //     try {
  //       const name = await getMessName()
  //       setMessName(name)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchMessName()
  // }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl space-y-8 p-6">
        {/* Header */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">
            Professor Dashboard
          </h1>
          <p className="text-gray-500">Welcome back, {userName}!</p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-4 gap-6">
          <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="absolute left-0 top-0 h-full w-1 bg-blue-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Wallet Balance
              </CardTitle>
              <div className="rounded-full bg-blue-100 p-2 transition-colors duration-300 group-hover:bg-blue-200">
                <Wallet className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">
                ₹{walletBalance}
              </div>
              <p className="mt-1 text-xs text-gray-500">Available Balance</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="absolute left-0 top-0 h-full w-1 bg-orange-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Today;s Classes
              </CardTitle>
              <div className="rounded-full bg-orange-100 p-2 transition-colors duration-300 group-hover:bg-orange-200">
                <Calendar className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">
                {todayAttendance}
              </div>
              <p className="mt-1 text-xs text-gray-500">Today;s total</p>
            </CardContent>
          </Card>
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Course-wise Attendance
              </CardTitle>
              <p className="text-sm text-gray-500">
                Monthly attendance percentage by subject
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '6px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Mathematics"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Physics"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Chemistry"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Programming"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
