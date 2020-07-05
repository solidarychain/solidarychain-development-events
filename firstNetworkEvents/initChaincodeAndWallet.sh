#!/bin/sh

# script version of nodes

PWD=$(pwd)
CHANNEL="channelall"
CHAINCODE_NAME="sncc"
CHAINCODE_CONVECTOR="ssolidary-chain-chaincode"
CHAINCODE="${CHAINCODE_NAME}@1.0.cds"
VERSION="1.0"
CHAINCODE_DEPLOYMENT_PATH="/src/github.com/hyperledger/fabric/peer"
ABSOLUTE_PATH="/opt/gopath/src/github.com/chaincode/chaincode-solidary-chain-chaincode"
ORDERER_CA="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

# change to project path
cd /home/mario/Development/@SolidaryChain/solidarychain-development-events/firstNetworkEvents
# copy chaincode to cli
docker cp contract/${CHAINCODE} cli:/opt/gopath/${CHAINCODE_DEPLOYMENT_PATH}/${CHAINCODE}
# install to peer0.org1
docker exec -e "CORE_PEER_ADDRESS=peer0.org1.example.com:7051" cli peer chaincode install ${CHAINCODE} -v ${VERSION}
# install to peer1.org1
docker exec -e "CORE_PEER_ADDRESS=peer1.org1.example.com:8051" cli peer chaincode install ${CHAINCODE} -v ${VERSION}
# instantiate chaincode on default peer
docker exec cli peer chaincode instantiate -o orderer.example.com:7050 -l node -C ${CHANNEL} -n ${CHAINCODE_CONVECTOR} ${ABSOLUTE_PATH} -v ${VERSION} -c '{ "Args": [] }' -P 'OR ("Org1MSP.member", "Org2MSP.member")' --tls --cafile ${ORDERER_CA} 
# check instantiated: on default peer peer0.org1
docker exec cli peer chaincode list -C ${CHANNEL} --instantiated | grep ${CHAINCODE_CONVECTOR}
# check instantiated: peer1.org1
docker exec -e "CORE_PEER_ADDRESS=peer1.org1.example.com:8051" cli peer chaincode list -C ${CHANNEL} --instantiated | grep ${CHAINCODE_CONVECTOR}

# create Wallet
cd /home/mario/Development/HyperLedger/fabric-samples/fabcar/javascript
# enroll Admin
rm wallet/admin/*
node enrollAdmin.js
# registerUser user1
rm wallet/user1/*
node registerUser.js

# Start node SDK Script
cd /home/mario/Development/@SolidaryChain/solidarychain-development-events/firstNetworkEvents/application/
# code contractEventsLocal.js
node contractEventsLocal.js

cd ${PWD}