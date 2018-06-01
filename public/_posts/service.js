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
  * @param  {string} fileName
  * @param  {Error}  err  markdown file access error
  * @param  {Buffer} data markdown file data
  * @return {object}      processed markdown file data
  */
  defaultVisitor(fileName, err, data) {
    if (err) {
      console.error(err);
      return null;
    }

    if (data) {
      return { data: data.toString().substr(0, 20) };
    }

    return data;
  }

  /**
  * defaultAccumulator
  *
  * @param  {object} accum         original accumulated result
  * @param  {object} processedData current processed markdown file data
  * @return {object}               added accumulated result
  */
  defaultAccumulator(accum, processedData) {
    if (accum && processedData) {
      const acc = accum.data + processedData.data;
      return { data: acc };
    }

    return accum;
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
        const processedData = this.visitor(fileName, null, mdData);
        accum = this.accumulator(accum, processedData);
      } else {
        this.visitor(fileName, new Error(`[ERR] ${filePath} read failed.`), null);
      }
    });

    return this.resolver(accum);
  }
}

const getPostsMetadata = new BlogService(null, (fileName, err, data) => {
  // visitor
  if (err) {
    console.error(err);
    return null;
  }

  if (data) {
    let mdFileData = yamlFrontMatter.loadFront(data.toString());
    mdFileData.fileName = fileName;
    return mdFileData;
  }

  return data;
}, (accum, mdFileData) => {
  // accumulator
  if (accum && mdFileData) {
    // initialize accumulator
    if (typeof accum.fileCnt === 'undefined') {
      accum.fileCnt = 0;
    }

    if (typeof accum.tagsJSON === 'undefined') {
      accum.tagsJSON = {};
    }

    if (typeof accum.postsJSON === 'undefined') {
      accum.postsJSON = [];
    }

    // generate single markdown file json data
    fs.writeFile(path.resolve(jsonPath, `${mdFileData.fileName}.json`), JSON.stringify(mdFileData), (err) => {
      if (err) {
        console.error(err);
      }
    });

    if (mdFileData.tags) {
      mdFileData.tags.forEach((tag) => {
        if (!accum.tagsJSON[tag]) {
          accum.tagsJSON[tag] = 0;
        }

        accum.tagsJSON[tag] += 1;
      });
    }

    // generate posts metadata
    mdFileData.pageId = Math.floor(accum.fileCnt / PREVIEW_PER_PAGE) + 1;
    mdFileData.__content = mdFileData.__content.substr(0, PREVIEW_CHARS);
    accum.postsJSON.push(Object.assign({}, mdFileData));
    accum.fileCnt += 1;
  }

  return accum;
}, (accum) => {
  // resolver
  if (accum) {
    fs.writeFile(path.resolve(jsonPath, 'tags.json'), JSON.stringify(accum.tagsJSON), (err) => {
      if (err) {
        console.error(err);
      }
    });

    fs.writeFile(path.resolve(jsonPath, 'posts.json'), JSON.stringify(accum.postsJSON), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  return accum;
});

getPostsMetadata.generateJSON();
