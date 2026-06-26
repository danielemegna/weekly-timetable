import fs from 'fs'
import path from 'path'

export function getWeekNotesFor(weekNumber: number): string {
  const filePath = path.join(__dirname, '..', 'database', `week_${weekNumber}.json`)
  if (!fs.existsSync(filePath)) return ''

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  if (data.length < 8) return ''

  return data[7][0] || ''
}
