---
layout:     post
title:      "Deploy app with kubernetes"
subtitle:   "Cloud Computing Lab"
date:       2017-04-26
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Cloud Computing
    - Virtualization
    - Kubernetes
    - Golang
---

# Kubernetes Lab Script


```sh
#!/bin/bash

# install 
sudo apt install virtualbox

# install docker
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce
apt-cache madison docker-ce
docker -v

# start docker service
systemctl start docker
systemctl status docker

# install kubectl and minikube
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && chmod +x ./kubectl && sudo mv ./kubectl /usr/local/bin/kubectl
ls -alh /usr/local/bin/kubectl
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin
ls -alh /usr/local/bin

# deploy app
minikube start
minikube ip
kubectl version
kubectl cluster-info
kubectl get nodes
kubectl get nodes --help
kubectl run kubernetes-bootcamp --image=docker.io/jocatalin/kubernetes-bootcamp:v1 --port=8080
kubectl get deployments
kubectl get pods
kubectl describe pods
kubectl get services

# explore app
kubectl proxy
export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
kubectl logs $POD_NAME

# expose app
kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080
kubectl get services
kubectl describe services
kubectl describe services/kubernetes-bootcamp

# visit app
export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')\necho NODE_PORT=$NODE_PORT
kubectl get nodes
minikube ip
curl 192.168.99.100:$NODE_PORT

# scale app
kubectl get deployments
kubectl scale deployments/kubernetes-bootcamp --replicas=4
kubectl get deployments
curl 192.168.99.100:$NODE_PORT

# update app
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
kubectl get deployments
kubectl rollout status deployments/kubernetes-bootcamp
kubectl get deployments
kubectl rollout undo deployments/kubernetes-bootcamp
kubectl get deployments
kubectl describe deployments
kubectl describe pods

# stop app
minikube stop
sudo shutdown -h now
```

