# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [5.1.0](https://github.com/sabertazimi/blog/compare/v5.0.0...v5.1.0) (2025-11-30)


### :sparkles: Features

* **home-dock:** add dock nav to home page ([#1514](https://github.com/sabertazimi/blog/issues/1514)) ([5e565f7](https://github.com/sabertazimi/blog/commit/5e565f756795687a50085d4a2b6023862488410f))


### :bug: Bug Fixes

* **404:** change not found from SVG to fuzzy text ([#1510](https://github.com/sabertazimi/blog/issues/1510)) ([14bc5f9](https://github.com/sabertazimi/blog/commit/14bc5f97984d2f632fef074c5370131c9253225f))
* **about-repo:** setup min stars threshold for github repo ([#1508](https://github.com/sabertazimi/blog/issues/1508)) ([204e547](https://github.com/sabertazimi/blog/commit/204e5477d461e1df2e99b22088936333908e1d27))
* **colors:** change rgb color to oklch color ([#1517](https://github.com/sabertazimi/blog/issues/1517)) ([212c8da](https://github.com/sabertazimi/blog/commit/212c8da3eafb7cef8362583fb6d0d248d8efa668))
* **deps:** update dependencies (non-major) ([#1511](https://github.com/sabertazimi/blog/issues/1511)) ([68e6246](https://github.com/sabertazimi/blog/commit/68e62467e94e7fee0bb798a3e198619f8fb5a49a))
* **deps:** update dependency next to ^16.0.5 ([#1512](https://github.com/sabertazimi/blog/issues/1512)) ([8a7cd0e](https://github.com/sabertazimi/blog/commit/8a7cd0e7ef87d80b0a4f7dd661450ca78959d053))
* **home-stars:** change stars color to primary color ([#1513](https://github.com/sabertazimi/blog/issues/1513)) ([944c065](https://github.com/sabertazimi/blog/commit/944c06556c38d27a21f60c5521849a793130612f))
* **i18n:** add `setRequestLocale` to all relevant layouts and pages ([#1518](https://github.com/sabertazimi/blog/issues/1518)) ([15df07d](https://github.com/sabertazimi/blog/commit/15df07d6b5093ec1947a19e0a61c6382ded34afa))
* **post-a11y:** keep headings in sequentially-descending order ([#1524](https://github.com/sabertazimi/blog/issues/1524)) ([7cecd5c](https://github.com/sabertazimi/blog/commit/7cecd5c3627d940f093ade8a7777038786d2773c))
* **ui-morphing text:** rectify SSR hydration mismatch ([#1509](https://github.com/sabertazimi/blog/issues/1509)) ([a06abca](https://github.com/sabertazimi/blog/commit/a06abca396e31619aa032a18871db864353b28a4))


### :zap: Performance

* [ImgBot] optimize images ([#1516](https://github.com/sabertazimi/blog/issues/1516)) ([d436471](https://github.com/sabertazimi/blog/commit/d4364714b1b74bc79917a20e187b1569864aad82))


### :wrench: Testing

* **compnents:** add more interaction unit tests ([#1520](https://github.com/sabertazimi/blog/issues/1520)) ([5c3032c](https://github.com/sabertazimi/blog/commit/5c3032ce46bd3269cf5345d0564e90d213dc17a8))
* **components-language switcher:** add user interaction unit tests ([#1519](https://github.com/sabertazimi/blog/issues/1519)) ([1e9e034](https://github.com/sabertazimi/blog/commit/1e9e03473376edf8f03df52729c82fb62ebda5e5))
* **components:** add more unit tests ([#1521](https://github.com/sabertazimi/blog/issues/1521)) ([b19077f](https://github.com/sabertazimi/blog/commit/b19077f1890d55c6cce11c193abdc0e7c5f7d782))

## [5.0.0](https://github.com/sabertazimi/blog/compare/v4.1.0...v5.0.0) (2025-11-26)


### ⚠ BREAKING CHANGES

* rewrite entire blog with shadcn ui.

* fix: rectify linting and testing errors

* test(e2e): setup playwright e2e tests

* chore: remove redundant files

* test: rectify testing failure

* fix(routes): setup basic pages

* chore: change markdown path

* feat(progress-bar): migrate from nprogress to bprogress

* fix: rectify broken color

### :sparkles: Features

* **command-tags:** add tags search feature ([#1486](https://github.com/sabertazimi/blog/issues/1486)) ([959017a](https://github.com/sabertazimi/blog/commit/959017adbbb56a0fb45d0e279eb80c34302ab3d5))
* **footer:** implement site footer component ([#1457](https://github.com/sabertazimi/blog/issues/1457)) ([835381d](https://github.com/sabertazimi/blog/commit/835381d0a2797b10431a09286816c31b28261cda))
* **header:** implement site header components ([#1456](https://github.com/sabertazimi/blog/issues/1456)) ([6f11e84](https://github.com/sabertazimi/blog/commit/6f11e8488b05793812da8530ec9eb2c2eb38373a))
* **i18n:** setup i18n and locale-based routing ([#1503](https://github.com/sabertazimi/blog/issues/1503)) ([2964304](https://github.com/sabertazimi/blog/commit/2964304c08f66642b91cf288084f87171cd42b14))
* implement about page ([#1461](https://github.com/sabertazimi/blog/issues/1461)) ([2c7d100](https://github.com/sabertazimi/blog/commit/2c7d10054df81c8f74b764e36aa6a936d21f2a27))
* **mdx-admonition:** implement mdx admonition component ([#1478](https://github.com/sabertazimi/blog/issues/1478)) ([009c71e](https://github.com/sabertazimi/blog/commit/009c71e51c3a5474c5d4863b7e4b3a485cb2ba9d))
* **mdx-code:** implement mdx code blocks ([#1487](https://github.com/sabertazimi/blog/issues/1487)) ([955390b](https://github.com/sabertazimi/blog/commit/955390bfc98f93c2e62e9ff89f60d9ae3614232a))
* **mdx-image:** add custom image component to mdx ([#1490](https://github.com/sabertazimi/blog/issues/1490)) ([dbcc98c](https://github.com/sabertazimi/blog/commit/dbcc98cefca94d1f0749c64cb7b30c6bfb4f170c))
* **mdx-thumbnail:** add metadata and thumbnail to mdx ([#1463](https://github.com/sabertazimi/blog/issues/1463)) ([5e15028](https://github.com/sabertazimi/blog/commit/5e150282131c43ae646955008eb29667d498ae84))
* **mdx-toc:** implement clerk-style table of contents component ([#1467](https://github.com/sabertazimi/blog/issues/1467)) ([087eceb](https://github.com/sabertazimi/blog/commit/087ecebb83fc5e4a026981b2a44be5075aeee67c))
* **mdx:** implement back to top button ([#1471](https://github.com/sabertazimi/blog/issues/1471)) ([d4f2da8](https://github.com/sabertazimi/blog/commit/d4f2da8e19ccf218e952a34f25a7d57279a2005f))
* **mdx:** implement typography for mdx ([#1464](https://github.com/sabertazimi/blog/issues/1464)) ([ff3aae8](https://github.com/sabertazimi/blog/commit/ff3aae8e41ef3328c7ecf9758ada316e51debc08))
* **post-comment:** add disqus comment component ([#1472](https://github.com/sabertazimi/blog/issues/1472)) ([39286c5](https://github.com/sabertazimi/blog/commit/39286c5cddd34abf50c698b1431a90bdab38d8e0))
* **post-footer:** implement post navigation component ([#1475](https://github.com/sabertazimi/blog/issues/1475)) ([547741c](https://github.com/sabertazimi/blog/commit/547741c49a508b60105db4c47fe63ff028d72c57))
* **post-header:** change post header tag to link ([#1473](https://github.com/sabertazimi/blog/issues/1473)) ([154b951](https://github.com/sabertazimi/blog/commit/154b9512792e90301612d15c13cc504dc124648d))
* **post-image:** implement lazy-loading image component ([#1483](https://github.com/sabertazimi/blog/issues/1483)) ([1a9345f](https://github.com/sabertazimi/blog/commit/1a9345f914d7cc44092ee975cfa0efe3ba6977c6))
* **post-share:** implement post share buttons ([#1495](https://github.com/sabertazimi/blog/issues/1495)) ([835293f](https://github.com/sabertazimi/blog/commit/835293f13a871e9d73dad5249238ba831e7b5047))
* **post-toc:** implement mobile toc nav ([#1500](https://github.com/sabertazimi/blog/issues/1500)) ([e17a23c](https://github.com/sabertazimi/blog/commit/e17a23cd5fb3b1dd340c5ab74c8663194c51127d))
* **post:** implement post page ([#1462](https://github.com/sabertazimi/blog/issues/1462)) ([d9a2e33](https://github.com/sabertazimi/blog/commit/d9a2e332e997776c8bf0481e3f927e363bd0503c))
* **posts:** implement posts grid ([#1460](https://github.com/sabertazimi/blog/issues/1460)) ([255fa6f](https://github.com/sabertazimi/blog/commit/255fa6f9f57648224720c34d39f5c50f3799cc6b))
* rewrite entire blog with shadcn ui ([#1455](https://github.com/sabertazimi/blog/issues/1455)) ([d505830](https://github.com/sabertazimi/blog/commit/d505830baf0ea17a9fca703b4f086d176be2b707))
* **theme:** add theme persistent storage support ([#1488](https://github.com/sabertazimi/blog/issues/1488)) ([d3441ad](https://github.com/sabertazimi/blog/commit/d3441ad2f9c2152284a5b5e5a339948b08cf0f7a))


### :bug: Bug Fixes

* **command:** add bprogress animation for route push ([#1501](https://github.com/sabertazimi/blog/issues/1501)) ([cb7de31](https://github.com/sabertazimi/blog/commit/cb7de313f6d415e1153087ce526297bb4e498cec))
* **command:** add shortcuts introduction ([#1493](https://github.com/sabertazimi/blog/issues/1493)) ([068ace9](https://github.com/sabertazimi/blog/commit/068ace99be02f9c7c0c45e02bd8791069e6d25a4))
* **command:** migrate to newer tailwind syntax ([#1458](https://github.com/sabertazimi/blog/issues/1458)) ([51cabe4](https://github.com/sabertazimi/blog/commit/51cabe4b8e393c1e9a0b27d7265a294aedfa45ad))
* **command:** show search icon for mobile ([#1498](https://github.com/sabertazimi/blog/issues/1498)) ([50a2559](https://github.com/sabertazimi/blog/commit/50a2559c0f1987eaf8a6b7b905c2ea1d6a0f0f03))
* **components:** remove redundant banner ([#1476](https://github.com/sabertazimi/blog/issues/1476)) ([aca586b](https://github.com/sabertazimi/blog/commit/aca586b2a67aa978b9aed0bf1860686ca87c1f74))
* format code ([04c9be5](https://github.com/sabertazimi/blog/commit/04c9be5c3c29c6f28ab2af9c7c44621fed560d99))
* **home:** chnage landing page stars count ([7033712](https://github.com/sabertazimi/blog/commit/70337126b08ad62fcdaf2326dacb473a0b113cb4))
* **icons:** rename all icon components ([#1479](https://github.com/sabertazimi/blog/issues/1479)) ([ad8f9ab](https://github.com/sabertazimi/blog/commit/ad8f9ab5b9fb5f6ae97f1cd9ae7306d722cffab6))
* **mdx-admonition:** add `[title]` syntax support ([#1504](https://github.com/sabertazimi/blog/issues/1504)) ([4225258](https://github.com/sabertazimi/blog/commit/42252581365d985f2b0f302a4d1b60c2730c438a))
* **mdx-footnotes:** add styles for footnotes ([#1480](https://github.com/sabertazimi/blog/issues/1480)) ([5993d3a](https://github.com/sabertazimi/blog/commit/5993d3a256cfe572e10b8d0c3d35c64d0dae9d2e))
* **mdx-headings:** implement anchor hover effect ([#1497](https://github.com/sabertazimi/blog/issues/1497)) ([f476c86](https://github.com/sabertazimi/blog/commit/f476c860cbb26e02f4cf4e5d43cdf8ae13c11caa))
* **mdx-toc:** add icon to toc title ([#1470](https://github.com/sabertazimi/blog/issues/1470)) ([19eec0e](https://github.com/sabertazimi/blog/commit/19eec0e5133753f69733d3982dfde83872e17a92))
* **mdx-toc:** ensure toc title consistency ([#1496](https://github.com/sabertazimi/blog/issues/1496)) ([19a56fa](https://github.com/sabertazimi/blog/commit/19a56fafd6cc358f4f7bc2fe7312fe14fb8679c9))
* **mdx:** rename mdx component and centering mdx image  ([#1477](https://github.com/sabertazimi/blog/issues/1477)) ([4376010](https://github.com/sabertazimi/blog/commit/43760104783e7cbe0bc7a46d8482619959326b82))
* **nav:** add icons to mobile nav links ([#1494](https://github.com/sabertazimi/blog/issues/1494)) ([9fd21e6](https://github.com/sabertazimi/blog/commit/9fd21e69043de35b8d1e7929630db7616dcad990))
* **post-comment:** move comment to bottom to avoid CLS ([#1489](https://github.com/sabertazimi/blog/issues/1489)) ([1bc2ba7](https://github.com/sabertazimi/blog/commit/1bc2ba7427b602b6bb0e05ec2201f82aaf3b8a53))
* **post-header:** add last update time to header metadata ([#1474](https://github.com/sabertazimi/blog/issues/1474)) ([532b2f8](https://github.com/sabertazimi/blog/commit/532b2f89db85d525b1b135889325737642de84fd))
* **post-image:** remove `<div>` inside `<p>` ([b199dbd](https://github.com/sabertazimi/blog/commit/b199dbd24065cde7cdd562bf37acefa4536f64f4))
* **post-image:** remove fallback when image loaded ([#1482](https://github.com/sabertazimi/blog/issues/1482)) ([c89cc6f](https://github.com/sabertazimi/blog/commit/c89cc6f68fd3330440c98c88a80828299a7eb377))
* **post-thumbnail:** add height on `lg` screen ([#1491](https://github.com/sabertazimi/blog/issues/1491)) ([620981d](https://github.com/sabertazimi/blog/commit/620981d4cad93c5c4e0f6ec5bc617942c1e0901f))
* **post-toc:** shorten toc height ([#1485](https://github.com/sabertazimi/blog/issues/1485)) ([9349639](https://github.com/sabertazimi/blog/commit/934963902069c068b5b52be31d03c93d125a87ad))
* **providers:** merge all providers into single file ([#1502](https://github.com/sabertazimi/blog/issues/1502)) ([39bbf74](https://github.com/sabertazimi/blog/commit/39bbf746568b4ba6b428bcb2e3499433b38b6e5f))
* **seo:** allow crawling and indexing ([#1459](https://github.com/sabertazimi/blog/issues/1459)) ([fdefa4f](https://github.com/sabertazimi/blog/commit/fdefa4f5f3fa4049245c22bdad94a042e444a91e))
* **seo:** change language metadata ([24ceeac](https://github.com/sabertazimi/blog/commit/24ceeac7442fe9441aaa1931eddcf70043ce9ad3))
* **theme:** change text to primary color ([#1505](https://github.com/sabertazimi/blog/issues/1505)) ([ae0d8e5](https://github.com/sabertazimi/blog/commit/ae0d8e5c3ae8ad1dbbd6eb761fe9613e299ed27a))
* **ui-theme:** use Button inside theme toggler ([#1499](https://github.com/sabertazimi/blog/issues/1499)) ([3a9890e](https://github.com/sabertazimi/blog/commit/3a9890e4361704fe3a5834ac6815553cf8baf7e9))


### :zap: Performance

* [ImgBot] optimize images ([#1492](https://github.com/sabertazimi/blog/issues/1492)) ([f801c3c](https://github.com/sabertazimi/blog/commit/f801c3c94225050ca49268228aa75edf8783e970))


### :wrench: Testing

* **unit:** setup components unit tests ([#1507](https://github.com/sabertazimi/blog/issues/1507)) ([3788ed6](https://github.com/sabertazimi/blog/commit/3788ed693a267ce50cf22bd71339675331f7b882))

## [4.1.0](https://github.com/sabertazimi/blog/compare/v4.0.0...v4.1.0) (2025-11-19)


### :sparkles: Features

* **app-theme:** enable theme switch for antd design ([#1260](https://github.com/sabertazimi/blog/issues/1260)) ([5e11e78](https://github.com/sabertazimi/blog/commit/5e11e787c2fef4990b0354a388bf5835d3c2db2f))
* **next:** bump to next v16, react v19 and tailwind v4 ([#1452](https://github.com/sabertazimi/blog/issues/1452)) ([47524b8](https://github.com/sabertazimi/blog/commit/47524b828a632d513f2dc2fa7c77bfcdffc46227))


### :bug: Bug Fixes

* **components-InlineCode:** overwrite antd default styles ([#1259](https://github.com/sabertazimi/blog/issues/1259)) ([1704e8a](https://github.com/sabertazimi/blog/commit/1704e8a658d88748d572f5712074627600c238b2))
* **components-MDX:** adjust list item spacing ([#1258](https://github.com/sabertazimi/blog/issues/1258)) ([ef17c23](https://github.com/sabertazimi/blog/commit/ef17c23930907cc5a602ecf2e1e64c9815a4e1c0))
* **components:** fix the key warning in `BlockCode` component ([#1281](https://github.com/sabertazimi/blog/issues/1281)) ([5aea76c](https://github.com/sabertazimi/blog/commit/5aea76c82d884891d5196f207da95ae769b2168e))
* **config-site:** update titles for landing page ([76098b5](https://github.com/sabertazimi/blog/commit/76098b5ade0266171a1cf9459d7508b5562de501))
* **deps:** update dependencies (non-major) ([#1268](https://github.com/sabertazimi/blog/issues/1268)) ([74e8f3b](https://github.com/sabertazimi/blog/commit/74e8f3bd73f17d02af593f05c7769984d46b2b89))
* **deps:** update dependencies (non-major) ([#1284](https://github.com/sabertazimi/blog/issues/1284)) ([d67fc57](https://github.com/sabertazimi/blog/commit/d67fc579fc998b0f7536e2acc49916c9d3c40bff))
* **deps:** update dependencies (non-major) ([#1285](https://github.com/sabertazimi/blog/issues/1285)) ([2b4c5fa](https://github.com/sabertazimi/blog/commit/2b4c5facb6d9a2aa05210f051f78752a04cfd4f9))
* **deps:** update dependencies (non-major) ([#1290](https://github.com/sabertazimi/blog/issues/1290)) ([b209b0b](https://github.com/sabertazimi/blog/commit/b209b0b8d9b291c5bb3b8106baf9e8085ff86eb8))
* **deps:** update dependencies (non-major) ([#1298](https://github.com/sabertazimi/blog/issues/1298)) ([e807ede](https://github.com/sabertazimi/blog/commit/e807edeca848e687cda2d16c9e87655bad39c462))
* **deps:** update dependencies (non-major) ([#1301](https://github.com/sabertazimi/blog/issues/1301)) ([8039915](https://github.com/sabertazimi/blog/commit/803991538dc4124417c5195c6cdd569e4d19f1c1))
* **deps:** update dependencies (non-major) ([#1304](https://github.com/sabertazimi/blog/issues/1304)) ([819cc42](https://github.com/sabertazimi/blog/commit/819cc425d3a60281cf33928e14e874c6c56285d3))
* **deps:** update dependencies (non-major) ([#1307](https://github.com/sabertazimi/blog/issues/1307)) ([1e42cb8](https://github.com/sabertazimi/blog/commit/1e42cb88796b4e356533a099e20fe87597d5e8c9))
* **deps:** update dependencies (non-major) ([#1309](https://github.com/sabertazimi/blog/issues/1309)) ([df03bb9](https://github.com/sabertazimi/blog/commit/df03bb9531c5aef726857cd85620e508af98c83d))
* **deps:** update dependencies (non-major) ([#1311](https://github.com/sabertazimi/blog/issues/1311)) ([334221c](https://github.com/sabertazimi/blog/commit/334221c9ec965467007dab95066e6bd93213b7ed))
* **deps:** update dependencies (non-major) ([#1313](https://github.com/sabertazimi/blog/issues/1313)) ([5385051](https://github.com/sabertazimi/blog/commit/53850517235770e21ecafe8aa573199332780d36))
* **deps:** update dependencies (non-major) ([#1317](https://github.com/sabertazimi/blog/issues/1317)) ([74847aa](https://github.com/sabertazimi/blog/commit/74847aabbe09f06f86878c8655bfd3b6e8192275))
* **deps:** update dependencies (non-major) ([#1320](https://github.com/sabertazimi/blog/issues/1320)) ([0a70116](https://github.com/sabertazimi/blog/commit/0a70116fda9e014136cb938c28cd33eeb90d7585))
* **deps:** update dependencies (non-major) ([#1324](https://github.com/sabertazimi/blog/issues/1324)) ([37494e7](https://github.com/sabertazimi/blog/commit/37494e7fdda95026f3b7935c12eb2287235f3bbb))
* **deps:** update dependencies (non-major) ([#1325](https://github.com/sabertazimi/blog/issues/1325)) ([605ed64](https://github.com/sabertazimi/blog/commit/605ed64a84842dc2fefa1e574134373b3eb8391e))
* **deps:** update dependencies (non-major) ([#1328](https://github.com/sabertazimi/blog/issues/1328)) ([2c83bd1](https://github.com/sabertazimi/blog/commit/2c83bd142a16663f7cfdde5619f22170fb2bbe29))
* **deps:** update dependencies (non-major) ([#1338](https://github.com/sabertazimi/blog/issues/1338)) ([dcb6a4f](https://github.com/sabertazimi/blog/commit/dcb6a4f6dd9efc3cba2957c056f3951e86da6af0))
* **deps:** update dependencies (non-major) ([#1341](https://github.com/sabertazimi/blog/issues/1341)) ([60b7fd1](https://github.com/sabertazimi/blog/commit/60b7fd177acc4c890e0a0582fdbe1f01a7705d57))
* **deps:** update dependencies (non-major) ([#1346](https://github.com/sabertazimi/blog/issues/1346)) ([441db18](https://github.com/sabertazimi/blog/commit/441db18a353a06e3937f5cb1b27f6c6d84e83317))
* **deps:** update dependencies (non-major) ([#1352](https://github.com/sabertazimi/blog/issues/1352)) ([106b9fa](https://github.com/sabertazimi/blog/commit/106b9fa3a4519c6c5fff101c552f3aa8bc5836ce))
* **deps:** update dependencies (non-major) ([#1354](https://github.com/sabertazimi/blog/issues/1354)) ([32a5993](https://github.com/sabertazimi/blog/commit/32a59930c4d058e7f8eadabf776da659e149428f))
* **deps:** update dependencies (non-major) ([#1357](https://github.com/sabertazimi/blog/issues/1357)) ([1e5703d](https://github.com/sabertazimi/blog/commit/1e5703dc125267585c3d0a5041c19fd8f4b99917))
* **deps:** update dependencies (non-major) ([#1359](https://github.com/sabertazimi/blog/issues/1359)) ([7d97101](https://github.com/sabertazimi/blog/commit/7d97101f2935295a1d651134431027baab533b02))
* **deps:** update dependencies (non-major) ([#1361](https://github.com/sabertazimi/blog/issues/1361)) ([cc3c0f5](https://github.com/sabertazimi/blog/commit/cc3c0f523c76747374d7f2e520100779f9f73df2))
* **deps:** update dependencies (non-major) ([#1363](https://github.com/sabertazimi/blog/issues/1363)) ([8396d56](https://github.com/sabertazimi/blog/commit/8396d56512eac37d13d2942ca17ee3d206f6a4db))
* **deps:** update dependencies (non-major) ([#1366](https://github.com/sabertazimi/blog/issues/1366)) ([178cce6](https://github.com/sabertazimi/blog/commit/178cce6916dfd4a4dd9924d8593cf1e5efd213d0))
* **deps:** update dependencies (non-major) ([#1368](https://github.com/sabertazimi/blog/issues/1368)) ([7fbbb89](https://github.com/sabertazimi/blog/commit/7fbbb89a40617295ca192a73e26e9cc243b634f2))
* **deps:** update dependencies (non-major) ([#1371](https://github.com/sabertazimi/blog/issues/1371)) ([9f4ca49](https://github.com/sabertazimi/blog/commit/9f4ca49935398286a28de5e08b9fc5938cfa5693))
* **deps:** update dependencies (non-major) ([#1373](https://github.com/sabertazimi/blog/issues/1373)) ([0cd5ef9](https://github.com/sabertazimi/blog/commit/0cd5ef968b60c304e3722ab546e697bc4221d3a1))
* **deps:** update dependencies (non-major) ([#1374](https://github.com/sabertazimi/blog/issues/1374)) ([073c77a](https://github.com/sabertazimi/blog/commit/073c77a3e03c2f195d8ca21ec3d68d8d5ff81b28))
* **deps:** update dependencies (non-major) ([#1377](https://github.com/sabertazimi/blog/issues/1377)) ([234fe52](https://github.com/sabertazimi/blog/commit/234fe528f4b6ded536c68aff72827e5a0d9760af))
* **deps:** update dependencies (non-major) ([#1380](https://github.com/sabertazimi/blog/issues/1380)) ([835574d](https://github.com/sabertazimi/blog/commit/835574da242103691684f3409098f34d7c2c57e6))
* **deps:** update dependencies (non-major) ([#1383](https://github.com/sabertazimi/blog/issues/1383)) ([e46ebc9](https://github.com/sabertazimi/blog/commit/e46ebc967e215eef19c8851216ca267b32149458))
* **deps:** update dependencies (non-major) ([#1385](https://github.com/sabertazimi/blog/issues/1385)) ([1f4384f](https://github.com/sabertazimi/blog/commit/1f4384faa35b2e1e5c2c1d938a1601f91307eb8c))
* **deps:** update dependencies (non-major) ([#1387](https://github.com/sabertazimi/blog/issues/1387)) ([172455c](https://github.com/sabertazimi/blog/commit/172455ce5e8b96fe32df9c1dc6564639f29ed254))
* **deps:** update dependencies (non-major) ([#1390](https://github.com/sabertazimi/blog/issues/1390)) ([325cf4c](https://github.com/sabertazimi/blog/commit/325cf4cb8f4225e93568a217ce18d6e12dcf6d51))
* **deps:** update dependencies (non-major) ([#1394](https://github.com/sabertazimi/blog/issues/1394)) ([9a5ea14](https://github.com/sabertazimi/blog/commit/9a5ea14baa732463f2bfdd74b2ca59f99ff9bbee))
* **deps:** update dependencies (non-major) ([#1396](https://github.com/sabertazimi/blog/issues/1396)) ([ed846ba](https://github.com/sabertazimi/blog/commit/ed846ba5a6c78dfc1fa6955e0541e258ef167289))
* **deps:** update dependencies (non-major) ([#1397](https://github.com/sabertazimi/blog/issues/1397)) ([073d081](https://github.com/sabertazimi/blog/commit/073d08163089e3450285f15a468d9620bb0ffd3f))
* **deps:** update dependencies (non-major) ([#1398](https://github.com/sabertazimi/blog/issues/1398)) ([15a92ef](https://github.com/sabertazimi/blog/commit/15a92efc995dc2531eea02cfd1ac131d6c1a6d58))
* **deps:** update dependencies (non-major) ([#1399](https://github.com/sabertazimi/blog/issues/1399)) ([44e1726](https://github.com/sabertazimi/blog/commit/44e172662e3e3b4e89ddd560013a563b457e6a95))
* **deps:** update dependencies (non-major) ([#1400](https://github.com/sabertazimi/blog/issues/1400)) ([1bb01ef](https://github.com/sabertazimi/blog/commit/1bb01ef1d9ab70f4d28a365323ec73b11a860e4d))
* **deps:** update dependencies (non-major) ([#1405](https://github.com/sabertazimi/blog/issues/1405)) ([766c817](https://github.com/sabertazimi/blog/commit/766c817ed4a9bf3e42b87c11f6e4c81f3ebc11c3))
* **deps:** update dependencies (non-major) ([#1406](https://github.com/sabertazimi/blog/issues/1406)) ([a48f128](https://github.com/sabertazimi/blog/commit/a48f12882a6cba11c13e99ae93b5c14ceae5d8f6))
* **deps:** update dependencies (non-major) ([#1409](https://github.com/sabertazimi/blog/issues/1409)) ([be8d78b](https://github.com/sabertazimi/blog/commit/be8d78b63b08edbc56ccc963a879b37183de9cec))
* **deps:** update dependencies (non-major) ([#1410](https://github.com/sabertazimi/blog/issues/1410)) ([d288ad4](https://github.com/sabertazimi/blog/commit/d288ad49381288ae84ad63003794af8769c5472f))
* **deps:** update dependencies (non-major) ([#1412](https://github.com/sabertazimi/blog/issues/1412)) ([2812bbf](https://github.com/sabertazimi/blog/commit/2812bbfb8f5e4db3d6c1b5ef60c8e0ae67fc1d7d))
* **deps:** update dependencies (non-major) ([#1413](https://github.com/sabertazimi/blog/issues/1413)) ([77fc989](https://github.com/sabertazimi/blog/commit/77fc989952e664a0fde00031dd72420a958747a8))
* **deps:** update dependencies (non-major) ([#1414](https://github.com/sabertazimi/blog/issues/1414)) ([d42a630](https://github.com/sabertazimi/blog/commit/d42a630fc00512be32e79d0fb3c4b39e30c03920))
* **deps:** update dependencies (non-major) ([#1417](https://github.com/sabertazimi/blog/issues/1417)) ([117f60b](https://github.com/sabertazimi/blog/commit/117f60bc9782a62a90f5fb4f3e9220ac82ea1a0d))
* **deps:** update dependencies (non-major) ([#1420](https://github.com/sabertazimi/blog/issues/1420)) ([b91d881](https://github.com/sabertazimi/blog/commit/b91d8818fe174238bd92ce4be2f845c2d0b6a220))
* **deps:** update dependencies (non-major) ([#1425](https://github.com/sabertazimi/blog/issues/1425)) ([2633015](https://github.com/sabertazimi/blog/commit/2633015e6bce7cbfb83bf60b909319970316e547))
* **deps:** update dependencies (non-major) ([#1427](https://github.com/sabertazimi/blog/issues/1427)) ([b942f02](https://github.com/sabertazimi/blog/commit/b942f02431aa59f0fb428ec961fea5791f087fa8))
* **deps:** update dependencies (non-major) ([#1430](https://github.com/sabertazimi/blog/issues/1430)) ([cecb2d0](https://github.com/sabertazimi/blog/commit/cecb2d004b8ce4a49863b3922e8d698aa3faaba2))
* **deps:** update dependencies (non-major) ([#1431](https://github.com/sabertazimi/blog/issues/1431)) ([f7c92db](https://github.com/sabertazimi/blog/commit/f7c92db82465eb1d00dcbe9c256948cfbe5411eb))
* **deps:** update dependencies (non-major) ([#1434](https://github.com/sabertazimi/blog/issues/1434)) ([9654444](https://github.com/sabertazimi/blog/commit/9654444e553a6fc380e2bde562209a1b464aae06))
* **deps:** update dependencies (non-major) ([#1436](https://github.com/sabertazimi/blog/issues/1436)) ([209c8dd](https://github.com/sabertazimi/blog/commit/209c8ddca52bd1561b6d8b06179258143399e65d))
* **deps:** update dependencies (non-major) ([#1437](https://github.com/sabertazimi/blog/issues/1437)) ([bab671c](https://github.com/sabertazimi/blog/commit/bab671cfa6de0eafdc7ac8b65ae763f55fe9bddb))
* **deps:** update dependencies (non-major) ([#1441](https://github.com/sabertazimi/blog/issues/1441)) ([b59cede](https://github.com/sabertazimi/blog/commit/b59cedebc0727e17b8481fb69c9bf59ebdd1f641))
* **deps:** update dependencies (non-major) ([#1443](https://github.com/sabertazimi/blog/issues/1443)) ([58f4988](https://github.com/sabertazimi/blog/commit/58f49884aefffdfca5f2c5330b9fe5f54939f276))
* **deps:** update dependencies (non-major) ([#1447](https://github.com/sabertazimi/blog/issues/1447)) ([d5d94ce](https://github.com/sabertazimi/blog/commit/d5d94cee889906d05f32cf78b92c9f8f6afde4ea))
* **deps:** update dependencies (non-major) ([#1451](https://github.com/sabertazimi/blog/issues/1451)) ([4f8207d](https://github.com/sabertazimi/blog/commit/4f8207dfac65a2fe70f5e4e55e02894de153522f))
* **deps:** update dependency @ant-design/icons to ^5.4.0 ([#1300](https://github.com/sabertazimi/blog/issues/1300)) ([aac46ff](https://github.com/sabertazimi/blog/commit/aac46ffc9c4e10b3cf9ca8c074ce6e143552e89d))
* **deps:** update dependency @ant-design/icons to v6 ([#1384](https://github.com/sabertazimi/blog/issues/1384)) ([a64425a](https://github.com/sabertazimi/blog/commit/a64425a86f0670e399ac0dcbddd675ba268bd8c6))
* **deps:** update dependency @octokit/rest to v21 ([#1292](https://github.com/sabertazimi/blog/issues/1292)) ([346a09d](https://github.com/sabertazimi/blog/commit/346a09d69305e6a677fce3962390aad2919963bb))
* **deps:** update dependency @octokit/rest to v22 ([#1403](https://github.com/sabertazimi/blog/issues/1403)) ([cdab1ed](https://github.com/sabertazimi/blog/commit/cdab1edd37fb02ef02b5fd0932e1a3db0cae2599))
* **deps:** update dependency antd to ^5.16.5 ([#1272](https://github.com/sabertazimi/blog/issues/1272)) ([b7a974c](https://github.com/sabertazimi/blog/commit/b7a974cd1a03028da7bcb056ce9f9573c982ed3a))
* **deps:** update dependency antd to v5.20.0 ([#1305](https://github.com/sabertazimi/blog/issues/1305)) ([9977b54](https://github.com/sabertazimi/blog/commit/9977b549250587ef7cfd130b348c7aa4f8068313))
* **deps:** update dependency antd to v5.20.1 ([#1308](https://github.com/sabertazimi/blog/issues/1308)) ([aa649dd](https://github.com/sabertazimi/blog/commit/aa649dd0fe4ef5a686ed5aeebabfa967e3df063e))
* **deps:** update dependency antd to v5.22.5 ([#1350](https://github.com/sabertazimi/blog/issues/1350)) ([6f774d5](https://github.com/sabertazimi/blog/commit/6f774d5dc669fe475f48b3f695450e53ef9c27ad))
* **deps:** update dependency antd to v5.25.4 ([#1404](https://github.com/sabertazimi/blog/issues/1404)) ([d210607](https://github.com/sabertazimi/blog/commit/d210607a9e05a84a23d2abc9c9a308584089f81b))
* **deps:** update dependency antd to v5.26.6 ([#1416](https://github.com/sabertazimi/blog/issues/1416)) ([c44f315](https://github.com/sabertazimi/blog/commit/c44f3150e5d5779ded90eb197b469c3b2bb2eab6))
* **deps:** update dependency framer-motion to ^11.3.19 ([#1302](https://github.com/sabertazimi/blog/issues/1302)) ([055128f](https://github.com/sabertazimi/blog/commit/055128fc37c0f6908c322f6b577f63b560b54be1))
* **deps:** update dependency framer-motion to v12 ([#1365](https://github.com/sabertazimi/blog/issues/1365)) ([81a3f82](https://github.com/sabertazimi/blog/commit/81a3f82d8c6547ca5d6db646eb5ef564de1afa8d))
* **deps:** update dependency katex to ^0.16.24 ([#1440](https://github.com/sabertazimi/blog/issues/1440)) ([722a387](https://github.com/sabertazimi/blog/commit/722a38785c614061426df3e6971018d365ad9e36))
* **deps:** update dependency next to ^14.2.12 ([#1321](https://github.com/sabertazimi/blog/issues/1321)) ([c6145b2](https://github.com/sabertazimi/blog/commit/c6145b27f7950e18c9cc3498bcec539b00568610))
* **deps:** update dependency next to ^14.2.13 ([#1323](https://github.com/sabertazimi/blog/issues/1323)) ([d6edc81](https://github.com/sabertazimi/blog/commit/d6edc815b94fa553dda4ac91a01198c5b3e2f890))
* **deps:** update dependency next to ^14.2.15 ([#1326](https://github.com/sabertazimi/blog/issues/1326)) ([5c94ea0](https://github.com/sabertazimi/blog/commit/5c94ea06ccc1ac9ea046fe366cf704db3dfb2c8d))
* **deps:** update dependency next to ^14.2.16 ([#1329](https://github.com/sabertazimi/blog/issues/1329)) ([4a2e9b0](https://github.com/sabertazimi/blog/commit/4a2e9b02bcaeae770ae3c9fdf350decb063d0a9e))
* **deps:** update dependency next to ^14.2.17 ([#1333](https://github.com/sabertazimi/blog/issues/1333)) ([025aba0](https://github.com/sabertazimi/blog/commit/025aba01a623221926a34021620b4c4d6e3edb94))
* **deps:** update dependency next to ^14.2.18 ([#1334](https://github.com/sabertazimi/blog/issues/1334)) ([5f9aaaf](https://github.com/sabertazimi/blog/commit/5f9aaafc15e27a4558ad58c278a5f0ab7c5184b5))
* **deps:** update dependency next to ^14.2.2 ([#1263](https://github.com/sabertazimi/blog/issues/1263)) ([81fa8fa](https://github.com/sabertazimi/blog/commit/81fa8fa7e268547fbf38d6fa0466700b07367c6e))
* **deps:** update dependency next to ^14.2.20 ([#1343](https://github.com/sabertazimi/blog/issues/1343)) ([f76a50e](https://github.com/sabertazimi/blog/commit/f76a50e02b1bb5cfd5bb8177b7382b260a9a7d67))
* **deps:** update dependency next to ^14.2.21 ([#1353](https://github.com/sabertazimi/blog/issues/1353)) ([3b9110f](https://github.com/sabertazimi/blog/commit/3b9110f9dc6384c6c35d8308bc285358e9edb1c9))
* **deps:** update dependency next to ^14.2.22 ([#1355](https://github.com/sabertazimi/blog/issues/1355)) ([5350a52](https://github.com/sabertazimi/blog/commit/5350a52bf73b604614152d0f18c01bbcec33cbbd))
* **deps:** update dependency next to ^14.2.23 ([#1358](https://github.com/sabertazimi/blog/issues/1358)) ([e5d866e](https://github.com/sabertazimi/blog/commit/e5d866ed8e3d043e55c4742c5a4c19747aa08afe))
* **deps:** update dependency next to ^14.2.24 ([#1372](https://github.com/sabertazimi/blog/issues/1372)) ([d46ea71](https://github.com/sabertazimi/blog/commit/d46ea71c7cfbfb72ba0b626edabe0580a413ff64))
* **deps:** update dependency next to ^14.2.25 ([#1382](https://github.com/sabertazimi/blog/issues/1382)) ([3a93da4](https://github.com/sabertazimi/blog/commit/3a93da4897f89ffcf5c2158b96ab2f2974269303))
* **deps:** update dependency next to ^14.2.26 ([#1386](https://github.com/sabertazimi/blog/issues/1386)) ([dfaa04b](https://github.com/sabertazimi/blog/commit/dfaa04b08cc427bda5c0acb6b3ba751b05de180c))
* **deps:** update dependency next to ^14.2.28 ([#1391](https://github.com/sabertazimi/blog/issues/1391)) ([b758fe5](https://github.com/sabertazimi/blog/commit/b758fe50745864d2c418e816c575256ae5bc88bf))
* **deps:** update dependency next to ^14.2.29 ([#1401](https://github.com/sabertazimi/blog/issues/1401)) ([8b5c13e](https://github.com/sabertazimi/blog/commit/8b5c13e57f509b7c01304eac7e884810af40d27c))
* **deps:** update dependency next to ^14.2.3 ([#1270](https://github.com/sabertazimi/blog/issues/1270)) ([483e965](https://github.com/sabertazimi/blog/commit/483e9658401b4a81108d2632b47cf786876901ee))
* **deps:** update dependency next to ^14.2.30 ([#1407](https://github.com/sabertazimi/blog/issues/1407)) ([e9e1fd7](https://github.com/sabertazimi/blog/commit/e9e1fd74e038dd0197012d53e0911f741bdb5828))
* **deps:** update dependency next to ^14.2.31 ([#1419](https://github.com/sabertazimi/blog/issues/1419)) ([1bc84af](https://github.com/sabertazimi/blog/commit/1bc84afa96f75ddb91ed84216bdc8045ea437f67))
* **deps:** update dependency next to ^14.2.32 ([#1424](https://github.com/sabertazimi/blog/issues/1424)) ([89bfd36](https://github.com/sabertazimi/blog/commit/89bfd361309c53fa5a3ac172b2e0b1c47b7e7868))
* **deps:** update dependency next to ^14.2.33 ([#1433](https://github.com/sabertazimi/blog/issues/1433)) ([a4d861c](https://github.com/sabertazimi/blog/commit/a4d861cbce32c81df1d0e148d48b0faccce0d0f5))
* **deps:** update dependency next to ^14.2.4 ([#1289](https://github.com/sabertazimi/blog/issues/1289)) ([119c669](https://github.com/sabertazimi/blog/commit/119c669ad775e3facc656f32af357c6387d8af06))
* **deps:** update dependency next to ^14.2.5 ([#1299](https://github.com/sabertazimi/blog/issues/1299)) ([4f876f4](https://github.com/sabertazimi/blog/commit/4f876f4cb2b3cbfce30f1030a287d0b4029080fb))
* **deps:** update dependency next to ^14.2.6 ([#1310](https://github.com/sabertazimi/blog/issues/1310)) ([e353632](https://github.com/sabertazimi/blog/commit/e3536328d1d68895d3b69a80d9e6fc97dfaa89e5))
* **deps:** update dependency next to ^14.2.7 ([#1314](https://github.com/sabertazimi/blog/issues/1314)) ([247746e](https://github.com/sabertazimi/blog/commit/247746edb013afd9a97f0302e5d96d69cf31cdd9))
* **deps:** update dependency next to ^14.2.8 ([#1318](https://github.com/sabertazimi/blog/issues/1318)) ([f17f607](https://github.com/sabertazimi/blog/commit/f17f607b1a4c46e4b20de06d11c048d3fe5ffc6a))
* **deps:** update dependency next-mdx-remote to v5 ([#1283](https://github.com/sabertazimi/blog/issues/1283)) ([93fcc89](https://github.com/sabertazimi/blog/commit/93fcc89bd319d19751995a32e39e529625b17848))
* **deps:** update dependency remark-directive to v4 ([#1378](https://github.com/sabertazimi/blog/issues/1378)) ([8224798](https://github.com/sabertazimi/blog/commit/82247989c4c0f48f453b6eb37328a202985150fd)), closes [#1377](https://github.com/sabertazimi/blog/issues/1377)
* **eslint:** update eslint to v9 ([#1336](https://github.com/sabertazimi/blog/issues/1336)) ([e876dbf](https://github.com/sabertazimi/blog/commit/e876dbf6d274ab64ee1d060801b9907b039f630a))
* **mdx:** switch to official next-mdx-remote v5 ([#1217](https://github.com/sabertazimi/blog/issues/1217)) ([6238d22](https://github.com/sabertazimi/blog/commit/6238d22928cc7d4721fefbb5eef547479a2320c9))
* **next:** remove redundant files ([#1453](https://github.com/sabertazimi/blog/issues/1453)) ([dac37c9](https://github.com/sabertazimi/blog/commit/dac37c9dd23e757ea250709aeec1224b12087530))

## [4.0.0](https://github.com/sabertazimi/blog/compare/v3.8.1...v4.0.0) (2024-04-17)


### :sparkles: Features

* **app-router:** switch to app router ([#1252](https://github.com/sabertazimi/blog/issues/1252)) ([849a184](https://github.com/sabertazimi/blog/commit/849a1848e4758d0dd8a168fd04d5aec7035151cb))


### :bug: Bug Fixes

* **app-Tag:** decodeURI tag in metadata generation ([#1254](https://github.com/sabertazimi/blog/issues/1254)) ([9cc540f](https://github.com/sabertazimi/blog/commit/9cc540fdd341af5dee6384b81422b2c979824694))
* **app-time:** enable dynamic time zone ([#1257](https://github.com/sabertazimi/blog/issues/1257)) ([56228d2](https://github.com/sabertazimi/blog/commit/56228d2915307a9eb1880a9eda55acf40f65c586))
* **components-Card:** fix card spacing styles ([#1255](https://github.com/sabertazimi/blog/issues/1255)) ([ec79630](https://github.com/sabertazimi/blog/commit/ec79630b93b93d9a38cee0ee35d141c0e3a1f952))
* **deps:** update dependencies (non-major) ([#1240](https://github.com/sabertazimi/blog/issues/1240)) ([531a071](https://github.com/sabertazimi/blog/commit/531a0718e350e3b204e847b0a2de63a0a0fc7946))
* **deps:** update dependencies (non-major) ([#1245](https://github.com/sabertazimi/blog/issues/1245)) ([9500dba](https://github.com/sabertazimi/blog/commit/9500dba2ff38127c59db9996ae1e36e4de4a7737))
* **deps:** update dependency next to ^14.2.1 ([#1246](https://github.com/sabertazimi/blog/issues/1246)) ([9c0c31f](https://github.com/sabertazimi/blog/commit/9c0c31f1ab08aa91c76272fa0b9dadf755ee9c60))
* **security:** disable eslint security output temporarily ([#1238](https://github.com/sabertazimi/blog/issues/1238)) ([476bfba](https://github.com/sabertazimi/blog/commit/476bfba082151bb467260700d1df87129a731eba))


### :zap: Performance

* **lib:** cache posts data ([#1253](https://github.com/sabertazimi/blog/issues/1253)) ([7279565](https://github.com/sabertazimi/blog/commit/72795650f8380657e3653180f0e35baeb059c37d))


### :wrench: Testing

* allow uppercase title for components testing ([#1235](https://github.com/sabertazimi/blog/issues/1235)) ([0817195](https://github.com/sabertazimi/blog/commit/0817195a59da5ef7875d2b82e8910276b0d1b953))
* **snapshots:** update uppercase title ([bf05827](https://github.com/sabertazimi/blog/commit/bf05827207e8437fce034cab1cfb1ca7e25f500e))

## [3.8.1](https://github.com/sabertazimi/blog/compare/v3.8.0...v3.8.1) (2024-04-01)


### :bug: Bug Fixes

* **components-Article:** tidy up ([#1066](https://github.com/sabertazimi/blog/issues/1066)) ([fdfa85c](https://github.com/sabertazimi/blog/commit/fdfa85c11e47fe50575f0f33af7b1858d3c33aef))
* **components-Footer:** tidy up ([#1065](https://github.com/sabertazimi/blog/issues/1065)) ([d323d90](https://github.com/sabertazimi/blog/commit/d323d905566d72c7bfab1e13d2e0f0595a015ac6))
* **components-LandingNavLink:** re-design links for landing page ([#1064](https://github.com/sabertazimi/blog/issues/1064)) ([d2aa174](https://github.com/sabertazimi/blog/commit/d2aa17491a645c1f49ab832cde8df5d467a5dd5d))
* **components-social:** change twitter to X ([#1224](https://github.com/sabertazimi/blog/issues/1224)) ([2dea2ba](https://github.com/sabertazimi/blog/commit/2dea2ba6906fed6affad4fd95d76a634f8a2edf9)), closes [#000000](https://github.com/sabertazimi/blog/issues/000000)
* **css-antd:** override default ant-design styles ([#1197](https://github.com/sabertazimi/blog/issues/1197)) ([c5d6db4](https://github.com/sabertazimi/blog/commit/c5d6db4fcc221e2b73f36035758bed3a6f812f35))
* **deps:** resolution unified to v11, vfile to v6 ([#1163](https://github.com/sabertazimi/blog/issues/1163)) ([a1d6a90](https://github.com/sabertazimi/blog/commit/a1d6a903c4f469126dbc8621a809bfc0cbebd917))
* **deps:** update dependencies (non-major) ([#1068](https://github.com/sabertazimi/blog/issues/1068)) ([1b00402](https://github.com/sabertazimi/blog/commit/1b00402db47ac368fefc2b63a594b110f6357c97))
* **deps:** update dependencies (non-major) ([#1071](https://github.com/sabertazimi/blog/issues/1071)) ([619f0da](https://github.com/sabertazimi/blog/commit/619f0da35f2a3f5ca0669be68e055b52aece9b54))
* **deps:** update dependencies (non-major) ([#1077](https://github.com/sabertazimi/blog/issues/1077)) ([e3b17ff](https://github.com/sabertazimi/blog/commit/e3b17ff52de18ea5cc185f9fce1b7d14741015f1))
* **deps:** update dependencies (non-major) ([#1082](https://github.com/sabertazimi/blog/issues/1082)) ([9a9e9d5](https://github.com/sabertazimi/blog/commit/9a9e9d53d5e808d3e200566e881f1e6277b11c87))
* **deps:** update dependencies (non-major) ([#1089](https://github.com/sabertazimi/blog/issues/1089)) ([aa16ea4](https://github.com/sabertazimi/blog/commit/aa16ea442d8012b36ee878a23499cf721026654c))
* **deps:** update dependencies (non-major) ([#1093](https://github.com/sabertazimi/blog/issues/1093)) ([caa0617](https://github.com/sabertazimi/blog/commit/caa0617f46f6e7ad5d51f0169e0cdd7ce8682b94))
* **deps:** update dependencies (non-major) ([#1096](https://github.com/sabertazimi/blog/issues/1096)) ([55eaf91](https://github.com/sabertazimi/blog/commit/55eaf91fbaf2958ae7c90a68e7e9e41562f73122))
* **deps:** update dependencies (non-major) ([#1103](https://github.com/sabertazimi/blog/issues/1103)) ([986f9a4](https://github.com/sabertazimi/blog/commit/986f9a46c2ccf92902ac19a58008191b9ac4fae2))
* **deps:** update dependencies (non-major) ([#1106](https://github.com/sabertazimi/blog/issues/1106)) ([3dd5cf9](https://github.com/sabertazimi/blog/commit/3dd5cf97a3687b0cbaf6c7cbae560c0383835021))
* **deps:** update dependencies (non-major) ([#1109](https://github.com/sabertazimi/blog/issues/1109)) ([cb3c538](https://github.com/sabertazimi/blog/commit/cb3c538a5da56ed96ba4455ebc5d0ef852a28f00))
* **deps:** update dependencies (non-major) ([#1110](https://github.com/sabertazimi/blog/issues/1110)) ([5da607c](https://github.com/sabertazimi/blog/commit/5da607c7a726d36cd6174930f962c8414bb8119f))
* **deps:** update dependencies (non-major) ([#1113](https://github.com/sabertazimi/blog/issues/1113)) ([e07e2d4](https://github.com/sabertazimi/blog/commit/e07e2d48b098a28e92748e11f58474d830ac4ce7))
* **deps:** update dependencies (non-major) ([#1118](https://github.com/sabertazimi/blog/issues/1118)) ([5549f6f](https://github.com/sabertazimi/blog/commit/5549f6f6ac61187e8c8391fd48f9502b9e5ff59b))
* **deps:** update dependencies (non-major) ([#1137](https://github.com/sabertazimi/blog/issues/1137)) ([dc62795](https://github.com/sabertazimi/blog/commit/dc62795c0517dbd1a49074e3cae39d40fa2295c8))
* **deps:** update dependencies (non-major) ([#1144](https://github.com/sabertazimi/blog/issues/1144)) ([8356577](https://github.com/sabertazimi/blog/commit/8356577909d0bce8209dede76eb84c75164e3bae))
* **deps:** update dependencies (non-major) ([#1150](https://github.com/sabertazimi/blog/issues/1150)) ([d9acf80](https://github.com/sabertazimi/blog/commit/d9acf801021882b5f9dda1d79a01b2b40615e6b3))
* **deps:** update dependencies (non-major) ([#1166](https://github.com/sabertazimi/blog/issues/1166)) ([c0f7477](https://github.com/sabertazimi/blog/commit/c0f747787b5816d7f5dbea308ecda43296f6216b))
* **deps:** update dependencies (non-major) ([#1169](https://github.com/sabertazimi/blog/issues/1169)) ([8d41238](https://github.com/sabertazimi/blog/commit/8d41238e4930c6485eb90426532bae12ba44de55))
* **deps:** update dependencies (non-major) ([#1172](https://github.com/sabertazimi/blog/issues/1172)) ([5ad57c6](https://github.com/sabertazimi/blog/commit/5ad57c66d0a1fdf24c2ac1d3f76fdc832a6dbb0d))
* **deps:** update dependencies (non-major) ([#1189](https://github.com/sabertazimi/blog/issues/1189)) ([918e75f](https://github.com/sabertazimi/blog/commit/918e75f7a5ad8fccd3118904111a1fe37074c71d))
* **deps:** update dependencies (non-major) ([#1192](https://github.com/sabertazimi/blog/issues/1192)) ([8817e5a](https://github.com/sabertazimi/blog/commit/8817e5a3e1da644848a5fcf527a31292db66fdf0))
* **deps:** update dependencies (non-major) ([#1195](https://github.com/sabertazimi/blog/issues/1195)) ([65686fc](https://github.com/sabertazimi/blog/commit/65686fc542e6d025764a8eaf708551ca5b5d1cbf))
* **deps:** update dependencies (non-major) ([#1204](https://github.com/sabertazimi/blog/issues/1204)) ([37c2fd1](https://github.com/sabertazimi/blog/commit/37c2fd17b38ecba69dd89652051ca5438dc7a127))
* **deps:** update dependencies (non-major) ([#1207](https://github.com/sabertazimi/blog/issues/1207)) ([e064d61](https://github.com/sabertazimi/blog/commit/e064d6172dd84e3020b87db44ab4abdb4fcd925a))
* **deps:** update dependencies (non-major) ([#1209](https://github.com/sabertazimi/blog/issues/1209)) ([a2476ef](https://github.com/sabertazimi/blog/commit/a2476ef79735cd5b8f7d3dc828058b237b6b1e43))
* **deps:** update dependencies (non-major) ([#1218](https://github.com/sabertazimi/blog/issues/1218)) ([4fe4930](https://github.com/sabertazimi/blog/commit/4fe4930ddc3e4c6a078e2d11e04fb1e8c6969b15))
* **deps:** update dependencies (non-major) ([#1220](https://github.com/sabertazimi/blog/issues/1220)) ([1646a11](https://github.com/sabertazimi/blog/commit/1646a111827a4a0476dae03157c57cfde10bed94))
* **deps:** update dependencies (non-major) ([#1226](https://github.com/sabertazimi/blog/issues/1226)) ([e6a0e35](https://github.com/sabertazimi/blog/commit/e6a0e35c888598e1080672c1693288257c8dab85))
* **deps:** update dependencies (non-major) ([#1231](https://github.com/sabertazimi/blog/issues/1231)) ([8bb8e40](https://github.com/sabertazimi/blog/commit/8bb8e4010f3b8cdb8b40c56c73d3c0583bed579e))
* **deps:** update dependency @codesandbox/sandpack-react to ^2.1.3 ([#1070](https://github.com/sabertazimi/blog/issues/1070)) ([833aafa](https://github.com/sabertazimi/blog/commit/833aafa85f63018a3ee1e57489213fa8df0b31a9))
* **deps:** update dependency @codesandbox/sandpack-react to ^2.13.2 ([#1208](https://github.com/sabertazimi/blog/issues/1208)) ([9733a3f](https://github.com/sabertazimi/blog/commit/9733a3f85f0babc49e36d81795626cc19e2bf4e9))
* **deps:** update dependency @codesandbox/sandpack-react to ^2.2.1 ([#1084](https://github.com/sabertazimi/blog/issues/1084)) ([d6bfa1f](https://github.com/sabertazimi/blog/commit/d6bfa1fe8c4ba803063afdbeb9854c85ea0080ab))
* **deps:** update dependency @codesandbox/sandpack-react to ^2.2.3 ([#1086](https://github.com/sabertazimi/blog/issues/1086)) ([dac6ea0](https://github.com/sabertazimi/blog/commit/dac6ea0df67904b1b4786a3b4519d7875499aa78))
* **deps:** update dependency @codesandbox/sandpack-react to ^2.2.4 ([#1087](https://github.com/sabertazimi/blog/issues/1087)) ([540fd1b](https://github.com/sabertazimi/blog/commit/540fd1bad2fc6d88ed9757abc542c936ec9c199c))
* **deps:** update dependency @codesandbox/sandpack-react to ^2.4.6 ([#1090](https://github.com/sabertazimi/blog/issues/1090)) ([bc1800a](https://github.com/sabertazimi/blog/commit/bc1800a1588dfa959c55f39eea1e91e4ce220d03))
* **deps:** update dependency @codesandbox/sandpack-react to ^2.4.7 ([#1091](https://github.com/sabertazimi/blog/issues/1091)) ([39b598f](https://github.com/sabertazimi/blog/commit/39b598f614307e0fbe342df85a9c76c797f1cbce))
* **deps:** update dependency @octokit/rest to ^19.0.8 ([#1108](https://github.com/sabertazimi/blog/issues/1108)) ([fcb32ea](https://github.com/sabertazimi/blog/commit/fcb32ea1a69ed206dbade84a9a3f9edca3f5e2c9))
* **deps:** update dependency @octokit/rest to v20 ([#1134](https://github.com/sabertazimi/blog/issues/1134)) ([a329c3c](https://github.com/sabertazimi/blog/commit/a329c3c58fc79b58642127a81577f0a09c1f6aba))
* **deps:** update dependency antd to ^5.12.6 ([#1188](https://github.com/sabertazimi/blog/issues/1188)) ([ed35c11](https://github.com/sabertazimi/blog/commit/ed35c117328fe1e7d00f1f131931ebcbdf220c92))
* **deps:** update dependency antd to ^5.13.1 ([#1194](https://github.com/sabertazimi/blog/issues/1194)) ([dd75d42](https://github.com/sabertazimi/blog/commit/dd75d422e88a3e91104822795a38fa34606941dd))
* **deps:** update dependency antd to ^5.15.0 ([#1211](https://github.com/sabertazimi/blog/issues/1211)) ([b4a46b6](https://github.com/sabertazimi/blog/commit/b4a46b6ca06a7fe0ee0ed6e876703af56af296c3))
* **deps:** update dependency antd to ^5.15.3 ([#1219](https://github.com/sabertazimi/blog/issues/1219)) ([66f5301](https://github.com/sabertazimi/blog/commit/66f5301280124aab634f2db78fa4ab1d9e89549c))
* **deps:** update dependency antd to ^5.4.7 ([#1104](https://github.com/sabertazimi/blog/issues/1104)) ([d47469c](https://github.com/sabertazimi/blog/commit/d47469c5392c4f46a3b746362b7ab3e47b6ceb34))
* **deps:** update dependency antd to ^5.6.3 ([#1115](https://github.com/sabertazimi/blog/issues/1115)) ([f3240c0](https://github.com/sabertazimi/blog/commit/f3240c0a55a75190f34a3b7e0f055ff87fb25c0d))
* **deps:** update dependency framer-motion to ^10.15.0 ([#1135](https://github.com/sabertazimi/blog/issues/1135)) ([8bbc5c7](https://github.com/sabertazimi/blog/commit/8bbc5c7fc6f7e2903943888b5d3187823f432e60))
* **deps:** update dependency framer-motion to v11 ([#1201](https://github.com/sabertazimi/blog/issues/1201)) ([7c32d8d](https://github.com/sabertazimi/blog/commit/7c32d8dab425bcd9412a051d343d56328922718c))
* **deps:** update dependency katex to ^0.16.8 ([#1114](https://github.com/sabertazimi/blog/issues/1114)) ([6db8325](https://github.com/sabertazimi/blog/commit/6db83252fa12f84693329938dab4ea1908a17f9c))
* **deps:** update dependency next to ^13.5.3 ([#1128](https://github.com/sabertazimi/blog/issues/1128)) ([be5d1bc](https://github.com/sabertazimi/blog/commit/be5d1bc0e71b2b86849b6d9f970867e956c39b57))
* **deps:** update dependency next to ^13.5.4 ([#1168](https://github.com/sabertazimi/blog/issues/1168)) ([38fc060](https://github.com/sabertazimi/blog/commit/38fc06041c278bde575e0f10bd565af1305ab12b))
* **deps:** update dependency next to ^13.5.6 ([#1173](https://github.com/sabertazimi/blog/issues/1173)) ([68b230d](https://github.com/sabertazimi/blog/commit/68b230dd7f1866499d94b938809f1f6543e4f291))
* **deps:** update dependency next to ^14.1.1 ([#1210](https://github.com/sabertazimi/blog/issues/1210)) ([23e6a4b](https://github.com/sabertazimi/blog/commit/23e6a4b2682692539e7f1e20bdb064bf7a7c9469))
* **deps:** update dependency next to ^14.1.3 ([#1216](https://github.com/sabertazimi/blog/issues/1216)) ([caa868c](https://github.com/sabertazimi/blog/commit/caa868c20f3342831cdc95c09b4c9039c9e92416))
* **deps:** update dependency next to ^14.1.4 ([#1221](https://github.com/sabertazimi/blog/issues/1221)) ([1a432d8](https://github.com/sabertazimi/blog/commit/1a432d8d43d5620618afc79c079b10355010486b))
* **deps:** update dependency next to v14 ([#1177](https://github.com/sabertazimi/blog/issues/1177)) ([729948e](https://github.com/sabertazimi/blog/commit/729948e6c1841c337a32e9a2b28476f6649b1ada)), closes [vercel/next.js#40183](https://github.com/vercel/next.js/issues/40183) [vercel/next.js#58817](https://github.com/vercel/next.js/issues/58817)
* **deps:** update dependency next-seo to v6 ([#1085](https://github.com/sabertazimi/blog/issues/1085)) ([396830c](https://github.com/sabertazimi/blog/commit/396830c3f754d6b6de106790c2be954884e077d4))
* **deps:** update dependency next-sitemap to ^4.0.6 ([#1073](https://github.com/sabertazimi/blog/issues/1073)) ([040210b](https://github.com/sabertazimi/blog/commit/040210b438cae52a4cf73465973eff1f2b7c23ae))
* **deps:** update dependency next-sitemap to ^4.0.7 ([#1092](https://github.com/sabertazimi/blog/issues/1092)) ([0ff55d0](https://github.com/sabertazimi/blog/commit/0ff55d06159e701216fe1e018ffd64289150a7a9))
* **deps:** update dependency react-use to ^17.4.4 ([#1199](https://github.com/sabertazimi/blog/issues/1199)) ([1330b20](https://github.com/sabertazimi/blog/commit/1330b20ebf3f371e166883e66d7d6fc5f5a736a8))
* **deps:** update dependency rehype-autolink-headings to v7 ([#1148](https://github.com/sabertazimi/blog/issues/1148)) ([19639f2](https://github.com/sabertazimi/blog/commit/19639f2227fe9646b39369f0a42857914dc922ce))
* **deps:** update dependency rehype-external-links to v3 ([#1149](https://github.com/sabertazimi/blog/issues/1149)) ([835e3b9](https://github.com/sabertazimi/blog/commit/835e3b9b9742d81309b4c1ad6806a2514e4def77))
* **deps:** update dependency rehype-mdx-code-props to v3 ([#1222](https://github.com/sabertazimi/blog/issues/1222)) ([103ff19](https://github.com/sabertazimi/blog/commit/103ff19903c2994df14bf6d40fce53e3a8b8448a))
* **deps:** update dependency rehype-slug to v6 ([#1142](https://github.com/sabertazimi/blog/issues/1142)) ([d94bb06](https://github.com/sabertazimi/blog/commit/d94bb06d0ca30c61bf6e17a1a5772322032e5ac4))
* **deps:** update dependency remark-gemoji to v8 ([#1156](https://github.com/sabertazimi/blog/issues/1156)) ([f0b23bc](https://github.com/sabertazimi/blog/commit/f0b23bc6eadef97b9f128780b339a4015d38f3c7))
* **deps:** update dependency remark-github to v12 ([#1161](https://github.com/sabertazimi/blog/issues/1161)) ([46cbaf0](https://github.com/sabertazimi/blog/commit/46cbaf0a62b66cf5f0332b64446e69e597223c16))
* **deps:** update dependency typed.js to ^2.0.132 ([#1069](https://github.com/sabertazimi/blog/issues/1069)) ([d147bc6](https://github.com/sabertazimi/blog/commit/d147bc60beb000c8a2b943a6fac7ab559036bad7))
* **deps:** update dependency unist-util-visit to v5 ([#1130](https://github.com/sabertazimi/blog/issues/1130)) ([a01259b](https://github.com/sabertazimi/blog/commit/a01259bd2d7a97fc29a8124d2124a83e3770f0c1))
* **deps:** update react-live-runner to ^1.0.5 ([#1074](https://github.com/sabertazimi/blog/issues/1074)) ([90dcd16](https://github.com/sabertazimi/blog/commit/90dcd16a7fcbc0ceb1c1de538c8f1be00f772092))
* **deps:** update remark (major) ([#1180](https://github.com/sabertazimi/blog/issues/1180)) ([977d0cb](https://github.com/sabertazimi/blog/commit/977d0cbafd9ca1d178dda5e6191fa5673e4b56d8)), closes [hashicorp/next-mdx-remote#403](https://github.com/hashicorp/next-mdx-remote/issues/403) [hashicorp/next-mdx-remote#419](https://github.com/hashicorp/next-mdx-remote/issues/419)
* **Footer:** update React website link ([#1080](https://github.com/sabertazimi/blog/issues/1080)) ([2732699](https://github.com/sabertazimi/blog/commit/2732699c4c09a242d2d7667c7e534350dde68e32))
* **gitub:** only fetch github data when vercel CI ([#1075](https://github.com/sabertazimi/blog/issues/1075)) ([f0d735f](https://github.com/sabertazimi/blog/commit/f0d735f585fb1b49ec172a58c3e8de38b447d0a9))


### :rocket: Building Work

* change release tool ([#1063](https://github.com/sabertazimi/blog/issues/1063)) ([d00e508](https://github.com/sabertazimi/blog/commit/d00e50825b0cb75f119569aa0e4c550944cbd31c))
* **deps:** remove unnecessary resolutions ([#1225](https://github.com/sabertazimi/blog/issues/1225)) ([3a0aa82](https://github.com/sabertazimi/blog/commit/3a0aa8240faa2186f451b10aa7a1ab7538d8d29e))
* **tsconfig:** remove decorator ([#1230](https://github.com/sabertazimi/blog/issues/1230)) ([fc1a8ca](https://github.com/sabertazimi/blog/commit/fc1a8ca2ec3e862af56db046b464e540a38645ba))


### :wrench: Testing

* **antd:** disable antd hashed class name in testing suites ([#1165](https://github.com/sabertazimi/blog/issues/1165)) ([29d130c](https://github.com/sabertazimi/blog/commit/29d130c9b6cfe7b6e4eebc37249ce35f6e1aa299)), closes [#1131](https://github.com/sabertazimi/blog/issues/1131) [ant-design/ant-design#38753](https://github.com/ant-design/ant-design/issues/38753)

## [3.8.0](https://github.com/sabertazimi/blog/compare/v3.7.0...v3.8.0) (2023-03-08)


### :wrench: Testing

* **antd:** disable antd hashed class name in testing suites ([#1043](https://github.com/sabertazimi/blog/issues/1043)) ([130009d](https://github.com/sabertazimi/blog/commit/130009d9a31fa3f4bf482d4b691711a2e55344d2))


### :bug: Bug Fixes

* **antd-css:** extract styles to avoid flush ([#1057](https://github.com/sabertazimi/blog/issues/1057)) ([6fcbd8d](https://github.com/sabertazimi/blog/commit/6fcbd8d8a15a16e81f7388670b45396b56d087f9)), closes [ant-design/ant-design#40285](https://github.com/ant-design/ant-design/issues/40285)
* **components-LiveCode:** add bottom border radius ([#1060](https://github.com/sabertazimi/blog/issues/1060)) ([56d3fb8](https://github.com/sabertazimi/blog/commit/56d3fb8d2a654c41f13c9fde6c79bb68c0624040))
* **components-styles:** rectify broken styles ([#1058](https://github.com/sabertazimi/blog/issues/1058)) ([a7bb3ce](https://github.com/sabertazimi/blog/commit/a7bb3ceee487ec7d5fb09c3c06922fa6433d9707))
* **deps:** update dependencies (non-major) ([#1045](https://github.com/sabertazimi/blog/issues/1045)) ([22808c5](https://github.com/sabertazimi/blog/commit/22808c54eb441045460ac02a563bd991e6ad5696))
* **deps:** update dependencies (non-major) ([#1050](https://github.com/sabertazimi/blog/issues/1050)) ([954752e](https://github.com/sabertazimi/blog/commit/954752e39426d13c8db51b96e972d427925b572f))
* **deps:** update dependency @codesandbox/sandpack-react to v2 ([#1041](https://github.com/sabertazimi/blog/issues/1041)) ([a6b8630](https://github.com/sabertazimi/blog/commit/a6b86305919db0c8e5565754c7c4f37df57c9ebb))
* **deps:** update dependency @codesandbox/sandpack-themes to v2 ([#1042](https://github.com/sabertazimi/blog/issues/1042)) ([62a4b26](https://github.com/sabertazimi/blog/commit/62a4b26a19666fe37af489bfdf9911a8c7f1c3cc))
* **deps:** update dependency framer-motion to ^10.0.2 ([#1056](https://github.com/sabertazimi/blog/issues/1056)) ([c7cc329](https://github.com/sabertazimi/blog/commit/c7cc32933cdf54d86be90bbeb51c2b66bd3d094d))
* **deps:** update dependency framer-motion to v10 ([#1046](https://github.com/sabertazimi/blog/issues/1046)) ([863d96f](https://github.com/sabertazimi/blog/commit/863d96ff68c84707e1f870b38ba95ea93d599871))
* **deps:** update dependency next-sitemap to ^4.0.2 ([#1055](https://github.com/sabertazimi/blog/issues/1055)) ([e317899](https://github.com/sabertazimi/blog/commit/e31789970051537280ab304d42ae96919b145542))
* **deps:** update dependency next-sitemap to v4 ([#1052](https://github.com/sabertazimi/blog/issues/1052)) ([a21c415](https://github.com/sabertazimi/blog/commit/a21c415a091148dcc37a8f3a2f43d9d20dfaf7a2))
* **styles-scrollbar:** custom scrollbar ([#1061](https://github.com/sabertazimi/blog/issues/1061)) ([ef2e2af](https://github.com/sabertazimi/blog/commit/ef2e2af4688b0e8ad841a00b19ed4efc5e395abd))


### :sparkles: Features

* switch to rounded style ([#1062](https://github.com/sabertazimi/blog/issues/1062)) ([61ccdba](https://github.com/sabertazimi/blog/commit/61ccdbab92eacb535906ff4f1cfe17347f729918))

## [3.7.0](https://github.com/sabertazimi/blog/compare/v3.6.0...v3.7.0) (2023-02-12)


### :wrench: Testing

* **e2e:** remove redundant e2e UI testing ([#939](https://github.com/sabertazimi/blog/issues/939)) ([fbc38d2](https://github.com/sabertazimi/blog/commit/fbc38d2bc41e4c6c1874aa1a30013837003c8d56))


### :sparkles: Features

* **swc:** enable swc minifier from next.js v12.3 ([#973](https://github.com/sabertazimi/blog/issues/973)) ([24a7507](https://github.com/sabertazimi/blog/commit/24a75077cfeca5c083b79959dcc6b771b9b63976))
* **tailwind:** add `content-visibility` and `contain-intrinsic-size` ([#924](https://github.com/sabertazimi/blog/issues/924)) ([8eb9d86](https://github.com/sabertazimi/blog/commit/8eb9d86fcf090576907b746ef1dc7f6d509930e7))


### :bug: Bug Fixes

* **components-Article:** remove redundant max width class ([#919](https://github.com/sabertazimi/blog/issues/919)) ([d54e9ea](https://github.com/sabertazimi/blog/commit/d54e9eaf042b5f89f66f528199c737a884eb9f03))
* **components-DesktopNav:** add hover style to `ThemeSwitch` icons ([#928](https://github.com/sabertazimi/blog/issues/928)) ([78f3c87](https://github.com/sabertazimi/blog/commit/78f3c8712c4a93f3333539826a636be807d257c6))
* **components-Editor:** rectify SSR for sandpack styles ([#923](https://github.com/sabertazimi/blog/issues/923)) ([185e290](https://github.com/sabertazimi/blog/commit/185e290af0ce7fa5184889cad03c6c878e158b6e))
* **components-Footer:** change `Footer` background gradient style ([#929](https://github.com/sabertazimi/blog/issues/929)) ([aec654f](https://github.com/sabertazimi/blog/commit/aec654fb520b251645f13237c035c1aa4cdc1d47))
* **components-InlineCode:** remove border radius ([#920](https://github.com/sabertazimi/blog/issues/920)) ([ff9a21c](https://github.com/sabertazimi/blog/commit/ff9a21c219d3545e40d4107b4b48244d6981ab42))
* **components-tailwind:** rectify custom class error ([#936](https://github.com/sabertazimi/blog/issues/936)) ([13fc3bc](https://github.com/sabertazimi/blog/commit/13fc3bcde95ee7e4af1d8acee79db5df32e86b4b))
* **components:** rectify broken theme for antd v5 ([#1035](https://github.com/sabertazimi/blog/issues/1035)) ([0ad7e6d](https://github.com/sabertazimi/blog/commit/0ad7e6da5f5471f10a3c6d796ec692400e7bdfe8))
* **components:** remove built-in border radius ([#922](https://github.com/sabertazimi/blog/issues/922)) ([386b068](https://github.com/sabertazimi/blog/commit/386b06851fa717bfd2e5bc9a1ab28c7a991e092e))
* **deps:** update dependencies (non-major) ([#1000](https://github.com/sabertazimi/blog/issues/1000)) ([3d8f018](https://github.com/sabertazimi/blog/commit/3d8f0180028833f6ecc0bccc7ca299b4e92a797d))
* **deps:** update dependencies (non-major) ([#1003](https://github.com/sabertazimi/blog/issues/1003)) ([82f8949](https://github.com/sabertazimi/blog/commit/82f8949b9021aa75e090a3d7b1213f48061e61d2))
* **deps:** update dependencies (non-major) ([#1005](https://github.com/sabertazimi/blog/issues/1005)) ([8857075](https://github.com/sabertazimi/blog/commit/8857075f045cfdea1f8037ee4abb48d4cf11f565))
* **deps:** update dependencies (non-major) ([#1009](https://github.com/sabertazimi/blog/issues/1009)) ([e9c1df9](https://github.com/sabertazimi/blog/commit/e9c1df9e005c9e868cfd0be9b74581c02c3b12c5))
* **deps:** update dependencies (non-major) ([#1012](https://github.com/sabertazimi/blog/issues/1012)) ([53c52b6](https://github.com/sabertazimi/blog/commit/53c52b6f6c4efb8e1cb8fc5c680f08bb27736cf7))
* **deps:** update dependencies (non-major) ([#1015](https://github.com/sabertazimi/blog/issues/1015)) ([133d86e](https://github.com/sabertazimi/blog/commit/133d86e6d61a7103f14c0307f06e54f820c2192e))
* **deps:** update dependencies (non-major) ([#1022](https://github.com/sabertazimi/blog/issues/1022)) ([3cbef65](https://github.com/sabertazimi/blog/commit/3cbef6524e285b6e86763a45e859c9f826ee37f0))
* **deps:** update dependencies (non-major) ([#1025](https://github.com/sabertazimi/blog/issues/1025)) ([2921f19](https://github.com/sabertazimi/blog/commit/2921f19b308e51f164a100d8486e72e07ad45360))
* **deps:** update dependencies (non-major) ([#1027](https://github.com/sabertazimi/blog/issues/1027)) ([3636cd9](https://github.com/sabertazimi/blog/commit/3636cd9982f095a953bc69f8778afbdad17c7e27))
* **deps:** update dependencies (non-major) ([#1032](https://github.com/sabertazimi/blog/issues/1032)) ([179f458](https://github.com/sabertazimi/blog/commit/179f458df8cfce868cc71673fa64719a257985c2))
* **deps:** update dependencies (non-major) ([#925](https://github.com/sabertazimi/blog/issues/925)) ([8efb526](https://github.com/sabertazimi/blog/commit/8efb52654625230ecae7576e334275f1d8f5e281))
* **deps:** update dependencies (non-major) ([#931](https://github.com/sabertazimi/blog/issues/931)) ([8b02d3b](https://github.com/sabertazimi/blog/commit/8b02d3bc4d87bbbacf0837de512b79cfc1c1b2e7))
* **deps:** update dependencies (non-major) ([#933](https://github.com/sabertazimi/blog/issues/933)) ([e878a2b](https://github.com/sabertazimi/blog/commit/e878a2b38aaf70b004284c16a2460dca998bbd17))
* **deps:** update dependencies (non-major) ([#935](https://github.com/sabertazimi/blog/issues/935)) ([5c12cba](https://github.com/sabertazimi/blog/commit/5c12cba24de75948b45f922d02240047d62ac0be))
* **deps:** update dependencies (non-major) ([#944](https://github.com/sabertazimi/blog/issues/944)) ([3a7e93e](https://github.com/sabertazimi/blog/commit/3a7e93e2815771aa5354dc3599dd1287e907d742))
* **deps:** update dependencies (non-major) ([#956](https://github.com/sabertazimi/blog/issues/956)) ([7df7817](https://github.com/sabertazimi/blog/commit/7df7817d9281f5ea29261105be81810ff853425f))
* **deps:** update dependencies (non-major) ([#958](https://github.com/sabertazimi/blog/issues/958)) ([1b44141](https://github.com/sabertazimi/blog/commit/1b44141b6bb92894955744eb4b84e5d3b4fb879a))
* **deps:** update dependencies (non-major) ([#960](https://github.com/sabertazimi/blog/issues/960)) ([1687805](https://github.com/sabertazimi/blog/commit/1687805e012c5f91b4db919020e7f00589710f1f))
* **deps:** update dependencies (non-major) ([#962](https://github.com/sabertazimi/blog/issues/962)) ([717308c](https://github.com/sabertazimi/blog/commit/717308cd3001edd9cc9b50702b7cd59d198f4fd0))
* **deps:** update dependencies (non-major) ([#965](https://github.com/sabertazimi/blog/issues/965)) ([bec3e2f](https://github.com/sabertazimi/blog/commit/bec3e2fc2473addaafacb1534562fe947e8a9d63))
* **deps:** update dependencies (non-major) ([#974](https://github.com/sabertazimi/blog/issues/974)) ([04328ee](https://github.com/sabertazimi/blog/commit/04328eea409e06b55dfd500c49d91977ff0803f4))
* **deps:** update dependencies (non-major) ([#980](https://github.com/sabertazimi/blog/issues/980)) ([48b47bf](https://github.com/sabertazimi/blog/commit/48b47bfdc36b01194a392f0a8db9516af266ddfc))
* **deps:** update dependencies (non-major) ([#982](https://github.com/sabertazimi/blog/issues/982)) ([763f1a6](https://github.com/sabertazimi/blog/commit/763f1a62ebffdcdea635e0267522d6d008c57ede))
* **deps:** update dependencies (non-major) ([#983](https://github.com/sabertazimi/blog/issues/983)) ([8c16681](https://github.com/sabertazimi/blog/commit/8c1668138dfa447de6ae0e088d7cb263aff44f52))
* **deps:** update dependencies (non-major) ([#985](https://github.com/sabertazimi/blog/issues/985)) ([60f6f99](https://github.com/sabertazimi/blog/commit/60f6f996d1dc009ad5a8761530a5cddfdd705a87))
* **deps:** update dependencies (non-major) ([#986](https://github.com/sabertazimi/blog/issues/986)) ([f56ee51](https://github.com/sabertazimi/blog/commit/f56ee51e390362416e0746a867b9beb1e46a55e2))
* **deps:** update dependencies (non-major) ([#988](https://github.com/sabertazimi/blog/issues/988)) ([55e484a](https://github.com/sabertazimi/blog/commit/55e484abaf1ce735c243c759312820e753b93be5))
* **deps:** update dependencies (non-major) ([#993](https://github.com/sabertazimi/blog/issues/993)) ([4742681](https://github.com/sabertazimi/blog/commit/4742681e0c63fd85ae5d3e432adf28d7b6b8cf46))
* **deps:** update dependencies (non-major) ([#996](https://github.com/sabertazimi/blog/issues/996)) ([5baca2b](https://github.com/sabertazimi/blog/commit/5baca2b451c9dcb07d2d6f8f50ed686cf1bd5230))
* **deps:** update dependencies (non-major) ([#999](https://github.com/sabertazimi/blog/issues/999)) ([357449d](https://github.com/sabertazimi/blog/commit/357449d4f3b5367036124e617ab2eb1c24fdbb16))
* **deps:** update dependency @ant-design/icons to v5 ([#1023](https://github.com/sabertazimi/blog/issues/1023)) ([f1c848c](https://github.com/sabertazimi/blog/commit/f1c848c2616f9a4d149751edb5505810721e2f79))
* **deps:** update dependency @octokit/rest to v19 ([#934](https://github.com/sabertazimi/blog/issues/934)) ([929e656](https://github.com/sabertazimi/blog/commit/929e656dc8d204b64e448ef5aca79defb38cf20f))
* **deps:** update dependency antd to ^4.23.2 ([#975](https://github.com/sabertazimi/blog/issues/975)) ([6190c9a](https://github.com/sabertazimi/blog/commit/6190c9ad4e50b8957d2c77228fe4619ac1e325dd))
* **deps:** update dependency antd to ^4.23.4 ([#981](https://github.com/sabertazimi/blog/issues/981)) ([db88a58](https://github.com/sabertazimi/blog/commit/db88a580c3e6f84f4d9f048481271b9a7331df89))
* **deps:** update dependency antd to v5 ([#1001](https://github.com/sabertazimi/blog/issues/1001)) ([9247681](https://github.com/sabertazimi/blog/commit/9247681b2c58b2dbf937560831dc3841c0869893))
* **deps:** update dependency framer-motion to v7 ([#952](https://github.com/sabertazimi/blog/issues/952)) ([47a4d84](https://github.com/sabertazimi/blog/commit/47a4d846e1a2c2900c45f0b8ed631ebf63ce5d73))
* **deps:** update dependency framer-motion to v8 ([#1016](https://github.com/sabertazimi/blog/issues/1016)) ([8bedd14](https://github.com/sabertazimi/blog/commit/8bedd141c21286c25377dab91906ea2e977310a5))
* **deps:** update dependency framer-motion to v9 ([#1031](https://github.com/sabertazimi/blog/issues/1031)) ([d62a2df](https://github.com/sabertazimi/blog/commit/d62a2df1d4754b37af97a46cd362340d556bee6b))
* **deps:** update dependency next to ^12.2.2 ([#938](https://github.com/sabertazimi/blog/issues/938)) ([c1630c4](https://github.com/sabertazimi/blog/commit/c1630c4b4ccc5ac2fef19c0fee50232d2c7889b9))
* **deps:** update dependency next to ^12.2.3 ([#943](https://github.com/sabertazimi/blog/issues/943)) ([d9ddc66](https://github.com/sabertazimi/blog/commit/d9ddc66242ca0275dc98ad84896f41eb6bd33821))
* **deps:** update dependency next to ^12.2.4 ([#951](https://github.com/sabertazimi/blog/issues/951)) ([0ed3068](https://github.com/sabertazimi/blog/commit/0ed3068ccb5fb4b6903b746141040004e48edf33))
* **deps:** update dependency next to ^12.3.1 ([#979](https://github.com/sabertazimi/blog/issues/979)) ([31fc534](https://github.com/sabertazimi/blog/commit/31fc534669a6f532d36557013c618c6f118a100a)), closes [#796](https://github.com/sabertazimi/blog/issues/796) [vercel/nextjs#40889](https://github.com/vercel/nextjs/issues/40889)
* **deps:** update dependency next to ^12.3.2 ([#991](https://github.com/sabertazimi/blog/issues/991)) ([793beb2](https://github.com/sabertazimi/blog/commit/793beb28d31753289d3f076e378c7dc12d46e3f7))
* **deps:** update dependency next to ^12.3.3 ([#997](https://github.com/sabertazimi/blog/issues/997)) ([b5f1725](https://github.com/sabertazimi/blog/commit/b5f1725334489067359168e2b723538058e02102))
* **deps:** update dependency next to ^12.3.4 ([#1004](https://github.com/sabertazimi/blog/issues/1004)) ([57feef4](https://github.com/sabertazimi/blog/commit/57feef40fea4b19881f63743badef3540be169b7))
* **deps:** update dependency next to v13 ([#990](https://github.com/sabertazimi/blog/issues/990)) ([00e7629](https://github.com/sabertazimi/blog/commit/00e7629591b0bf9681ae24a4191eb32e7123d628))
* **deps:** update dependency next-seo to ^5.15.0 ([#1008](https://github.com/sabertazimi/blog/issues/1008)) ([3b725be](https://github.com/sabertazimi/blog/commit/3b725be4444743bf7345adfda96ff889513b1d40))
* **deps:** update dependency next-sitemap to ^3.1.1 ([#926](https://github.com/sabertazimi/blog/issues/926)) ([e4fb30c](https://github.com/sabertazimi/blog/commit/e4fb30ce93209225b979f09889ddfc309cbd8e3f))
* **deps:** update dependency rehype-external-links to v2 ([#945](https://github.com/sabertazimi/blog/issues/945)) ([2be67a8](https://github.com/sabertazimi/blog/commit/2be67a829b5aed5f211d9a76d391d21311f3e7fd))
* **deps:** update dependency remark-mdx-code-meta to v2 ([#946](https://github.com/sabertazimi/blog/issues/946)) ([1205e24](https://github.com/sabertazimi/blog/commit/1205e241d7223384ac3587c8f2647f577c0a860c))
* **deps:** update nextjs and next-pwa ([#955](https://github.com/sabertazimi/blog/issues/955)) ([d6bd9c3](https://github.com/sabertazimi/blog/commit/d6bd9c3deb7726eb437836756073c8a528c699dd))
* **fonts:** add `Raleway` font face ([#916](https://github.com/sabertazimi/blog/issues/916)) ([492ff25](https://github.com/sabertazimi/blog/commit/492ff2593036643f715272c478767181945e5e8c))
* **footer:** change build link ([#976](https://github.com/sabertazimi/blog/issues/976)) ([b302935](https://github.com/sabertazimi/blog/commit/b3029356c8bb94a36b78e8d3b83f223c0cb430ed))
* **swc:** enable swc minifier ([#1036](https://github.com/sabertazimi/blog/issues/1036)) ([6463ef1](https://github.com/sabertazimi/blog/commit/6463ef1a1e21408c368042a8545f7a772def8b60))
* **theme:** rectify broken dark theme ([#1034](https://github.com/sabertazimi/blog/issues/1034)) ([dd82bda](https://github.com/sabertazimi/blog/commit/dd82bda1d8fdb9a89eb9d0d5b7a4a6087fd4b343))

## [3.6.0](https://github.com/sabertazimi/blog/compare/v3.5.0...v3.6.0) (2022-06-12)


### :sparkles: Features

* **MDX-Anchor:** add click-able link for headings ([#877](https://github.com/sabertazimi/blog/issues/877)) ([ac813bc](https://github.com/sabertazimi/blog/commit/ac813bc1e3f1ebb6819ac31f1d64003c61dbfbbe))
* **tailwind:** remove all `important` styles ([#909](https://github.com/sabertazimi/blog/issues/909)) ([2ccb388](https://github.com/sabertazimi/blog/commit/2ccb3889718bf717a1a7437c879baa749e680a45)), closes [vercel/next.js#16630](https://github.com/vercel/next.js/issues/16630)


### :bug: Bug Fixes

* **components-a11y:** add keyboard a11y styles ([#913](https://github.com/sabertazimi/blog/issues/913)) ([2a857a5](https://github.com/sabertazimi/blog/commit/2a857a55b90fc85610df5c22746f381b0c055282)), closes [#912](https://github.com/sabertazimi/blog/issues/912)
* **components-Article:** add a11y `<article>` wrapper to post content ([#856](https://github.com/sabertazimi/blog/issues/856)) ([daef2ab](https://github.com/sabertazimi/blog/commit/daef2ab8955e31c1eaca49ecfe201554c78a6f94))
* **components-Article:** adjust line length ([#894](https://github.com/sabertazimi/blog/issues/894)) ([d235b63](https://github.com/sabertazimi/blog/commit/d235b63546920b0f172e95a32d4a0568e34aa22f))
* **components-Article:** adjust max width size ([#900](https://github.com/sabertazimi/blog/issues/900)) ([a46966b](https://github.com/sabertazimi/blog/commit/a46966b645e298d952ba4277da6debbec0958fb3))
* **components-ArticleNav:** adjust navigation button styles ([#896](https://github.com/sabertazimi/blog/issues/896)) ([aeeab92](https://github.com/sabertazimi/blog/commit/aeeab92e288b846dc2d010cc6115818a4a07e8ef))
* **components-ArticleToc:** scroll to fixed header below position ([#861](https://github.com/sabertazimi/blog/issues/861)) ([b04e94a](https://github.com/sabertazimi/blog/commit/b04e94ad78366e82d6383499825e3ced3bfa5c8a))
* **components-DesktopNav:** adjust blur size ([#895](https://github.com/sabertazimi/blog/issues/895)) ([c607117](https://github.com/sabertazimi/blog/commit/c607117274550180d08f0c889c9d278d781a12ce))
* **components-DesktopNav:** horizontal centering navigation ([#899](https://github.com/sabertazimi/blog/issues/899)) ([2762258](https://github.com/sabertazimi/blog/commit/27622588a56cbac9c42224bb06461305f7c5c162))
* **components-DesktopNav:** remove `!important` tailwind styles ([#911](https://github.com/sabertazimi/blog/issues/911)) ([a8f3577](https://github.com/sabertazimi/blog/commit/a8f35772529fc64947effe643dc72851f803d5a7))
* **components-Footer:** add semantic `<time>` tag ([#892](https://github.com/sabertazimi/blog/issues/892)) ([f2dd652](https://github.com/sabertazimi/blog/commit/f2dd652f8b75dadadd63d068f5f6fc898b199449))
* **components-Header:** adjust `<Header />` navigation styles ([#901](https://github.com/sabertazimi/blog/issues/901)) ([48edcab](https://github.com/sabertazimi/blog/commit/48edcabfaef88b2d30a136e431933236afe627fd))
* **components-InlineCode:** clone box decoration ([#886](https://github.com/sabertazimi/blog/issues/886)) ([928e5cb](https://github.com/sabertazimi/blog/commit/928e5cb1fd5ff7577a3a6c4a5a9614af2d863f81))
* **components-LandingNav:** add frosted glass effect ([#897](https://github.com/sabertazimi/blog/issues/897)) ([a2b3ed7](https://github.com/sabertazimi/blog/commit/a2b3ed7f42c8cd3b16a35c4d6a5b633760642ce6))
* **components-LandingNav:** change landing page filter effect ([#908](https://github.com/sabertazimi/blog/issues/908)) ([064a920](https://github.com/sabertazimi/blog/commit/064a92086b4b0a6ad682070d0751aca0880cc386))
* **components-LandingNav:** polish animation effect ([#879](https://github.com/sabertazimi/blog/issues/879)) ([f93fb9d](https://github.com/sabertazimi/blog/commit/f93fb9d85c226eea73721e7765c2f085b09e2c98))
* **components-LinkTag:** add hover box shadow ([#915](https://github.com/sabertazimi/blog/issues/915)) ([7d04cf1](https://github.com/sabertazimi/blog/commit/7d04cf14c76280487397514050577c46d5fb2348))
* **components-Lists:** add nested counter for `ol` ([#860](https://github.com/sabertazimi/blog/issues/860)) ([a4f2138](https://github.com/sabertazimi/blog/commit/a4f213807e803dd6c7fcb518d6a66d4db6c5ce06))
* **components-motion:** add focus a11y style for `Bounce` motion ([#873](https://github.com/sabertazimi/blog/issues/873)) ([97e01d8](https://github.com/sabertazimi/blog/commit/97e01d8a6833e2ddc33cef55d856958521b093d5))
* **components-Tags:** remove border radius ([#914](https://github.com/sabertazimi/blog/issues/914)) ([e0942b6](https://github.com/sabertazimi/blog/commit/e0942b65e7a14e0bce0d5866c23dc70c2534f142))
* **components:** add hover style for `Anchor` link ([#882](https://github.com/sabertazimi/blog/issues/882)) ([5dceb54](https://github.com/sabertazimi/blog/commit/5dceb54c7ecd16992b09360a99cc694450d7e6c5))
* **components:** rectify broken styles ([#910](https://github.com/sabertazimi/blog/issues/910)) ([ddb31f3](https://github.com/sabertazimi/blog/commit/ddb31f3defa1f72a59e60b4e62621e2c3ed81a22))
* **components:** update heading link styles ([#883](https://github.com/sabertazimi/blog/issues/883)) ([0918d39](https://github.com/sabertazimi/blog/commit/0918d39a412b59c36eb51a698d5eca3499f015e6))
* **deps:** update dependencies (non-major) ([#857](https://github.com/sabertazimi/blog/issues/857)) ([efe8cbd](https://github.com/sabertazimi/blog/commit/efe8cbd71a5a3f207fa3163586c0591da0a32aeb))
* **deps:** update dependencies (non-major) ([#869](https://github.com/sabertazimi/blog/issues/869)) ([6d9fd8b](https://github.com/sabertazimi/blog/commit/6d9fd8bdf84037b6eef1053b1219b2d15bb5bf6f))
* **deps:** update dependencies (non-major) ([#887](https://github.com/sabertazimi/blog/issues/887)) ([7c63f0a](https://github.com/sabertazimi/blog/commit/7c63f0adb6d6aa748feef7d1d514353cdd20c33d))
* **deps:** update dependencies (non-major) ([#905](https://github.com/sabertazimi/blog/issues/905)) ([8400b2d](https://github.com/sabertazimi/blog/commit/8400b2d556fb1a9d0aef5b8e1dda50d02adff988))
* **deps:** update dependency @codesandbox/sandpack-react to v1 ([#870](https://github.com/sabertazimi/blog/issues/870)) ([731cd8a](https://github.com/sabertazimi/blog/commit/731cd8a54b4c7c9518de9f666fa43a062ec3fdcf))
* **deps:** update dependency antd to ^4.20.5 ([#855](https://github.com/sabertazimi/blog/issues/855)) ([ec2eabc](https://github.com/sabertazimi/blog/commit/ec2eabc9cd18c2cc4e65a704b230d0d17749d73d))
* **deps:** update dependency antd to ^4.20.6 ([#864](https://github.com/sabertazimi/blog/issues/864)) ([9628660](https://github.com/sabertazimi/blog/commit/962866070ccc032c1d1c36c74eeda27645bb6f94))
* **deps:** update dependency next-sitemap to ^2.5.26 ([#872](https://github.com/sabertazimi/blog/issues/872)) ([cbb8ac2](https://github.com/sabertazimi/blog/commit/cbb8ac2e16e99e75b3346df2c737f09d9c01203b))
* **deps:** update dependency next-sitemap to ^2.5.27 ([#876](https://github.com/sabertazimi/blog/issues/876)) ([5f33855](https://github.com/sabertazimi/blog/commit/5f33855511bf8985d3ad4e863ef79c346b3600ed))
* **deps:** update dependency next-sitemap to ^2.5.28 ([#880](https://github.com/sabertazimi/blog/issues/880)) ([39caa95](https://github.com/sabertazimi/blog/commit/39caa95e80475e6cfa78f59f4924b1dc1d610fe2))
* **deps:** update dependency next-sitemap to v3 ([#890](https://github.com/sabertazimi/blog/issues/890)) ([f55be31](https://github.com/sabertazimi/blog/commit/f55be31d4b53741d35619c005a5c9d07045da88e))
* **layouts:** add horizontal padding to default layout ([#904](https://github.com/sabertazimi/blog/issues/904)) ([124a595](https://github.com/sabertazimi/blog/commit/124a595a636aaec26aa6b2262f9f2d020eb7cabb))
* **mdx-layout:** adjust floating widgets layout ([#862](https://github.com/sabertazimi/blog/issues/862)) ([ed31d20](https://github.com/sabertazimi/blog/commit/ed31d20af1ecf7b8ef9dd90b11bb0937058b79a2))
* **mdx-shadow:** add shadow to code blocks and tables ([#863](https://github.com/sabertazimi/blog/issues/863)) ([15b5162](https://github.com/sabertazimi/blog/commit/15b5162f66447aa621d38060c830b1bfa8edb61c))
* **types-time:** update build time type ([#893](https://github.com/sabertazimi/blog/issues/893)) ([597dbdf](https://github.com/sabertazimi/blog/commit/597dbdfc98c22c8fdbb81fdda014c6444d1d8451))

## [3.5.0](https://github.com/sabertazimi/blog/compare/v3.4.0...v3.5.0) (2022-05-12)


### :zap: Performance

* **mdx:** optimize mdx related components render performance ([#827](https://github.com/sabertazimi/blog/issues/827)) ([4854f81](https://github.com/sabertazimi/blog/commit/4854f81ee3395e76141c9ede3abdf7972f62ae27)), closes [#826](https://github.com/sabertazimi/blog/issues/826)


### :sparkles: Features

* **test-e2e:** setup cypress e2e testing ([#831](https://github.com/sabertazimi/blog/issues/831)) ([7616760](https://github.com/sabertazimi/blog/commit/7616760922598e366aafc414f90bec4197ab77e1)), closes [#712](https://github.com/sabertazimi/blog/issues/712)


### :wrench: Testing

* **async:** await asynchrounous `waitFor` expecttions ([#835](https://github.com/sabertazimi/blog/issues/835)) ([173045c](https://github.com/sabertazimi/blog/commit/173045c692daa07f44a56cf1bc2bbf0d0b284d1c))
* **components-Editor:** add `Editor` structure testing ([#834](https://github.com/sabertazimi/blog/issues/834)) ([f14b657](https://github.com/sabertazimi/blog/commit/f14b65798376526c106a25512d72f1e809c4c016))
* **e2e-commands:** add `options` to custom traversal commands ([#851](https://github.com/sabertazimi/blog/issues/851)) ([d6b9c8a](https://github.com/sabertazimi/blog/commit/d6b9c8ab9e47c2ea96e2aa138c15382312912e74))
* **e2e:** add e2e testing for landing home page ([#840](https://github.com/sabertazimi/blog/issues/840)) ([290dda9](https://github.com/sabertazimi/blog/commit/290dda9be80d61f90e9eb928cdcf9b3b22b1ae9f))
* **e2e:** add testing for `Header` menu items ([#852](https://github.com/sabertazimi/blog/issues/852)) ([3fe248f](https://github.com/sabertazimi/blog/commit/3fe248f1561261b475fbf797b0e4972dbaf72c0f)), closes [#849](https://github.com/sabertazimi/blog/issues/849)
* **e2e:** add testing for routes title ([#850](https://github.com/sabertazimi/blog/issues/850)) ([1d3682c](https://github.com/sabertazimi/blog/commit/1d3682c1e70737f35ff17647803f841f3777840c)), closes [#849](https://github.com/sabertazimi/blog/issues/849)
* **e2e:** reduce custom command log ([#847](https://github.com/sabertazimi/blog/issues/847)) ([f521616](https://github.com/sabertazimi/blog/commit/f52161664a2f46c988ba5712d312705c59340850))


### :bug: Bug Fixes

* **components-Button:** rectify dark mode styles for `Button` ([#821](https://github.com/sabertazimi/blog/issues/821)) ([a69e678](https://github.com/sabertazimi/blog/commit/a69e678bbf2acb06d8ff2eae996ca652fde4703c))
* **components-Icons:** change icons label to lower case ([#853](https://github.com/sabertazimi/blog/issues/853)) ([b7761e4](https://github.com/sabertazimi/blog/commit/b7761e4935da351b012066e59cb157225fa15f97))
* **components-LandingNav:** add navigation `Enter` keydown handler ([#838](https://github.com/sabertazimi/blog/issues/838)) ([6e94c3a](https://github.com/sabertazimi/blog/commit/6e94c3a4cfcf703a443a7fcce7a24237b84f770e))
* **components-PostsSearchBar:** rectify a11y error ([#812](https://github.com/sabertazimi/blog/issues/812)) ([c766041](https://github.com/sabertazimi/blog/commit/c7660411752d4e9378f03ea500c105584ef5b938))
* **components-Toggle:** only invoke `onToggle` when `Enter` key down ([#830](https://github.com/sabertazimi/blog/issues/830)) ([9d9f0ce](https://github.com/sabertazimi/blog/commit/9d9f0ce6320002a7c9a61a68808746d8b2a529e6))
* **components-TypingTitle:** change role for typing title ([#845](https://github.com/sabertazimi/blog/issues/845)) ([8534399](https://github.com/sabertazimi/blog/commit/85343998bf277d8cf9a37ae845e9151834824c31))
* **cypress-commands:** add `testing-library` style query commands ([#846](https://github.com/sabertazimi/blog/issues/846)) ([d9edb46](https://github.com/sabertazimi/blog/commit/d9edb46b5d79f5538e4be0f9d4cf0a09b44566de))
* **jest-next.js:** rectify broken jest `moduleNameMapper` configuration ([#816](https://github.com/sabertazimi/blog/issues/816)) ([ff832f3](https://github.com/sabertazimi/blog/commit/ff832f338b39fdefd114c259f011d6aad3a18b04)), closes [#814](https://github.com/sabertazimi/blog/issues/814) [#815](https://github.com/sabertazimi/blog/issues/815)
* **mdx-styles:** keep sandpack dark font color style ([#829](https://github.com/sabertazimi/blog/issues/829)) ([9f6b348](https://github.com/sabertazimi/blog/commit/9f6b348fe3297f9fdcc9ae3fb94fb9036eaf3f44))
* **ts-types:** add type guards to `any` type ([#819](https://github.com/sabertazimi/blog/issues/819)) ([66acbaa](https://github.com/sabertazimi/blog/commit/66acbaa36dbcdd1db00cbf6523e71b7383c9bdb4))

## [3.4.0](https://github.com/sabertazimi/blog/compare/v3.3.0...v3.4.0) (2022-05-04)


### :sparkles: Features

* **dark mode:** add `ThemeSwitch` component ([#800](https://github.com/sabertazimi/blog/issues/800)) ([b168313](https://github.com/sabertazimi/blog/commit/b168313e773aca4d3d2dcc31ebb23aa0809d7361)), closes [#799](https://github.com/sabertazimi/blog/issues/799)
* **dark mode:** add dark mode for books and about page ([#802](https://github.com/sabertazimi/blog/issues/802)) ([298d7eb](https://github.com/sabertazimi/blog/commit/298d7eb6de6a8e86d786b50daeb12635328afde8)), closes [#799](https://github.com/sabertazimi/blog/issues/799)
* **dark mode:** add dark mode for post page ([#803](https://github.com/sabertazimi/blog/issues/803)) ([bb9a359](https://github.com/sabertazimi/blog/commit/bb9a3595bea2ccbcbf3f12a8da9c7f3ea2d020aa)), closes [#799](https://github.com/sabertazimi/blog/issues/799)
* **dark mode:** add dark theme for posts and tags page ([#801](https://github.com/sabertazimi/blog/issues/801)) ([76b58f4](https://github.com/sabertazimi/blog/commit/76b58f4e5ee1b416efe62d00ea891bf208dcc6cc)), closes [#799](https://github.com/sabertazimi/blog/issues/799)


### :bug: Bug Fixes

* **code-theme:** rectify dark mode styles ([#804](https://github.com/sabertazimi/blog/issues/804)) ([1442079](https://github.com/sabertazimi/blog/commit/1442079e78b6e679c6f35034a26699e747d0dae5))

## [3.3.0](https://github.com/sabertazimi/blog/compare/v3.2.0...v3.3.0) (2022-05-04)


### :zap: Performance

* **CodeBlocks:** lazy loading `LiveCode` component ([#793](https://github.com/sabertazimi/blog/issues/793)) ([b2347e6](https://github.com/sabertazimi/blog/commit/b2347e68aee0832603e7f9a2f1f50b5fc82b2e30)), closes [#777](https://github.com/sabertazimi/blog/issues/777)


### :sparkles: Features

* **CodeBlocks:** add live code editor support ([#791](https://github.com/sabertazimi/blog/issues/791)) ([7f81d99](https://github.com/sabertazimi/blog/commit/7f81d99153992596e131aab082245c01c82730dd)), closes [#777](https://github.com/sabertazimi/blog/issues/777)
* **mdx-code:** add sandpack live code editor support ([#794](https://github.com/sabertazimi/blog/issues/794)) ([1f7945e](https://github.com/sabertazimi/blog/commit/1f7945ecab9dea2b5f3c1a11a1220d1de87f043f)), closes [#777](https://github.com/sabertazimi/blog/issues/777)


### :bug: Bug Fixes

* **code-styles:** add tough border to code blocks ([#798](https://github.com/sabertazimi/blog/issues/798)) ([1ba97ae](https://github.com/sabertazimi/blog/commit/1ba97ae917618b14c28c4eb0dce6d59cf49e3d3b))
* **components-Editor:** disable SWC minifier ([#797](https://github.com/sabertazimi/blog/issues/797)) ([c497ac5](https://github.com/sabertazimi/blog/commit/c497ac5fa9bd328e501498a6d2849d2b4993082d)), closes [#796](https://github.com/sabertazimi/blog/issues/796)

## [3.2.0](https://github.com/sabertazimi/blog/compare/v3.1.0...v3.2.0) (2022-05-03)


### :sparkles: Features

* **CodeBlocks:** add lines highlight support ([#784](https://github.com/sabertazimi/blog/issues/784)) ([501ef50](https://github.com/sabertazimi/blog/commit/501ef50bc1422a910c57be251163a76b4ca8babc)), closes [#776](https://github.com/sabertazimi/blog/issues/776)
* **mdx-code:** add code block meta parser support ([#782](https://github.com/sabertazimi/blog/issues/782)) ([2917a54](https://github.com/sabertazimi/blog/commit/2917a54a913b105f94aa4597623655b763bc5dbf)), closes [#776](https://github.com/sabertazimi/blog/issues/776)


### :bug: Bug Fixes

* **CodeBlocks:** make highlight lines become selective ([#786](https://github.com/sabertazimi/blog/issues/786)) ([7de385a](https://github.com/sabertazimi/blog/commit/7de385ae1e5b8efea493847aa0671208be2f783a)), closes [#776](https://github.com/sabertazimi/blog/issues/776)
* **CodeBlocks:** normalize code before passing to code blocks ([#788](https://github.com/sabertazimi/blog/issues/788)) ([e59cfc5](https://github.com/sabertazimi/blog/commit/e59cfc582050ecd197f64f83fda148fff502ba50))
* **components-CopyButton:** rectify CopyButton position ([#780](https://github.com/sabertazimi/blog/issues/780)) ([0dbae69](https://github.com/sabertazimi/blog/commit/0dbae694a44baec5f4c2416a2aa08e5795701f77)), closes [#779](https://github.com/sabertazimi/blog/issues/779)
* **mdx-admonitions:** change code text size in admonitions ([#790](https://github.com/sabertazimi/blog/issues/790)) ([918d06b](https://github.com/sabertazimi/blog/commit/918d06b7adbf28999468a9f5e597461c072ab2fc))

## [3.1.0](https://github.com/sabertazimi/blog/compare/v3.0.0...v3.1.0) (2022-05-02)


### :sparkles: Features

* **components-CopyButton:** implement CopyButton component ([#771](https://github.com/sabertazimi/blog/issues/771)) ([7a1f49b](https://github.com/sabertazimi/blog/commit/7a1f49b4d59037c9093ccb3dbf5c74ab53ea45fe)), closes [#701](https://github.com/sabertazimi/blog/issues/701) [#762](https://github.com/sabertazimi/blog/issues/762)
* **components-toc:** re-implement `ArticleToc` component ([#774](https://github.com/sabertazimi/blog/issues/774)) ([1ef8800](https://github.com/sabertazimi/blog/commit/1ef8800409f2139168afbfad5c595fe32fb95bda)), closes [#701](https://github.com/sabertazimi/blog/issues/701) [#773](https://github.com/sabertazimi/blog/issues/773)
* **motion-toggle:** implement icons toggle animation for `LandingNav` ([#767](https://github.com/sabertazimi/blog/issues/767)) ([4a60aae](https://github.com/sabertazimi/blog/commit/4a60aaeebbed98d703ddf034de33ef33fbc1b68d)), closes [#683](https://github.com/sabertazimi/blog/issues/683) [#701](https://github.com/sabertazimi/blog/issues/701)


### :bug: Bug Fixes

* **components-toc:** change toc items when routing change ([#775](https://github.com/sabertazimi/blog/issues/775)) ([167c66a](https://github.com/sabertazimi/blog/commit/167c66a87b2ff27f9c7cb7e7e78bb7597802639f)), closes [#701](https://github.com/sabertazimi/blog/issues/701)
* **mdx-anchor:** adjust bottom space ([#770](https://github.com/sabertazimi/blog/issues/770)) ([6271b56](https://github.com/sabertazimi/blog/commit/6271b56284cc5736d26729cc5abda86a06cd49a0))
* **motion-icons:** re-design `LandingNav` hamburger button motion ([#769](https://github.com/sabertazimi/blog/issues/769)) ([d908726](https://github.com/sabertazimi/blog/commit/d90872694d2d98f3d55030c79d971a4f8641745a)), closes [#683](https://github.com/sabertazimi/blog/issues/683) [#701](https://github.com/sabertazimi/blog/issues/701)

## [3.0.0](https://github.com/sabertazimi/blog/compare/v2.14.0...v3.0.0) (2022-05-01)


### ⚠ BREAKING CHANGES

* **next:** switch from `gatsby` to `next`

### :wrench: Testing

* **act:** wrap all state change manipulation into `act()` ([#639](https://github.com/sabertazimi/blog/issues/639)) ([2e17bd9](https://github.com/sabertazimi/blog/commit/2e17bd9291b7048bd41ac2c2f044cfe667104386)), closes [#618](https://github.com/sabertazimi/blog/issues/618)
* **console:** remove console mock ([#689](https://github.com/sabertazimi/blog/issues/689)) ([06c2f52](https://github.com/sabertazimi/blog/commit/06c2f527ccfd0b7cab86e3fb343aa1b670a98663))
* **layouts:** add snapshot testing for layout components ([#688](https://github.com/sabertazimi/blog/issues/688)) ([5f9ec13](https://github.com/sabertazimi/blog/commit/5f9ec13fe96a6cf2ddf2edd2f72aafd3b04ac281))
* **link-mocks:** remove useless `next/link` mock ([#694](https://github.com/sabertazimi/blog/issues/694)) ([7cc7ca4](https://github.com/sabertazimi/blog/commit/7cc7ca4be39fa851ea6de788ce64fcda134e509d)), closes [#618](https://github.com/sabertazimi/blog/issues/618)
* **mdx:** add mdx example page ([#674](https://github.com/sabertazimi/blog/issues/674)) ([040c400](https://github.com/sabertazimi/blog/commit/040c4000bca6b4905a74f062fa08f0d97feda1c7)), closes [#614](https://github.com/sabertazimi/blog/issues/614)
* **mdx:** update snapshot testing ([#733](https://github.com/sabertazimi/blog/issues/733)) ([8e6f94e](https://github.com/sabertazimi/blog/commit/8e6f94efee0b66baeef934e9776dcf2ce458081e))
* **PostsSearchBar:** remove redundant function mocks ([#660](https://github.com/sabertazimi/blog/issues/660)) ([fa1d2ca](https://github.com/sabertazimi/blog/commit/fa1d2ca77187cd4694f6702c04da80cb8920cb5c))
* **react-hooks:** drop `@testing-library/react-hooks` ([#636](https://github.com/sabertazimi/blog/issues/636)) ([19a4e1a](https://github.com/sabertazimi/blog/commit/19a4e1a99794d8f44f57f6fb4d3eae2555e39e8a)), closes [#623](https://github.com/sabertazimi/blog/issues/623)
* **snapshot:** drop react-test-renderer snapshot testing ([#620](https://github.com/sabertazimi/blog/issues/620)) ([616521a](https://github.com/sabertazimi/blog/commit/616521a826d20ed33440b675fba40ea37452113e)), closes [#616](https://github.com/sabertazimi/blog/issues/616)


### :zap: Performance

* **motion:** remove `layout` motion for performance ([#758](https://github.com/sabertazimi/blog/issues/758)) ([a33b145](https://github.com/sabertazimi/blog/commit/a33b145e03aa9714b442e0400bbfacb711968df1)), closes [#701](https://github.com/sabertazimi/blog/issues/701)


### :bug: Bug Fixes

* **a11y:** add `lang` to `<html>` tag ([#664](https://github.com/sabertazimi/blog/issues/664)) ([e7cccdd](https://github.com/sabertazimi/blog/commit/e7cccddb5b22da7dad1afda418b772264a800cae))
* **ArticleNav:** change link description ([#667](https://github.com/sabertazimi/blog/issues/667)) ([858da7a](https://github.com/sabertazimi/blog/commit/858da7a5ff6670996fa2662e4e73e4a55e5a7b98))
* **ArticleNav:** setup `prevPost` and `nextPost` links ([#625](https://github.com/sabertazimi/blog/issues/625)) ([2ed3863](https://github.com/sabertazimi/blog/commit/2ed38638cbed88e61118600369708f6ddd4dadcc)), closes [#615](https://github.com/sabertazimi/blog/issues/615)
* **Blockquote:** adjust Blockquote vertical and horizontal rhythm ([#727](https://github.com/sabertazimi/blog/issues/727)) ([439ffb3](https://github.com/sabertazimi/blog/commit/439ffb349b783f3f859b6185c5f1ccac788136c7)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **button:** add `IconButton` component ([#713](https://github.com/sabertazimi/blog/issues/713)) ([19c48d0](https://github.com/sabertazimi/blog/commit/19c48d01b8d21dfead57cfd00a07f2a2c02dcdac)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **components:** rectify margin space ([#748](https://github.com/sabertazimi/blog/issues/748)) ([ecc32e1](https://github.com/sabertazimi/blog/commit/ecc32e1ec43035c941b90fd960e411eeead67c7c)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **deps-antd:** compatibility for React 18 ([#621](https://github.com/sabertazimi/blog/issues/621)) ([c863338](https://github.com/sabertazimi/blog/commit/c863338b51b10dc330b51dcc139c5cd096c1af14)), closes [#576](https://github.com/sabertazimi/blog/issues/576) [#587](https://github.com/sabertazimi/blog/issues/587)
* **deps:** update dependency antd to ^4.20.2 ([#740](https://github.com/sabertazimi/blog/issues/740)) ([d21ea5e](https://github.com/sabertazimi/blog/commit/d21ea5e02be8d4aeb7fb0f91205be85722c87dbf))
* **DesktopNav-Menu:** drop legacy `<Menu.item>` compound component ([#637](https://github.com/sabertazimi/blog/issues/637)) ([3afd842](https://github.com/sabertazimi/blog/commit/3afd8421f20f02d4d050bdd1c72ad66745a64f4e))
* **DesktopNav:** justify navigation logo position ([#634](https://github.com/sabertazimi/blog/issues/634)) ([b77cabc](https://github.com/sabertazimi/blog/commit/b77cabcab089ebb7fe36bda9a654f9277b4f3e19))
* **DesktopNav:** remove redundant nested `<div>` flexbox ([#626](https://github.com/sabertazimi/blog/issues/626)) ([e48e95c](https://github.com/sabertazimi/blog/commit/e48e95c7d7c5ff6b50d6c929b3d2d571a933e280)), closes [#624](https://github.com/sabertazimi/blog/issues/624)
* **gatsby:** remove all `gatsby-*` things ([#684](https://github.com/sabertazimi/blog/issues/684)) ([f328819](https://github.com/sabertazimi/blog/commit/f3288190a498dd1ba4744b568b611971436e8a2a))
* **github:** fetch all stared github repos ([#691](https://github.com/sabertazimi/blog/issues/691)) ([cb2f1d4](https://github.com/sabertazimi/blog/commit/cb2f1d44a1e316d282202592a9f6a1efb53835cf)), closes [#614](https://github.com/sabertazimi/blog/issues/614)
* **Icons-motion:** inject `motion` into SVG icons ([#644](https://github.com/sabertazimi/blog/issues/644)) ([f0f74bd](https://github.com/sabertazimi/blog/commit/f0f74bd76c09dcd31de901f40ebe57b3c5a984d7)), closes [#619](https://github.com/sabertazimi/blog/issues/619)
* **jest:** transform ESM `node_modules` via `swc` ([#695](https://github.com/sabertazimi/blog/issues/695)) ([b5b5b2c](https://github.com/sabertazimi/blog/commit/b5b5b2cdef0f580f073da414f31ba4849080bc69))
* **LandingNav:** set navigation hidden initially ([#650](https://github.com/sabertazimi/blog/issues/650)) ([ea43033](https://github.com/sabertazimi/blog/commit/ea43033b27dec09ef23cfcb0d4ad94bc2905e794)), closes [#646](https://github.com/sabertazimi/blog/issues/646)
* **mdx-Code:** add more languages alias to `Code` ([#747](https://github.com/sabertazimi/blog/issues/747)) ([971ee6f](https://github.com/sabertazimi/blog/commit/971ee6f8f9b4de011d1861f122be2e73475859af)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **mdx-code:** adjust alignment and border radius of code block ([#736](https://github.com/sabertazimi/blog/issues/736)) ([ce6d283](https://github.com/sabertazimi/blog/commit/ce6d2835241c8b587e50e60bec409f760489ecc7)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **mdx-code:** remove useless language name transformation ([#761](https://github.com/sabertazimi/blog/issues/761)) ([f140463](https://github.com/sabertazimi/blog/commit/f1404639a965e12ab89c49d0b1204acf373a6a43)), closes [#701](https://github.com/sabertazimi/blog/issues/701)
* **mdx-code:** use prism theme color as code block `background-color` ([#760](https://github.com/sabertazimi/blog/issues/760)) ([f2a0b60](https://github.com/sabertazimi/blog/commit/f2a0b601d4f025a8fc6c14f061c464db89b4da8e)), closes [#701](https://github.com/sabertazimi/blog/issues/701) [#759](https://github.com/sabertazimi/blog/issues/759)
* **mdx-front matter:** disable `next-mdx-remote` built-in front matter ([#671](https://github.com/sabertazimi/blog/issues/671)) ([dd24749](https://github.com/sabertazimi/blog/commit/dd24749574d97151af1c99c5b58123bcf4114588)), closes [#614](https://github.com/sabertazimi/blog/issues/614) [#670](https://github.com/sabertazimi/blog/issues/670)
* **mdx-headings:** adjust headings vertical rhythm ([#745](https://github.com/sabertazimi/blog/issues/745)) ([9683717](https://github.com/sabertazimi/blog/commit/9683717c7915462dd73d3aba0f8f961de8179b31)), closes [#699](https://github.com/sabertazimi/blog/issues/699) [#725](https://github.com/sabertazimi/blog/issues/725)
* **mdx-input:** add `input` and `checkbox` support ([#735](https://github.com/sabertazimi/blog/issues/735)) ([f443e1c](https://github.com/sabertazimi/blog/commit/f443e1c7ea777f92152d11e9ec88022e0584b937)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **mdx-link:** open blank new tab when click mdx `<a>` links ([#681](https://github.com/sabertazimi/blog/issues/681)) ([5577a6e](https://github.com/sabertazimi/blog/commit/5577a6e7be32c0d16787ea37405956ab5bd49262)), closes [#614](https://github.com/sabertazimi/blog/issues/614)
* **mdx-list:** remove arrow icon from ordered/task list ([#737](https://github.com/sabertazimi/blog/issues/737)) ([0f74257](https://github.com/sabertazimi/blog/commit/0f7425777dd2cebda6fa723795ae304c49ded6c9)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **mdx-paragraph:** remove nested `img` and `div` in `p` ([#753](https://github.com/sabertazimi/blog/issues/753)) ([eccdb3d](https://github.com/sabertazimi/blog/commit/eccdb3d93f4bbcc92d4f38175a31711524b386ff)), closes [#701](https://github.com/sabertazimi/blog/issues/701) [#752](https://github.com/sabertazimi/blog/issues/752)
* **mdx-styles:** re-design `InlineCode`, `Code` and `Divider` ([#751](https://github.com/sabertazimi/blog/issues/751)) ([14d787e](https://github.com/sabertazimi/blog/commit/14d787e63dd9335b08922e2f36088bd287977c3b)), closes [#700](https://github.com/sabertazimi/blog/issues/700) [#701](https://github.com/sabertazimi/blog/issues/701)
* **mdx-time:** get concise reading time ([#672](https://github.com/sabertazimi/blog/issues/672)) ([93fa1a9](https://github.com/sabertazimi/blog/commit/93fa1a9e6a3e6c34a2e9e1fbe2046894c02e5165)), closes [#614](https://github.com/sabertazimi/blog/issues/614)
* **mdx-typography:** adjust typography vertical rhythm ([#726](https://github.com/sabertazimi/blog/issues/726)) ([98ceae1](https://github.com/sabertazimi/blog/commit/98ceae13778f44a1e1961a173cde791c5c67552c)), closes [#699](https://github.com/sabertazimi/blog/issues/699) [#725](https://github.com/sabertazimi/blog/issues/725)
* **mdx:** adjust margin space ([#744](https://github.com/sabertazimi/blog/issues/744)) ([7d3339b](https://github.com/sabertazimi/blog/commit/7d3339b6819ae05caabdfafcd53613649cbd3359)), closes [#699](https://github.com/sabertazimi/blog/issues/699) [#725](https://github.com/sabertazimi/blog/issues/725) [#742](https://github.com/sabertazimi/blog/issues/742) [#743](https://github.com/sabertazimi/blog/issues/743)
* **MetaHeader-SEO:** set correct twitter name ([#669](https://github.com/sabertazimi/blog/issues/669)) ([22b9fc9](https://github.com/sabertazimi/blog/commit/22b9fc9bf7d920d5d957667d3b48af8a58bd91d4))
* **motion-bounce:** add `className` prop to `Bounce` ([#642](https://github.com/sabertazimi/blog/issues/642)) ([ef2d5df](https://github.com/sabertazimi/blog/commit/ef2d5df2cf4aca730c275478a3090ddeb8e882f9)), closes [#619](https://github.com/sabertazimi/blog/issues/619)
* **motion:** reduce post motion ([#661](https://github.com/sabertazimi/blog/issues/661)) ([f96a9bc](https://github.com/sabertazimi/blog/commit/f96a9bcce74402ca74ded7448f63ecfe21174cd1))
* **PostCard:** rectify clicable place for routing ([#662](https://github.com/sabertazimi/blog/issues/662)) ([7ccf39d](https://github.com/sabertazimi/blog/commit/7ccf39d1968ea51995e526338e4d776cc4170769))
* **Post:** generate complete post page link ([#649](https://github.com/sabertazimi/blog/issues/649)) ([6eb9b8b](https://github.com/sabertazimi/blog/commit/6eb9b8bdb7063c6bd4850936ac30eaef9539d4c0)), closes [#640](https://github.com/sabertazimi/blog/issues/640)
* **pwa:** disable development service worker setup ([#673](https://github.com/sabertazimi/blog/issues/673)) ([02e8bb3](https://github.com/sabertazimi/blog/commit/02e8bb35d4a5662afc9ba38e25b12b60869c4877))
* **react-hydrate:** reactify hydrate mismatching ([#704](https://github.com/sabertazimi/blog/issues/704)) ([fab4444](https://github.com/sabertazimi/blog/commit/fab444442096a808792fe867f82cb46b4680324d)), closes [#703](https://github.com/sabertazimi/blog/issues/703)
* **sitemap:** switch from dynamic generation to static generation ([#657](https://github.com/sabertazimi/blog/issues/657)) ([b229f02](https://github.com/sabertazimi/blog/commit/b229f023485de1698d677ca8ae9750a09bf9ba5c)), closes [#654](https://github.com/sabertazimi/blog/issues/654)
* **styles:** keep `antd` styles take precedence over `tailwind` styles. ([#715](https://github.com/sabertazimi/blog/issues/715)) ([53a52b2](https://github.com/sabertazimi/blog/commit/53a52b2005b87a786ad4036cd496b8d2c0576db6))
* **Tag:** add custom `Tag` components ([#665](https://github.com/sabertazimi/blog/issues/665)) ([e9c7454](https://github.com/sabertazimi/blog/commit/e9c7454ba5a913c326e6f80b2399c1bc6b890241))


### :sparkles: Features

* **404:** custom 404 not found component ([#666](https://github.com/sabertazimi/blog/issues/666)) ([b57ab71](https://github.com/sabertazimi/blog/commit/b57ab7108eb8303c14f596c1f1de3c300b22e8db)), closes [#630](https://github.com/sabertazimi/blog/issues/630)
* **animation:** switch from react-spring to framer-motion ([#645](https://github.com/sabertazimi/blog/issues/645)) ([cb3be2b](https://github.com/sabertazimi/blog/commit/cb3be2bd6bb0e0dd7dcabded03e8c8f65a43dbef)), closes [#619](https://github.com/sabertazimi/blog/issues/619)
* **ArticleNav:** brand new navigation button ([#651](https://github.com/sabertazimi/blog/issues/651)) ([37911b2](https://github.com/sabertazimi/blog/commit/37911b251479667bcede7d442b1bf5172998924e)), closes [#647](https://github.com/sabertazimi/blog/issues/647)
* **LandingNav:** add framer motion to landing page ([#643](https://github.com/sabertazimi/blog/issues/643)) ([00763be](https://github.com/sabertazimi/blog/commit/00763be114a93bba8d84d4cb56b77f2a4e7d3a69)), closes [#619](https://github.com/sabertazimi/blog/issues/619)
* **mdx-admonitions:** add admonition component support ([#746](https://github.com/sabertazimi/blog/issues/746)) ([bd9ac7d](https://github.com/sabertazimi/blog/commit/bd9ac7dacef0e155a40bd35040d6c7b560c109d4)), closes [#699](https://github.com/sabertazimi/blog/issues/699) [#725](https://github.com/sabertazimi/blog/issues/725)
* **mdx-admonitions:** add admonitions syntax support ([#696](https://github.com/sabertazimi/blog/issues/696)) ([36af3e0](https://github.com/sabertazimi/blog/commit/36af3e091ac0ae316e5ce5b15bfc601aa0bc6879)), closes [#614](https://github.com/sabertazimi/blog/issues/614)
* **mdx-code:** add basic `pre` and `code` support ([#728](https://github.com/sabertazimi/blog/issues/728)) ([fa3a9d5](https://github.com/sabertazimi/blog/commit/fa3a9d52d801ffffa3e15dbbee8af3013366b1f3)), closes [#699](https://github.com/sabertazimi/blog/issues/699) [#725](https://github.com/sabertazimi/blog/issues/725)
* **mdx-code:** add custom `Monokai` syntax highlight theme ([#763](https://github.com/sabertazimi/blog/issues/763)) ([12f375e](https://github.com/sabertazimi/blog/commit/12f375ee1877411bf9cdd752f8b8cc22bd44c214)), closes [#701](https://github.com/sabertazimi/blog/issues/701) [#759](https://github.com/sabertazimi/blog/issues/759)
* **mdx-code:** add line number support ([#757](https://github.com/sabertazimi/blog/issues/757)) ([45b9cf5](https://github.com/sabertazimi/blog/commit/45b9cf580294704ebdcd13dea808db0bb1d9ab5b)), closes [#701](https://github.com/sabertazimi/blog/issues/701) [#755](https://github.com/sabertazimi/blog/issues/755)
* **mdx-code:** add MacOS style flag and language detection support ([#730](https://github.com/sabertazimi/blog/issues/730)) ([7f8fea5](https://github.com/sabertazimi/blog/commit/7f8fea5af1655bcde2124f71244403296211bf95)), closes [#699](https://github.com/sabertazimi/blog/issues/699) [#700](https://github.com/sabertazimi/blog/issues/700)
* **mdx-code:** add prism syntax highlight to code blocks ([#756](https://github.com/sabertazimi/blog/issues/756)) ([d65c571](https://github.com/sabertazimi/blog/commit/d65c5718b0efcdb5afbc2cfe61a1c6ce4262a228)), closes [#700](https://github.com/sabertazimi/blog/issues/700)
* **mdx-components:** add `hr`, `img` and `Button` support ([#714](https://github.com/sabertazimi/blog/issues/714)) ([46f7e59](https://github.com/sabertazimi/blog/commit/46f7e597ce952447a0de265ec533b56ac34260ff)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **mdx-components:** add preview image card support ([#718](https://github.com/sabertazimi/blog/issues/718)) ([696a9b4](https://github.com/sabertazimi/blog/commit/696a9b4aa720436a51cf41d68357bbb5b4920eb1)), closes [#699](https://github.com/sabertazimi/blog/issues/699) [#716](https://github.com/sabertazimi/blog/issues/716)
* **mdx-emoji:** add GitHub emoji shortcode support ([#680](https://github.com/sabertazimi/blog/issues/680)) ([1587767](https://github.com/sabertazimi/blog/commit/158776704a07ed71d6c8a4ee5157fa4b621da94b)), closes [#614](https://github.com/sabertazimi/blog/issues/614)
* **mdx-footnote:** add footnote component ([#749](https://github.com/sabertazimi/blog/issues/749)) ([3db41c7](https://github.com/sabertazimi/blog/commit/3db41c738e108300c91b8721c8ba1e2a63d942d1)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **mdx-gfm:** add GitHub Flavored Markdown support ([#679](https://github.com/sabertazimi/blog/issues/679)) ([c37db70](https://github.com/sabertazimi/blog/commit/c37db7049ae5d3c51b40e69bd30228bfb8f23143)), closes [#614](https://github.com/sabertazimi/blog/issues/614)
* **mdx-headings:** add `<a>` link to `<heading>` ([#678](https://github.com/sabertazimi/blog/issues/678)) ([7a30b86](https://github.com/sabertazimi/blog/commit/7a30b86370b37af6393104b789979c75d3654049)), closes [#614](https://github.com/sabertazimi/blog/issues/614)
* **mdx-math:** add katex math support ([#675](https://github.com/sabertazimi/blog/issues/675)) ([e92e4ea](https://github.com/sabertazimi/blog/commit/e92e4eaf33fddf756656b907e13f160faee94c92)), closes [#614](https://github.com/sabertazimi/blog/issues/614)
* **mdx-table:** add table support ([#729](https://github.com/sabertazimi/blog/issues/729)) ([26e03af](https://github.com/sabertazimi/blog/commit/26e03af8d858b3948dc71dd9107e45b2e047f15f)), closes [#699](https://github.com/sabertazimi/blog/issues/699) [#725](https://github.com/sabertazimi/blog/issues/725)
* **mdx-typography:** add basic typography support ([#705](https://github.com/sabertazimi/blog/issues/705)) ([76e6143](https://github.com/sabertazimi/blog/commit/76e6143d349ba1a41f05d5bde91dfd1dca49ec31)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **mdx:** add `blockquote` support ([#723](https://github.com/sabertazimi/blog/issues/723)) ([cb9908a](https://github.com/sabertazimi/blog/commit/cb9908ab8a3dc0d0bbe0fff14a9256022b62165b)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **mdx:** add `ul`, `ol` and `li` supoort ([#719](https://github.com/sabertazimi/blog/issues/719)) ([362fd4e](https://github.com/sabertazimi/blog/commit/362fd4e5373c952ae89b4793339bcb9a84cf231f)), closes [#699](https://github.com/sabertazimi/blog/issues/699)
* **MDX:** add basic MDX support ([#659](https://github.com/sabertazimi/blog/issues/659)) ([4c5361e](https://github.com/sabertazimi/blog/commit/4c5361eca6c9e901139e94563e03aed9531b72fc)), closes [#614](https://github.com/sabertazimi/blog/issues/614)
* **mdx:** add hoverable animation for heading and anchor ([#750](https://github.com/sabertazimi/blog/issues/750)) ([9094762](https://github.com/sabertazimi/blog/commit/909476279a2478002c34394f68ab1e2ab7602d9b)), closes [#701](https://github.com/sabertazimi/blog/issues/701)
* **Motion-Bounce:** implement `Bounce` motion component ([#638](https://github.com/sabertazimi/blog/issues/638)) ([e1a98c2](https://github.com/sabertazimi/blog/commit/e1a98c2a5317174d99f26aa65dd8287d362c37e6)), closes [#619](https://github.com/sabertazimi/blog/issues/619)
* **next:** switch from `gatsby` to `next` ([#612](https://github.com/sabertazimi/blog/issues/612)) ([3c4a151](https://github.com/sabertazimi/blog/commit/3c4a151b3409762c592dfd101f5d22679fa6fbe0))
* **PWA:** add PWA support via workbox ([#668](https://github.com/sabertazimi/blog/issues/668)) ([3ddaf01](https://github.com/sabertazimi/blog/commit/3ddaf014325dbd2f7c388fbe539333a89a7cce0a)), closes [#631](https://github.com/sabertazimi/blog/issues/631)
* **SEO:** SEO optimization with `next/seo` ([#652](https://github.com/sabertazimi/blog/issues/652)) ([c3fb5b1](https://github.com/sabertazimi/blog/commit/c3fb5b17ac09ebe0550efec7017b9737c994e38b)), closes [#622](https://github.com/sabertazimi/blog/issues/622)
* **sitemap:** add basic sitemap generation ([#655](https://github.com/sabertazimi/blog/issues/655)) ([477707b](https://github.com/sabertazimi/blog/commit/477707b7ce7b529e0499d679a7a381d730d46bdd)), closes [#654](https://github.com/sabertazimi/blog/issues/654)

## [2.14.0](https://github.com/sabertazimi/blog/compare/v2.13.0...v2.14.0) (2022-04-23)


### :rocket: Building Work

* **deps-bot:** disable lockfile maintenance ([6a1dd18](https://github.com/sabertazimi/blog/commit/6a1dd189bbfcaefc0efb01f8f353c9f4bc3649d3))
* **yarn:** bump yarn from v3.0.2 to v3.1.0 ([3404223](https://github.com/sabertazimi/blog/commit/3404223445e47400009d2d7c3d7aa12f234fa0e8))


### :sparkles: Features

* **Header-DesktopNav:** add frosted glass effect ([#577](https://github.com/sabertazimi/blog/issues/577)) ([2a54dc7](https://github.com/sabertazimi/blog/commit/2a54dc7d5786e437f629652715825abd4fbfc4a4))
* **react-18:** switch to React v18 ([#574](https://github.com/sabertazimi/blog/issues/574)) ([b9ed17c](https://github.com/sabertazimi/blog/commit/b9ed17c3e506116ab0ca5a98b7b95f564c04635c))
* **testing:** add AXE a11y testing ([#595](https://github.com/sabertazimi/blog/issues/595)) ([7b67aa7](https://github.com/sabertazimi/blog/commit/7b67aa7e631fccfe9bb62a8d8416805f8e32d1bf))


### :wrench: Testing

* **a11y:** add a11y testing (based on axe-core) ([#604](https://github.com/sabertazimi/blog/issues/604)) ([6109ff9](https://github.com/sabertazimi/blog/commit/6109ff9c0b029e8c03d6a058f39f3c3c5dbc60ff))
* format code ([#600](https://github.com/sabertazimi/blog/issues/600)) ([ef6d548](https://github.com/sabertazimi/blog/commit/ef6d548a7500d6fa1b20684da9fe9fb704a8f3ad))
* **mocks-data:** setup shared mocks data ([#601](https://github.com/sabertazimi/blog/issues/601)) ([2ca9218](https://github.com/sabertazimi/blog/commit/2ca921805f47b3fc11d452026c087c357431339d))
* **mocks:** aggregate mocks data for testing ([#603](https://github.com/sabertazimi/blog/issues/603)) ([7e1f08a](https://github.com/sabertazimi/blog/commit/7e1f08a60a617ed7e38c44aa222bcbdc72ceb3b5))


### :bug: Bug Fixes

* **Article-ArticleHeader:** add last updated time ([#592](https://github.com/sabertazimi/blog/issues/592)) ([0fcb1f2](https://github.com/sabertazimi/blog/commit/0fcb1f264d860e32ed245a290ac715236c0985ba))
* **Article-ArticleNav:** add icon to article navigation button ([#591](https://github.com/sabertazimi/blog/issues/591)) ([cb858d5](https://github.com/sabertazimi/blog/commit/cb858d593df202fb1a7aaab8e7c7291842906869))
* **Article-ArticleNav:** add unique landmark ([#597](https://github.com/sabertazimi/blog/issues/597)) ([0bfa94e](https://github.com/sabertazimi/blog/commit/0bfa94e9fcffdef6c08f3a5fb1e3a76c98f78157))
* **Article-ArticleNav:** rectify icon position ([#593](https://github.com/sabertazimi/blog/issues/593)) ([9e03747](https://github.com/sabertazimi/blog/commit/9e03747ae303c46e9de5acbc4b7517869d6bbb83))
* **Article-styles:** add list style and padding styles ([#582](https://github.com/sabertazimi/blog/issues/582)) ([8cf30aa](https://github.com/sabertazimi/blog/commit/8cf30aa064e707c07823ced6b054ce705e2af193))
* **ArticleToc:** close ToC automaticly when clicking links ([#575](https://github.com/sabertazimi/blog/issues/575)) ([ed7ed1a](https://github.com/sabertazimi/blog/commit/ed7ed1a08bcb441ad82234baa459fabe1038aa32))
* **deps:** update dependencies (non-major) ([#580](https://github.com/sabertazimi/blog/issues/580)) ([ac2a09c](https://github.com/sabertazimi/blog/commit/ac2a09ce26ff6eccb5d8b6e04680bd622f34b1ab))
* **deps:** update dependencies (non-major) ([#607](https://github.com/sabertazimi/blog/issues/607)) ([51d818a](https://github.com/sabertazimi/blog/commit/51d818a12bb8f9ce87f39e02af092107c0787f30))
* **deps:** update dependency antd to ^4.17.2 ([#388](https://github.com/sabertazimi/blog/issues/388)) ([d9dbc48](https://github.com/sabertazimi/blog/commit/d9dbc48a07d52cfeca29c2a0189054a3e0aeb646))
* **deps:** update dependency antd to ^4.17.3 ([#406](https://github.com/sabertazimi/blog/issues/406)) ([b7999d5](https://github.com/sabertazimi/blog/commit/b7999d52074dadbac8a388c378a1ea5943b4cb22))
* **deps:** update dependency antd to ^4.17.4 ([#431](https://github.com/sabertazimi/blog/issues/431)) ([c3feae4](https://github.com/sabertazimi/blog/commit/c3feae4e17a8748ca3678590fe1eb783e8b09e94))
* **deps:** update dependency antd to ^4.18.2 ([#441](https://github.com/sabertazimi/blog/issues/441)) ([55b8972](https://github.com/sabertazimi/blog/commit/55b8972854f3a9554a54a405ba1a2ce8c031a31b))
* **deps:** update dependency antd to ^4.18.3 ([#457](https://github.com/sabertazimi/blog/issues/457)) ([b3830a2](https://github.com/sabertazimi/blog/commit/b3830a2d4e52ee944778ba69128f08a111f60dad))
* **deps:** update dependency antd to ^4.18.5 ([#473](https://github.com/sabertazimi/blog/issues/473)) ([541dae7](https://github.com/sabertazimi/blog/commit/541dae78e177597b6047157b0b828ee12ff1fd2b))
* **deps:** update dependency antd to ^4.18.6 ([#498](https://github.com/sabertazimi/blog/issues/498)) ([ced39f8](https://github.com/sabertazimi/blog/commit/ced39f8ce2c4e34bbd71dcec2688df7b16296fcc))
* **deps:** update dependency antd to ^4.18.8 ([#514](https://github.com/sabertazimi/blog/issues/514)) ([5647f35](https://github.com/sabertazimi/blog/commit/5647f350e171a8dcfda944867b39155c5b447af6))
* **deps:** update dependency antd to ^4.18.9 ([#532](https://github.com/sabertazimi/blog/issues/532)) ([a8c5d78](https://github.com/sabertazimi/blog/commit/a8c5d78a9ef009254335816b2258160e0744714d))
* **deps:** update dependency antd to ^4.19.1 ([#549](https://github.com/sabertazimi/blog/issues/549)) ([c2e107d](https://github.com/sabertazimi/blog/commit/c2e107dcb203b33126aab1fcf357188c1b072888))
* **deps:** update dependency antd to ^4.19.2 ([#553](https://github.com/sabertazimi/blog/issues/553)) ([a01b1b3](https://github.com/sabertazimi/blog/commit/a01b1b3d38fdf938c6fc9636012350e30977731f))
* **deps:** update dependency antd to ^4.19.4 ([#568](https://github.com/sabertazimi/blog/issues/568)) ([3eb9928](https://github.com/sabertazimi/blog/commit/3eb99280a21e62d8ce23f89b66defa7c4e98f80b))
* **deps:** update dependency gatsby to ^4.0.2 ([#342](https://github.com/sabertazimi/blog/issues/342)) ([fd0cd3a](https://github.com/sabertazimi/blog/commit/fd0cd3a72127b9a8d7b42160e4bafce671af436d))
* **deps:** update dependency gatsby to ^4.6.2 ([#489](https://github.com/sabertazimi/blog/issues/489)) ([eb24d3a](https://github.com/sabertazimi/blog/commit/eb24d3abe8f02f848d145ba8794403a12786b388))
* **deps:** update dependency gatsby to ^4.7.2 ([#515](https://github.com/sabertazimi/blog/issues/515)) ([e3aca95](https://github.com/sabertazimi/blog/commit/e3aca952032e81ce5864587cfbc6c1915c230825))
* **deps:** update dependency prismjs to ^1.26.0 ([#452](https://github.com/sabertazimi/blog/issues/452)) ([d6c7cd0](https://github.com/sabertazimi/blog/commit/d6c7cd0cd94d198a4ace08cbd403eec9918d46f8))
* **deps:** update dependency prismjs to ^1.27.0 ([#520](https://github.com/sabertazimi/blog/issues/520)) ([a65b55f](https://github.com/sabertazimi/blog/commit/a65b55fae2e73be8ec37a4f114bd9579f739e727))
* **deps:** update dependency react-spring to ^9.3.1 ([#371](https://github.com/sabertazimi/blog/issues/371)) ([022e11c](https://github.com/sabertazimi/blog/commit/022e11c90a3d007c6fa926a2ce8812793fd4cf74))
* **deps:** update dependency react-spring to ^9.3.2 ([#385](https://github.com/sabertazimi/blog/issues/385)) ([4b7a1bc](https://github.com/sabertazimi/blog/commit/4b7a1bc2c32a5dd208d65b380188a854da5fe94b))
* **deps:** update dependency react-spring to ^9.3.3 ([#432](https://github.com/sabertazimi/blog/issues/432)) ([a192c87](https://github.com/sabertazimi/blog/commit/a192c878f966daa729d29fa41ad4348c8dfcf36b))
* **deps:** update dependency react-spring to ^9.4.1 ([#453](https://github.com/sabertazimi/blog/issues/453)) ([cdf2f76](https://github.com/sabertazimi/blog/commit/cdf2f769c160513dd1fd1e54dd843445a9ae13e1))
* **deps:** update dependency react-spring to ^9.4.2 ([#458](https://github.com/sabertazimi/blog/issues/458)) ([b19252e](https://github.com/sabertazimi/blog/commit/b19252ece8d0aa728742695b851e54881bfd6997))
* **deps:** update dependency react-spring to ^9.4.3 ([#507](https://github.com/sabertazimi/blog/issues/507)) ([ee06130](https://github.com/sabertazimi/blog/commit/ee06130a74163d7eea46459916e1784a24c206c4))
* **deps:** update dependency react-spring to ^9.4.4 ([#547](https://github.com/sabertazimi/blog/issues/547)) ([65ec84e](https://github.com/sabertazimi/blog/commit/65ec84ec5a076799175c6781e3a2ce7f4a54dc70))
* **deps:** update dependency tailwindcss to ^2.2.19 ([#343](https://github.com/sabertazimi/blog/issues/343)) ([8bd362d](https://github.com/sabertazimi/blog/commit/8bd362da13e35f47578f0348ab35de1f9d613635))
* **deps:** update dependency tailwindcss to ^3.0.12 ([#449](https://github.com/sabertazimi/blog/issues/449)) ([ee02648](https://github.com/sabertazimi/blog/commit/ee026481a2939de8e9a5e0b2e6796c55d4b848f6))
* **deps:** update dependency tailwindcss to ^3.0.15 ([#459](https://github.com/sabertazimi/blog/issues/459)) ([b90da4b](https://github.com/sabertazimi/blog/commit/b90da4ba2f071e4655c6de0d15ace429d5df5802))
* **deps:** update dependency tailwindcss to ^3.0.18 ([#479](https://github.com/sabertazimi/blog/issues/479)) ([62e00a7](https://github.com/sabertazimi/blog/commit/62e00a73b46febe5de8c1e5e1f2db9df8582bc5c))
* **deps:** update dependency tailwindcss to ^3.0.22 ([#499](https://github.com/sabertazimi/blog/issues/499)) ([5ac5964](https://github.com/sabertazimi/blog/commit/5ac596417eb044675c25ac4cb1541dfa25f1be6c))
* **deps:** update dependency tailwindcss to ^3.0.23 ([#516](https://github.com/sabertazimi/blog/issues/516)) ([9ec01ae](https://github.com/sabertazimi/blog/commit/9ec01ae669f509097302e9d53f5b2250a8533b2a))
* **deps:** update dependency tailwindcss to ^3.0.7 ([#416](https://github.com/sabertazimi/blog/issues/416)) ([7787cb0](https://github.com/sabertazimi/blog/commit/7787cb000e823ffa5a607fa8e4335545160b27d9))
* **deps:** update dependency tailwindcss to ^3.0.8 ([#439](https://github.com/sabertazimi/blog/issues/439)) ([76361f2](https://github.com/sabertazimi/blog/commit/76361f23bac4b29ab2a3427bc3205e2ec9cc1705))
* **deps:** update dependency tailwindcss to v3 ([#409](https://github.com/sabertazimi/blog/issues/409)) ([c77f022](https://github.com/sabertazimi/blog/commit/c77f02249fe6f400bc12cde674ada62880e30af6))
* **Footer:** change footer description ([#594](https://github.com/sabertazimi/blog/issues/594)) ([9d0e138](https://github.com/sabertazimi/blog/commit/9d0e138157b10a248976beee2cd2f10ec30a25b5))
* **Footer:** remove dynamic year ([#444](https://github.com/sabertazimi/blog/issues/444)) ([41fab67](https://github.com/sabertazimi/blog/commit/41fab6711d475a8a3ecea18595bf455565ede702))
* **Header-DesktopNav:** rectify frosted blur in production ([#579](https://github.com/sabertazimi/blog/issues/579)) ([b48500f](https://github.com/sabertazimi/blog/commit/b48500f250fcfbd858fc7878988c2c59bc28d8cc)), closes [tailwindlabs/tailwindcss#7802](https://github.com/tailwindlabs/tailwindcss/issues/7802)
* **Icons:** add `aria-label` to icons ([#596](https://github.com/sabertazimi/blog/issues/596)) ([91328fb](https://github.com/sabertazimi/blog/commit/91328fb56e694153b7212adb2105cbe302f64f8c))
* **jest-config:** rectify jest utils path ([#445](https://github.com/sabertazimi/blog/issues/445)) ([d4f0731](https://github.com/sabertazimi/blog/commit/d4f0731ebda8dfc6197731a3f77aedb5da0c17ba))
* **jest:** rectify jest module mapper ([#508](https://github.com/sabertazimi/blog/issues/508)) ([e14432a](https://github.com/sabertazimi/blog/commit/e14432a8a289d1abc2ea118832524658692add45))
* **LandingNavLink:** drop antd `Tooltip` component ([#576](https://github.com/sabertazimi/blog/issues/576)) ([b959649](https://github.com/sabertazimi/blog/commit/b959649f1d4482bb1f94fd115aede7360748b938))
* **markdown:** move blog markdown files to `contents/` ([#611](https://github.com/sabertazimi/blog/issues/611)) ([fab6fbc](https://github.com/sabertazimi/blog/commit/fab6fbc58be6c7c2bd95d6cd2dfe4aa780e75b5c))
* **pages-markdown:** update new contents ([#564](https://github.com/sabertazimi/blog/issues/564)) ([460a328](https://github.com/sabertazimi/blog/commit/460a328baa922d61449e50d8e7dcfa1cf77f44e6))
* **tailwindcss:** rectify tailwindcss configuration ([#423](https://github.com/sabertazimi/blog/issues/423)) ([2ad2e24](https://github.com/sabertazimi/blog/commit/2ad2e240664d06354dee7c0121b4d7665e84d519))

## [2.13.0](https://github.com/sabertazimi/blog/compare/v2.12.0...v2.13.0) (2021-10-23)


### :rocket: Building Work

* **deps:** bundle bod deps into single PR ([c30f8e4](https://github.com/sabertazimi/blog/commit/c30f8e49e713739a5ff651531ec9fd5bd8047193))


### :bug: Bug Fixes

* **deps:** update dependency @octokit/rest to ^18.11.4 ([#269](https://github.com/sabertazimi/blog/issues/269)) ([f085375](https://github.com/sabertazimi/blog/commit/f0853751bf8d5bcf9abce8fb3c6535a8073d2bdc))
* **deps:** update dependency @octokit/rest to ^18.12.0 ([#291](https://github.com/sabertazimi/blog/issues/291)) ([a72f91a](https://github.com/sabertazimi/blog/commit/a72f91a3c4ee89fc264ba8c7a12cf6c234b57631))
* **deps:** update dependency gatsby to ^3.14.1 ([#270](https://github.com/sabertazimi/blog/issues/270)) ([203998b](https://github.com/sabertazimi/blog/commit/203998bebdcd0b8e6f258e0e6a804efe89a7d778))
* **deps:** update dependency gatsby to ^3.14.2 ([#286](https://github.com/sabertazimi/blog/issues/286)) ([96bcecd](https://github.com/sabertazimi/blog/commit/96bcecd2dff9292fcf12d7d8f5f3620223829d0e))
* **deps:** update dependency gatsby to ^3.14.3 ([#308](https://github.com/sabertazimi/blog/issues/308)) ([46e95f3](https://github.com/sabertazimi/blog/commit/46e95f3c10a4dc60db0bea1971f8e105279ad276))
* **deps:** update dependency gatsby to ^3.14.4 ([#325](https://github.com/sabertazimi/blog/issues/325)) ([f891d00](https://github.com/sabertazimi/blog/commit/f891d00e02c3048afa8dfc8b38ae0785fbc3b1f7))
* **deps:** update dependency react-spring to ^9.2.6 ([#287](https://github.com/sabertazimi/blog/issues/287)) ([53566da](https://github.com/sabertazimi/blog/commit/53566da295f77a92c8851195c10cab10712bb5c0))
* **deps:** update dependency react-spring to ^9.3.0 ([#295](https://github.com/sabertazimi/blog/issues/295)) ([18b5d55](https://github.com/sabertazimi/blog/commit/18b5d552237d87cf893a3db32e48a8be6f41f784))
* **deps:** update dependency tailwindcss to ^2.2.17 ([#309](https://github.com/sabertazimi/blog/issues/309)) ([eb76070](https://github.com/sabertazimi/blog/commit/eb760700db538c6f642672f96f5bc39ee105b500))
* **ErrorBoundary-types:** change children type to `ReactElement` ([5420890](https://github.com/sabertazimi/blog/commit/5420890480aaad9ba7bdc63d0240464436c2d3a1)), closes [testing-library/react-testing-library#966](https://github.com/testing-library/react-testing-library/issues/966) [testing-library/react-testing-library#970](https://github.com/testing-library/react-testing-library/issues/970)


### :sparkles: Features

* **gatsby:** bump gatsby to v4 ([#324](https://github.com/sabertazimi/blog/issues/324)) ([d32ec4a](https://github.com/sabertazimi/blog/commit/d32ec4a283ac01ce1ee0c39f97c45596f2467073)), closes [#319](https://github.com/sabertazimi/blog/issues/319)

## [2.12.0](https://github.com/sabertazimi/blog/compare/v2.11.0...v2.12.0) (2021-09-27)


### :rocket: Building Work

* **CI:** add multiple environment for building ([467a508](https://github.com/sabertazimi/blog/commit/467a508a702608cc4af2d5600c9afb56e876c7c2))
* **CI:** add multiple environment for testing ([ffbb88f](https://github.com/sabertazimi/blog/commit/ffbb88fa57d2d4b2fdd8494bb084d873521b5f1c))
* **CI:** reduce virtual machines efforts ([82df9c4](https://github.com/sabertazimi/blog/commit/82df9c434c7df80cbe717139397c0ea879ff18ae))
* **CI:** reduce virtual machines efforts ([5767295](https://github.com/sabertazimi/blog/commit/5767295a84028237582a245feb34de1ba1c10641))
* **CI:** reduce virtual machines efforts ([91909d8](https://github.com/sabertazimi/blog/commit/91909d8a1c31b57e32d8ae0a5891bb05d484b406))
* **CI:** switch `coveralls` to `codecov` ([4ccdbbf](https://github.com/sabertazimi/blog/commit/4ccdbbf5670d872ffc4d018e16c3412f50e23669))
* **deps-bot:** change PR concurrent limits ([1567bbc](https://github.com/sabertazimi/blog/commit/1567bbc7ab96ac0dbc4e46ab60a14fd0331fe7bc))
* **deps-bot:** disable renovate dependency dashboard ([2f4db29](https://github.com/sabertazimi/blog/commit/2f4db29fd9bebc03e2b3211b933af3c1f566b04e))
* **deps-bot:** enable `pin` version ([d7e8083](https://github.com/sabertazimi/blog/commit/d7e80830a60165bb2ace14d21ede85b8f07d95bd))
* **deps-bot:** enable non-major deps automerge ([d2fe69b](https://github.com/sabertazimi/blog/commit/d2fe69bca6fdcf7931bc9f08f74845d912bace92))
* **deps-bot:** remove GitHub dependabot ([ae277a6](https://github.com/sabertazimi/blog/commit/ae277a612fc9a0be3e01ea6e151b055df54b4ae4))
* **deps-bot:** setup renovate bot configuration ([c96ec45](https://github.com/sabertazimi/blog/commit/c96ec45cede2c77ccb67ef94c1e5ff83ed293dbe))
* **deps-bot:** widen peerDeps and engines ([a0fc5dd](https://github.com/sabertazimi/blog/commit/a0fc5dd5f8b97504d55e982cecfc09962d9322f1))
* **deps:** rectify missing peer deps ([e56ab17](https://github.com/sabertazimi/blog/commit/e56ab1758f8ed4c86bb8149135e4afe4e1e58326))
* **eslint:** add `dg-scripts` eslint configuration ([cbb422c](https://github.com/sabertazimi/blog/commit/cbb422c02297c02a7b4777b07cfe688288447baf))


### :sparkles: Features

* **stylelint:** add `stylelint` support ([0deb6cd](https://github.com/sabertazimi/blog/commit/0deb6cd3892913d8179415b2999c5c390ec0437d))


### :bug: Bug Fixes

* **css-styles:** rectify stylelint error ([16ef0b4](https://github.com/sabertazimi/blog/commit/16ef0b400977b94476751cdcea2f4dbc8b3add70))
* **deps:** pin dependencies ([#226](https://github.com/sabertazimi/blog/issues/226)) ([a32dd02](https://github.com/sabertazimi/blog/commit/a32dd02170e37fea236f092163ae56fd140ce28c))
* **deps:** rectify peerDeps error ([5a71473](https://github.com/sabertazimi/blog/commit/5a714733087e916fe79582e4070351385f06a59a))
* **deps:** update dependency @ant-design/icons to ^4.7.0 ([#254](https://github.com/sabertazimi/blog/issues/254)) ([f2de586](https://github.com/sabertazimi/blog/commit/f2de586a5eaa358e44eb858cd65992483173156d))
* **deps:** update dependency @octokit/rest to ^18.11.1 ([#252](https://github.com/sabertazimi/blog/issues/252)) ([7b82dfb](https://github.com/sabertazimi/blog/commit/7b82dfb982c5b3c2125d8d5ba0b37364f0120b16))
* **deps:** update dependency prismjs to ^1.25.0 ([#239](https://github.com/sabertazimi/blog/issues/239)) ([b9dfda1](https://github.com/sabertazimi/blog/commit/b9dfda17c286c7b9722e96041b3f697adf671706))
* **deps:** update dependency tailwindcss to ^2.2.16 ([#259](https://github.com/sabertazimi/blog/issues/259)) ([3e2e0a7](https://github.com/sabertazimi/blog/commit/3e2e0a707d857784509d96c2000639afc050a304))
* **deps:** update react monorepo to v17 (major) ([bf1a512](https://github.com/sabertazimi/blog/commit/bf1a51230cf6b5c68566f601b8ad6076d171bd52))
* **lint-markdown:** rectify css styles error in `md` files ([0eb72b9](https://github.com/sabertazimi/blog/commit/0eb72b9ac47bc4653b91b7194d6f29ff9339c690))
* **markdownlint:** add `markdownlint` support ([192771e](https://github.com/sabertazimi/blog/commit/192771e0e3c3f8cfc5eda474f74175a4a655083e))

## [2.11.0](https://github.com/sabertazimi/blog/compare/v2.10.0...v2.11.0) (2021-09-11)


### :bug: Bug Fixes

* **deps-security:** npm audit fix ([e87642a](https://github.com/sabertazimi/blog/commit/e87642a6b5abd3131d1e99e0baa7e22e010f8104))
* **Page Progress:** remove page progress indicator plugin ([be0e574](https://github.com/sabertazimi/blog/commit/be0e57462853a78d7950b7deb3a916897a8ec175))


### :zap: Performance

* **images:** optimize images via ImgBot ([#216](https://github.com/sabertazimi/blog/issues/216)) ([130670e](https://github.com/sabertazimi/blog/commit/130670ecd576180f491f3d6f4ffe4091e429cff0))


### :sparkles: Features

* **yarn:** switch from npm to yarn berry ([8ef36e0](https://github.com/sabertazimi/blog/commit/8ef36e03c6f11fa281a24997a25954e4c4b259dc))


### :rocket: Building Work

* **CI-azure:** remove azure pipelines ([8cfd53b](https://github.com/sabertazimi/blog/commit/8cfd53b261a3875b3cb6f1526cb767e0027a8916))
* **CI-CodeQL:** change crontab time ([52a3cfa](https://github.com/sabertazimi/blog/commit/52a3cfa7a4b830b4b26c0424d3ffab9d9287d95b))
* **CI:** separate CI stages ([83dadfa](https://github.com/sabertazimi/blog/commit/83dadfaa1ad2fe99b362e991fe7023b920343746))
* **CI:** ship to yarn berry scripts ([4c8ee3b](https://github.com/sabertazimi/blog/commit/4c8ee3b66d748386eaffc621bb24a95865a0f919))
* **deps-bot:** add renovate.json ([#217](https://github.com/sabertazimi/blog/issues/217)) ([856c912](https://github.com/sabertazimi/blog/commit/856c912ba21b6d107e9779bf3f7e072499972c2a))
* **deps-bot:** change semantic commit type ([97fd324](https://github.com/sabertazimi/blog/commit/97fd3241f2d04181965f5a88dd23685af704871c))
* **deps-bot:** disable renovate dashboard ([dda5224](https://github.com/sabertazimi/blog/commit/dda5224da19978dfca93cc63af22d119195ea9e7))
* **deps-bot:** schedule deps bot to weekend ([f743089](https://github.com/sabertazimi/blog/commit/f743089f453442697b93fefd0dee2428dc8f7a2f))
* **deps-bot:** setup renovate bot configuration ([d417780](https://github.com/sabertazimi/blog/commit/d41778092c577a440796a569ebe9b859c260124c))
* **deps-dev:** bump @octokit/types from 6.25.0 to 6.27.0 ([#212](https://github.com/sabertazimi/blog/issues/212)) ([7586e72](https://github.com/sabertazimi/blog/commit/7586e72a623607986daf5a0b6c32da1665eec5c1))
* **deps-dev:** bump @testing-library/react-hooks from 7.0.1 to 7.0.2 ([#194](https://github.com/sabertazimi/blog/issues/194)) ([04f4478](https://github.com/sabertazimi/blog/commit/04f447837feefb5ea8dfd1f383d3161da550a275))
* **deps-dev:** bump @types/node from 16.6.2 to 16.7.1 ([bcb007b](https://github.com/sabertazimi/blog/commit/bcb007b4487f4da11e68208a8c4a2fe4eac99379))
* **deps-dev:** bump @types/node from 16.7.1 to 16.7.4 ([39ebe0b](https://github.com/sabertazimi/blog/commit/39ebe0b72046e355616a5e765b66a0769821d4cc))
* **deps-dev:** bump @types/node from 16.7.4 to 16.7.7 ([#187](https://github.com/sabertazimi/blog/issues/187)) ([f9cd793](https://github.com/sabertazimi/blog/commit/f9cd7936e9f5bc86f4b5714eb8929ae7e43b99a0))
* **deps-dev:** bump @types/node from 16.7.7 to 16.7.8 ([#191](https://github.com/sabertazimi/blog/issues/191)) ([a95bafc](https://github.com/sabertazimi/blog/commit/a95bafc297433c8d798fe4298b1b6c61c57496f0))
* **deps-dev:** bump @types/node from 16.7.8 to 16.7.10 ([#209](https://github.com/sabertazimi/blog/issues/209)) ([87b3a72](https://github.com/sabertazimi/blog/commit/87b3a72d0e8efac642fd96f57f1d34f533357928))
* **deps-dev:** bump @types/react from 17.0.19 to 17.0.20 ([#202](https://github.com/sabertazimi/blog/issues/202)) ([c10c07f](https://github.com/sabertazimi/blog/commit/c10c07fc05cde138e6475402b96706b5dec7f875))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([da626d6](https://github.com/sabertazimi/blog/commit/da626d6b24ad117071e22a1bac0049fa16395fe2))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([#192](https://github.com/sabertazimi/blog/issues/192)) ([9291371](https://github.com/sabertazimi/blog/commit/92913715097ee991d150f7fd2c9d83ba7f846f38))
* **deps-dev:** bump @typescript-eslint/parser from 4.29.2 to 4.29.3 ([d3649c5](https://github.com/sabertazimi/blog/commit/d3649c5d29e933c43dd234fbc9b5d77c5aaf4392))
* **deps-dev:** bump @typescript-eslint/parser from 4.29.3 to 4.30.0 ([#193](https://github.com/sabertazimi/blog/issues/193)) ([9d02ee1](https://github.com/sabertazimi/blog/commit/9d02ee1e7ab187c73bbce7534d464154970f7117))
* **deps-dev:** bump autoprefixer from 10.3.1 to 10.3.2 ([959c6fd](https://github.com/sabertazimi/blog/commit/959c6fd6cdfd394d5d8a4f78079a0d26f99eccb3))
* **deps-dev:** bump autoprefixer from 10.3.2 to 10.3.3 ([80d11b2](https://github.com/sabertazimi/blog/commit/80d11b2d011e544b34031928dcf635bbf6afcedc))
* **deps-dev:** bump autoprefixer from 10.3.3 to 10.3.4 ([#201](https://github.com/sabertazimi/blog/issues/201)) ([97079f3](https://github.com/sabertazimi/blog/commit/97079f3e1228c67abfcb7896dcf994b12aca5c9b))
* **deps-dev:** bump babel-jest from 27.0.6 to 27.1.0 ([5ee112f](https://github.com/sabertazimi/blog/commit/5ee112fe1c0ef242077385fe3a73c1952f445ef5))
* **deps-dev:** bump eslint-plugin-import from 2.24.1 to 2.24.2 ([39437a8](https://github.com/sabertazimi/blog/commit/39437a8bbb5ff186582deff097d63602ef790532))
* **deps-dev:** bump eslint-plugin-prettier from 3.4.0 to 3.4.1 ([864c652](https://github.com/sabertazimi/blog/commit/864c6522f937a1d28dc0e4e2e4f896469f1328c1))
* **deps-dev:** bump eslint-plugin-prettier from 3.4.1 to 4.0.0 ([#190](https://github.com/sabertazimi/blog/issues/190)) ([1036570](https://github.com/sabertazimi/blog/commit/1036570ff0461c9ea8c493eb04b11a5ff0c8ec03))
* **deps-dev:** bump eslint-plugin-react from 7.24.0 to 7.25.1 ([#189](https://github.com/sabertazimi/blog/issues/189)) ([3a6a166](https://github.com/sabertazimi/blog/commit/3a6a166fdb20fc2ab716a57ea4edac01e089890d))
* **deps-dev:** bump gatsby-plugin-catch-links from 3.12.0 to 3.13.0 ([#210](https://github.com/sabertazimi/blog/issues/210)) ([b309333](https://github.com/sabertazimi/blog/commit/b309333b84bba727331bd1ae6fd70fa8b48a6799))
* **deps-dev:** bump gatsby-plugin-manifest from 3.12.0 to 3.13.0 ([#213](https://github.com/sabertazimi/blog/issues/213)) ([96e354f](https://github.com/sabertazimi/blog/commit/96e354f4fe1d1fcacb8a727eb9d3fd55eace18ad))
* **deps-dev:** bump gatsby-plugin-nprogress from 3.12.0 to 3.13.0 ([#207](https://github.com/sabertazimi/blog/issues/207)) ([fda541a](https://github.com/sabertazimi/blog/commit/fda541af36ecf8ddd08e697f591d7b1a93fb6a4a))
* **deps-dev:** bump gatsby-plugin-offline from 4.12.0 to 4.13.0 ([#204](https://github.com/sabertazimi/blog/issues/204)) ([ba946d9](https://github.com/sabertazimi/blog/commit/ba946d90faee713b308f5d079bf7731144abfffb))
* **deps-dev:** bump gatsby-plugin-postcss from 4.12.0 to 4.13.0 ([#200](https://github.com/sabertazimi/blog/issues/200)) ([6b9b3fd](https://github.com/sabertazimi/blog/commit/6b9b3fd6013b4dc3454c043a3ab858daa14d9824))
* **deps-dev:** bump gatsby-plugin-react-helmet from 4.12.0 to 4.13.0 ([#208](https://github.com/sabertazimi/blog/issues/208)) ([3f4de6f](https://github.com/sabertazimi/blog/commit/3f4de6ff4e519c123d08aea6503c1b6d8860d317))
* **deps-dev:** bump gatsby-plugin-robots-txt from 1.6.9 to 1.6.10 ([#195](https://github.com/sabertazimi/blog/issues/195)) ([2907f50](https://github.com/sabertazimi/blog/commit/2907f50c77b8ec763f01c69ef7c44482f23127f4))
* **deps-dev:** bump gatsby-plugin-sitemap from 4.8.0 to 4.9.0 ([#199](https://github.com/sabertazimi/blog/issues/199)) ([d92b2e7](https://github.com/sabertazimi/blog/commit/d92b2e7e963409f718b6834dc0aca7f62c027cc0))
* **deps-dev:** bump gatsby-plugin-webpack-bundle-analyser-v2 ([#211](https://github.com/sabertazimi/blog/issues/211)) ([0ceb1eb](https://github.com/sabertazimi/blog/commit/0ceb1ebc8a0997142950381d67526f5c636e76ac))
* **deps-dev:** bump gatsby-remark-autolink-headers ([#206](https://github.com/sabertazimi/blog/issues/206)) ([02e851a](https://github.com/sabertazimi/blog/commit/02e851ada1cc8b0591dd8ee7dfe2fcda857a3f75))
* **deps-dev:** bump gatsby-remark-copy-linked-files ([#215](https://github.com/sabertazimi/blog/issues/215)) ([41b949a](https://github.com/sabertazimi/blog/commit/41b949aa79c33f171bf5f1c27f18280ab494c0de))
* **deps-dev:** bump gatsby-remark-prismjs from 5.9.0 to 5.10.0 ([#214](https://github.com/sabertazimi/blog/issues/214)) ([e39897c](https://github.com/sabertazimi/blog/commit/e39897cfc2cc70db3ab35bd281596e70740c7b37))
* **deps-dev:** bump gatsby-remark-smartypants from 4.9.0 to 4.10.0 ([#196](https://github.com/sabertazimi/blog/issues/196)) ([4382e02](https://github.com/sabertazimi/blog/commit/4382e02e668d1da3ca3c4a8ac1863061ec366b57))
* **deps-dev:** bump gatsby-source-filesystem from 3.12.0 to 3.13.0 ([#197](https://github.com/sabertazimi/blog/issues/197)) ([30c2760](https://github.com/sabertazimi/blog/commit/30c276094829e5943af579963d7874258a29a7fa))
* **deps-dev:** bump jest from 27.0.6 to 27.1.0 ([86733c9](https://github.com/sabertazimi/blog/commit/86733c9fc4a85c6b394602bd3525daa9a24d0c57))
* **deps-dev:** bump typescript from 4.3.5 to 4.4.2 ([0c388da](https://github.com/sabertazimi/blog/commit/0c388da6142dbfa1c655a1ee1404cf4e5e6e1ec8))
* **deps:** bump @ant-design/icons from 4.6.3 to 4.6.4 ([76616c2](https://github.com/sabertazimi/blog/commit/76616c276332f4ae141f4d2e5f45bdfd979a479c))
* **deps:** bump @octokit/rest from 18.9.1 to 18.10.0 ([#205](https://github.com/sabertazimi/blog/issues/205)) ([85c37d9](https://github.com/sabertazimi/blog/commit/85c37d9b8758b7734d82161b33f93ed6d4ecd023))
* **deps:** bump antd from 4.16.12 to 4.16.13 ([513c741](https://github.com/sabertazimi/blog/commit/513c74109fcbe12958d8f2c1f496a697a20e5574))
* **deps:** bump gatsby from 3.12.0 to 3.12.1 ([89eeb65](https://github.com/sabertazimi/blog/commit/89eeb652d323973cf62b3ef0b7846dbf6f4afecb))
* **deps:** bump tailwindcss from 2.2.7 to 2.2.8 ([9f0da94](https://github.com/sabertazimi/blog/commit/9f0da9492add9132a648cb2aa4f4ec33631de93c))
* **deps:** bump tailwindcss from 2.2.8 to 2.2.9 ([#188](https://github.com/sabertazimi/blog/issues/188)) ([58a327c](https://github.com/sabertazimi/blog/commit/58a327cc6ade8b27ebc2c7c44b5b1322b06b32f7))
* **Gatsby-Node API:** update fallback GitHub profile data ([34fb5c6](https://github.com/sabertazimi/blog/commit/34fb5c664cf9f90f4fc229883447357c72cc1455))
* **Jest-badge:** format code ([68e87bf](https://github.com/sabertazimi/blog/commit/68e87bf5a45c016772217c9b410c31bcc6ad0fec))
* **Jest-badge:** rectify unknown error type in TS 4.4.2 ([b24cf9d](https://github.com/sabertazimi/blog/commit/b24cf9d5f11ea0060380eec778d86c0d943914f4))
* **Jest-config:** ignore nested dist files ([a7a40b4](https://github.com/sabertazimi/blog/commit/a7a40b48ab7386423f349a4c9b3949cd2f95eb1d))
* **Jest:** enable Jest config intellisense ([1a23dd9](https://github.com/sabertazimi/blog/commit/1a23dd99eff4b410b985b2faf5615235ebaa7eac))

## [2.10.0](https://github.com/sabertazimi/blog/compare/v2.9.0...v2.10.0) (2021-08-19)


### :rocket: Building Work

* **deps-core:** bump gatsby from 3.11.1 to 3.12.0 ([c46f21f](https://github.com/sabertazimi/blog/commit/c46f21fc4f34b307f71bc4a26d0eba2e282e5d2b))
* **deps-dev:** bump @types/node from 16.6.1 to 16.6.2 ([b7806cd](https://github.com/sabertazimi/blog/commit/b7806cd881bc5179e5d51a8f500d3d510c3f5ae2))
* **deps-dev:** bump @types/react from 17.0.18 to 17.0.19 ([9e251a7](https://github.com/sabertazimi/blog/commit/9e251a79988767fc43cc54d2d10b8ee4433ff3db))
* **deps-dev:** bump eslint-plugin-import from 2.24.0 to 2.24.1 ([8a601f6](https://github.com/sabertazimi/blog/commit/8a601f65f215faa45949514385c8ffb7f26809d5))
* **deps-dev:** bump gatsby-plugin-eslint from 3.0.0 to 4.0.0 ([462dd76](https://github.com/sabertazimi/blog/commit/462dd761478b301df6924e0efa9cfbc1b2b2dcd7))
* **deps-dev:** bump ts-node from 10.2.0 to 10.2.1 ([983ad2f](https://github.com/sabertazimi/blog/commit/983ad2f86b45b9b1088a8b44ae3c810f509cb03d))
* **deps:** remove duplicated packages ([b596b54](https://github.com/sabertazimi/blog/commit/b596b549a0883dff75ce2623e156f13e35365e70))

## [2.9.0](https://github.com/sabertazimi/blog/compare/v2.8.0...v2.9.0) (2021-08-18)


### :bug: Bug Fixes

* **API-GitHub:** local fallback data for GitHub API ([bc7545a](https://github.com/sabertazimi/blog/commit/bc7545a225047f465e97afe7bdf89758713c942e))


### :sparkles: Features

* **progress bar:** add loading and reading progress bar ([3244dd3](https://github.com/sabertazimi/blog/commit/3244dd3834c3dfe12d7bfb8931f79ba11af69796))


### :rocket: Building Work

* **CI-azure:** add more pipeline triggers ([150632a](https://github.com/sabertazimi/blog/commit/150632ad32edab3a4ca061cbafb6cd400e7b8b60))
* **CI:** initialize git config ([512fef6](https://github.com/sabertazimi/blog/commit/512fef670d769388d28d186db264ee7a407e1ad6))
* **CI:** set up CI with Azure Pipelines ([3e5093a](https://github.com/sabertazimi/blog/commit/3e5093a551933a69140f46e131308ed68564b2a0))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([5cae3b5](https://github.com/sabertazimi/blog/commit/5cae3b52288d6433ae3041e37799f64d4f2b63e6))
* **deps-dev:** bump @typescript-eslint/parser from 4.29.1 to 4.29.2 ([30a8882](https://github.com/sabertazimi/blog/commit/30a88823fd90b8b87f26141ee1e0ffc3bf1e36c7))
* **deps-dev:** bump ts-jest from 27.0.4 to 27.0.5 ([4f03a30](https://github.com/sabertazimi/blog/commit/4f03a3020f5a1b397d15062738c73f23d929b2e8))

## [2.8.0](https://github.com/sabertazimi/blog/compare/v2.7.0...v2.8.0) (2021-08-17)


### :sparkles: Features

* **TypeScript:** add ts-node support for TS script ([3a1dcdb](https://github.com/sabertazimi/blog/commit/3a1dcdbffc840c33b172abedfb59534afa1ddf46))


### :bug: Bug Fixes

* **deps-types:** add missing node-fetch TS types ([99d8aa2](https://github.com/sabertazimi/blog/commit/99d8aa20594de2d1cd51b39b6c6c101a603854cc))
* **Jest-badge:** rectify ts-node config ([80be426](https://github.com/sabertazimi/blog/commit/80be426866ad4944df0c84dbd30d7503feb709ee))


### :rocket: Building Work

* **CHANGELOG:** add emoji to changelog ([cb0bea4](https://github.com/sabertazimi/blog/commit/cb0bea44da44a4332bdf56e3b4ffe077be9bba25))
* **deps-dev:** bump @types/jest from 27.0.0 to 27.0.1 ([1f72818](https://github.com/sabertazimi/blog/commit/1f728182e90f5b41d8cf3955fd1db9337b506bb0))
* **deps-dev:** bump @types/node from 16.6.0 to 16.6.1 ([18e2328](https://github.com/sabertazimi/blog/commit/18e23287142d87f88b860e5c2f773c7ec7013bb1))
* **deps-dev:** bump @types/react from 17.0.17 to 17.0.18 ([d1bd0ed](https://github.com/sabertazimi/blog/commit/d1bd0ed5a682f55165db5cb6ac4db96da239e15f))
* **deps-dev:** bump gatsby-plugin-robots-txt from 1.6.8 to 1.6.9 ([89c880f](https://github.com/sabertazimi/blog/commit/89c880ff116a3c680667846cd0c6e7a3d0b9ba2f))
* **deps-dev:** bump tslib from 2.3.0 to 2.3.1 ([652bdd3](https://github.com/sabertazimi/blog/commit/652bdd393bced49f94cdac67a0ffd7c05fb52b70))
* **deps:** bump @ant-design/icons from 4.6.2 to 4.6.3 ([2a0107b](https://github.com/sabertazimi/blog/commit/2a0107bd68a5432d8acfef9b4c871ca4a3542038))
* **deps:** bump @octokit/rest from 18.9.0 to 18.9.1 ([5d1835e](https://github.com/sabertazimi/blog/commit/5d1835e296b7ead0abdf66d38116a57c07c92c53))
* **deps:** bump antd from 4.16.11 to 4.16.12 ([515a108](https://github.com/sabertazimi/blog/commit/515a108ee5ed0eb46271f831dd298397c27426aa))

## [2.7.0](https://github.com/sabertazimi/blog/compare/v2.6.1...v2.7.0) (2021-08-13)


### Building Work

* **deps:** user event tesing support ([6e6ad84](https://github.com/sabertazimi/blog/commit/6e6ad84e74b906ffc195eb28eb4aa4335c03d971))
* **Jest-coverage:** ignore scroll-related code ([b99bf84](https://github.com/sabertazimi/blog/commit/b99bf848d1bd7b53a37c4472f0a8ffc08b4ad720)), closes [testing-library/react-testing-library#671](https://github.com/testing-library/react-testing-library/issues/671) [enzymejs/enzyme#426](https://github.com/enzymejs/enzyme/issues/426)

### [2.6.1](https://github.com/sabertazimi/blog/compare/v2.6.0...v2.6.1) (2021-08-12)


### Building Work

* **CI:** add `coveralls` support ([0127f30](https://github.com/sabertazimi/blog/commit/0127f308d836b7dd390ecea6af4be22bd67c7211))
* **deps-dev:** bump @octokit/types from 6.24.0 to 6.25.0 ([412ecb4](https://github.com/sabertazimi/blog/commit/412ecb40cbf12c033829769af036b8c1d3834122))
* **deps-dev:** bump @types/jest from 26.0.24 to 27.0.0 ([f03006b](https://github.com/sabertazimi/blog/commit/f03006b569d2bc984e0c4e69e9cc9c191c9bb289))
* **deps-dev:** bump @types/node from 16.4.13 to 16.4.14 ([e400c5d](https://github.com/sabertazimi/blog/commit/e400c5d28cd0be17bccf3ab1e372fc8cda420ac3))
* **deps-dev:** bump @types/node from 16.4.14 to 16.6.0 ([500ecab](https://github.com/sabertazimi/blog/commit/500ecab203e49b666cd8f7f692762cc12ac15ad0))
* **deps-dev:** bump @types/react from 17.0.16 to 17.0.17 ([e511853](https://github.com/sabertazimi/blog/commit/e511853b281e75663d38a164b231ea900abb29dc))
* **Jest-badge:** remove redundant error checking ([819515b](https://github.com/sabertazimi/blog/commit/819515b1aa9ff118544466adf988e5db847b38f4))
* **Site Metadata:** change URL of `awesome-notes` book ([228f357](https://github.com/sabertazimi/blog/commit/228f35721ceb914e278004359dbc1384175c6382))

## [2.6.0](https://github.com/sabertazimi/blog/compare/v2.5.0...v2.6.0) (2021-08-10)


### Bug Fixes

* **css-fonts:** remove custom fonts ([51e88d8](https://github.com/sabertazimi/blog/commit/51e88d84effae20204b1d6bcf703209cbbd2d746))
* **GithubRepoCard:** move language field to Tag ([070541c](https://github.com/sabertazimi/blog/commit/070541c40412ad3b09978a8a0f1635bee8f3cdd5))
* **LandingNav:** add aria-labelledby a11y access name ([359f674](https://github.com/sabertazimi/blog/commit/359f674741d21c1bebc48d7a06ac53a7f9913072))
* **LandingNav:** remove invalid ARIA value ([82e1871](https://github.com/sabertazimi/blog/commit/82e18716c6cf2017302e19203dde7bec20d98ab1)), closes [#89](https://github.com/sabertazimi/blog/issues/89)
* **PWA:** add missing theme color for PWA ([1335db6](https://github.com/sabertazimi/blog/commit/1335db68ca0380547c0a047a7f92fcf4c03983e7))


### Testing

* **hooks:** add react hooks testing library support ([d55e343](https://github.com/sabertazimi/blog/commit/d55e343f653657effabd7449fe07f873fb78cd21))
* **mocks:** explicit jest spy instance ([d5e0cfd](https://github.com/sabertazimi/blog/commit/d5e0cfdfba36d7f13af3cd754e233c446b347fb6))


### Performance

* **LandingLayout:** remove React spring in landing page ([8de6dfa](https://github.com/sabertazimi/blog/commit/8de6dfa04056885b84702b8105a142105526296b))

## [2.5.0](https://github.com/sabertazimi/blog/compare/v2.4.3...v2.5.0) (2021-08-09)


### Features

* **hooks:** move typing logic to useTypingEffect hook ([74838a9](https://github.com/sabertazimi/blog/commit/74838a9ba73968d15be45fa8a986dfc5501286ed))
* **MetaHeader:** add MetaHeader component for a11y ([430f67d](https://github.com/sabertazimi/blog/commit/430f67d63aa2375940a6e22707a1c41958bff7db)), closes [#89](https://github.com/sabertazimi/blog/issues/89)


### Bug Fixes

* **MetaHeader:** add html lang attribute for a11y ([59e7174](https://github.com/sabertazimi/blog/commit/59e7174f38a7a0ddcd8bce88caf7bb3ed4970ea7))
* **pages-404:** rectify css modules order conflict ([568602b](https://github.com/sabertazimi/blog/commit/568602b9748a16ea2401193b68e39b6b95bf5092))
* **templates:** `import type` for type only imports ([aab1ff1](https://github.com/sabertazimi/blog/commit/aab1ff1135db8d279f28b4ab0ea2a7850ed8f2e7))
* **templates:** add MetaHeader to all template components ([2351581](https://github.com/sabertazimi/blog/commit/235158132fc18af264ba293041ef9ddaddfaa540)), closes [#89](https://github.com/sabertazimi/blog/issues/89)
* **TypingTitle:** change to useRef version ([530616e](https://github.com/sabertazimi/blog/commit/530616ebfd1592bd6fa860f3433d0aad278a960e))
* **TypingTitles:** add a11y heading role to typing titles ([f7100d8](https://github.com/sabertazimi/blog/commit/f7100d829c19822c53c967fff7dff81d23e6df09))


### Building Work

* **deps-core:** bump gatsby from 3.10.2 to 3.11.1 ([bb0a78a](https://github.com/sabertazimi/blog/commit/bb0a78a5cc209daf561fb7beb7cb663bd0d8d63f))
* **deps-dev:** bump @types/node from 16.4.10 to 16.4.13 ([7d42534](https://github.com/sabertazimi/blog/commit/7d42534bd18f6ff92c763a19afc05812651ba70a))
* **deps-dev:** bump @types/react from 17.0.15 to 17.0.16 ([0e29878](https://github.com/sabertazimi/blog/commit/0e29878402aec92196783fe35304381a22ea4724))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([27a7ed0](https://github.com/sabertazimi/blog/commit/27a7ed096af7a9ea307cfab3a79da45ed9a80b4c))
* **deps-dev:** bump @typescript-eslint/parser from 4.29.0 to 4.29.1 ([f6ef519](https://github.com/sabertazimi/blog/commit/f6ef519a3e7b7d0b5052c8863294d8ccbbac5853))
* **deps-dev:** bump babel-preset-gatsby from 1.10.0 to 1.11.0 ([2a8ec57](https://github.com/sabertazimi/blog/commit/2a8ec578795485dc5d71135f0fb640f00daded70))
* **deps-dev:** bump concurrently from 6.2.0 to 6.2.1 ([1d0ccf1](https://github.com/sabertazimi/blog/commit/1d0ccf198930962c3e4f4dae62952efd023589a4))
* **deps-dev:** bump eslint-plugin-import from 2.23.4 to 2.24.0 ([9db77d2](https://github.com/sabertazimi/blog/commit/9db77d26164d68dfc1d8bbefd09e7f05f80c344b))
* **deps-dev:** bump gatsby-plugin-catch-links from 3.10.0 to 3.11.0 ([c5c1018](https://github.com/sabertazimi/blog/commit/c5c1018c285f726627c2e66dd5c7d049cf233c3e))
* **deps-dev:** bump gatsby-plugin-manifest from 3.10.0 to 3.11.0 ([ad1f685](https://github.com/sabertazimi/blog/commit/ad1f685c661579057e9a0cf7bf2a4ac9e08e7517))
* **deps-dev:** bump gatsby-plugin-offline from 4.10.0 to 4.11.0 ([7a66068](https://github.com/sabertazimi/blog/commit/7a66068fd67988db6fa0990e38f97218195c8f0c))
* **deps-dev:** bump gatsby-plugin-postcss from 4.10.0 to 4.11.0 ([1ac9bd2](https://github.com/sabertazimi/blog/commit/1ac9bd2d0c28503eb1778e0ebb4ae5c1fe7ec583))
* **deps-dev:** bump gatsby-plugin-react-helmet from 4.10.0 to 4.11.0 ([14e7735](https://github.com/sabertazimi/blog/commit/14e77353d8d5a57aeab862e4aefa0480d0541c22))
* **deps-dev:** bump gatsby-plugin-sitemap from 4.6.0 to 4.7.0 ([55db247](https://github.com/sabertazimi/blog/commit/55db247582b7cca0df8263d8e7f98acd5ac52f60))
* **deps-dev:** bump gatsby-remark-autolink-headers from 4.7.0 to 4.8.0 ([3ed8f89](https://github.com/sabertazimi/blog/commit/3ed8f89b0db864bd1df48a70b202341b85094446))
* **deps-dev:** bump gatsby-remark-copy-linked-files ([686c343](https://github.com/sabertazimi/blog/commit/686c3436bc98a6a9d64ea69d2abb14b1efcbb026))
* **deps-dev:** bump gatsby-remark-prismjs from 5.7.0 to 5.8.0 ([f247f54](https://github.com/sabertazimi/blog/commit/f247f5410a01bbaf75bf861c94cc625f04ba1cdd))
* **deps-dev:** bump gatsby-remark-smartypants from 4.7.0 to 4.8.0 ([ed54f1e](https://github.com/sabertazimi/blog/commit/ed54f1e2f0a7194df1e4feb71f4c89eec8c73521))
* **deps-dev:** bump gatsby-source-filesystem from 3.10.0 to 3.11.0 ([646e069](https://github.com/sabertazimi/blog/commit/646e069d3755248d1598857ae3d7c62f19889d82))
* **deps-dev:** bump gatsby-transformer-remark from 4.7.0 to 4.8.0 ([0b7d8c4](https://github.com/sabertazimi/blog/commit/0b7d8c43ddc88da8f4b3da936dc879498ef12a9a))
* **deps:** bump @octokit/rest from 18.8.0 to 18.9.0 ([4570447](https://github.com/sabertazimi/blog/commit/457044787f238632d032001d49864037dfe4dea2))
* **deps:** bump antd from 4.16.10 to 4.16.11 ([dc4ad98](https://github.com/sabertazimi/blog/commit/dc4ad98cf25675fd74ed18954baefe3df10623c7))


### Testing

* **useTypingEffect:** add test for useTypingEffect hook ([3971242](https://github.com/sabertazimi/blog/commit/397124224b87be801791cc731362afdcc7bc0db7))

### [2.4.3](https://github.com/sabertazimi/blog/compare/v2.4.2...v2.4.3) (2021-08-08)


### Bug Fixes

* **ErrorBoundary:** add a11y alert role ([7136808](https://github.com/sabertazimi/blog/commit/71368082a9eba6c5e311929bc5f328c62d94b576))
* **Footer:** keep locale for snapshot testing ([9a74f15](https://github.com/sabertazimi/blog/commit/9a74f1533bb39557aab72652473c838c872cda4b))
* **mocks:** add requestAnimationFrame missing return value ([e025b14](https://github.com/sabertazimi/blog/commit/e025b1412e5887875ea77bdc692183336bee81e2))
* **PostsGrid:** use arry index as rendering ID ([b3c6177](https://github.com/sabertazimi/blog/commit/b3c6177f57e41404bd50274ce07f74190c5f7ae1))
* **useVisibility:** log error message when missing refs ([353269a](https://github.com/sabertazimi/blog/commit/353269a35a0830dee5f8f12aec3051e2bb51fee4))


### Building Work

* **CI:** disable Jest verbose output ([1a86f8e](https://github.com/sabertazimi/blog/commit/1a86f8e4637f79ce095b5944f27bf2394c043a81))


### Testing

* **ArticleComments:** add snapshot testing ([c40074a](https://github.com/sabertazimi/blog/commit/c40074a0ae586eff04630fd02a954c0ef12ac9d5))
* **ErrorBoundary:** add error rendering tests ([a2bdffe](https://github.com/sabertazimi/blog/commit/a2bdffe69a29fd6958254bd72485af24f673a980))
* **hooks:** add graql related hooks testing ([6fde2c4](https://github.com/sabertazimi/blog/commit/6fde2c47623cdb34ef03d710c75d0665cf8da4f5))
* **PostCard:** add snapshot testing ([01867b3](https://github.com/sabertazimi/blog/commit/01867b301d51d5805d3427177eca271b6fbaf36d))
* **TypingTitle:** setup mock for typed.js module ([754029c](https://github.com/sabertazimi/blog/commit/754029c9a49840d49a2a23105f248367ba25d0a0))
* **useVisibility:** add functional testing ([8d41f61](https://github.com/sabertazimi/blog/commit/8d41f6176d2ab9c273b8af7c05452fe4b92bc1b8))
* **useVisibility:** imporve code coverage ([a073c6f](https://github.com/sabertazimi/blog/commit/a073c6f098ec27d7fb1642ed260e1e6c7c000faa))

### [2.4.2](https://github.com/sabertazimi/blog/compare/v2.4.1...v2.4.2) (2021-08-06)


### Testing

* **snapshot:** add snapshot testing for all components ([e0e3cda](https://github.com/sabertazimi/blog/commit/e0e3cdaa464484ef8872d63564bb94cc17854244))

### [2.4.1](https://github.com/sabertazimi/blog/compare/v2.4.0...v2.4.1) (2021-08-06)


### Bug Fixes

* **ArticleHeader:** add date type guard ([3c9415b](https://github.com/sabertazimi/blog/commit/3c9415b86b65ea64781a993e7fe7625b04b53995))
* **ArticleToc:** add a11y navigation role ([b9b1b61](https://github.com/sabertazimi/blog/commit/b9b1b61a1c1be8ccecab4a877fb17c0fd153ef8b))
* **PostsGrid:** add date type guard ([42747cf](https://github.com/sabertazimi/blog/commit/42747cfc0da4abf646cc14179f9c7ef315ca7bec))
* **PostsSearchBar:** add post title type guard ([8df70f3](https://github.com/sabertazimi/blog/commit/8df70f3c6a678c04a35bfe4b2f53ebed9b096fac))


### Building Work

* **test:** only-changed for dev and all for CI ([460377a](https://github.com/sabertazimi/blog/commit/460377aefb7ce31f881f1f1461867d03031fbeca))


### Testing

* **__mocks__:** add ReactDOM.createPortal mock function ([312061e](https://github.com/sabertazimi/blog/commit/312061eacbc30a49a66f3f15c8a34e9b1e3f1c44))
* **Article:** add Article snapshot testing ([c3bab18](https://github.com/sabertazimi/blog/commit/c3bab1899b46fc438aef21cba4fbee93fb735592))
* **Article:** add partial Article snapshot testing ([e3eb45b](https://github.com/sabertazimi/blog/commit/e3eb45b8ae8f51a1078b69271c1ee4e0b0be6a76))
* **Article:** remove toc test from Article.test.tsx ([3c419ec](https://github.com/sabertazimi/blog/commit/3c419ecf312f2e2e09b4a0b82a23359acffb6203))
* **ArticleToc:** addd snapshot testing ([e0e7ab9](https://github.com/sabertazimi/blog/commit/e0e7ab9933be08403033d7ba520bf65e1bdc6b09))
* **Header:** add snapshot testing ([68f8fd7](https://github.com/sabertazimi/blog/commit/68f8fd7586d066f14409e63035579d391c29b92d))
* **mocks:** add animation frame function mocks ([93b4b48](https://github.com/sabertazimi/blog/commit/93b4b488a4c43acb262fa2216c2ec5ca52b748a4))
* **PostsSearchBar:** add searching testing ([ceb7a62](https://github.com/sabertazimi/blog/commit/ceb7a62ab9573a953f921e4f5d0748c359c13eea))

## [2.4.0](https://github.com/sabertazimi/blog/compare/v2.3.1...v2.4.0) (2021-08-05)


### Features

* **containers:** add Footer container ([e2d54e7](https://github.com/sabertazimi/blog/commit/e2d54e7c563248c2418d394a2f52e126521617bd))
* **containers:** add Header container ([1c4b317](https://github.com/sabertazimi/blog/commit/1c4b3176c30306b49fc5825bfd366b7add0fb1ae))


### Bug Fixes

* **Article:** add a11y navigation role to Nav ([7102a69](https://github.com/sabertazimi/blog/commit/7102a69b8d2d654881d913c5749d1dc8ddae9ae0))
* **layouts:** ship to Header and Footer containers ([3f02387](https://github.com/sabertazimi/blog/commit/3f023875a845814df6380bb28fffc9e474ffce89))


### Building Work

* **jest-badge:** generate jest coverage badge ([05f4664](https://github.com/sabertazimi/blog/commit/05f4664d92509c32f9a3faff6ebcc4dbc572856a))
* **jest-badge:** generate jest coverage badge to build directory ([b0d7ab5](https://github.com/sabertazimi/blog/commit/b0d7ab5c3f5a14935e3be8de1030fa2a86fe21b7))
* **jest:** add `json-summary` coverage reporter ([6174ebc](https://github.com/sabertazimi/blog/commit/6174ebc0c8100fbc84a73c43a727fdaaa1d1f22a))
* **jest:** polish jest setup files ([de682fe](https://github.com/sabertazimi/blog/commit/de682fe7c36c454a9087b1d5bc9a260cf16eaf3d))
* **paths:** add [@containers](https://github.com/containers) paths resolution ([9233457](https://github.com/sabertazimi/blog/commit/923345788421c2e6bc6acf8eec72f48e6c59d0b2))
* **webpack:** add bundle analyzer support ([78d8be6](https://github.com/sabertazimi/blog/commit/78d8be615ead07adfc4e0483ae640135be155f36))


### Testing

* **Container:** add snapshot testing ([b9da6dc](https://github.com/sabertazimi/blog/commit/b9da6dcac725435e2d3b73e84ae8b764981bd12a))
* **FlexContainer:** add snapshot testing ([7d03d9f](https://github.com/sabertazimi/blog/commit/7d03d9ff419485a5d9d542fb4e3e96225a559961))
* **GithubCard:** add more testing ([27347b1](https://github.com/sabertazimi/blog/commit/27347b1497d48ad6d9e3d7a3405e7e66de105897))
* **GithubCard:** add snapshot testing ([061c6e1](https://github.com/sabertazimi/blog/commit/061c6e1fc97f414f7e926b03466ab06af4bbf972))
* **Icons:** add Icons snapshot testing ([e500903](https://github.com/sabertazimi/blog/commit/e500903029e22fe2cd2fdcba98688b03ddbf2899))
* **mocks:** mock window.matchMedia function ([96066d3](https://github.com/sabertazimi/blog/commit/96066d30486bd3eb2ef299b68d804619012abbde))

### [2.3.1](https://github.com/sabertazimi/blog/compare/v2.3.0...v2.3.1) (2021-08-04)


### Bug Fixes

* **colors:** remove useless default parameters ([f78284e](https://github.com/sabertazimi/blog/commit/f78284e2801574b436162ce1ae5cfd9b9d6b6e49))
* **LandingNav:** add a11y role ([5f9f24b](https://github.com/sabertazimi/blog/commit/5f9f24b3f97b5a84725769890e5f5300c769629e))
* **LandingNav:** add routes props ([1cb18ba](https://github.com/sabertazimi/blog/commit/1cb18ba57160eea47070b232e99b6841447a93de))
* **LandingNavLink:** remove useless default props ([6dd5833](https://github.com/sabertazimi/blog/commit/6dd5833a5cd65522bf5e83adb84182426637588e))


### Building Work

* **CI:** separate lint/testing/building work ([b8e15b5](https://github.com/sabertazimi/blog/commit/b8e15b5cf9d9b43c227717d6cae73f76d74e9696))
* **scripts:** concurrent watching gatsby and jest ([6648118](https://github.com/sabertazimi/blog/commit/66481188cf21bbdc71a39b4b8cd981c65fac80c8))
* **test:** add jest ignore patterns ([675a218](https://github.com/sabertazimi/blog/commit/675a218828bb2490739436201739a718bb078871))


### Testing

* **colors:** complete `colors.getColorByName` testing ([0567e79](https://github.com/sabertazimi/blog/commit/0567e798c3691099faa05943a1b8f57bea0d33f2))
* **colors:** export ColorPalette for testing ([9cd7d49](https://github.com/sabertazimi/blog/commit/9cd7d49e8ca6cbf9703aa69879d67e653c17e23e))
* **LandingNav:** complete LandingNav testing ([40f41db](https://github.com/sabertazimi/blog/commit/40f41db00f94b4241bee7670ed7596befb6a841e))
* **SocialButton:** complete all social buttons testing ([479900b](https://github.com/sabertazimi/blog/commit/479900b1ab28a1e5f8b49a1ff9f3cc426f55550d)), closes [#64](https://github.com/sabertazimi/blog/issues/64)
* **SocialButton:** cover colorful button testing ([812f5e6](https://github.com/sabertazimi/blog/commit/812f5e6e13408bf17cdb2a9ee5432d052b4c2cd1))
* **SocialButton:** format code ([62ee4fb](https://github.com/sabertazimi/blog/commit/62ee4fb67d9c209464ff8c794d030094f4717ddb))
* **SocialButton:** format code ([ab9c2ab](https://github.com/sabertazimi/blog/commit/ab9c2ab15d21396da5badea11e39caae2e7bb1c6))
* **SocialButton:** pretty testing ouput ([9ee87b1](https://github.com/sabertazimi/blog/commit/9ee87b12b0a7830ed35354d5a565fd9591a3167b))

## [2.3.0](https://github.com/sabertazimi/blog/compare/v2.2.0...v2.3.0) (2021-08-04)


### Features

* **jest-TypeScript:** add ts-jest support ([80a287f](https://github.com/sabertazimi/blog/commit/80a287f0d24e24d8c00629ebbd818962f4bb942e)), closes [#64](https://github.com/sabertazimi/blog/issues/64)
* **jest:** add jest support ([e667b7d](https://github.com/sabertazimi/blog/commit/e667b7d513de7c8c0d2c40636491ac9c79bd475d)), closes [#64](https://github.com/sabertazimi/blog/issues/64)
* **test-React:** add React Testing Library support ([a8b087a](https://github.com/sabertazimi/blog/commit/a8b087a0b96c98c78c2a97827feedd67f61860a4)), closes [#64](https://github.com/sabertazimi/blog/issues/64)


### Bug Fixes

* **jest:** add jsdom environment support ([e4553e5](https://github.com/sabertazimi/blog/commit/e4553e57b8e4d33f623d3d820b69ace68a7a588f)), closes [#64](https://github.com/sabertazimi/blog/issues/64)
* **SocialButton:** add a11y `role=link` ([8294c96](https://github.com/sabertazimi/blog/commit/8294c96f33527696785eb9ab561abaa0d9d3b2ff)), closes [#64](https://github.com/sabertazimi/blog/issues/64)
* **SocialButton:** color prop type guard ([cf1f3b4](https://github.com/sabertazimi/blog/commit/cf1f3b4a2cbeb09750ba2a2ca2a99bcf783898d2)), closes [#64](https://github.com/sabertazimi/blog/issues/64)


### Building Work

* **scripts:** polish test script up ([37a58ac](https://github.com/sabertazimi/blog/commit/37a58ac26ac0c8f714710cc5027bbc3044ad8aad)), closes [#64](https://github.com/sabertazimi/blog/issues/64)


### Testing

* **__mocks__:** format code ([c0af081](https://github.com/sabertazimi/blog/commit/c0af08157a0bb5ab49fddba6ad262df92cd3b738)), closes [#64](https://github.com/sabertazimi/blog/issues/64)
* **jest-config:** polish up ([df1f21d](https://github.com/sabertazimi/blog/commit/df1f21d46eabde705a3f21d1b9def64e6d55d5cb)), closes [#64](https://github.com/sabertazimi/blog/issues/64)
* **mocks:** add gatsby mocks support ([25d92aa](https://github.com/sabertazimi/blog/commit/25d92aa639c583ceaffe7a71eb4cd2b270feb1eb)), closes [#64](https://github.com/sabertazimi/blog/issues/64)
* **paths:** add paths alias ([636e659](https://github.com/sabertazimi/blog/commit/636e65991f889cfe09f54b21635150d30ee439ce)), closes [#64](https://github.com/sabertazimi/blog/issues/64)
* **snapshot:** setup jest snapshot testing ([a3e7066](https://github.com/sabertazimi/blog/commit/a3e7066618db852c5f46070cb195674179f81e97)), closes [#64](https://github.com/sabertazimi/blog/issues/64)
* **SocialButton:** add Github button snapshot ([bd7d843](https://github.com/sabertazimi/blog/commit/bd7d843823572a8fefcf0240c89f9343527df1f3)), closes [#64](https://github.com/sabertazimi/blog/issues/64)
* **SocialButton:** complete GitHub icon testing ([0acf22d](https://github.com/sabertazimi/blog/commit/0acf22d16dffd958fd9c236e26c41d5d5a7d0a7a)), closes [#64](https://github.com/sabertazimi/blog/issues/64)

## [2.2.0](https://github.com/sabertazimi/blog/compare/v2.1.1...v2.2.0) (2021-08-04)


### Features

* **lint:** enable TypeScript type checking ([fba899b](https://github.com/sabertazimi/blog/commit/fba899b3f1942e71f89aca79d8dfc3f480701af2)), closes [#82](https://github.com/sabertazimi/blog/issues/82)


### Bug Fixes

* **Article:** add missing types ([593d38c](https://github.com/sabertazimi/blog/commit/593d38c8906bc16915a7ce6a9a666e04800564e6)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **ArticleFooter:** production environment Ads free ([895a7ab](https://github.com/sabertazimi/blog/commit/895a7abd2f57f6a40189f90625607a961dc6a551)), closes [#108](https://github.com/sabertazimi/blog/issues/108)
* **BooksGrid:** add missing types ([fda78a6](https://github.com/sabertazimi/blog/commit/fda78a61e4ec90ee5b074ce83fbb2cfd0f8e5c49)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **css:** declare `*.css` for TSX import ([3d4541d](https://github.com/sabertazimi/blog/commit/3d4541dc1d4f1a02d650d6d21628d9b26562deb8)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **DesktopNav:** rectify types error ([686177c](https://github.com/sabertazimi/blog/commit/686177cb33bde6d06f2fd7b6063ec7b780e32695)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **DesktopPostsGrid:** add missing types ([b44f900](https://github.com/sabertazimi/blog/commit/b44f900c3037465155689032ab1f7c4d702984f1)), closes [#124](https://github.com/sabertazimi/blog/issues/124) [#82](https://github.com/sabertazimi/blog/issues/82)
* **GithubCard:** add missing types ([9f78fdf](https://github.com/sabertazimi/blog/commit/9f78fdfb130acf5b4723513944f024b0eab44446)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **Header:** rectify ref types ([637508e](https://github.com/sabertazimi/blog/commit/637508ee0851beb944a3fca856073f9247533b76)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **LandingLayout:** declare `*.png` in `index.d.ts` ([d67c3a4](https://github.com/sabertazimi/blog/commit/d67c3a41f164e6308306bc113d86633b737b8348)), closes [#112](https://github.com/sabertazimi/blog/issues/112) [#82](https://github.com/sabertazimi/blog/issues/82)
* **LandingNav:** rectify types error ([512fef2](https://github.com/sabertazimi/blog/commit/512fef2eddb34023e3f06ebfd13c4d4001f341e2)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **MobileNav:** rectify types error ([61a2102](https://github.com/sabertazimi/blog/commit/61a21024484b7cb1e33660bb13b2a0416d311306)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **PostsGrid:** add missing types ([ff1724e](https://github.com/sabertazimi/blog/commit/ff1724e4e184ed1a71c26b94943674bfc48ccf0c)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **PostsList:** add missing types ([cdbf056](https://github.com/sabertazimi/blog/commit/cdbf05613e6b58fde1bf47a745ee38d07c4a9fe5)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **PostsSearchBar:** add missing types ([55ac9b5](https://github.com/sabertazimi/blog/commit/55ac9b59df3e093edebd8645f2a20bf30dd1eafb)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **Tag:** change TagsType to Record ([8ff87a2](https://github.com/sabertazimi/blog/commit/8ff87a294519ce32e6480fba5fe46b2aeaaf873b)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **types:** export Profile and Repo type ([6576e8b](https://github.com/sabertazimi/blog/commit/6576e8b72214238c3da4144dac4bebd86ae58601)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **types:** rectify `timeToRead` to number type ([80442cf](https://github.com/sabertazimi/blog/commit/80442cf0965fb831272189f9ee28eec46ae74588)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **types:** rectify prev/nextPost types ([667ae46](https://github.com/sabertazimi/blog/commit/667ae46654e226e6cc56af72e7989ae42347982c)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **TypingTitle:** add missing types ([4a7233f](https://github.com/sabertazimi/blog/commit/4a7233f319362406f0ce764d790663cbf62f5048)), closes [#82](https://github.com/sabertazimi/blog/issues/82)


### Building Work

* **CI:** add FIXME for todo-bot trigger ([6085fa4](https://github.com/sabertazimi/blog/commit/6085fa4e8821152b2a476e20feb59518278058ad))
* **CI:** remove artifacts transfer ([5c6f78b](https://github.com/sabertazimi/blog/commit/5c6f78be1aa137faae03af6709b598f503f56dd9))
* **deps-dev:** bump @octokit/types from 6.21.1 to 6.22.0 ([b9520bf](https://github.com/sabertazimi/blog/commit/b9520bfdce14af0ea3440175cbfd32dc99f89c65))
* **deps-dev:** bump @octokit/types from 6.22.0 to 6.23.0 ([0913aea](https://github.com/sabertazimi/blog/commit/0913aeaac4b470fdc8ec12b336c87c8ffde3f3a4))
* **deps-dev:** bump @types/node from 16.4.3 to 16.4.10 ([3c125b6](https://github.com/sabertazimi/blog/commit/3c125b64013be5ed7b0601f9094d7f9eae1df5b8))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([7d32f52](https://github.com/sabertazimi/blog/commit/7d32f524654c6b51468649e3c7a1c13b20ef70fc))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([51e7c1f](https://github.com/sabertazimi/blog/commit/51e7c1fa8ec65caa64e130ddd4a7f03aad570c9c))
* **deps-dev:** bump @typescript-eslint/parser from 4.28.4 to 4.28.5 ([e365850](https://github.com/sabertazimi/blog/commit/e3658509a65efc9a603247cf39e153c90e1dc363))
* **deps-dev:** bump @typescript-eslint/parser from 4.28.5 to 4.29.0 ([fc66517](https://github.com/sabertazimi/blog/commit/fc66517ff8e888f231d28c65898640e90054876e))
* **deps-dev:** bump eslint from 7.31.0 to 7.32.0 ([0fcb3da](https://github.com/sabertazimi/blog/commit/0fcb3da163f1696900f821aa7ddfc79ce0676f2c))
* **deps:** bump @octokit/rest from 18.7.1 to 18.7.2 ([fa1d9e4](https://github.com/sabertazimi/blog/commit/fa1d9e4f095d8012424eff50c6863e7211ac9c68))
* **deps:** bump @octokit/rest from 18.7.2 to 18.8.0 ([d5f9a74](https://github.com/sabertazimi/blog/commit/d5f9a74cb813621ff6da4d5b462fd95d0c0fb68c))
* **deps:** bump antd from 4.16.8 to 4.16.10 ([735deae](https://github.com/sabertazimi/blog/commit/735deae95499ff3ca36288f3c5827f90b190dd95))
* **eslint:** add exclude directories ([e862066](https://github.com/sabertazimi/blog/commit/e8620663c4b4bf9d3cb107b6735b17f5470c37b1))

### [2.1.1](https://github.com/sabertazimi/blog/compare/v2.1.0...v2.1.1) (2021-08-02)


### Bug Fixes

* **hooks:** add missing hooks types ([3bdabc5](https://github.com/sabertazimi/blog/commit/3bdabc55b314f55e0369827ef7c33e6fe0e99a9f)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **images:** rectify images resolution ([611261b](https://github.com/sabertazimi/blog/commit/611261b55a5a5ea98288d7c9771a948b3feb45d2)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **layouts:** add missing types ([7388b82](https://github.com/sabertazimi/blog/commit/7388b820d10fec92c78ae7da56f14007d3c168a7)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **TagsClound:** add missing types ([2e0c2a9](https://github.com/sabertazimi/blog/commit/2e0c2a9e2bce955ebe9ea76503611d5872df7657)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **TagType:** narrowing string to TagType ([f3be81d](https://github.com/sabertazimi/blog/commit/f3be81d4b19919fbc3c99692f413e03069fd4285)), closes [#82](https://github.com/sabertazimi/blog/issues/82)


### Building Work

* **tsconfig:** ship lib to ESNext (ES2021) ([59c44a2](https://github.com/sabertazimi/blog/commit/59c44a2220d68b3c6dad54eb202a28d38dc9fa4e))

## [2.1.0](https://github.com/sabertazimi/blog/compare/v2.0.3...v2.1.0) (2021-08-02)


### Features

* **Icons:** create IconFactory HOC util component ([bfadb4f](https://github.com/sabertazimi/blog/commit/bfadb4f7fd65163f9e5be95cf321283bf09a152c)), closes [#82](https://github.com/sabertazimi/blog/issues/82)


### Bug Fixes

* **config:** rewrite config types ([3dc1de1](https://github.com/sabertazimi/blog/commit/3dc1de1aaefffcf38a72fe5d2bcf30ee6792d4cc))
* **Container:** use HTMLProps instead of HTMLAttributes ([922cefb](https://github.com/sabertazimi/blog/commit/922cefba7348c67339ca023452404077d48e0f56)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **Social:** rectify social-related components type error ([e5ffdea](https://github.com/sabertazimi/blog/commit/e5ffdea5d5bd8cfad0bb354116a37d37b6df05ae)), closes [#82](https://github.com/sabertazimi/blog/issues/82)

### [2.0.3](https://github.com/sabertazimi/blog/compare/v2.0.2...v2.0.3) (2021-08-02)


### Bug Fixes

* **release:** tag with signature ([44dd42e](https://github.com/sabertazimi/blog/commit/44dd42ef19b1594bf2d681e6483791102a1a72e3))

### [2.0.2](https://github.com/sabertazimi/blog/compare/v2.0.1...v2.0.2) (2021-08-02)


### Bug Fixes

* **Container:** ship to TSX ([0e91109](https://github.com/sabertazimi/blog/commit/0e91109ab70dae20e981e039fa3543fe358174e5)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **tsconfig:** rectify path resolution in vscode ([2f935c6](https://github.com/sabertazimi/blog/commit/2f935c6acfa29816b5f521908575a0945fcff220))


### Building Work

* **jsconfig:** keep consistence with tsconfig ([e788180](https://github.com/sabertazimi/blog/commit/e788180af4f382d33563c7ecb316a19cf052164b))

### [2.0.1](https://github.com/sabertazimi/blog/compare/v2.0.0...v2.0.1) (2021-08-02)


### Bug Fixes

* **README:** remove empty lines ([6ed9757](https://github.com/sabertazimi/blog/commit/6ed975759d1466dae6e6a0dc09f575492596ba17))


### Building Work

* **CHANGELOG:** add more fields to CHANGELOG ([fbb2e41](https://github.com/sabertazimi/blog/commit/fbb2e41d159d61edc6191184d5cb98ac225362b7))
* **scripts:** add dry-run release support ([0da2c2d](https://github.com/sabertazimi/blog/commit/0da2c2d71e26c1a3b7c984a132dc63eb10899690))

## 2.0.0 (2021-08-01)


### ⚠ BREAKING CHANGES

* **release:** refactor all pages with React TypeScript

### Features

* **Archives Page:** put archives page into tags page ([0c7d118](https://github.com/sabertazimi/blog/commit/0c7d118ceaaefa109563695a1c654998f767595e)), closes [#55](https://github.com/sabertazimi/blog/issues/55)
* **Article-headings:** headings anchor jump ([5e88f5d](https://github.com/sabertazimi/blog/commit/5e88f5debc5fd3b5b4d4719a3215d8e196a0d501)), closes [#66](https://github.com/sabertazimi/blog/issues/66)
* **ArticleNavigation:** add navigation floating button ([991fbde](https://github.com/sabertazimi/blog/commit/991fbdeb64be6eecd72bcacc3ebee38ede02730a)), closes [#66](https://github.com/sabertazimi/blog/issues/66)
* **Header-collapse:** collasped Header toggle button ([3613051](https://github.com/sabertazimi/blog/commit/3613051c4305425555181e7c0678716c7d47c16d)), closes [#57](https://github.com/sabertazimi/blog/issues/57)
* **Landing Page:** redesign menu of landing page ([aca50af](https://github.com/sabertazimi/blog/commit/aca50afe5d83bd51b7d2c675cfc0f9b8d437c5e1))
* **markdown-code:** add MacOS bar to `<code>` section ([a4dcce2](https://github.com/sabertazimi/blog/commit/a4dcce2801bdfb12341a627ed6ddf478a931e0e6))
* **PostsSearchBar:** impl SearchBar with antd ([713fe1e](https://github.com/sabertazimi/blog/commit/713fe1e62fcfc7f4d2d70dc96b07f25fb8ff0b1a)), closes [#65](https://github.com/sabertazimi/blog/issues/65)
* **Search:** complete basic UI for search ([7fcd3bc](https://github.com/sabertazimi/blog/commit/7fcd3bcb926fe2acb9cfcf8f4914704554f99c13)), closes [#55](https://github.com/sabertazimi/blog/issues/55)
* **release:** add standard-version support ([8261270](https://github.com/sabertazimi/blog/commit/82612704fe139304bd2c05f3f17f2d90b6437f59))


### Bug Fixes

* **Button:** dealing with Button as a NavLink ([8768b09](https://github.com/sabertazimi/blog/commit/8768b094af2160448880d2c1f6e9c71ca064f360)), closes [#30](https://github.com/sabertazimi/blog/issues/30)
* **ci:** rectify build procedure ([23fb890](https://github.com/sabertazimi/blog/commit/23fb89027612477381f24b4d906b0ab637263afe))
* **code style:** remove useless component ([9fc46ac](https://github.com/sabertazimi/blog/commit/9fc46ace3e579fc8b79829b7440bcc68528adcd0))
* **Container:** remove useless `text` attribute ([0ec798d](https://github.com/sabertazimi/blog/commit/0ec798da42493c8695adde8248a7790b2820a7e5))
* **CVE:** update dependencies ([53b6ea4](https://github.com/sabertazimi/blog/commit/53b6ea40afdc80bbb75fdfee1e451c159b5a6ea3))
* **depends:** rectify vulnerable packages ([ba6b811](https://github.com/sabertazimi/blog/commit/ba6b811014e746d7ab7593d2a7d58e996092d662)), closes [sabertazimi/awesome-notes#105](https://github.com/sabertazimi/awesome-notes/issues/105)
* **depends:** rectify vulnerable packages ([9ceb88b](https://github.com/sabertazimi/blog/commit/9ceb88b5fbfe5eadb48776e2ec02235ed889d0ea)), closes [sabertazimi/awesome-notes#105](https://github.com/sabertazimi/awesome-notes/issues/105)
* **gatsby-deployment:** change all href to Link ([9361ecb](https://github.com/sabertazimi/blog/commit/9361ecbf214c2b6bf9899c1aaa9e6814476e33c2)), closes [#51](https://github.com/sabertazimi/blog/issues/51)
* **gatsby:** remove window reference ([dc7bcfa](https://github.com/sabertazimi/blog/commit/dc7bcfa6b3a44ab85e69be45132e2962d694d56e))
* **Home-Helmet:** catch Helmet stackoverflow error with ErrorBoundary ([4a87d64](https://github.com/sabertazimi/blog/commit/4a87d64740bde33617e8966a9a7f7eb51cc400f0))
* **horizonal overflow:** remove horizonal overflow of Header ([ac73299](https://github.com/sabertazimi/blog/commit/ac732993716eab0eb0c9322a26a7afa55e1d544f)), closes [#58](https://github.com/sabertazimi/blog/issues/58)
* **json service:** rectify defaultComparator sorting error ([aa69f45](https://github.com/sabertazimi/blog/commit/aa69f45b4c682fc669e6157ffb61edfcc3d6b8a5)), closes [#29](https://github.com/sabertazimi/blog/issues/29)
* **LandingNav:** rectify jsx-a11y error ([2623222](https://github.com/sabertazimi/blog/commit/2623222c41b0e8af734f85cae1600d9c45ad37a2)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **lint:** rectify eslint+tsc error ([5e81fda](https://github.com/sabertazimi/blog/commit/5e81fda7f55a73fcf86dc6aa673d378fa6858467)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **List:** add key to list component rendering ([211ccd9](https://github.com/sabertazimi/blog/commit/211ccd99f4a9358b9198e6c5cf3f10f2e2d0af0e))
* **npm-deps:** update dpes version for security ([d468076](https://github.com/sabertazimi/blog/commit/d468076e2a31deebee89052518e04fc49e867672))
* **peerDeps:** rectify peerDeps error ([2adcd80](https://github.com/sabertazimi/blog/commit/2adcd80b0aac4e09ba0d42c3dd16994713d7cf12)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **PostPreview:** rectify width of PostPreview ([cfa904c](https://github.com/sabertazimi/blog/commit/cfa904cc3cbea256b2f2afd6e730278e8ac12b90))
* **responsive:** stay consistent to HeaderNav responsive ([954c0a3](https://github.com/sabertazimi/blog/commit/954c0a3b9b523c9237160eb636b840187c2283d4)), closes [#77](https://github.com/sabertazimi/blog/issues/77)
* **segment:** remove vertical attribute ([ec6f16c](https://github.com/sabertazimi/blog/commit/ec6f16c511157930020c0890d8eb5e8ec87e30a9))
* **server:** rectify github API fetch failure ([de1fd75](https://github.com/sabertazimi/blog/commit/de1fd75d89e87bd3f42d9bfb19d9f8f1069b1418))
* **SiteMetadata:** rectify `tags` field type ([a43d8d7](https://github.com/sabertazimi/blog/commit/a43d8d75daab1269b48ae0862a462d6d888add6b)), closes [#82](https://github.com/sabertazimi/blog/issues/82)
* **testing:** rectify testing ([aa7c5e9](https://github.com/sabertazimi/blog/commit/aa7c5e9b03e85a6e4ec7c1161b7cf9e02e211b11))
* **TypingTitle:** add delay to effect hook deps ([8e71319](https://github.com/sabertazimi/blog/commit/8e713195e1c3a630e58c9f0b972251d45525036c))
* **vulnerability:** bump deps version ([a0cee6a](https://github.com/sabertazimi/blog/commit/a0cee6a5fa21bd02bc02f1f9f6b219deae778ebb))
