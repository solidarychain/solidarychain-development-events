# NOTES

## Links

- [hlf 1.4 : Install Samples, Binaries and Docker Images](https://hyperledger-fabric.readthedocs.io/en/release-1.4/install.html)
- [hlf 1.4 : Building Your First Network](https://hyperledger-fabric.readthedocs.io/en/release-1.4/build_network.html)
- [How do I resolve this error? ERROR: failed to create deliver client: failed to create new connection: context deadline exceeded](https://stackoverflow.com/questions/52583128/how-do-i-resolve-this-error-error-failed-to-create-deliver-client-failed-to-c)

## Install Samples, Binaries and Docker Images

```shell
$ curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.7 1.4.7 0.4.20
hyperledger/fabric-ca          1.4                 743a758fae29        6 weeks ago         154MB
hyperledger/fabric-ca          1.4.7               743a758fae29        6 weeks ago         154MB
hyperledger/fabric-ca          latest              743a758fae29        6 weeks ago         154MB
hyperledger/fabric-tools       1.4                 a026b435e575        6 weeks ago         1.49GB
hyperledger/fabric-tools       1.4.7               a026b435e575        6 weeks ago         1.49GB
hyperledger/fabric-tools       latest              a026b435e575        6 weeks ago         1.49GB
hyperledger/fabric-ccenv       1.4                 c5fbec1827ad        6 weeks ago         1.36GB
hyperledger/fabric-ccenv       1.4.7               c5fbec1827ad        6 weeks ago         1.36GB
hyperledger/fabric-ccenv       latest              c5fbec1827ad        6 weeks ago         1.36GB
hyperledger/fabric-orderer     1.4                 df155b01ed80        6 weeks ago         123MB
hyperledger/fabric-orderer     1.4.7               df155b01ed80        6 weeks ago         123MB
hyperledger/fabric-orderer     latest              df155b01ed80        6 weeks ago         123MB
hyperledger/fabric-peer        1.4                 5d5fbecd1efe        6 weeks ago         131MB
hyperledger/fabric-peer        1.4.7               5d5fbecd1efe        6 weeks ago         131MB
hyperledger/fabric-peer        latest              5d5fbecd1efe        6 weeks ago         131MB
hyperledger/fabric-zookeeper   0.4                 21e55e9a2862        3 months ago        276MB
hyperledger/fabric-zookeeper   0.4.20              21e55e9a2862        3 months ago        276MB
hyperledger/fabric-zookeeper   latest              21e55e9a2862        3 months ago        276MB
hyperledger/fabric-kafka       0.4                 28a93b376dbe        3 months ago        270MB
hyperledger/fabric-kafka       0.4.20              28a93b376dbe        3 months ago        270MB
hyperledger/fabric-kafka       latest              28a93b376dbe        3 months ago        270MB
hyperledger/fabric-couchdb     0.4                 03ac1654afc5        3 months ago        261MB
hyperledger/fabric-couchdb     0.4.20              03ac1654afc5        3 months ago        261MB
hyperledger/fabric-couchdb     latest              03ac1654afc5        3 months ago        261MB
```

## Bootstrap Network (CouchDb/Raft)

```shell
# start byfn
$ cd /home/mario/Development/HyperLedger/fabric-samples/first-network
$ ./byfn.sh down
$ ./byfn.sh up -c channelall -s couchdb -o etcdraft -a
========= All GOOD, BYFN execution completed =========== 

# list containers
$ docker ps --format "table {{.Names}}\t{{.Ports}}"
NAMES                                 PORTS
cli                                   
dev-peer1.org2.example.com-mycc-1.0   
dev-peer0.org1.example.com-mycc-1.0   
dev-peer0.org2.example.com-mycc-1.0   
peer0.org1.example.com                0.0.0.0:7051->7051/tcp
peer1.org1.example.com                0.0.0.0:8051->8051/tcp
peer0.org2.example.com                0.0.0.0:9051->9051/tcp
peer1.org2.example.com                0.0.0.0:10051->10051/tcp
orderer.example.com                   0.0.0.0:7050->7050/tcp
orderer2.example.com                  0.0.0.0:8050->7050/tcp
orderer3.example.com                  0.0.0.0:9050->7050/tcp
orderer4.example.com                  0.0.0.0:10050->7050/tcp
orderer5.example.com                  0.0.0.0:11050->7050/tcp
ca_peerOrg1                           0.0.0.0:7054->7054/tcp
ca_peerOrg2                           7054/tcp, 0.0.0.0:8054->8054/tcp
couchdb0                              4369/tcp, 9100/tcp, 0.0.0.0:5984->5984/tcp
couchdb1                              4369/tcp, 9100/tcp, 0.0.0.0:6984->5984/tcp
couchdb3                              4369/tcp, 9100/tcp, 0.0.0.0:8984->5984/tcp
couchdb2                              4369/tcp, 9100/tcp, 0.0.0.0:7984->5984/tcp
```

## Install SolidaryChain chainCode

```shell
$ CHANNEL="channelall"
$ CHAINCODE_NAME="sncc"
$ CHAINCODE_CONVECTOR=s"olidary-network-chaincode"
$ CHAINCODE="${CHAINCODE_NAME}@1.0.cds"
$ VERSION="1.0"
$ CHAINCODE_DEPLOYMENT_PATH="/src/github.com/hyperledger/fabric/peer"
$ ABSOLUTE_PATH="/opt/gopath/src/github.com/chaincode/chaincode-solidary-network-chaincode"
$ ORDERER_CA="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"
$ PEER0_ORG1_CA="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"

# get peers ids
$ docker ps --filter ancestor="hyperledger/fabric-peer:latest" --format "table {{.ID}}\t{{.Image}}\t{{.Names}}\t{{.Ports}}"
CONTAINER ID        IMAGE                            NAMES                    PORTS
d0bc312e0f8f        hyperledger/fabric-peer:latest   peer1.org2.example.com   0.0.0.0:10051->10051/tcp
eabcc60e4b14        hyperledger/fabric-peer:latest   peer1.org1.example.com   0.0.0.0:8051->8051/tcp
53cf1ef69028        hyperledger/fabric-peer:latest   peer0.org1.example.com   0.0.0.0:7051->7051/tcp
7078c75a5afe        hyperledger/fabric-peer:latest   peer0.org2.example.com   0.0.0.0:9051->9051/tcp

# copy chaincode to cli
$ docker cp contract/${CHAINCODE} cli:/opt/gopath/${CHAINCODE_DEPLOYMENT_PATH}/${CHAINCODE}
# install to peer0.org1
$ docker exec -e "CORE_PEER_ADDRESS=peer0.org1.example.com:7051" cli peer chaincode install ${CHAINCODE} -v ${VERSION}
2020-06-28 00:25:28.656 UTC [chaincodeCmd] install -> INFO 001 Installed remotely response:<status:200 payload:"OK" > 
# install to peer1.org1
$ docker exec -e "CORE_PEER_ADDRESS=peer1.org1.example.com:8051" cli peer chaincode install ${CHAINCODE} -v ${VERSION}
2020-06-28 00:25:42.987 UTC [chaincodeCmd] install -> INFO 001 Installed remotely response:<status:200 payload:"OK" >
# install to peer0.org2
# docker exec -e "CORE_PEER_ADDRESS=peer0.org2.example.com:9051" cli peer chaincode install ${CHAINCODE} -v ${VERSION}
# install to peer1.org2
# docker exec -e "CORE_PEER_ADDRESS=peer1.org2.example.com:10051" cli peer chaincode install ${CHAINCODE} -v ${VERSION}
$ docker exec cli peer chaincode instantiate -o orderer.example.com:7050 -l node -C ${CHANNEL} -n ${CHAINCODE_CONVECTOR} ${ABSOLUTE_PATH} -v ${VERSION} -c '{ "Args": [] }' -P 'OR ("Org1MSP.member", "Org2MSP.member")' --tls --cafile ${ORDERER_CA} 
2020-06-28 00:15:08.288 UTC [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
2020-06-28 00:15:08.288 UTC [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc
# check instantiated: peer0.org1
$ docker exec -e "CORE_PEER_ADDRESS=peer0.org1.example.com:7051" cli peer chaincode list -C ${CHANNEL} --instantiated | grep ${CHAINCODE_CONVECTOR}
Name: solidary-network-chaincode, Version: 1.0, Path: /media/mario/Storage/Documents/Development/@Solidary.Network/solidarynetwork-development-monorepo/chaincode-solidary-network-chaincode, Escc: escc, Vscc: vscc
# check instantiated: peer1.org1
$ docker exec -e "CORE_PEER_ADDRESS=peer1.org1.example.com:8051" cli peer chaincode list -C ${CHANNEL} --instantiated | grep ${CHAINCODE_CONVECTOR}
Name: solidary-network-chaincode, Version: 1.0, Path: /media/mario/Storage/Documents/Development/@Solidary.Network/solidarynetwork-development-monorepo/chaincode-solidary-network-chaincode, Escc: escc, Vscc: vscc
# check instantiated: peer0.org2
# docker exec -e "CORE_PEER_ADDRESS=peer0.org2.example.com:9051" cli peer chaincode list -C ${CHANNEL} --instantiated
# check instantiated: peer1.org2
# docker exec -e "CORE_PEER_ADDRESS=peer1.org2.example.com:10051" cli peer chaincode list -C ${CHANNEL} --instantiated
```

## Create Wallet

```shell
# generate wallet
$ cd /home/mario/Development/HyperLedger/fabric-samples/fabcar/javascript
$ npm i
# enroll Admin
$ rm wallet/admin/*
$ node enrollAdmin.js
Wallet path: /media/mario/Storage/Documents/Development/HyperLedger/fabric-samples/fabcar/javascript/wallet
Successfully enrolled admin user "admin" and imported it into the wallet
# registerUser user1
$ rm wallet/user1/*
$ node registerUser.js
Wallet path: /media/mario/Storage/Documents/Development/HyperLedger/fabric-samples/fabcar/javascript/wallet
Successfully registered and enrolled admin user "user1" and imported it into the wallet
```

wallet path location: `/home/mario/Development/HyperLedger/fabric-samples/fabcar/javascript/wallet`

## Start node SDK Script

```shell
$ cd application/
$ node contractEventsLocal.js
```

## Clean Up System / Optional Use with Caution

```shell
docker kill $(docker ps -q)
docker rm $(docker ps -qa)
docker system prune -a 
docker volume prune
```

> use only if encounter errors like: 

```
Channel name : mychannel
Creating channel...
+ peer channel create -o orderer.example.com:7050 -c mychannel -f ./channel-artifacts/channel.tx --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
+ res=1
+ set +x
Error: failed to create deliver client: orderer client failed to connect to orderer.example.com:7050: failed to create new connection: context deadline exceeded
!!!!!!!!!!!!!!! Channel creation failed !!!!!!!!!!!!!!!!
========= ERROR !!! FAILED to execute End-2-End Scenario ===========
```
