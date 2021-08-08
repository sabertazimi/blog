# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
