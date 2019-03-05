import React, { Component } from "react"

import { GridPostPreviews } from "../components"
import { LandingLayout } from "../layouts"

class Home extends Component {
  state = {
    data: [
      {
        layout: "post",
        title: "Deploy app with kubernetes",
        subtitle: "Cloud Computing Lab",
        date: "2017-04-26T00:00:00.000Z",
        author: "sabertazimi",
        "header-img": "img/home-bg.jpg",
        tags: [
          "Computer Science",
          "Cloud Computing",
          "Virtualization",
          "Kubernetes",
          "Golang",
        ],
        __content:
          '\n\n# Kubernetes Lab Script\n\n\n```sh\n#!/bin/bash\n\n# install \nsudo apt install virtualbox\n\n# install docker\nsudo apt-get install apt-transport-https ca-certificates curl software-properties-common\ncurl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -\nsudo apt-key fingerprint 0EBFCD88\nsudo add-apt-repository "deb [arch=amd64] https://downlo',
        id: "2017-04-26-kubernetes.markdown",
        fileName: "2017-04-26-kubernetes.markdown",
        prevPost: "2017-03-06-htmlBasicNotes.markdown",
        nextPost: null,
        pageId: 1,
      },
      {
        layout: "post",
        title: "HTML Basic Notes",
        subtitle: "Be a stupid learner",
        date: "2017-03-06T00:00:00.000Z",
        author: "sabertazimi",
        "header-img": "img/home-bg.jpg",
        tags: ["Web", "Front End", "HTML"],
        __content:
          "\n\n* [HTML5 Basic Notes](#html5-basic-notes)\n\t* [Emmet](#emmet)\n\t\t* [嵌套操作](#嵌套操作)\n\t\t* [属性操作](#属性操作)\n\t\t* [字符操作](#字符操作)\n\t\t* [缺省元素](#缺省元素)\n\t* [Structure](#structure)\n\t\t* [section](#section)\n\t\t* [header](#header)\n\t\t* [hgroup](#hgroup)\n\t\t* [nav](#nav)\n\t\t* [main](#main)\n\t\t* [address](#address)\n\t\t* [aside](#aside)\n\t\t* [footer](#footer)\n\t\t* [blockquote](#blockquote)\n",
        id: "2017-03-06-htmlBasicNotes.markdown",
        fileName: "2017-03-06-htmlBasicNotes.markdown",
        prevPost: "2017-03-05-webpackBasicNotes.markdown",
        nextPost: "2017-04-26-kubernetes.markdown",
        pageId: 1,
      },
    ],
  }

  render() {
    return (
      <LandingLayout>
        <GridPostPreviews data={this.state.data} />
      </LandingLayout>
    )
  }
}

export default Home
