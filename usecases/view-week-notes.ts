import fs from 'fs'
import path from 'path'

export function getWeekNotesFor(weekNumber: number): string | null {
  const data = getDatabaseFor(weekNumber)
  if (data.length < 8)
    return null

  return data[7][0] ?? null
}

function getDatabaseFor(weekNumber: number): any {
  const dbFolder = path.join(__dirname, '..', 'database')
  const weekFilePath = path.join(dbFolder, `week_${weekNumber}.json`)

  if (!fs.existsSync(weekFilePath))
    fs.copyFileSync(path.join(dbFolder, 'default.json'), weekFilePath)

  return JSON.parse(fs.readFileSync(weekFilePath, 'utf-8'))
}
