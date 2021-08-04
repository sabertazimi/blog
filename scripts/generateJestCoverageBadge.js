const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const fetch = require('node-fetch');

const SummaryFilePath = 'coverage/coverage-summary.json';
const OutputBadgePath = './badges';
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
  if (percentage === undefined) return;

  const coverage = `${percentage}${encodeURI('%')}`;
  const color = getBadgeColor(percentage);
  const url = `https://img.shields.io/badge/${coverageType}-${coverage}-${color}?logo=jest&style=${badgeStyle}`;

  return url;
};

const downloadBadgeFile = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.text();

    return data;
  } catch (err) {
    console.error(`Unable to retrieve data from ${url}`);
    return '';
  }
};
const generateCoverageFile = async (
  summaryFilePath,
  coverageType,
  badgeStyle,
  outputDir
) => {
  if (outputDir) {
    try {
      spawnSync('mkdir', ['-p', outputDir]);
    } catch (e) {
      console.error(`Unable to create output directory: ${outputDir}`);
      return;
    }
  }

  const badgeUrl = getBadgeUrl(summaryFilePath, coverageType, badgeStyle);

  if (!badgeUrl) {
    console.error(`generateCoverageFile: missing badgeUrl for ${coverageType}`);
    return;
  }

  const output = path.join(outputDir, `coverage-${coverageType}.svg`);
  const file = await downloadBadgeFile(badgeUrl);

  if (file.length > 0) {
    try {
      fs.writeFileSync(output, file, { encoding: 'utf8' });
    } catch (e) {
      console.error(`generateCoverageFile: no file to write for ${coverageType}`);
      return;
    }
  } else {
    console.error(`generateCoverageFile: no file to write for ${coverageType}`);
  }
};

generateCoverageFile(
  SummaryFilePath,
  CoverageType[3],
  BadgeStyle[0],
  OutputBadgePath
);
