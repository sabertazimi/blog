let buildTime = '';

export default function getBuildTime(): string {
  if (buildTime.length) {
    return buildTime;
  }

  buildTime = new Date().toISOString();

  return buildTime;
}
