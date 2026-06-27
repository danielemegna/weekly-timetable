import { getDatabaseOrThrowError, storeDatabase } from './db-access'

export function deleteFromShift(weekNumber: number, dayOfWeek: number, shift: number, name: string): void {
  var db = getDatabaseOrThrowError(weekNumber)

  const names: string[] = db[dayOfWeek][shift]
  const index = names.indexOf(name)
  if (index === -1)
    return

  names.splice(index, 1)

  storeDatabase(db, weekNumber)
}
