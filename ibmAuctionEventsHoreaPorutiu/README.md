# README

## solidarychain-development-events : ibmAuctionEventsHoreaPorutiu project

work with 5 networks

1. ibm vscode extension network (local)
2. hlf first-network (local)
3. hurley network used in development environment (local)
4. local hurley convector network, starter hurley-working-network (local)
5. solidarychain production network  (local/remote)

├── application
│   ├── application.js
│   ├── blockEvents.js
│   ├── blockEventsLocal.js
│   ├── config.json
│   ├── configLocal.json
│   ├── configLocalSolidaryChainConvector.json
│   ├── configLocalSolidaryChainHurley.json
│   ├── configLocalSolidaryChain.json
│   ├── configSolidaryChainConvector.json
│   ├── configSolidaryChain.json
│   ├── connection.json
│   ├── connection_solidary_chain_all.json
│   ├── connection_solidary_chain.json
│   ├── contractEvents.js
│   ├── contractEventsLocal.js
│   ├── contractEventsLocalSolidaryChain.js
│   ├── contractEventsSolidaryChain.js
│   ├── enrollAdmin.js
│   ├── invoke-emit.js
│   ├── local_fabric_connection_hurley.json
│   ├── local_fabric_connection.json
│   ├── local_fabric_connection_solidary_chain_all.json
│   ├── local_fabric_connection_solidary_chain_convector.json
│   ├── local_fabric_connection_solidary_chain.json
│   ├── local_fabric_wallet
│   ├── local_fabric_wallet_solidary_chain
│   ├── local_fabric_wallet_solidary_chain_convector
│   ├── local_fabric_wallet_solidary_chain_hurley
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── transactionEvents.js
│   ├── transactionEventsLocal.js
│   └── updateNetworkWallets.sh
├── contract
│   ├── auction@0.0.1.cds
│   ├── index.js
│   ├── lib
│   └── package.json
├── docs
│   ├── doc-gifs
│   ├── doc-images
│   └── run-local.md
├── hurley-working-network
│   ├── artifacts
│   ├── configtx.yaml
│   ├── crypto-config.yaml
│   ├── docker-compose_org.yaml
│   ├── docker-compose.yaml
│   ├── initChaincode.sh
│   └── network-profiles
├── NOTES_CONVECTOR.md
├── NOTES.md
└── README.md

```shell
# run with 
$ cd solidarychain-development-events/ibmAuctionEventsHoreaPorutiu/application
# ibm network
$ node contractEventsLocal.js 
# all other networks
$ node contractEventsLocalSolidaryChain.js
# remote production network
$ node contractEventsSolidaryChain.js
```
