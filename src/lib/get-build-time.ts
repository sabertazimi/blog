import type { BuildTime } from '@/types'

export default function getBuildTime(preset?: BuildTime): string {
  const buildTime = new Date(preset ?? Date.now()).toISOString()
  return buildTime
}
