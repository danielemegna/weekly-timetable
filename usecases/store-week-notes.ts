import { getDatabaseOrThrowError, storeDatabase } from './db-access'

export function storeWeekNotes(notes: string, weekNumber: number): void {
  var db = getDatabaseOrThrowError(weekNumber)
  db.notes = notes || null
  storeDatabase(db, weekNumber)
}
