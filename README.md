Ethercomb is a CLI tool that automates the process of creating a Docker stack equipped with numerous Bee nodes, all prepared for staking.

## Requirements

You will need a wallet on the Gnosis network (a.k.a. faucet) with a balance of at least 6.0+ xDAI for each Bee node you intend to create.

## Installation

To install Ethercomb globally, use the following `npm` command:

```
npm install --global ethercomb
```

## Usage

This will create a Docker compose file with five Bee nodes, each one with a wallet ready for staking.

```
ethercomb create --wallet $PK --count=5 --rpc $JSON_RPC
```

In the above command, replace `$PK` with your private key and `$JSON_RPC` with your JSON-RPC endpoint.
