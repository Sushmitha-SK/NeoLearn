import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import { toast } from 'react-toastify'
import axios from 'axios'

const Dashboard = () => {
  const { currency, isEducator, backendUrl, getToken } = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData()
    }
  }, [isEducator])

  return dashboardData ? (
    <div className="min-h-screen p-4 md:p-8 space-y-8 bg-gray-50">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          icon={assets.patients_icon}
          value={dashboardData.enrolledStudentsData.length}
          label="Total Enrollments"
        />
        <SummaryCard
          icon={assets.appointments_icon}
          value={dashboardData.totalCourses}
          label="Total Courses"
        />
        <SummaryCard
          icon={assets.earning_icon}
          value={`${currency}${Math.round(dashboardData.totalEarnings)}`}
          label="Total Earnings"
        />
      </div>

      {/* Latest Enrollments */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Latest Enrollments
        </h2>
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-3 hidden sm:table-cell">#</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Course Title</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.enrolledStudentsData.length > 0 ? (
                dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr
                    key={index}
                    className={` ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="px-4 py-3 hidden sm:table-cell text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={item.student.imageUrl}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    No recent enrollments.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

const SummaryCard = ({ icon, value, label }) => (
  <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow hover:shadow-md transition-shadow">
    <img src={icon} alt={label} className="w-12 h-12" />
    <div>
      <p className="text-2xl font-bold text-gray-700">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
)

export default Dashboard
