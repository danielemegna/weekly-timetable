import fs from 'fs'
import path from 'path'

export function getDatabaseOrDefault(weekNumber: number): any {
  let weekFilePath = dbFilePath(`week_${weekNumber}`)

  if (!fs.existsSync(weekFilePath))
    weekFilePath = dbFilePath('default')

  return JSON.parse(fs.readFileSync(weekFilePath, 'utf-8'))
}

export function getDatabaseOrCreateFromDefault(weekNumber: number): any {
  if (Number.isNaN(weekNumber))
    throw Error('Cannot get or create database for week NaN')

  const weekFilePath = dbFilePath(`week_${weekNumber}`)

  if (!fs.existsSync(weekFilePath))
    fs.copyFileSync(dbFilePath('default'), weekFilePath)

  return JSON.parse(fs.readFileSync(weekFilePath, 'utf-8'))
}

export function getDatabaseOrThrowError(weekNumber: number): any {
  const weekFilePath = dbFilePath(`week_${weekNumber}`)
  if (!fs.existsSync(weekFilePath))
    throw Error('Cannot find database for week ' + weekNumber)

  return JSON.parse(fs.readFileSync(weekFilePath, 'utf-8'))
}

export function getDefaultShiftsDatabase(): any {
  const defaultShiftFilePath = dbFilePath('default')
  if (!fs.existsSync(defaultShiftFilePath))
    throw Error('Cannot find database of default shifts!')

  return JSON.parse(fs.readFileSync(defaultShiftFilePath, 'utf-8'))
}

export function storeDatabase(data: any, weekNumber: number): void {
  const weekFilePath = dbFilePath(`week_${weekNumber}`)
  fs.writeFileSync(weekFilePath, JSON.stringify(data, null, 2), 'utf-8')
}

export function storeDefaultShiftsDatabase(data: any): void {
  const defaultShiftFilePath = dbFilePath('default')
  fs.writeFileSync(defaultShiftFilePath, JSON.stringify(data, null, 2), 'utf-8')
}

function dbFilePath(name: string): string {
  return path.join(__dirname, '..', 'database', `${name}.json`)
}
