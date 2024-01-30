#!/bin/bash

helm repo add moinologics https://moinologics.github.io/helm-charts

helm upgrade --install jumbo-api moinologics/app \
  -f ./helm/values-production.yaml \
  -f ./helm/values-common.yaml