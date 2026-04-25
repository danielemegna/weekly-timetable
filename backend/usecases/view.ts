import fs from 'fs'
import path from 'path'

export function getNamesFor(weekNumber: number, dayOfWeek: number, shift: number): string[] {
  const data = getDatabaseFor(weekNumber)
  const names = data[dayOfWeek][shift]
  return names
}

function getDatabaseFor(weekNumber: number): any {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'database', `week_${weekNumber}.json`), 'utf-8'))
}
