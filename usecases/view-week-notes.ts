import { getDatabaseOrCreateFromDefault } from './db-access'

export function getWeekNotesFor(weekNumber: number): string | null {
  const db = getDatabaseOrCreateFromDefault(weekNumber)
  if (db.length < 8)
    return null

  return db[7][0] ?? null
}
