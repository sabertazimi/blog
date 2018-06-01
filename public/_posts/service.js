const path = require('path');
const fs = require('fs');
const yamlFrontMatter = require('yaml-front-matter');

const rootPath = path.resolve(__dirname);
const mdPath = path.resolve(rootPath, './md');
const jsonPath = path.resolve(rootPath, './json');
const PREVIEW_PER_PAGE = 5; // be same with src/constants/index.js
const PREVIEW_CHARS = 360;  // be same with src/constants/index.js

class BlogService {
  constructor(comparator, visitor, accumulator, resolver) {
    this.comparator = comparator || this.defaultComparator;
    this.visitor = visitor || this.defaultVisitor;
    this.accumulator = accumulator || this.defaultAccumulator;
    this.resolver = resolver || this.defaultResolver;
    this.init();
  }

  init() {
    if (!fs.existsSync(jsonPath)) {
      fs.mkdirSync(jsonPath);
    }
  }

  /**
  * defaultComparator
  *
  * @param  {string} a file name
  * @param  {string} b file name
  * @return {boolean}
  */
  defaultComparator(a, b) {
    return b > a;
  }

  /**
  * defaultVisitor
  *
  * @param  {Error}  err  markdown file access error
  * @param  {Buffer} data markdown file data
  * @return {object}      processed markdown file data
  */
  defaultVisitor(err, data) {
    if (err) {
      console.error(err);
      return data;
    }

    return { data: data.toString().substr(0, 20) };
  }

  /**
  * defaultAccumulator
  *
  * @param  {object} accum         original accumulated result
  * @param  {object} processedData current processed markdown file data
  * @return {object}               added accumulated result
  */
  defaultAccumulator(accum, processedData) {
    const acc = accum.data + processedData.data;
    return { data: acc };
  }

  /**
  * defaultResolver
  *
  * @param  {object} accum accumulated result of all visitors
  * @return {object}       resolved result to return
  */
  defaultResolver(accum) {
    return accum;
  }

  /**
  * generateJSON - generate JSON data with several callbacks
  *
  * @return {object} final json data
  */
  generateJSON() {
    const files = fs.readdirSync(mdPath);
    let accum = {};

    if (!files) {
      return JSONData;
    }

    files.sort(this.comparator);

    files.forEach((fileName) => {
      const filePath = path.resolve(mdPath, fileName);
      const mdData = fs.readFileSync(filePath);

      if (mdData) {
        const processedData = this.visitor(null, mdData);
        accum = this.accumulator(accum, processedData);
      } else {
        this.visitor(new Error(`[ERR] ${filePath} read failed.`), null);
      }
    });

    return this.resolver(accum);
  }
}

// use
const getPostsService = new BlogService();
const JSONData = getPostsService.generateJSON();
