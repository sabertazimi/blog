const path = require('path');
const fs = require('fs');

const yamlFrontMatter = require('yaml-front-matter');

const rootPath = path.resolve(__dirname);
const mdPath = path.resolve(rootPath, './md');
const jsonPath = path.resolve(rootPath, './json');

const PREVIEW_PER_PAGE = 5;

const init = () => {
  if (!fs.existsSync(jsonPath)) {
    fs.mkdirSync(jsonPath);
  }
}

const generatePostsJson = () => {
  let fileCnt = 0;
  let mdFilesJson = [];
  let tagsJson = {};

  fs.readdir(mdPath, (err, files) => {
    if (err) {
      console.error(err);
    } else {
      files.sort((a, b) => {
        return b  > a;
        // return fs.statSync(path.resolve(mdPath, b)).mtime.getTime() -
        // fs.statSync(path.resolve(mdPath, a)).mtime.getTime();
      });

      files.forEach((fileName) => {
        const filePath = path.resolve(mdPath, fileName);

        try {
          const data = fs.readFileSync(filePath);

          if (data) {
            let mdFileData = yamlFrontMatter.loadFront(data.toString());
            mdFileData['fileName'] = fileName;

            // genrate single markdown file json data
            fs.writeFile(path.resolve(jsonPath, `${fileName}.json`), JSON.stringify(mdFileData), (err) => {
              if (err) {
                console.log(err);
              }
            });

            // generate markdown tags data
            if (mdFileData.tags) {
              mdFileData.tags.forEach((tag) => {
                if (!tagsJson[tag]) {
                  tagsJson[tag] = 0;
                }

                tagsJson[tag] += 1;
              });
            }

            // generate markdown files data
            mdFileData['pageId'] = Math.floor(fileCnt / PREVIEW_PER_PAGE) + 1;
            mdFilesJson.push(Object.assign({}, mdFileData));

            fileCnt += 1;
          }
        } catch (err) {
          console.error(err);
        }
      });

      fs.writeFile(path.resolve(jsonPath, 'tags.json'), JSON.stringify(tagsJson), (err) => {
        if (err) {
          console.log(err);
        }
      });

      fs.writeFile(path.resolve(jsonPath, 'posts.json'), JSON.stringify(mdFilesJson), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

init();
generatePostsJson();
