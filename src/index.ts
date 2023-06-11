#!/usr/bin/env node

import { Numbers, Types } from 'cafe-utility'
import { printBalance } from './balance'
import { runComposer } from './composer'
import { runDeployer } from './deployer'
import { runFunder } from './funder'
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
                Numbers.make(process.argv[4].split('dai=')[1]).toString(),
                Numbers.make(process.argv[5].split('bzz=')[1]).toString(),
                JSON_RPC
            ).catch(console.error)
        case 'deploy':
            return runDeployer(Types.asNumber(parseInt(process.argv[3], 10))).catch(console.error)
        case 'compose':
            return runComposer(Types.asNumber(parseInt(process.argv[3], 10)))
        case 'fund':
            return runFunder(JSON_RPC).catch(console.error)
        case 'unlock':
            return unlock(process.argv[3]).catch(console.error)
    }
}
