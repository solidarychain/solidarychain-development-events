const { FileSystemWallet, Gateway, DefaultEventHandlerStrategies } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const util = require('util');

debugger;
// connect to the config file
// opt#1: local solidaryChain production network
// const configPath = path.join(process.cwd(), './configLocalSolidaryChain.json');
// opt#2: local convector local network development (ibmAuctionEventsHoreaPorutiu/hurley-working-network)
// const configPath = path.join(process.cwd(), './configLocalSolidaryChainConvector.json');
// opt#3: local hurley development network: used in chaincode development
const configPath = path.join(process.cwd(), './configLocalSolidaryChainHurley.json');

const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
//connect to the local connection file
const ccpPath = path.join(process.cwd(), config.connectionFile);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const connectionProfile = JSON.parse(ccpJSON);
//A wallet stores a collection of identities for use with local wallet
const walletPath = path.join(process.cwd(), config.walletPath);
const wallet = new FileSystemWallet(walletPath);
console.log(`Wallet path: ${walletPath}`);
// identity
const peerIdentity = 'admin';

async function contractEvents() {
  try {
    let response;
    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(peerIdentity);
    if (!userExists) {
      console.log('An identity for the user ' + peerIdentity + ' does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      response.error = 'An identity for the user ' + peerIdentity + ' does not exist in the wallet. Register ' + peerIdentity + ' first';
      return response;
    }

    //connect to Fabric Network, but starting a new gateway
    const gateway = new Gateway();

    //use our config file, our peerIdentity, and our discovery options to connect to Fabric network.
    await gateway.connect(connectionProfile, {
      wallet,
      identity: peerIdentity,
      discovery: config.gatewayDiscovery
    });
    console.log('gateway connect');
    
    //connect to our channel that has been created on IBM Blockchain Platform
    const network = await gateway.getNetwork(config.channel);
    // console.log(network);

    //connect to our insurance contract that has been installed/ instantiated on IBM Blockchain Platform
    const contract = await network.getContract(config.chaincodeName);
    // console.log(contract);

    // NEW: https://hyperledger.github.io/fabric-sdk-node/release-1.4/tutorial-channel-events.html
    // const client = gateway.getClient();
    // const channel = client.getChannel(config.channel);
    // console.log('Got addressability to channel');
    // const eventHub = channel.getChannelEventHub('peer0.org1.example.com:7051');
    // eventHub.connect(false);
    // eventHub.registerChaincodeEvent(config.chaincodeName, '(.*?)',
    //   (event, blockNumber, txId, txStatus) => {
    //     console.log(event, blockNumber, txId, txStatus);
    //   });

    //our block listener is listening to our channel, and seeing if any blocks are added to our channel
    await network.addBlockListener('block-listener', (err, block) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(util.inspect(block.header, { showHidden: false, depth: 1 }))

      // console.log('*************** start block header **********************')
      // console.log(util.inspect(block.header, { showHidden: false, depth: 5 }))
      // console.log('*************** end block header **********************')
      // console.log('*************** start block data **********************')
      // let data = block.data.data[0];
      // console.log(util.inspect(data, { showHidden: false, depth: 5 }))
      // console.log('*************** end block data **********************')
      // console.log('*************** start block metadata ****************')
      // console.log(util.inspect(block.metadata, { showHidden: false, depth: 5 }))
      // console.log('*************** end block metadata ****************')
    });

    // TradeEvent | (.*?)
    await contract.addContractListener('my-contract-listener', '(.*?)', (err, event, blockNumber, transactionId, status) => {
      if (err) {
        console.error(err);
        return;
      }
      //convert event to something we can parse 
      event = event.payload.toString();
      event = JSON.parse(event)

      //where we output the Participant
      console.log('************************ Start Participant Event *******************************************************');
      console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
      console.log(JSON.stringify(event, undefined, 2));
      console.log('************************ End Participant Event ************************************');
    });

    // ID=E9kIT
    // ${BASE_CMD} -c "{ \"Args\" : [\"participant_createWithParameters\", \"${ID}\", \"${ID}\", \"${ID}\" ] }"
    // ${BASE_CMD} -c "{ \"Args\" : [\"participant_get\", \"${ID}\" ] }"
    // const res = await contract.submitTransaction('participant_createWithParameters', `c8ca045c-9d1b-407f-b9ae-31711758f2d0`, `gov`, `Big Government`);
    for (let i = 0; i < 280; i++) {
      const id = makeid(5);
      console.log(`participant_createWithParameters: ${id}`);
      const res = await contract.submitTransaction('participant_createWithParameters', `${id}`, `${id}`, `${id}`);
    }

    // Disconnect from the gateway.
    await gateway.disconnect();

  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
  }
}

contractEvents();

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
