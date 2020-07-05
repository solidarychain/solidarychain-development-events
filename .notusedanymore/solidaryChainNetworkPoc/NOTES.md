# NOTES

based on ~/Development/HyperLedger/ibmAuctionEvents-HoreaPorutiu/

## Reference

- [fabric-network~ Contract](https://hyperledger.github.io/fabric-sdk-node/release-1.4/module-fabric-network.Contract.html)
- [Listening to events with Fabric Network](https://hyperledger.github.io/fabric-sdk-node/release-1.4/tutorial-listening-to-events.html)
- [How to listen to for chaincode events](https://medium.com/cryptokajmak-hyperledger-fabric-web-application/how-to-listen-to-for-chaincode-events-8467ae10d193)

## Start bring Netowork crypto Materials

```shell
$ cd ~/Development/@SolidaryChain/solidarychain-development-monorepo
$ ./bringProductionNetworkFiles.sh 
```

change `adminPrivateKey`

```json
"adminPrivateKey": {
  "path": "/home/mario/Development/@SolidaryChain/solidarychain-development-monorepo/network/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/96dfa689b5e51c7759eeb0f3a985a0c2df2706bac41bd5703d9cdba10fb59707_sk"
},
```

```shell
$ ls /home/mario/Development/@SolidaryChain/solidarychain-development-monorepo/network/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/
a137d5a090fbfb9efb14b928da545a7133306655ba116ad865bac7cb4c3be587_sk
```

bring wallet from main project, only because we need admin folder

```shell
$ rm walletNetwork/admin/*
$ cp ../../solidarychain-development-monorepo/network/generated/wallets/.hfc-org1/* walletNetwork/admin/

$ rm walletHurley/admin/*
$ cp /home/mario/hyperledger-fabric-network/.hfc-org1/* walletHurley/admin/
```

## Events 

// Emit the tradeEvent - passing the whole Commodity Object as the Payload.
ctx.stub.setEvent('tradeEvent', Buffer.from(JSON.stringify(commodity)));



channelEventHub

__proto__:Map {constructor: , get: , set: , …}
length:2
0:{"{"chaincodes":[{"name":"mycc"}]}" => Object} {key: "{"chaincodes":[{"name":"mycc"}]}", value: Object}
1:{"{"chaincodes":[{"name":"solidary-chain-chaincode"}]}" => Object} {key: "{"chaincodes":[{"name":"solidary-chain-chaincode…", value: Object}
key:"{"chaincodes":[{"name":"solidary-chain-chaincode"}]}"
value:Object {

## Connect to Hurley Network to debug Chaincode

use `/home/mario/hyperledger-fabric-network/hurley.networkConfig.json`

convert `/home/mario/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml` to `.json` with [convert-yaml-to-json](https://onlineyamltools.com/convert-yaml-to-json)

replace `/config/` with `/home/mario/hyperledger-fabric-network/config`

## message:"EISDIR: illegal operation on a directory, read"

hurley profile crash, we need to send certificate not the dir
EISDIR: Illegal operation on a directory, read at error (native)
path:"/home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/Admin@org1.hurley.lab/msp/keystore/"

change `connectionProfileHurley.json`

```json
"adminPrivateKey": {
  "path": "/home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/Admin@org1.hurley.lab/msp/keystore/"
},
"signedCert": {
  "path": "/home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/Admin@org1.hurley.lab/msp/signcerts/"
}
...

"adminPrivateKey": {
  "path": "/home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org2.hurley.lab/users/Admin@org2.hurley.lab/msp/keystore/"
},
"signedCert": {
  "path": "/home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org2.hurley.lab/users/Admin@org2.hurley.lab/msp/signcerts/"
}
```

```shell
$ ls /home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/Admin@org1.hurley.lab/msp/keystore/
364a4207de6a8a1d0e43f37570038f5ebea9e8804b837f58a90788a7c5ea78f0_sk
$ ls /home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/Admin@org1.hurley.lab/msp/signcerts/
Admin@org1.hurley.lab-cert.pem
$ ls /home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org2.hurley.lab/users/Admin@org2.hurley.lab/msp/keystore/
4df9c9caaa5cc38fbae788950ae35bde4fe57de54deec8163e3226426cfac7b7_sk
```

to 

```json
"adminPrivateKey": {
  "path": "/home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/Admin@org1.hurley.lab/msp/keystore/364a4207de6a8a1d0e43f37570038f5ebea9e8804b837f58a90788a7c5ea78f0_sk"
},
"signedCert": {
  "path": "/home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/Admin@org1.hurley.lab/msp/signcerts/Admin@org1.hurley.lab-cert.pem"
}
...
"adminPrivateKey": {
  "path": "/home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org2.hurley.lab/users/Admin@org2.hurley.lab/msp/keystore/4df9c9caaa5cc38fbae788950ae35bde4fe57de54deec8163e3226426cfac7b7_sk"
},
"signedCert": {
  "path": "/home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org2.hurley.lab/users/Admin@org2.hurley.lab/msp/signcerts/Admin@org2.hurley.lab-cert.pem"
}
```

## message:"Unable to initialize channel. Attempted to contact 1 Peers. Last error was Error: 14 UNAVAILABLE: DNS resolution failed"

```
_name:"peer0.org1.hurley.lab"
_url:"grpc://peer0.org1.hurley.lab:7051"
```

# hurley
127.0.0.1     orderer.hurley.lab
127.0.0.1     ca.org1.hurley.lab
127.0.0.1     ca.org2.hurley.lab
127.0.0.1     peer0.org1.hurley.lab
127.0.0.1     peer0.org2.hurley.lab

it works with hosts :) we received blocks

## Final Trick to work with events

to be checked

```json
"channels": {
  "channelall": {
    "orderers": [
      "orderer1.example.com"
    ],
    "peers": {
      "peer0.org1.example.com": {
        "endorsingPeer": true,
        "chaincodeQuery": true,
        "ledgerQuery": true,
        "eventSource": true
      },
      "peer1.org1.example.com": {
        "endorsingPeer": true,
        "chaincodeQuery": true,
        "ledgerQuery": true,
        "eventSource": true
      }
    }
  }
},
```
require to add

```json
"peers": {
  "peer0.org1.example.com": {
    "eventUrl": "grpcs://192.168.1.64:7052",
```
