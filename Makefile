#                                 __                 __
#    __  ______  ____ ___  ____ _/ /____  ____  ____/ /
#   / / / / __ \/ __ `__ \/ __ `/ __/ _ \/ __ \/ __  /
#  / /_/ / /_/ / / / / / / /_/ / /_/  __/ /_/ / /_/ /
#  \__, /\____/_/ /_/ /_/\__,_/\__/\___/\____/\__,_/
# /____                     matthewdavis.io, holla!
#
include .make/Makefile.inc

NS		?= default
VERSION ?= $(shell git rev-parse HEAD)
APP     ?= streamnvr-api-rbac
IMAGE	?= gcr.io/streaming-platform-production/streamnvr-apis/$(APP):$(VERSION)
PORT    ?= 80

.PHONY: build

all:    kubeme build push
deploy:	kubeme build push install

kubeme:

	kubectl config use-context gke_streamnvr_us-east1-c_cluster-3

build: 		; docker build -t $(IMAGE) .
run: 		; docker run -p 81:80 $(IMAGE)
push:		; docker push $(IMAGE)
