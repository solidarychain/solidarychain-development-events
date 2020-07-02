#!/bin/bash

# when wallet is not updated
# prevent bellow error
# endorsement failed - Error: 2 UNKNOWN: access denied: channel [channelall] creator org [Org1MSP]
# error: [Channel.js]: Channel:channelall received discovery error:access denied
# error: [Channel.js]: Error: Channel:channelall Discovery error:access denied
# error: [Network]: _initializeInternalChannel: Unable to initialize channel. Attempted to contact 1 Peers. Last error was Error: Channel:channelall Discovery error:access denied

rm local_fabric_wallet_solidary_chain/admin/*
# rm local_fabric_wallet_solidary_chain/user1/*
cp ../../../solidarynetwork-development-monorepo/network/generated/wallets/.hfc-org1/* local_fabric_wallet_solidary_chain/admin/
