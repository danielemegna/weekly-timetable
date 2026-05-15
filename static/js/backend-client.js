
const BACKEND_HOST = ''
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
  return await fetchResponse.json()
}

export function getEditPageUrlFor(weekNumber, dayOfWeek, shift) {
  return `${BACKEND_HOST}/edit?week=${weekNumber}&dayOfWeek=${dayOfWeek}&shift=${shift}`
}
