import { UserButton } from "@clerk/nextjs"

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <UserButton />
        <p className="text-heading1-bold text text-red-1">DashboardPage</p>

    </div>
  )
}

export default DashboardPage