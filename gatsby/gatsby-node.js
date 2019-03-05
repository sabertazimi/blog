/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const fs = require('fs');
const yamlFrontMatter = require('yaml-front-matter');

const rootPath = path.resolve(__dirname, '_posts');
const PREVIEW_PER_PAGE = 10;

class BlogService {
  constructor({ comparator, visitor, accumulator, resolver }) {
    this.comparator = comparator || this.defaultComparator;
    this.visitor = visitor || this.defaultVisitor;
    this.accumulator = accumulator || this.defaultAccumulator;
    this.resolver = resolver || this.defaultResolver;
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
    const files = fs.readdirSync(rootPath);
    let accum = {};

    if (!files || !files.length) {
      return {};
    }

    files.sort(this.comparator);

    files.forEach(fileName => {
      const filePath = path.resolve(rootPath, fileName);
      const mdData = fs.readFileSync(filePath);

      if (mdData) {
        const processedData = this.visitor(null, mdData, fileName, files);
        accum = this.accumulator(accum, processedData);
      } else {
        this.visitor(
          new Error(`[ERR] ${filePath} read failed.`),
          null,
          fileName,
          files
        );
      }
    });

    return this.resolver(accum);
  }
}

const PostsDataService = new BlogService({
  visitor: (err, data, fileName, files) => {
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
          mdFileData.prevPost =
            index + 1 < files.length
              ? files[index + 1]
                  .split('.')
                  .slice(0, -1)
                  .join('.')
              : null;
          mdFileData.nextPost =
            index - 1 >= 0
              ? files[index - 1]
                  .split('.')
                  .slice(0, -1)
                  .join('.')
              : null;
        }
      });

      return mdFileData;
    }

    return data;
  },
  accumulator: (accum, mdFileData) => {
    // accumulator
    if (accum && mdFileData) {
      // initialize accumulator
      if (typeof accum.fileCnt === 'undefined') {
        accum.fileCnt = 0;
      }

      if (typeof accum.tags === 'undefined') {
        accum.tags = {};
      }

      if (typeof accum.posts === 'undefined') {
        accum.posts = [];
      }

      // check integrity of yaml-front
      const yamlFrontFields = [
        'title',
        'subtitle',
        'date',
        'author',
        'tags',
        'header-img',
        '__content',
      ];
      yamlFrontFields.forEach(field => {
        if (!mdFileData[field]) {
          console.log(
            `[WARN] missing '${field}' field in ${mdFileData.fileName}`
          );
        }
      });

      // generate tags data
      if (mdFileData.tags) {
        mdFileData.tags.forEach(tag => {
          if (!accum.tags[tag]) {
            accum.tags[tag] = 0;
          }

          accum.tags[tag] += 1;
        });
      }

      // generate posts data
      mdFileData.pageId = Math.floor(accum.fileCnt / PREVIEW_PER_PAGE) + 1;
      mdFileData.__content = mdFileData.__content;
      mdFileData.url = mdFileData.fileName.split('.').slice(0, -1).join('.');
      accum.posts.push(Object.assign({}, mdFileData));
      accum.fileCnt += 1;
    }

    return accum;
  },
});

exports.createPages = ({ actions: { createPage } }) => {
  const postsData = PostsDataService.generateJSON();
  const { posts, tags } = postsData;

  createPage({
    path: '/',
    component: require.resolve('./src/templates/Home.jsx'),
    context: { posts },
  });

  createPage({
    path: '/tags',
    component: require.resolve('./src/templates/Tags.jsx'),
    context: { tags },
  });

  createPage({
    path: '/tags/all',
    component: require.resolve('./src/templates/Tags.jsx'),
    context: { tags },
  });

  Object.keys(tags).forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: require.resolve('./src/templates/Tags.jsx'),
      context: {
        posts: posts.filter(post => post.tags && post.tags.includes(tag)),
      },
    });
  });

  createPage({
    path: '/books',
    component: require.resolve('./src/templates/Books.jsx'),
  });

  createPage({
    path: '/about',
    component: require.resolve('./src/templates/About.jsx'),
  });

  createPage({
    path: '/post',
    component: require.resolve('./src/templates/Post.jsx'),
    context: { post: posts[0] },
  });

  posts.forEach(post => {
    createPage({
      path: `/posts/${post.url}`,
      component: require.resolve('./src/templates/Post.jsx'),
      context: { post },
    });
  });
};
