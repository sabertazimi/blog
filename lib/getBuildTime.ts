import { BuildTime } from '@types'

let buildTime = ''

export default function getBuildTime(preset?: BuildTime): string {
  if (buildTime.length) {
    return buildTime
  }

  buildTime = new Date(preset ?? Date.now()).toISOString()

  return buildTime
}
