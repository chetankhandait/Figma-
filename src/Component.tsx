 
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GitPullRequestIcon, AlertCircle, StarIcon, CodeIcon } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data
const userData = {
  name: "Jane Doe",
  username: "jane_doe",
  avatar: "/placeholder.svg?height=80&width=80",
  progress: 75,
  pullRequests: 3,
  issues: 2,
  stars: 15,
  contributions: [
    { day: "Mon", count: 2 },
    { day: "Tue", count: 4 },
    { day: "Wed", count: 3 },
    { day: "Thu", count: 5 },
    { day: "Fri", count: 2 },
    { day: "Sat", count: 1 },
    { day: "Sun", count: 3 },
  ],
  recentActivity: [
    { type: "PR", title: "Fix documentation typos", repo: "awesome-project" },
    { type: "Issue", title: "Add new feature request", repo: "cool-app" },
    { type: "PR", title: "Implement dark mode", repo: "website" },
  ]
}

export default function HacktoberfestDashboard() {
  const [progress, setProgress] = useState(userData.progress)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-violet-800 to-indigo-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Hacktoberfest Dashboard</h1>
          <Avatar className="h-16 w-16 border-2 border-white">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </header>

        <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back, {userData.name}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4">Your Hacktoberfest Progress</p>
            <Progress value={progress} className="h-3 mb-2" />
            <p className="text-sm text-right">{progress}% Complete</p>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<GitPullRequestIcon className="h-6 w-6" />} title="Pull Requests" value={userData.pullRequests} />
          <StatCard icon={<AlertCircle className="h-6 w-6" />} title="Issues Raised" value={userData.issues} />
          <StatCard icon={<StarIcon className="h-6 w-6" />} title="Stars Earned" value={userData.stars} />
          <StatCard icon={<CodeIcon className="h-6 w-6" />} title="Repos Contributed" value={4} />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
            <CardHeader>
              <CardTitle>Contribution Activity</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userData.contributions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                  <XAxis dataKey="day" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e2e', border: 'none' }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {userData.recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Badge variant={activity.type === "PR" ? "default" : "secondary"}>
                      {activity.type}
                    </Badge>
                    <span className="flex-1 truncate">{activity.title}</span>
                    <span className="text-sm opacity-70">{activity.repo}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value }) {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}