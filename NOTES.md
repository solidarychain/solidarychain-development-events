# NOTES

global notes for all the 3 projects

- ibmAuctionEventsHoreaPorutiu: imb vscode extension network working with auction smartcontract, and chaincode smartcontract

> great tutorial, video git and docs, perfect match thanks Horea

- solidaryChainNetworkPoc: solidaryChain smartcontract connect to 5org2channel production network, uses `solidaryChainNetwork` and `hurelyNetwork` with `connectionProfileNetwork.json` and `connectionProfileHurley.json`

- ConvectorExampleEvents: convector chaincode events project (not used, onlu to check some files)

- [NOTES](#notes)
  - [ibmAuctionEventsHoreaPorutiu](#ibmauctioneventshoreaporutiu)
  - [solidaryChainNetworkPoc](#solidarychainnetworkpoc)
  - [Common projects Problems and Fixs](#common-projects-problems-and-fixs)
    - [Problems : Related to Incorrect version of Node](#problems--related-to-incorrect-version-of-node)

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
