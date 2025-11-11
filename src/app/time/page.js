//  Function to fetch the current in UTC ======================================
export default async function TimePage() {
  const timeRequest = await fetch('https://worldtimeapi.org/api/timezone/UTC', {
    next: { revalidate: 20 },
    // no cache at all
    //cache: 'no-store',
  })
  const time = await timeRequest.json()
  return <div>Current timestamp: {time?.datetime}</div>
}
