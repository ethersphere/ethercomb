#!/usr/bin/env node

import { Numbers, Types } from 'cafe-utility'
import { printBalance } from './balance'
import { stringToBzz, stringToDai } from './common'
import { runComposer } from './composer'
import { runDeployer } from './deployer'
import { runFunder } from './funder'
import { sendBzz } from './send-bzz'
import { runSwap } from './swap'

const JSON_RPC = process.env.JSON_RPC

main()

async function main() {
    switch (process.argv[2]) {
        case 'balance':
            return printBalance(process.argv[3], JSON_RPC).catch(console.error)
        case 'send-bzz':
            return sendBzz(process.argv[3], process.argv[4], Numbers.make(process.argv[5]).toString(), JSON_RPC).catch(
                console.error
            )
        case 'swap':
            const amount = Types.asNumber(parseInt(process.argv[3], 10))
            return runSwap(stringToDai(amount.toString()), stringToBzz((amount * 2).toString()), JSON_RPC).catch(
                console.error
            )
        case 'deploy':
            return runDeployer(Types.asNumber(parseInt(process.argv[3], 10))).catch(console.error)
        case 'compose':
            return runComposer(Types.asNumber(parseInt(process.argv[3], 10)))
        case 'fund':
            return runFunder(JSON_RPC).catch(console.error)
    }
}
