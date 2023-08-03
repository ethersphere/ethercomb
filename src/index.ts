#!/usr/bin/env node

import { Arrays } from 'cafe-utility'
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

main()

async function main() {
    const command = process.argv[2]
    switch (command) {
        case 'status':
            return runStatus(Arrays.requireStringArgument(process.argv, 'yaml'))
        case 'balance':
            return printBalance(
                Arrays.requireStringArgument(process.argv, 'wallet'),
                Arrays.requireStringArgument(process.argv, 'rpc')
            ).catch(console.error)
        case 'send-bzz':
            return sendBzz(
                Arrays.requireStringArgument(process.argv, 'wallet'),
                Arrays.requireStringArgument(process.argv, 'to'),
                Arrays.requireNumberArgument(process.argv, 'amount').toFixed(0),
                Arrays.requireStringArgument(process.argv, 'rpc')
            ).catch(console.error)
        case 'swap':
            return runSwap(
                Arrays.requireStringArgument(process.argv, 'wallet'),
                Arrays.requireNumberArgument(process.argv, 'bzz').toFixed(0),
                Arrays.requireStringArgument(process.argv, 'rpc')
            ).catch(console.error)
        case 'redeem':
            return runRedeem(
                Arrays.requireStringArgument(process.argv, 'wallet'),
                Arrays.requireNumberArgument(process.argv, 'amountIn').toFixed(0),
                Arrays.requireNumberArgument(process.argv, 'amountOutMin').toFixed(0),
                Arrays.requireStringArgument(process.argv, 'rpc')
            )
        case 'deploy':
            return runDeployer(Arrays.requireNumberArgument(process.argv, 'count')).catch(console.error)
        case 'compose':
            return console.log(
                runComposer(
                    Arrays.requireStringArgument(process.argv, 'rpc'),
                    Arrays.requireNumberArgument(process.argv, 'count')
                )
            )
        case 'fund':
            return runFunder(
                Arrays.requireStringArgument(process.argv, 'wallet'),
                Arrays.requireStringArgument(process.argv, 'rpc')
            ).catch(console.error)
        case 'unlock':
            return unlock(Arrays.requireStringArgument(process.argv, 'wallet')).catch(console.error)
        case 'stake':
            return depositStake(
                Arrays.requireStringArgument(process.argv, 'wallet'),
                Arrays.requireNumberArgument(process.argv, 'amount').toFixed(0),
                Arrays.requireStringArgument(process.argv, 'rpc')
            )
        case 'cancel':
            return cancelTransaction(
                Arrays.requireStringArgument(process.argv, 'wallet'),
                Arrays.requireNumberArgument(process.argv, 'nonce'),
                Arrays.requireStringArgument(process.argv, 'rpc')
            )
        case 'create':
            return runCreateCommand(
                Arrays.requireStringArgument(process.argv, 'wallet'),
                Arrays.requireNumberArgument(process.argv, 'count'),
                Arrays.requireStringArgument(process.argv, 'rpc')
            )
    }
}
