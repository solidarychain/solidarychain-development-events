'use strict';

debugger;
//Import Hyperledger Fabric 1.4 programming model - fabric-network
const { FileSystemWallet, Gateway, ContractListener, DefaultEventHandlerStrategies } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const util = require('util');

// paths
// connect to the config file
const configPath = path.join(process.cwd(), './configNetwork.json');
// const configPath = path.join(process.cwd(), './configHurley.json');
console.log(configPath);
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
// connect to the local connection file
let ccpPath;
if (config.connectionProfileFile.startsWith('./')) {
  ccpPath = path.join(process.cwd(), config.connectionProfileFile);
} else {
  ccpPath = config.connectionProfileFile;
}
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const connectionProfile = JSON.parse(ccpJSON);
// A wallet stores a collection of identities for use with local wallet
let walletPath;
if (config.walletPath.startsWith('./')) {
  walletPath = path.join(process.cwd(), config.walletPath);
} else {
  walletPath = config.walletPath;
}
const wallet = new FileSystemWallet(walletPath);
console.log(`Wallet path: ${walletPath}`);

// a function that shows how to implement block, contract and transaction events
async function blockContractAndTransactionEvents() {
  try {
    let response;

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(config.peerIdentity);
    if (!userExists) {
      console.log(`An identity for the user ${config.peerIdentity} does not exist in the wallet`);
      console.log('Run the registerUser.js application before retrying');
      response.error = `An identity for the user ${config.peerIdentity} does not exist in the wallet. Register ${config.peerIdentity} first`;
      return response;
    }

    // connect to Fabric Network, but starting a new gateway
    const gateway = new Gateway();

    // use our config file, our peerIdentity, and our discovery options to connect to Fabric network.
    await gateway.connect(connectionProfile, { wallet, identity: config.peerIdentity, discovery: config.gatewayDiscovery });
    console.log('gateway connect');

    // connect to our channel that has been created on IBM Blockchain Platform
    const network = await gateway.getNetwork(config.channel);

    //our block listener is listening to our channel, and seeing if any blocks are added to our channel
    await network.addBlockListener('block-listener', (err, block) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log('*************** start block header **********************')
      console.log(util.inspect(block.header, { showHidden: false, depth: 5 }))
      console.log('*************** end block header **********************')
      console.log('*************** start block data **********************')
      let data = block.data.data[0];
      console.log(util.inspect(data, { showHidden: false, depth: 5 }))
      console.log('*************** end block data **********************')
      console.log('*************** start block metadata ****************')
      console.log(util.inspect(block.metadata, { showHidden: false, depth: 5 }))
      console.log('*************** end block metadata ****************')
    });

    // connect to our insurance contract that has been installed / instantiated on IBM Blockchain Platform
    const contract = await network.getContract(config.chaincodeName);

    // const listener = async (event) => {
    //   if (event.eventName === 'newOrder') {
    //     const details = event.payload.toString('utf8');
    //     // Run business process to handle orders
    //   }
    // };
    // contract.addContractListener('TransactionCreatedEvent', listener);

    // AssetCreatedEvent
    // CauseCreatedEvent
    // ParticipantCreatedEvent
    // PersonCreatedEvent
    // TransactionCreatedEvent
    /**
     * @param {String} listenerName the name of the event listener
     * @param {String} eventName the name of the event being listened to
     * @param {Function} callback the callback function with signature (error, event, blockNumber, transactionId, status)
     * @param {module:fabric-network.Network~EventListenerOptions} options
    **/
    await contract.addContractListener('my-contract-listener', '(.*?)', (err, event, blockNumber, transactionId, status) => {
      debugger;
      if (err) {
        console.error(err);
        return;
      }

      //convert event to something we can parse 
      event = event.payload.toString();
      event = JSON.parse(event)

      //where we output the TradeEvent
      console.log('************************ Start Trade Event *******************************************************');
      console.log(`type: ${event.type}`);
      console.log(`ownerId: ${event.ownerId}`);
      console.log(`id: ${event.id}`);
      console.log(`description: ${event.description}`);
      console.log(`status: ${event.status}`);
      console.log(`amount: ${event.amount}`);
      console.log(`buyerId: ${event.buyerId}`);
      console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
      console.log('************************ End Trade Event ************************************');
    });

    // // https://hyperledger.github.io/fabric-sdk-node/release-1.4/tutorial-channel-events.html
    // // var channel_event_hubs = network.getChannel().getChannelEventHubsForOrg();
    // // key:"peer0.org1.example.com:7051"
    // const channelEventHub = network.getChannel().newChannelEventHub('peer0.org1.example.com:7051');
    // // Build the promise to register a event listener with the NodeSDK.
    // // The NodeSDK will then send a request to the peer's channel-based event
    // // service to start sending blocks. The blocks will be inspected to see if
    // // there is a match with a chaincode event listener.
    // let event_monitor = new Promise((resolve, reject) => {
    //   let regid = null;
    //   let handle = setTimeout(() => {
    //     if (regid) {
    //       // might need to do the clean up this listener
    //       channelEventHub.unregisterChaincodeEvent(regid);
    //       console.log('Timeout - Failed to receive the chaincode event');
    //     }
    //     reject(new Error('Timed out waiting for chaincode event'));
    //   }, 20000);

    //   regid = channelEventHub.registerChaincodeEvent(config.chaincodeName, ^evtsender*',
    //     (event, blockNum, txnid, status) => {
    //       // This callback will be called when there is a chaincode event name
    //       // within a block that will match on the second parameter in the registration
    //       // from the chaincode with the ID of the first parameter.
    //       debugger;
    //       console.log('Successfully got a chaincode event with transid:' + txnid + ' with status:' + status);

    //       // might be good to store the block number to be able to resume if offline
    //       storeBlockNumForLater(blockNum);

    //       // to see the event payload, the channel_event_hub must be connected(true)
    //       let eventPayload = event.payload.toString('utf8');
    //       if (eventPayload.indexOf('CHAINCODE') > -1) {
    //         clearTimeout(handle);
    //         // Chaincode event listeners are meant to run continuously
    //         // Therefore the default to automatically unregister is false
    //         // So in this case we want to shutdown the event listener once
    //         // we see the event with the correct payload
    //         channelEventHub.unregisterChaincodeEvent(regid);
    //         console.log('Successfully received the chaincode event on block number ' + blockNum);
    //         resolve('RECEIVED');
    //       } else {
    //         console.log('Successfully got chaincode event ... just not the one we are looking for on block number ' + blockNum);
    //       }
    //     }, (error) => {
    //       clearTimeout(handle);
    //       console.log('Failed to receive the chaincode event ::' + error);
    //       reject(error);
    //     }
    //     // no options specified
    //     // unregister will default to false
    //     // disconnect will default to false
    //   );
    // });

    // // now that we have two promises all set to go... execute them
    // Promise.all([event_monitor]).then((results) => {
    //   console.log(results);
    // });







    // const transaction = contract.newTransaction('TransactionCreated');
    /**
     * @param {String} transactionId the transaction ID
     * @param {Function} callback the callback function with signature (error, transactionId, status, blockNumber)
     * @param {Object} options
    **/
    await transaction.addCommitListener((err, txId, status, blockHeight) => {
      if (err) {
        console.log(err)
        return
      }

      if (status === 'VALID') {
        console.log('transaction committed');
        console.log(util.inspect(txId, { showHidden: false, depth: 5 }))
        console.log(util.inspect(status, { showHidden: false, depth: 5 }))
        console.log(util.inspect(blockHeight, { showHidden: false, depth: 5 }))
        console.log('transaction committed end');
      } else {
        console.log('err transaction failed');
        console.log(status);
      }
    });

    var sellerEmail = "auction@acme.org";
    var sellerName = "ACME";
    var sellerBalance = "100";

    //addSeller - this is the one that will have product to sell on the auction
    const addSellerResponse = await contract.submitTransaction('AddSeller', sellerEmail, sellerName, sellerBalance);

    var memberAEmail = "memberA@acme.org";
    var memberAFirstName = "Amy";
    var memberALastName = "Williams";
    var memberABalance = "1000";

    //addMember - this is the person that can bid on the item
    const addMemberAResponse = await contract.submitTransaction('AddMember', memberAEmail, memberAFirstName, memberALastName, memberABalance);

    var memberBEmail = "memberB@acme.org";
    var memberBFirstName = "Billy";
    var memberBLastName = "Thompson";
    var memberBBalance = "1000";

    //addMember - this is the person that will compete in bids to win the auction
    const addMemberBResponse = await contract.submitTransaction('AddMember', memberBEmail, memberBFirstName, memberBLastName, memberBBalance);

    var productId = "p1";
    var description = "Sample Product";

    //addProduct - add a product that people can bid on
    const addProductResponse = await contract.submitTransaction('AddProduct', productId, description, sellerEmail);

    var listingId = "l1";
    var reservePrice = "50";
    //start the auction
    const startBiddingResponse = await contract.submitTransaction('StartBidding', listingId, reservePrice, productId);

    var memberA_bidPrice = "50";
    //make an offer
    const offerAResponse = await contract.submitTransaction('Offer', memberA_bidPrice, listingId, memberAEmail);

    var memberB_bidPrice = "100";
    const offerBResponse = await contract.submitTransaction('Offer', memberB_bidPrice, listingId, memberBEmail);

    const closebiddingResponse = await contract.submitTransaction('CloseBidding', listingId);
    console.log('closebiddingResponse: ');
    console.log(JSON.parse(closebiddingResponse.toString()));
    console.log('Transaction to close the bidding has been submitted');

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
  }
}

blockContractAndTransactionEvents();
