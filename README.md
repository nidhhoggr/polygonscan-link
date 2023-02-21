# Polygonscan Link Generator

## About 

A library to generate polygonscan links. This library is forked from https://github.com/MetaMask/etherscan-link

## Installation

`npm install 'polygonscan-link' -S`

## Usage

```javascript
const polygonscanLink = require('polygonscan-link')
const networkId = '137'
const chainId = '0x89'
const account = '0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825'
const accountLink = polygonscanLink.createAccountLink(account, networkId)
const accountLinkForChain = polygonscanLink.createAccountLinkForChain(account, chainId)

const hash = '0xa7540793de6b6ca7d3c948a8cc0a163bf107f5535a69353162ea9dec7ee7beca'
const txLink = polygonscanLink.createExplorerLink(hash, networkId)
const txtLinkForChain = polygonscanLink.createExplorerLinkForChain(hash, chainId)

const token = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const tokenTrackerLink = polygonscanLink.createTokenTrackerLink(token, networkId)
// You can also track token balances by account
const accountTokenTrackerLink = polygonscanLink.createTokenTrackerLink(token, networkId, account)

const accountTokenTrackerLinkForChain = polygonscanLink.createTokenTrackerLinkForChain(token, chainId, account)

// Create urls for interacting with custom networks
const customNetworkUrl = 'https://customnetwork.com/'

const customtTokenTrackerLink = polygonscanLink.createCustomTokenTrackerLink(token, customNetworkUrl)

const customAccountLink = polygonscanLink.createCustomAccountLink(account, customNetworkUrl)

const customExplorerLink = polygonscanLink.createCustomExplorerLink(hash, customNetworkUrl)

// Generate custom or native block explorer link based on rcpPrefs
const blockExplorerLink = polygonscanLink.getBlockExplorerLink(transaction, rcpPrefs)

// Generate account link for custom or native network 
const getAccountLink = polygonscanLink.getAccountLink(address, chainId, rpcPrefs, networkId)

// Generate token tracker link for custom or native network 
const tokenTrackerLink = polygonscanLink.getTokenTrackerLink(tokenAddress, chainId, networkId, holderAddress, rpcPrefs)
```

## Running tests

```bash
yarn test
```
