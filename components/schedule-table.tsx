import type React from "react"
// --- DATA DEFINITIONS ---
type ActivityType = "Спорт" | "Поделки" | "Батут" | "Квест"

interface ActivityDetail {
  emoji: string
  bgColor: string
  textColor: string
  borderColor: string
  name: string
}

const activityDetails: Record<ActivityType, ActivityDetail> = {
  Спорт: {
    name: "Спорт",
    emoji: "🏃",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  Поделки: {
    name: "Поделки",
    emoji: "🎨",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
  Батут: { name: "Батут", emoji: "🤸", bgColor: "bg-sky-50", textColor: "text-sky-700", borderColor: "border-sky-200" },
  Квест: {
    name: "Квест",
    emoji: "🕵️",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
  },
}

interface SquadActivityRow {
  type: "squads"
  time: string
  squad1: ActivityType
  squad2: ActivityType
  squad3: ActivityType
  squad4: ActivityType
}

interface CommonActivityRow {
  type: "common"
  time: string
  description: string
  emoji?: string
}

interface DividerRow {
  type: "divider"
}

type ScheduleItem = SquadActivityRow | CommonActivityRow | DividerRow

const scheduleData: ScheduleItem[] = [
  { type: "common", time: "8:00–9:00", description: "Планерка, молитва", emoji: "📝" },
  { type: "common", time: "9:00–9:10", description: "Сбор, молитва", emoji: "🙏" },
  { type: "common", time: "9:10–9:20", description: "Зарядка", emoji: "🤸‍♀️" },
  { type: "common", time: "9:20–9:30", description: "Завтрак", emoji: "🍽️" },
  { type: "squads", time: "9:30–10:30", squad1: "Спорт", squad2: "Поделки", squad3: "Батут", squad4: "Квест" },
  { type: "squads", time: "10:30–11:30", squad1: "Поделки", squad2: "Батут", squad3: "Квест", squad4: "Спорт" },
  { type: "squads", time: "11:30–12:30", squad1: "Батут", squad2: "Квест", squad3: "Спорт", squad4: "Поделки" },
  { type: "squads", time: "12:30–13:30", squad1: "Квест", squad2: "Спорт", squad3: "Поделки", squad4: "Батут" },
  { type: "divider" },
  { type: "common", time: "15:30–16:30", description: "Общелагерная игра", emoji: "🎮" },
  { type: "common", time: "16:30–17:15", description: "Музыкальный час", emoji: "🎶" },
  { type: "common", time: "17:15–17:30", description: "Ужин", emoji: "🍽️" },
  { type: "common", time: "17:30–18:00", description: "Служение", emoji: "🕊️" },
  { type: "common", time: "18:00–19:00", description: "Планёрка, уборка, молитва", emoji: "🧹🙏" },
]

const squadHeaders = ["Отряд 1", "Отряд 2", "Отряд 3", "Отряд 4"]

export function ScheduleTable() {
  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-2 sm:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-white z-10 w-24 sm:w-28 shrink-0">
                Время
              </th>
              <th
                colSpan={4}
                className="p-2 sm:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Активность
              </th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const rows: React.ReactNode[] = []
              let squadSubHeaderRendered = false

              scheduleData.forEach((item, rowIndex) => {
                if (item.type === "squads" && !squadSubHeaderRendered) {
                  const firstSquadRow = scheduleData.find((d) => d.type === "squads")
                  if (item === firstSquadRow) {
                    squadSubHeaderRendered = true
                    rows.push(
                      <tr key="squad-subheader" className="border-b border-gray-200 bg-gray-50">
                        <td className="p-2 sm:p-3 sticky left-0 bg-gray-50 z-10 shrink-0 w-24 sm:w-28"></td>
                        {squadHeaders.map((header) => (
                          <th
                            key={header}
                            className="p-2 sm:p-3 text-center text-xs font-medium text-gray-600 align-top"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>,
                    )
                  }
                }

                if (item.type === "divider") {
                  rows.push(
                    <tr key={`divider-${rowIndex}`}>
                      <td colSpan={5} className="py-1 px-2 sm:px-3">
                        <div className="w-full h-px bg-gray-200 my-1 sm:my-2" />
                      </td>
                    </tr>,
                  )
                } else if (item.type === "common") {
                  rows.push(
                    <tr key={`common-${rowIndex}`} className="border-b border-gray-200 last:border-b-0 group">
                      <td className="p-2 sm:p-3 text-xs font-medium text-gray-700 whitespace-nowrap sticky left-0 bg-white z-10 group-hover:bg-gray-50 shrink-0 w-24 sm:w-28">
                        {item.time}
                      </td>
                      <td colSpan={4} className="p-2 sm:p-3 group-hover:bg-gray-50">
                        <div className="flex items-center">
                          {item.emoji && <span className="text-lg sm:text-xl mr-2 sm:mr-3">{item.emoji}</span>}
                          <span className="text-sm text-gray-800">{item.description}</span>
                        </div>
                      </td>
                    </tr>,
                  )
                } else if (item.type === "squads") {
                  rows.push(
                    <tr key={`squads-${rowIndex}`} className="border-b border-gray-200 last:border-b-0 group">
                      <td className="p-2 sm:p-3 text-xs font-medium text-gray-700 whitespace-nowrap sticky left-0 bg-white z-10 group-hover:bg-gray-50 shrink-0 w-24 sm:w-28">
                        {item.time}
                      </td>
                      {(["squad1", "squad2", "squad3", "squad4"] as const).map((squadKey) => {
                        const activityType = item[squadKey]
                        if (!activityType)
                          return <td key={squadKey} className="p-1.5 sm:p-2 align-top group-hover:bg-gray-50"></td>

                        const details = activityDetails[activityType]
                        return (
                          <td key={squadKey} className="p-1.5 sm:p-2 align-top group-hover:bg-gray-50">
                            <div
                              className={`flex items-center justify-start p-2 sm:p-2.5 rounded-md border ${details.borderColor} ${details.bgColor} ${details.textColor}`}
                            >
                              <span className="text-base mr-1.5">{details.emoji}</span>
                              <span className="text-xs font-semibold leading-snug">{details.name}</span>
                            </div>
                          </td>
                        )
                      })}
                    </tr>,
                  )
                }
              })
              return rows
            })()}
          </tbody>
        </table>
      </div>
    </div>
  )
}
