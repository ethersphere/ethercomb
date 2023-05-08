#!/usr/bin/env node

import { runComposer } from './composer'
import { runFunder } from './funder'

main()

async function main() {
    if (process.argv[2] === 'compose') {
        runComposer()
    } else if (process.argv[2] === 'fund') {
        await runFunder().catch(console.error)
    } else {
        console.error('Please provide a command (compose or fund)')
    }
}
