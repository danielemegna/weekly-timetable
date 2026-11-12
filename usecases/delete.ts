import { getDatabaseOrThrowError, getDefaultShiftsDatabase, storeDatabase, storeDefaultShiftsDatabase } from './db-access'

export function deleteFromShift(weekNumber: number, dayOfWeek: number, shift: number, name: string): void {
  var db = getDatabaseOrThrowError(weekNumber)
  const found = removeNameFrom(dayOfWeek, shift, name, db)
  if(found)
    storeDatabase(db, weekNumber)
}

export function deleteFromDefaultShift(dayOfWeek: number, shift: number, name: string): void {
  var db = getDefaultShiftsDatabase()
  const found = removeNameFrom(dayOfWeek, shift, name, db)
  if(found)
    storeDefaultShiftsDatabase(db)
}

function removeNameFrom(dayOfWeek: number, shift: number, name: string, db :any): boolean {
  const names: string[] = db.shifts[dayOfWeek][shift]
  const index = names.indexOf(name)
  if (index === -1)
    return false

  names.splice(index, 1)
  return true
}
