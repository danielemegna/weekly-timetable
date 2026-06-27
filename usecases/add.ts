import { getDatabaseOrThrowError, storeDatabase } from './db-access'

export function addToShift(weekNumber: number, dayOfWeek: number, shift: number, name: string): void {
  var db = getDatabaseOrThrowError(weekNumber)

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
  db[dayOfWeek][shift].push(capitalizedName)

  storeDatabase(db, weekNumber)
}
