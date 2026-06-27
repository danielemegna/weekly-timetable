import { getDatabaseOrCreateFromDefault } from './db-access'

export function getNamesFor(weekNumber: number, dayOfWeek: number, shift: number): string[] {
  const db = getDatabaseOrCreateFromDefault(weekNumber)
  return db[dayOfWeek][shift]
}
