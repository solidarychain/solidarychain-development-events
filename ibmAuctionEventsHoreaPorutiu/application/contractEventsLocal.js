//Import Hyperledger Fabric 1.4 programming model - fabric-network
'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

// change CHAINCODE_NAME to work with diferent chaincodes 
// const CHAINCODE_NAME = 'auction';
const CHAINCODE_NAME = 'solidary-network-chaincode';

//connect to the config file
const configPath = path.join(process.cwd(), './configLocal.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

// connect to the local connection file
const ccpPath = path.join(process.cwd(), 'local_fabric_connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const connectionProfile = JSON.parse(ccpJSON);

//A wallet stores a collection of identities for use with local wallet
const walletPath = path.join(process.cwd(), './local_fabric_wallet');
const wallet = new FileSystemWallet(walletPath);
console.log(`Wallet path: ${walletPath}`);

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
    const network = await gateway.getNetwork('mychannel');

    // // NEW: https://hyperledger.github.io/fabric-sdk-node/release-1.4/tutorial-channel-events.html
    // const client = gateway.getClient();
    // const channel = client.getChannel('mychannel');
    // console.log('Got addressability to channel');
    // // console.log(channel.getChannelEventHubsForOrg());
    // const channel_event_hub = channel.getChannelEventHub('peer0.org1.example.com:17051');
    // const user = await client.getUserContext('admin', true);
    // // Once you have a ChannelEventHub instance you will need to connect to the peer's event service.
    // channel_event_hub.connect({ full_block: false }, (error, status) => {
    //   if (error) {
    //     console.log('channel_event_hub.connect: process the error', error);
    //   } else {
    //     console.log('channel_event_hub.connect: connect was good');
    //   }
    // });

    //connect to our insurance contract that has been installed / instantiated on IBM Blockchain Platform
    const contract = await network.getContract(CHAINCODE_NAME);
    // NEW
    // console.log(contract);

    // TradeEvent | (.*?)
    await contract.addContractListener('my-contract-listener', '(.*?)', (err, event, blockNumber, transactionId, status) => {
      if (err) {
        console.error(err);
        return;
      }

      //convert event to something we can parse 
      event = event.payload.toString();
      event = JSON.parse(event)

      //where we output the TradeEvent
      console.log('************************ Start Trade Event *******************************************************');
      console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
      if (CHAINCODE_NAME === 'solidary-network-chaincode') {
        console.log(JSON.stringify(event, undefined, 2));
      } else {
        console.log(`type: ${event.type}`);
        console.log(`ownerId: ${event.ownerId}`);
        console.log(`id: ${event.id}`);
        console.log(`description: ${event.description}`);
        console.log(`status: ${event.status}`);
        console.log(`amount: ${event.amount}`);
        console.log(`buyerId: ${event.buyerId}`);
        console.log('************************ End Trade Event ************************************');
      }
    });

    if (CHAINCODE_NAME === 'solidary-network-chaincode') {
      // // Build the promise to register a event listener with the NodeSDK.
      // // The NodeSDK will then send a request to the peer's channel-based event
      // // service to start sending blocks. The blocks will be inspected to see if
      // // there is a match with a chaincode event listener.
      // let event_monitor = new Promise((resolve, reject) => {
      //   let regid = null;
      //   let handle = setTimeout(() => {
      //     if (regid) {
      //       // might need to do the clean up this listener
      //       channel_event_hub.unregisterChaincodeEvent(regid);
      //       console.log('Timeout - Failed to receive the chaincode event');
      //     }
      //     reject(new Error('Timed out waiting for chaincode event'));
      //   }, 20000);

      //   regid = channel_event_hub.registerChaincodeEvent(CHAINCODE_NAME/*chaincode_id.toString()*/, '(.*?)'/*'^evtsender*'*/,
      //     (event, block_num, txnid, status) => {
      //       // This callback will be called when there is a chaincode event name
      //       // within a block that will match on the second parameter in the registration
      //       // from the chaincode with the ID of the first parameter.
      //       console.log('Successfully got a chaincode event with transid:' + txnid + ' with status:' + status);

      //       // might be good to store the block number to be able to resume if offline
      //       storeBlockNumForLater(block_num);

      //       // to see the event payload, the channel_event_hub must be connected(true)
      //       let event_payload = event.payload.toString('utf8');
      //       if (event_payload.indexOf('CHAINCODE') > -1) {
      //         clearTimeout(handle);
      //         // Chaincode event listeners are meant to run continuously
      //         // Therefore the default to automatically unregister is false
      //         // So in this case we want to shutdown the event listener once
      //         // we see the event with the correct payload
      //         channel_event_hub.unregisterChaincodeEvent(regid);
      //         console.log('Successfully received the chaincode event on block number ' + block_num);
      //         resolve('RECEIVED');
      //       } else {
      //         console.log('Successfully got chaincode event ... just not the one we are looking for on block number ' + block_num);
      //       }
      //     }, (error) => {
      //       clearTimeout(handle);
      //       console.log('Failed to receive the chaincode event ::' + error);
      //       reject(error);
      //     }
      //     // no options specified
      //     // startBlock will default to latest
      //     // endBlock will default to MAX
      //     // unregister will default to false
      //     // disconnect will default to false
      //   );
      // }).then((data) => {
      //   console.log(data);
      // }).catch((error) => {
      //   console.error(error);
      // });
      // // build the promise to send the proposals to the orderer
      // let send_trans = channel.sendTransaction({ proposalResponses: results[0], proposal: results[1] });
      // // now that we have two promises all set to go... execute them
      // return Promise.all([event_monitor, send_trans]).then((results) => {
      //   console.log(results);
      // });

      // const addParticipantResponseGov = await contract.submitTransaction('participant_createWithParameters', 'c8ca045c-9d1b-407f-b9ae-31711758f2d0', 'gov', 'Big Government');
      for (let i = 0; i < 28; i++) {
        const id = makeid(5);
        // console.log(`participant_createWithParameters: ${id}`);
        const res = await contract.submitTransaction('participant_createWithParameters', `4ea88521-031b-4279-9165-9c10e18${id}`, `cod${id}`, `Participant ${id}`);
      }
    } else {
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