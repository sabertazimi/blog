# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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


* **release:** add standard-version support ([8261270](https://github.com/sabertazimi/blog/commit/82612704fe139304bd2c05f3f17f2d90b6437f59))
