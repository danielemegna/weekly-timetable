import { getDatabaseOrThrowError, storeDatabase } from './db-access'

export function storeWeekNotes(notes: string, weekNumber: number): void {
  var db = getDatabaseOrThrowError(weekNumber)

  if (db.length < 8) {
    db.push([notes])
  } else {
    db[7] = [notes]
  }

  storeDatabase(db, weekNumber)
}
