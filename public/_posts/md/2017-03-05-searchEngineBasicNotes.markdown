---
layout:     post
title:      "Search Engine Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Search Engine
---

# Search Engine Basic Notes

## Programming Tips

### 缓存删除项

同时维护索引列表与删除列表, 将索引列表搜索结果利用删除列表进行过滤(剔除已删除项)得到最终搜索结果. 当删除列表达到一定规模后, 才重新建立索引列表与删除列表.
