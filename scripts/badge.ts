import cp from 'child_process';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

const rootPath = path.join(__dirname, '..');
const SummaryFilePath = path.join(rootPath, 'coverage/coverage-summary.json');
const OutputBadgePath = path.join(rootPath, 'public');
const CoverageType = ['statements', 'branches', 'functions', 'lines'];
const BadgeStyle = [
  'for-the-badge',
  'flat',
  'flat-square',
  'plastic',
  'social',
];

const getCoveragePercentage = (
  summaryFilePath: string,
  coverageType: string
) => {
  try {
    const summary = fs.readFileSync(summaryFilePath, 'utf8');
    return JSON.parse(summary)['total'][coverageType]['pct'];
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return 0;
  }
};

const getBadgeColor = (percentage: number) => {
  if (percentage < 80) return 'red';
  if (percentage < 90) return 'yellow';
  return 'brightgreen';
};

const getBadgeUrl = (
  summaryFilePath: string,
  coverageType: string,
  badgeStyle: string
) => {
  const percentage = getCoveragePercentage(summaryFilePath, coverageType);
  const coverage = `${percentage}${encodeURI('%')}`;
  const color = getBadgeColor(percentage);
  const url = `https://img.shields.io/badge/${coverageType}-${coverage}-${color}?logo=jest&style=${badgeStyle}`;
  return url;
};

const downloadBadgeFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

const generateCoverageFile = async (
  summaryFilePath: string,
  coverageType: string,
  badgeStyle: string,
  outputDir: string
) => {
  cp.spawnSync('mkdir', ['-p', outputDir]);
  const badgeUrl = getBadgeUrl(summaryFilePath, coverageType, badgeStyle);
  const output = path.join(outputDir, `coverage-${coverageType}.svg`);
  const file = await downloadBadgeFile(badgeUrl);
  fs.writeFileSync(output, file, { encoding: 'utf8' });
};

const main = () => {
  generateCoverageFile(
    SummaryFilePath,
    CoverageType[3],
    BadgeStyle[0],
    OutputBadgePath
  );
};

main();
