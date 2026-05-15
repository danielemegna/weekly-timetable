import fs from 'fs'
import path from 'path'

export function getNamesFor(weekNumber: number, dayOfWeek: number, shift: number): string[] {
  const data = getDatabaseFor(weekNumber)
  const names = data[dayOfWeek][shift]
  return names
}

function getDatabaseFor(weekNumber: number): any {
  const dbFolder = path.join(__dirname, '..', 'database')
  const weekFilePath = path.join(dbFolder, `week_${weekNumber}.json`)
  if (!fs.existsSync(weekFilePath))
    fs.copyFileSync(path.join(dbFolder, 'default.json'), weekFilePath)
  return JSON.parse(fs.readFileSync(weekFilePath, 'utf-8'))
}
