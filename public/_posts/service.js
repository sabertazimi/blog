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
    if (a < b) return 1;
    else if (a > b) return -1;
    return 0;
  }

  /**
  * defaultVisitor
  *
  * @param  {Error}  err  markdown file access error
  * @param  {Buffer} data markdown file data
  * @param  {string} fileName
  * @param  {array}  files
  * @return {object}      processed markdown file data
  */
  defaultVisitor(err, data, fileName, files) {
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

    if (!files || !files.length) {
      return JSONData;
    }

    files.sort(this.comparator);

    files.forEach((fileName) => {
      const filePath = path.resolve(mdPath, fileName);
      const mdData = fs.readFileSync(filePath);

      if (mdData) {
        const processedData = this.visitor(null, mdData, fileName, files);
        accum = this.accumulator(accum, processedData);
      } else {
        this.visitor(new Error(`[ERR] ${filePath} read failed.`), null, fileName, files);
      }
    });

    return this.resolver(accum);
  }
}

const getPostsMetadata = new BlogService(null, (err, data, fileName, files) => {
  // visitor
  if (err) {
    console.error(err);
    return null;
  }

  if (data) {
    let mdFileData = yamlFrontMatter.loadFront(data.toString());
    mdFileData.id = fileName;
    mdFileData.fileName = fileName;

    files.forEach((fileName, index, files) => {
      if (fileName == mdFileData.fileName) {
        mdFileData.prevPost = (index + 1 < files.length) ? files[index + 1] : null;
        mdFileData.nextPost = (index - 1 >= 0) ? files[index - 1] : null;
      }
    });

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

    // check integrity of yaml-front
    const yamlFrontFields = ['title', 'subtitle', 'date', 'author', 'tags', 'header-img', '__content'];
    yamlFrontFields.forEach((field) => {
      if (!mdFileData[field]) {
        console.log(`[WARN] missing '${field}' field in ${mdFileData.fileName}`);
      }
    });

    // generate single markdown file json data
    fs.writeFile(path.resolve(jsonPath, `${mdFileData.fileName}.json`), JSON.stringify(mdFileData), (err) => {
      if (err) {
        console.error(err);
      }
    });

    // generate tags metadata
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
    // write tags metadata
    fs.writeFile(path.resolve(jsonPath, 'tags.json'), JSON.stringify(accum.tagsJSON), (err) => {
      if (err) {
        console.error(err);
      }
    });

    // write posts metadata
    fs.writeFile(path.resolve(jsonPath, 'posts.json'), JSON.stringify(accum.postsJSON), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  return accum;
});

getPostsMetadata.generateJSON();
