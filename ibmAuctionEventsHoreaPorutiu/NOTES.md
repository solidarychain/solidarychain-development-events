# NOTES

- [Hyperledger Fabric sample Using Event Handling with the next generation IBM Blockchain Platform](https://github.com/IBM/auction-events/blob/master/docs/run-local.md)

## Run Project

1. start project, run **1 Org Local Fabric** in vscode
2. run tested file `ibmAuctionEventsHoreaPorutiu/application/contractEvents.js` that is prepared to work with auction, and chaincode smartcontract at same time, just need to change `CHAINCODE_NAME`
3. to update solidary-chain-network chaicode 
   1. deploy it `solidarynetwork-development-monorepo/deployChaincodeToNetwork.sh`
   2. `cp ../solidarynetwork-development-monorepo/sncc.pak ~/.fabric-vscode/packages/sncc@1.9.cds`
   3. in vscode **fabric environments** `install`, `instantiate` or `upgrade` chaincode
4. cd `ibmAuctionEventsHoreaPorutiu/application/`
5. node `contractEventsLocal.js` 

## Step 5. Export Local Wallet

wallet must be exported to `local_fabric_wallet` but admin and org1Admin must be in root of `local_fabric_wallet`, else we have below error

```shell
$ node blockEventsLocal.js
Wallet path: /media/mario/Storage/Documents/Development/HyperLedger/ibmAuctionEvents-HoreaPorutiu/application/local_fabric_wallet
An identity for the user admin does not exist in the wallet
Run the registerUser.js application before retrying
Failed to submit transaction: TypeError: Cannot set property 'error' of undefined
```

```shell
KO
local_fabric_wallet/
└── Org1
    ├── admin
    │   ├── 530feb2c0bdd16e9363af869e48c16c55a2753b581dddbf3b32560a2ed71ce65-priv
    │   ├── 530feb2c0bdd16e9363af869e48c16c55a2753b581dddbf3b32560a2ed71ce65-pub
    │   └── admin
    └── org1Admin
        ├── d1b6c5916810fea8e9d9bda9fadb47be6676216795cc6a5863eb88b7dd7b5041-priv
        ├── d1b6c5916810fea8e9d9bda9fadb47be6676216795cc6a5863eb88b7dd7b5041-pub
        └── org1Admin

$ mv local_fabric_wallet/Org1/admin/ local_fabric_wallet/
$ mv local_fabric_wallet/Org1/org1Admin/ local_fabric_wallet/
$ rm local_fabric_wallet/Org1/ -R
$ tree local_fabric_wallet

local_fabric_wallet
├── admin
│   ├── 530feb2c0bdd16e9363af869e48c16c55a2753b581dddbf3b32560a2ed71ce65-priv
│   ├── 530feb2c0bdd16e9363af869e48c16c55a2753b581dddbf3b32560a2ed71ce65-pub
│   └── admin
└── org1Admin
    ├── d1b6c5916810fea8e9d9bda9fadb47be6676216795cc6a5863eb88b7dd7b5041-priv
    ├── d1b6c5916810fea8e9d9bda9fadb47be6676216795cc6a5863eb88b7dd7b5041-pub
    └── org1Admin
```

## Step 6. Run the App

```shell
# Run the local scripts (blockEventsLocal.js, contractEventsLocal.js and transactionEventsLocal.js):
$ node blockEventsLocal.js
$ node contractEventsLocal.js
$ node transactionEventsLocal.js
```

## Connect to SolidaryChain Network

create file
/home/mario/Development/HyperLedger/ibmAuctionEvents-HoreaPorutiu/application/local_fabric_connection_solidary_chain.json
form
5node2channel/server-graphql/org1.network-profile-raft.yaml
using 
https://onlineyamltools.com/convert-yaml-to-json

dot forget to replace
/usr/src/app/packages/server-graphql/crypto-config
with
/home/mario/Development/HyperLedger/ibmAuctionEvents-HoreaPorutiu/crypto-config

and
/usr/src/app/packages/server-graphql/.hfc-org1
with 
/home/mario/Development/HyperLedger/ibmAuctionEvents-HoreaPorutiu/wallets/.hfc-org1

## Problem #1

- [hyperledger explorer error problem reading the PEM file :: Error: EISDIR](https://stackoverflow.com/questions/53943705/hyperledger-explorer-error-problem-reading-the-pem-file-error-eisdir)

Wallet path: /media/mario/Storage/Documents/Development/HyperLedger/ibmAuctionEvents-HoreaPorutiu/application/local_fabric_wallet_solidary_chain
2020-06-22T22:15:58.346Z - error: [NetworkConfig101.js]: NetworkConfig101 - problem reading the PEM file :: Error: EISDIR: illegal operation on a directory, read

change

```json
"adminPrivateKey": {
  "path": "/home/mario/Development/HyperLedger/ibmAuctionEvents-HoreaPorutiu/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/"
},
"signedCert": {
  "path": "/home/mario/Development/HyperLedger/ibmAuctionEvents-HoreaPorutiu/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/"
}
```

to 

```json
"adminPrivateKey": {
  "path": "/home/mario/Development/HyperLedger/ibmAuctionEvents-HoreaPorutiu/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/b86b031719ba558c30dba11cb6b40483201db30f5c3a920657b95acb2fd6e011_sk"
},
"signedCert": {
  "path": "/home/mario/Development/HyperLedger/ibmAuctionEvents-HoreaPorutiu/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem"
}
```

## Problem #2

change
"gatewayDiscovery": { "enabled": true, "asLocalhost": true }
to
"gatewayDiscovery": { "enabled": true, "asLocalhost": false }

## Problem #3: no suitable peers available to initialize from
Failed to submit transaction: Error: no suitable peers available to initialize from

```shell
$ node blockEventsLocalSolidaryChain.js 

2020-06-22T22:19:46.749Z - error: [Network]: _initializeInternalChannel: no suitable peers available to initialize from
Failed to submit transaction: Error: no suitable peers available to initialize from
```

> I got the same error message. I fixed this by placing the correct keys in the wallet for the user, thought I cannot tell if yours is the same case as mine. The wallet path also must be correctly specified.

- [“Error: no suitable peers available to initiize from” when querying the blockchain](https://stackoverflow.com/questions/56455251/error-no-suitable-peers-available-to-initiize-from-when-querying-the-blockcha)

> TIP: The channels section is not required if discovery is enabled.

> TIP: This error looks like it is a result of not configuring anchor peers. You need to configure anchor peers in order to use service discovery to get the full list of peers needed to 

### FIXED with

> difficult to say without seeing the connection profile, but it sounds like it cannot find any appropriate peers in the connection profile to use, so there could be a peer defined but for example it isn't associated with the correct organisation. 

change 

```json
  "peers": {
    "Org1Peer0": {
```
to

```json
  "peers": {
    "peer0.org1.example.com": {
```

this must match the peer in organization, that was 

```json
  "organizations": {
    "Org1MSP": {
      "peers": [
        "peer0.org1.example.com"
      ],
```

## Problem #5

must adapt source to chaincode

```shell
$ node blockEventsLocalSolidaryChain.js 

2020-06-22T22:58:15.052Z - warn: [DiscoveryEndorsementHandler]: _build_endorse_group_member >> G2:0 - endorsement failed - Error: transaction returned with failure: {"name":"Error","status":400,"message":"no function of name: AddSeller found","stack":"Error: no function of name: AddSeller found"}
Failed to submit transaction: Error: Endorsement has failed

