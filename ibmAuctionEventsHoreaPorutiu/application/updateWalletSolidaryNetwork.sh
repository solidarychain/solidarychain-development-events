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

rm local_fabric_wallet_solidary_chain_hurley/admin/*
rm local_fabric_wallet_solidary_chain_hurley/user1/*
cp ~/hyperledger-fabric-network/.hfc-org1/admin local_fabric_wallet_solidary_chain_hurley/admin/
cp ~/hyperledger-fabric-network/.hfc-org1/bb423ce55537cdedbbf76745d72c3d5afd058106756199c1639e8443ddf3a160-* local_fabric_wallet_solidary_chain_hurley/admin/
cp ~/hyperledger-fabric-network/.hfc-org1/user1 local_fabric_wallet_solidary_chain_hurley/admin/
cp ~/hyperledger-fabric-network/.hfc-org1/064f7ed9cc94cae24040518782d41f4f3c50802769dc54abe19bf3b16ae474e6-* local_fabric_wallet_solidary_chain_hurley/admin/

