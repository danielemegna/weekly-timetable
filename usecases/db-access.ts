import fs from 'fs'
import path from 'path'

export function getDatabaseOrCreateFromDefault(weekNumber: number): any {
  const dbFolder = path.join(__dirname, '..', 'database')
  const weekFilePath = path.join(dbFolder, `week_${weekNumber}.json`)

  if (!fs.existsSync(weekFilePath))
    fs.copyFileSync(path.join(dbFolder, 'default.json'), weekFilePath)

  return JSON.parse(fs.readFileSync(weekFilePath, 'utf-8'))
}

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
