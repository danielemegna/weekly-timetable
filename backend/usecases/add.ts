import fs from 'fs'
import path from 'path'

export function addToShift(weekNumber: number, dayOfWeek: number, shift: number, name: string): void {
  const filePath = path.join(__dirname, '..', 'database', `week_${weekNumber}.json`)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
  data[dayOfWeek][shift].push(capitalizedName)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}
