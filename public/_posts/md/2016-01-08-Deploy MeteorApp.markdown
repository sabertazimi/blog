---
layout:     post
title:      "利用Meteor Up部署MeteorApp"
subtitle:   "在远程主机上快速部署MeteorApp"
date:       2016-01-08
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Web
    - Meteor
    - Web App

---

## 配置openssh和root的登录


```shell
meteor@ubuntu:~$ sudo apt-get install openssh-client openssh-server git -y
meteor@ubuntu:~$ ssh-keygen -t rsa
meteor@ubuntu:~$ su
root@ubuntu:/home/meteor# cd
root@ubuntu:~# mkdir .ssh
root@ubuntu:~# cp /home/meteor/.ssh/id_rsa.pub /root/.ssh/authorized_keys 
```

安装openssh并生成sshkey，  
然后再进入root用户的home，创建/root/.ssh/  
最后将客户端的`id_rsa.pub`内容复制到`/root/.ssh/authorized_keys`内，以达到权限认证目的

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/ssh.png)


然后再退出root用户，在重启ssh服务，最后使用root用户连接到本地的ssh里面

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/ssh-login.png)

## 安装phantomjs

切换目录，执行如下脚本

```shell
meteor@ubuntu:~/setup-meteor-machine/scripts$ cd ~/setup-meteor-machine/scripts
meteor@ubuntu:~/setup-meteor-machine/scripts$ ./install-phantomjs.sh
```

执行完毕成功了会显示版本号1.9.8

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/install-phantomjs.png)

## 安装nodejs


执行如下脚本

```shell
meteor@ubuntu:~/setup-meteor-machine/scripts$ ./install-node.sh 
```


执行完毕成功了会nodejs和npm的版本号

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/install-nodejs.png)

## 安装mongodb v3


确保网络畅通，执行如下脚本 

```shell
meteor@ubuntu:~/setup-meteor-machine/scripts$ ./install-mongodb.sh
```

这一步需要从网上下载文件，需要等一段时间，安装完毕以后输入如下指令验证，一切正常的话会进入mongodb的shell

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/install-mongodb.png)

## 安装meteor


切换回home路径，执行如下指令安装meteor并新建项目运行

```shell
meteor@ubuntu:~$ curl https://install.meteor.com/ | sh
```

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/install-meteor.png)

```shell
meteor@ubuntu:~$ meteor create hello
meteor@ubuntu:~$ cd hello
meteor@ubuntu:~$ meteor 
```

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/hello-meteor.png)

用浏览器进入http://localhost:3000/ 验证项目正常运行

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/launching-meteor.png)


## 安装mup

Ctrl-C退出服务器运行

```shell
meteor@ubuntu:~/hello$ sudo npm install -g mup
```

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/install-mup.png)

## mup init

执行mup init生成配置文件

```shell
meteor@ubuntu:~/hello$ mup init
```

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/mup-init.png)

然后编辑mup.json如下

```javascript
{
    :call <SNR>104_SparkupNext()
          // Server authentication info
        "servers": [
        {
      "host": "localhost",
      "username": "root",
      "pem": "~/.ssh/id_rsa"
    
        }
  
        ],

  // Install MongoDB in the server, does not destroy local MongoDB on future setup
  "setupMongo": false,

  // WARNING: Node.js is required! Only skip if you already have Node.js installed on server.
  "setupNode": false,

  // WARNING: If nodeVersion omitted will setup 0.10.36 by default. Do not use v, only version number.
  "nodeVersion": "0.10.36",

  // Install PhantomJS in the server
  "setupPhantom": false,

  // Application name (No spaces)
  "appName": "hello",

  // Location of app (local directory)
  "app": ".",

  // Configure environment
  "env": {
      :call <SNR>104_SparkupNext()
              "ROOT_URL": "http://localhost"
  
  },

  // Meteor Up checks if the app comes online just after the deployment
  // before mup checks that, it will wait for no. of seconds configured below
  "deployCheckWaitTime": 15

}

```

## mup setup安装环境

再执行mup setup，这个步骤有点久，需要等一段时间

```shell
meteor@ubuntu:~/hello$ mup setup
```


![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/mup-setup.png)

## mup deploy部署

```shell
meteor@ubuntu:~/hello$ mup deploy
```

![](img/post-deploy-meteormup-deploy.png)

项目是被安装到/opt/hello目录下，可以切换目录进去看看

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/deploy-dir.png)

## 浏览部署结果

最后在浏览器里面打开http://localhost验证是否部署正常

![](https://github.com/sabertazimi/sabertazimi.github.io/raw/master/img/post-deploy-meteor/deploy-hello.png)
