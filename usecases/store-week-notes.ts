import fs from 'fs'
import path from 'path'

export function storeWeekNotes(notes: string, weekNumber: number): void {
  const filePath = path.join(__dirname, '..', 'database', `week_${weekNumber}.json`)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  if (data.length < 8) {
    data.push([notes])
  } else {
    data[7] = [notes]
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}
