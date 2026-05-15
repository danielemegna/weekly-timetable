import fs from 'fs'
import path from 'path'

export function deleteFromShift(weekNumber: number, dayOfWeek: number, shift: number, name: string): void {
  const filePath = path.join(__dirname, '..', 'database', `week_${weekNumber}.json`)
  if (!fs.existsSync(filePath))return

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const names: string[] = data[dayOfWeek][shift]
  const index = names.indexOf(name)
  if (index === -1) return

  names.splice(index, 1)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}
