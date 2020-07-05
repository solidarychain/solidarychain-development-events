# Convector Events Example

This awesome project was created automatically with <a href="https://github.com/worldsibu/convector-cli" target="_blank">Convector CLI</a>.
By default new Convector projects locally include <a href="https://github.com/worldsibu/hurley">Hurley</a> to manage your development environment seamlessly, so you don't have to worry about setting up the network and hard ways to install  and upgrade your chaincodes.

## Start

```shell
# cleanup
$ sudo chown mario.users . R
$ rm node_modules
$ rm package-lock.json
# Install dependencies - From the root of your project
$ npm i
# Create a new development blockchain network  - From the root of your project
$ npm run env:restart
Registering admin for org1
Registering admin for org2
Registering user1 for org1
Registering user1 for org2
[hurley] - Ran network restart script
[hurley] - ************ Success!
[hurley] - Complete network deployed at /home/mario/hyperledger-fabric-network
[hurley] - Setup:
        - Organizations: 2
            * org1
            * org2
        - Users per organization: user1 
            * admin 
            * user1
        - Channels deployed: 1
            * ch1
[hurley] - You can find the network topology (ports, names) here: /home/mario/hyperledger-fabric-network/docker-compose.yaml

# try build
$ npm run build
Error: Cannot find module '/media/mario/Storage/Documents/Development/@SolidaryChain/@Samples/ConvectorExampleEvents/org1.official.config.json'
$ cp org1.financial.config.json org1.official.config.json
$ cp org2.financial.config.json org2.official.config.json
$ npm run build

# Install your smart contract : NOW IT BUILD and build package cc folder chaincode-official
$ npm run cc:start -- official
# wait for
Instantiated Chaincode at org1

# Make a testing call to create a record in the ledger
# Beware that the first call may fail with a timeout! Just happens the first time
$ hurl invoke official official_create "{\"name\":\"my first request\",\"id\":\"0001\",\"created\":0,\"modified\":0}"
create "{\"name\":\"my first request\",\"id\":\"0001\",\"created\":0,\"modified\":0}"
[hurley] - {"name":"my first request","id":"0001","created":0,"modified":0}
(node:29330) UnhandledPromiseRejectionWarning: TypeError: network.organizations.find is not a function
```

## About Hurley

You may as well install **Hurley** globally for easier and more flexible management. 

```shell
$ npm i -g @worldsibu/hurley
```

Since with Hurley globally you have control over everything, some things that you can do, for example, is installing a Convector Smart Contract with a different name than the one you used for your project.

```shell
# Use the same package
# Install a new chaincode with the same source code but the name 'anothernameforyourcc'
$ hurl install anothernameforyourcc node
```

Other complex tasks you may need is installing to a different channel.

```shell
# Use the same package
# Be sure you started your environment with more than one channel running 'hurl new --channels 2'. Otherwise this will throw an error.
$ hurl install anothernameforyourcc node --channel ch2
```

---

If you don't want to, don't worries! This project works right away.

## Start - if you have Hurley globally

### Bring your project to life 

```shell
# Install dependencies - From the root of your project
$ npm i
# Create a new development blockchain network  - From the root of your project
$ hurl new
```

###  Install and upgrade chaincodes

```shell
# Package your smart contract's code  - From the root of your project
$ npm run cc:package -- official org1
# Install to your blockchain - From the root of your project
$ hurl install official node -P ./chaincode-official
# Install in debug mode, this will run the chaincode server locally so you can debug
$ hurl install official node -P ./chaincode-official --debug

# Upgrade your existing chaincode - From the root of your project
$ hurl upgrade official node 1.2 -P ./chaincode-official
```

## Start - if you don't have Hurley globally

### Bring your project to life 

```shell
# Install dependencies - From the root of your project
$ npm i
# Create a new development blockchain network  - From the root of your project
$ npm run env:restart
```

###  Install and upgrade chaincodes

```shell
# Install to your blockchain - From the root of your project
$ npm run cc:start -- official

# Upgrade your existing chaincode - From the root of your project
$ npm run cc:upgrade -- official 1.2
```

## Tests

```shell
$ npm run test
```

> Check all the information to work with Convector <a href="https://worldsibu.github.io/convector" target="_blank">in the DOCS site</a>.

## Collaborate to the Convector Suite projects

* <a href="https://discord.gg/twRwpWt" target="_blank">Discord chat with the community</a>
* <a href="https://github.com/worldsibu" target="_blank">Convector projects</a>
