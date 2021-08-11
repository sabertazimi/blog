const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const fetch = require('node-fetch');

const SummaryFilePath = 'coverage/coverage-summary.json';
const OutputBadgePath = 'public';
const CoverageType = ['statements', 'branches', 'functions', 'lines'];
const BadgeStyle = [
  'for-the-badge',
  'flat',
  'flat-square',
  'plastic',
  'social',
];

const getCoveragePercentage = (summaryFilePath, coverageType) => {
  const summary = fs.readFileSync(summaryFilePath, 'utf8');
  return JSON.parse(summary)['total'][coverageType]['pct'];
};

const getBadgeColor = (percentage) => {
  if (percentage < 80) return 'red';
  if (percentage < 90) return 'yellow';
  return 'brightgreen';
};

const getBadgeUrl = (summaryFilePath, coverageType, badgeStyle) => {
  const percentage = getCoveragePercentage(summaryFilePath, coverageType);
  const coverage = `${percentage}${encodeURI('%')}`;
  const color = getBadgeColor(percentage);
  const url = `https://img.shields.io/badge/${coverageType}-${coverage}-${color}?logo=jest&style=${badgeStyle}`;
  return url;
};

const downloadBadgeFile = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

const generateCoverageFile = async (
  summaryFilePath,
  coverageType,
  badgeStyle,
  outputDir
) => {
  spawnSync('mkdir', ['-p', outputDir]);
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
