import { parseISO, formatDistanceToNowStrict } from "date-fns"

export function distanceToNow(timestamp: string) {
  const parsedDate = parseISO(timestamp)
  return formatDistanceToNowStrict(parsedDate, { addSuffix: true })
}

export function distanceToNowFromMilliseconds(timestamp: number) {
  return formatDistanceToNowStrict(timestamp, { addSuffix: true })
}
