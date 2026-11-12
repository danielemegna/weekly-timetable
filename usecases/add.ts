import { getDatabaseOrThrowError, getDefaultShiftsDatabase, storeDatabase, storeDefaultShiftsDatabase } from './db-access'

export function addToShift(weekNumber: number, dayOfWeek: number, shift: number, name: string): void {
  var db = getDatabaseOrThrowError(weekNumber)

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
  db.shifts[dayOfWeek][shift].push(capitalizedName)

  storeDatabase(db, weekNumber)
}

export function addToShiftAsDefault(dayOfWeek: number, shift: number, name: string): void {
  var db = getDefaultShiftsDatabase()

  db.shifts[dayOfWeek][shift].push(name)

  storeDefaultShiftsDatabase(db)
}
