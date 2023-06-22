#!/usr/bin/env node

import { Arrays, Numbers } from 'cafe-utility'
import { printBalance } from './balance'
import { cancelTransaction } from './cancel'
import { runComposer } from './composer'
import { runCreateCommand } from './create'
import { runDeployer } from './deployer'
import { depositStake } from './deposit-stake'
import { runFunder } from './funder'
import { runRedeem } from './redeem'
import { sendBzz } from './send-bzz'
import { runStatus } from './status'
import { runSwap } from './swap'
import { unlock } from './unlock'

const JSON_RPC = process.env.JSON_RPC

main()

async function main() {
    if (!JSON_RPC) {
        throw Error('Please provide a JSON RPC URL in the JSON_RPC environment variable')
    }
    switch (process.argv[2]) {
        case 'status':
            return runStatus(process.argv[3])
        case 'balance':
            return printBalance(process.argv[3], JSON_RPC).catch(console.error)
        case 'send-bzz':
            return sendBzz(process.argv[3], process.argv[4], Numbers.make(process.argv[5]).toString(), JSON_RPC).catch(
                console.error
            )
        case 'swap':
            return runSwap(
                process.argv[3],
                Arrays.requireNumberArgument(process.argv, 'bzz').toFixed(0),
                JSON_RPC
            ).catch(console.error)
        case 'redeem':
            const amountIn = Arrays.requireNumberArgument(process.argv, 'amountIn').toFixed(0)
            return runRedeem(
                process.argv[3],
                amountIn,
                Arrays.requireNumberArgument(process.argv, 'amountOutMin').toFixed(0),
                JSON_RPC
            )
        case 'deploy':
            return runDeployer(Arrays.requireNumberArgument(process.argv, 'count')).catch(console.error)

        case 'compose':
            return runComposer(
                Arrays.requireStringArgument(process.argv, 'rpc'),
                Arrays.requireNumberArgument(process.argv, 'count')
            )
        case 'fund':
            return runFunder(process.argv[3], JSON_RPC).catch(console.error)
        case 'unlock':
            return unlock(process.argv[3]).catch(console.error)
        case 'stake':
            const amount = Arrays.requireNumberArgument(process.argv, 'amount').toFixed(0)
            return depositStake(
                process.argv[3],
                Arrays.requireNumberArgument(process.argv, 'amount').toFixed(0),
                JSON_RPC
            )
        case 'cancel':
            return cancelTransaction(process.argv[3], Arrays.requireNumberArgument(process.argv, 'nonce'), JSON_RPC)
        case 'create':
            return runCreateCommand(
                process.argv[3],
                Arrays.requireNumberArgument(process.argv, 'count'),
                Arrays.requireStringArgument(process.argv, 'rpc')
            )
    }
}
