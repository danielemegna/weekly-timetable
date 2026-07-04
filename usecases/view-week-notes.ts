import { getDatabaseOrCreateFromDefault } from './db-access'

export function getWeekNotesFor(weekNumber: number): string | null {
  const db = getDatabaseOrCreateFromDefault(weekNumber)
  return db.notes ?? null
}
