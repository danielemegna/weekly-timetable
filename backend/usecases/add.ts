import fs from 'fs'
import path from 'path'

export function addToShift(weekNumber: number, dayOfWeek: number, shift: number, name: string, ): void {
  console.debug('>>> add: ', {weekNumber, dayOfWeek, shift, name})
}
