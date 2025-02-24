import React from 'react'
const Dashboard = () => {
  const userName = localStorage.getItem('user')

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
      </div>
    </div>
  )
}

export default Dashboard
