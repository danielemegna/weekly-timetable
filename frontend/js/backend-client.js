
const BACKEND_HOST = 'http://localhost:8125'
const DATABASE_API = BACKEND_HOST + '/database'

export async function shiftsFromDate(date) {
  const weekNumber = date.week()
  console.info(`Fetching week ${weekNumber} ....`)
  var fetchResponse = await fetch(`${DATABASE_API}/week_${weekNumber}.json`)
  if(fetchResponse.status == 200) {
    return await fetchResponse.json()
  }

  console.info(`Week not found, fetching defaults ...`)
  fetchResponse = await fetch(`${DATABASE_API}/default.json`)
  const databaseContent = await fetchResponse.json()
  return databaseContent.sort(() => .5 - Math.random())
}

export function getEditPageUrlFor(weekNumber, dayOfWeek, shift) {
  return `${BACKEND_HOST}/edit?week=${weekNumber}&dayOfWeek=${dayOfWeek}&shift=${shift}`
}
