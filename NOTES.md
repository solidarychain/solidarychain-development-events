# NOTES

global notes for all the 3 projects

- ibmAuctionEventsHoreaPorutiu: imb vscode extension network working with auction smartcontract, and chaincode smartcontract

> great tutorial, video git and docs, perfect match thanks Horea

- solidaryChainNetworkPoc: solidaryChain smartcontract connect to 5org2channel production network, uses `solidaryChainNetwork` and `hurelyNetwork` with `connectionProfileNetwork.json` and `connectionProfileHurley.json`

- ConvectorExampleEvents: convector chaincode events project (not used, onlu to check some files)

- [NOTES](#notes)
  - [Events Links](#events-links)
  - [StackOverflow](#stackoverflow)
  - [ibmAuctionEventsHoreaPorutiu](#ibmauctioneventshoreaporutiu)
  - [solidaryChainNetworkPoc](#solidarychainnetworkpoc)
  - [Common projects Problems and Fixs](#common-projects-problems-and-fixs)
    - [Problems : Related to Incorrect version of Node](#problems--related-to-incorrect-version-of-node)
  - [Hosts file on running Machine](#hosts-file-on-running-machine)
- [or](#or)
- [TODO FIX and clean registerUser.js file](#todo-fix-and-clean-registeruserjs-file)

## Events Links

- [1.4: fabric-client: How to use the channel-based event service](https://hyperledger.github.io/fabric-sdk-node/release-1.4/tutorial-channel-events.html)

## StackOverflow

- [Hyperledger Fabric port 7053](https://stackoverflow.com/questions/51578063/hyperledger-fabric-port-7053)

In the Hyperledger Fabric peer definition, we map ports `7051` and `7053`. I understand that `7051` is used for **connecting the peer**, and it is also used by the peers for gossiping. The port `7052` is used for **chaincode connections**. However, I am not sure about the use of port `7053`. Can anyone please describe it?

Port `7053` is the default port for the event **hub service** which can be used by **client to subscribe to block and chaincode events**. 

## ibmAuctionEventsHoreaPorutiu

read `ibmAuctionEventsHoreaPorutiu/NOTES.md`

## solidaryChainNetworkPoc

read `solidaryChainNetworkPoc/NOTES.md`

## Common projects Problems and Fixs

### Problems : Related to Incorrect version of Node

when try running the project, if this error occur is because of a wrong node version

```shell
$ node contractEventsLocal.js 
/media/mario/Storage/Documents/Development/HyperLedger/ibmAuctionEvents-HoreaPorutiu/application/node_modules/grpc/src/grpc_extension.js:55
    throw error;
    ^

Error: Failed to load gRPC binary module because it was not installed for the current system
Expected directory: node-v59-linux-x64-glibc
Found: [node-v57-linux-x64-glibc]
This problem can often be fixed by running "npm rebuild" on the current system

$ node -v
v9.11.2

$ nvh
   installed : v8.16.0
```

## Hosts file on running Machine

```shell
# solidary network hosts
192.168.1.61  orderer.example.com
192.168.1.64  orderer1.example.com
192.168.1.65  orderer2.example.com
192.168.1.66  orderer3.example.com
192.168.1.62  orderer4.example.com
192.168.1.63  orderer5.example.com
192.168.1.64  ca.org1.example.com
192.168.1.64  peer0.org1.example.com
192.168.1.64  peer1.org1.example.com
192.168.1.65  ca.org2.example.com
192.168.1.65  peer0.org2.example.com
192.168.1.65  peer1.org2.example.com
192.168.1.66  ca.org3.example.com
192.168.1.66  peer0.org3.example.com
192.168.1.66  peer1.org3.example.com
192.168.1.62  ca.org4.example.com
192.168.1.62  peer0.org4.example.com
192.168.1.62  peer1.org4.example.com
192.168.1.63  ca.org5.example.com
192.168.1.63  peer0.org5.example.com
192.168.1.63  peer1.org5.example.com
# hurley
127.0.0.1     orderer.hurley.lab
127.0.0.1     ca.org1.hurley.lab
127.0.0.1     ca.org2.hurley.lab
127.0.0.1     peer0.org1.hurley.lab
127.0.0.1     peer0.org2.hurley.lab
```








```shell
$ docker ps | grep 705 | grep peer
0dd14db66772        hyperledger/fabric-peer:1.4.6       "peer node start"        4 minutes ago       Up 4 minutes        0.0.0.0:7051->7051/tcp, 0.0.0.0:7053->7053/tcp   peer0.org1.example.com
13c2bb28667b        hyperledger/fabric-peer:1.4.6       "peer node start"        4 minutes ago       Up 4 minutes        0.0.0.0:8051->7051/tcp, 0.0.0.0:8053->7053/tcp   peer1.org1.example.com
```

- CORE_PEER_CHAINCODELISTENADDRESS=0.0.0.0:7052



- [What is purpose of “CORE_PEER_CHAINCODELISTENADDRESS” environment variable?](https://stackoverflow.com/questions/46547150/what-is-purpose-of-core-peer-chaincodelistenaddress-environment-variable)


```yaml
peer0.org1.example.com:
  ports:
    - 7052:7052

peer1.org1.example.com:
  ports:
    - 8052:7052
```







dont DOWN node1, it will re-create new CA's in ca and we have this error again...and again

node contractEventsLocalSolidaryChain.js 
Wallet path: /media/mario/Storage/Documents/Development/@Solidary.Network/solidarynetwork-development-events/ibmAuctionEventsHoreaPorutiu/application/local_fabric_wallet_solidary_chain
gateway connect
E0626 23:34:54.484608996   21243 ssl_transport_security.cc:1238] Handshake failed with fatal error SSL_ERROR_SSL: error:14090086:SSL routines:ssl3_get_server_certificate:certificate verify failed.
E0626 23:34:55.486352893   21243 ssl_transport_security.cc:1238] Handshake failed with fatal error SSL_ERROR_SSL: error:14090086:SSL routines:ssl3_get_server_certificate:certificate verify failed.
E0626 23:34:57.011765345   21243 ssl_transport_security.cc:1238] Handshake failed with fatal error SSL_ERROR_SSL: error:14090086:SSL routines:ssl3_get_server_certificate:certificate verify failed.
2020-06-26T22:34:57.483Z - error: [Remote.js]: Error: Failed to connect before the deadline URL:grpcs://peer0.org1.example.com:7051
2020-06-26T22:34:57.483Z - error: [Channel.js]: Error: Failed to connect before the deadline URL:grpcs://peer0.org1.example.com:7051
2020-06-26T22:34:57.483Z - error: [Network]: _initializeInternalChannel: Unable to initialize channel. Attempted to contact 1 Peers. Last error was Error: Failed to connect before the deadline URL:grpcs://peer0.org1.example.com:7051
Failed to submit transaction: Error: Unable to initialize channel. Attempted to contact 1 Peers. Last error was Error: Failed to connect before the deadline URL:grpcs://peer0.org1.example.com:7051









> hurley used `7052` but in production we use `7053`, to be confirmed

`fabric-samples/first-network/base/docker-compose-base.yaml`
uses
- CORE_PEER_CHAINCODELISTENADDRESS=0.0.0.0:7052

and i use in peer0 
peer0
- 7052:7052
peer1
- 8052:7052

"eventUrl": "grpcs://peer0.org1.example.com:7052",


https://stackoverflow.com/questions/55936208/failed-to-get-discovery-service-could-not-get-chconfig-cache-reference-read-co
Just compared with my environment. I have 1 more attribute: CORE_PEER_CHAINCODELISTENADDRESS=peer0.org1.example.com:7052. dont forget to add 7052:7052 (org1) and 8052:7052 (org2) port mapping to your configuration. It may be irrelevant but it may work by chance :) 



export network profile












$ node contractEventsLocal.js 
Wallet path: /media/mario/Storage/Documents/Development/@Solidary.Network/solidarynetwork-development-events/ibmAuctionEventsHoreaPorutiu/application/local_fabric_wallet
gateway connect
2020-06-27T13:50:29.725Z - error: [Remote.js]: Error: Failed to connect before the deadline URL:grpc://localhost:17071
2020-06-27T13:50:29.725Z - error: [Channel.js]: Error: Failed to connect before the deadline URL:grpc://localhost:17071
2020-06-27T13:50:29.725Z - error: [Network]: _initializeInternalChannel: Unable to initialize channel. Attempted to contact 1 Peers. Last error was Error: Failed to connect before the deadline URL:grpc://localhost:17071
Failed to submit transaction: Error: Unable to initialize channel. Attempted to contact 1 Peers. Last error was Error: Failed to connect before the deadline URL:grpc://localhost:17071




require user1 
https://github.com/horeaporutiu/VSCodeTutorial/issues/3

$ node contractEventsSolidaryChain.js 
Wallet path: /media/mario/Storage/Documents/Development/@Solidary.Network/solidarynetwork-development-events/ibmAuctionEventsHoreaPorutiu/application/local_fabric_wallet_solidary_chain
gateway connect
2020-06-28T01:13:00.945Z - error: [Channel.js]: Channel:allchannel received discovery error:access denied
2020-06-28T01:13:00.946Z - error: [Channel.js]: Error: Channel:allchannel Discovery error:access denied
2020-06-28T01:13:00.946Z - error: [Network]: _initializeInternalChannel: Unable to initialize channel. Attempted to contact 1 Peers. Last error was Error: Channel:allchannel Discovery error:access denied
Failed to submit transaction: Error: Unable to initialize channel. Attempted to contact 1 Peers. Last error was Error: Channel:allchannel Discovery error:access denied

FUCK use `allchannel` and not `channelall`

mario@ubuntu-swarm-1:/srv/docker/hyperledger-fabric-extra_hosts-5orgs/fabric-samples/5node2channel/wallet/fabcar/javascript
$ mkdir wallet/admin
# or
$ rm wallet/admin/*
$ cp generated/wallets/.hfc-org1/* wallet/admin/
# TODO FIX and clean registerUser.js file
$ node registerUser.js user1
registerUser "user1"
Wallet path: /srv/docker/hyperledger-fabric-extra_hosts-5orgs/fabric-samples/5node2channel/wallet/fabcar/javascript/wallet
Successfully registered and enrolled admin user "user1" and imported it into the wallet





remove this this gives me the problem
3node2channel
5node2channel

E0628 03:32:23.007811216   24436 ssl_transport_security.cc:1238] Handshake failed with fatal error SSL_ERROR_SSL: error:14090086:SSL routines:ssl3_get_server_certificate:certificate verify failed.
2020-06-28T02:32:23.091Z - error: [Remote.js]: Error: Failed to connect before the deadline URL:grpcs://localhost:7051
2020-06-28T02:32:23.092Z - error: [Channel.js]: Error: Failed to connect before the deadline URL:grpcs://localhost:7051
2020-06-28T02:32:23.092Z - error: [Network]: _initializeInternalChannel: Unable to initialize channel. Attempted to contact 1 Peers. Last error was Error: Failed to connect before the deadline URL:grpcs://localhost:7051
Failed to submit transaction: Error: Unable to initialize channel. Attempted to contact 1 Peers. Last error was Error: Failed to connect before the deadline URL:grpcs://localhost:7051
