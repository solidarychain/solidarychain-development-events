#!/bin/bash

# script version of nodes: for ripped convector version
# init channel notes from p3

# press any key function
press_any_key() {
  read -n 1 -s -r -p "Press any key to continue";printf "\\n"
  :;
  # SEC=5
  # echo "sleeping for ${SEC}sec..."
  # sleep ${SEC}
}

PWD=$(pwd)
# CHANNEL="channelall"
CHAINCODE_NAME="sncc"
CHAINCODE_CONVECTOR="solidary-network-chaincode"
CHAINCODE="${CHAINCODE_NAME}@1.0.cds"
CHAINCODE_LANG="node"
CHAINCODE_PATH="/home/mario/Development/@Solidary.Network/solidarychain-development-events/firstNetworkEvents/contract/${CHAINCODE}"
VERSION="1.0"
CHAINCODE_DEPLOYMENT_PATH="/src/github.com/hyperledger/fabric/peer"
ABSOLUTE_PATH="/opt/gopath/src/github.com/chaincode/chaincode-solidary-network-chaincode"
# hurley
DOMAIN="hurley.lab"
ORDERER="orderer.${DOMAIN}"
CONTAINER="peer0.org1.${DOMAIN}"
ORDERER_CA="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/${DOMAIN}/orderers/${ORDERER}/msp/tlscacerts/tlsca.${DOMAIN}-cert.pem"
# CONTAINER="cli"
CONTAINER_WORKING_DIR="/opt/gopath/src/github.com/hyperledger/fabric"

# p3
CHAINCODE_VERSION=1.0
CHANNEL=ch1
GOV_ID=c8ca045c-9d1b-407f-b9ae-31711758f2d0
GOV_CODE=gov
GOV_NAME="Big Government"
DEPLOYMENT_PATH=/tmp/deployment
IP=127.0.0.1

# use node1 peer to create channelall on orderer
ORG1=1
ORG2=2

# CHANGES changed `/var/hyperledger/configs` to `/etc/hyperledger/configtx`
# LAUNCH WITHOUT SSH
ssh ${IP} "docker exec peer0.org${ORG1}.${DOMAIN} peer channel create -o ${ORDERER}:7050 -c ${CHANNEL} -f /etc/hyperledger/configtx/${CHANNEL}.tx"

# bring generated channelall.block and channel12.block from node1 local file system, before will be copied to copied to orderer, and to node2 and nodes3
# CHANGES changed working path
ssh ${IP} "docker cp peer0.org${ORG1}.${DOMAIN}:${CONTAINER_WORKING_DIR}/${CHANNEL}.block ${DEPLOYMENT_PATH}"

# copy block to containers org2 working path
# ssh ${IP} "docker cp ${DEPLOYMENT_PATH}/${CHANNEL}.block peer0.org${ORG1}.${DOMAIN}:/"
ssh ${IP} "docker cp ${DEPLOYMENT_PATH}/${CHANNEL}.block peer0.org${ORG2}.${DOMAIN}:${CONTAINER_WORKING_DIR}"

# copy chaincode to peers
ssh ${IP} "docker cp ${CHAINCODE_PATH} peer0.org${ORG1}.${DOMAIN}:${CONTAINER_WORKING_DIR}"
ssh ${IP} "docker cp ${CHAINCODE_PATH} peer0.org${ORG2}.${DOMAIN}:${CONTAINER_WORKING_DIR}"

# join channel
# CHANGES: /var/hyperledger/users/Admin@org1.hurley.lab/msp to /etc/hyperledger/msp/users
ssh -t ${IP} "docker exec peer0.org${ORG1}.${DOMAIN} peer channel join -b ${CHANNEL}.block"
ssh -t ${IP} "docker exec peer0.org${ORG2}.${DOMAIN} peer channel join -b ${CHANNEL}.block"
sleep 5

# install chaincode
ssh -t ${IP} "docker exec peer0.org${ORG1}.${DOMAIN} peer chaincode install ${CHAINCODE} -n ${CHAINCODE_CONVECTOR} -v ${CHAINCODE_VERSION}"
ssh -t ${IP} "docker exec peer0.org${ORG2}.${DOMAIN} peer chaincode install ${CHAINCODE} -n ${CHAINCODE_CONVECTOR} -v ${CHAINCODE_VERSION}"
sleep 5

# list chaincode
ssh -t ${IP} "docker exec peer0.org${ORG1}.${DOMAIN} peer chaincode list --installed"
ssh -t ${IP} "docker exec peer0.org${ORG2}.${DOMAIN} peer chaincode list --installed"
sleep 5

# instantiate chaincode in channelall with policy....only after all nodes are registered, and with chaincode installed
POLICY_CHANNELALL="'org1MSP.member', 'org2MSP.member'"
ssh ${IP} "docker exec ${CONTAINER} peer chaincode instantiate -o ${ORDERER}:7050 -C ${CHANNEL} -l ${CHAINCODE_LANG} -n ${CHAINCODE_CONVECTOR} ${CHAINCODE} -v ${VERSION} -c '{\"Args\": []}' -P \"OR(${POLICY_CHANNELALL})\""
sleep 5

# list instantiated
ssh -t ${IP} "docker exec peer0.org${ORG1}.${DOMAIN} peer chaincode list -C ${CHANNEL} --instantiated"
ssh -t ${IP} "docker exec peer0.org${ORG2}.${DOMAIN} peer chaincode list -C ${CHANNEL} --instantiated"
sleep 5

# seed
ssh ${IP} "docker exec peer0.org${ORG1}.${DOMAIN} peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_CONVECTOR} -c '{ \"Args\" : [\"participant_createWithParameters\", \"${GOV_ID}\", \"${GOV_CODE}\", \"${GOV_NAME}\" ] }'"
sleep 5

# finished debug all peers with invokes
ssh ${IP} "docker exec peer0.org${ORG1}.${DOMAIN} peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_CONVECTOR} -c '{ \"Args\" : [\"participant_getByCode\", \"${GOV_CODE}\" ] }'"
ssh ${IP} "docker exec peer0.org${ORG2}.${DOMAIN} peer chaincode invoke -C ${CHANNEL} -n ${CHAINCODE_CONVECTOR} -c '{ \"Args\" : [\"participant_getByCode\", \"${GOV_CODE}\" ] }'"
sleep 5

# Start node SDK Script
# code contractEventsLocal.js
node contractEventsLocal.js
