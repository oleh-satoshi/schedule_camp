import { ScheduleTable } from "@/components/schedule-table"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-700 my-4 sm:my-6">Расписание</h1>
      <ScheduleTable />
    </main>
  )
}
