import fs from 'fs'
import path from 'path'

export function getDatabaseOrThrowError(weekNumber: number): any {
  const weekFilePath = path.join(__dirname, '..', 'database', `week_${weekNumber}.json`)
  if (!fs.existsSync(weekFilePath))
    throw Error('Cannot find database for week ' + weekNumber)

  return JSON.parse(fs.readFileSync(weekFilePath, 'utf-8'))
}

export function storeDatabase(data: any, weekNumber: number): void {
  const weekFilePath = path.join(__dirname, '..', 'database', `week_${weekNumber}.json`)
  fs.writeFileSync(weekFilePath, JSON.stringify(data, null, 2), 'utf-8')
}
