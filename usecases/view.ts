import { getDatabaseOrCreateFromDefault, getDefaultShiftsDatabase } from './db-access'

export function getNamesFor(weekNumber: number, dayOfWeek: number, shift: number): string[] {
  const db = getDatabaseOrCreateFromDefault(weekNumber)
  return db.shifts[dayOfWeek][shift]
}

export function getDefaultNamesFor(dayOfWeek: number, shift: number): string[] {
  const db = getDefaultShiftsDatabase()
  return db.shifts[dayOfWeek][shift]
}
