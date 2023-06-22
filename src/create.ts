import { Numbers, System } from 'cafe-utility'
import { writeFile } from 'fs/promises'
import { getBzzBalance, sendBzzTransaction, swap, unlockV3 } from './common'
import { runComposer } from './composer'
import { XDAI_TO_SEND } from './constants'
import { runDeployer } from './deployer'
import { depositStake } from './deposit-stake'
import { runFunder } from './funder'

export async function runCreateCommand(v3Path: string, amountOfBees: number, swapEndpoint: string) {
    console.log(`Creating stack of ${amountOfBees} staking Bee nodes.`)
    console.log('Here is a rundown of the steps that will be performed:')
    console.log('')
    console.log('  1. Creating a new wallet for each node.')
    console.log(`  2. Funding each node with ${XDAI_TO_SEND} xDAI.`)
    console.log('  3. Swapping xDAI to xBZZ for funding Bee wallets.')
    console.log('  4. Sending xBZZ to the Bee wallets.')
    console.log('  5. Permitting xBZZ spend and depositing initial stake of 10 xBZZ.')
    console.log('  6. Generating docker-compose.yaml.')
    console.log('')
    console.log('Please unlock your V3 wallet so these can be done for you automatically.')
    const wallet = await unlockV3(v3Path)
    printSeparator()
    console.log('Step 1.) Creating a new wallet for each node.')
    await runDeployer(amountOfBees)
    printSeparator()
    console.log(`Step 2.) Funding each node with ${XDAI_TO_SEND} xDAI.`)
    await runFunder(wallet.privateKey, swapEndpoint)
    printSeparator()
    console.log('Step 3.) Swapping xDAI to xBZZ for funding Bee wallets.')
    const bzzBalance = await getBzzBalance(wallet.address, swapEndpoint)
    if (bzzBalance >= Numbers.make('10.05bzz') * amountOfBees) {
        console.log('You already have enough xBZZ to fund the Bee wallets.')
    } else {
        await swap(
            wallet.privateKey,
            (Numbers.make('5dai') * amountOfBees).toFixed(0),
            (Numbers.make('10.1bzz') * amountOfBees).toFixed(0),
            swapEndpoint
        )
        for (let i = 0; i < 30; i++) {
            console.log(`Waiting for xBZZ to arrive (${i + 1}/30)`)
            const bzzBalance = await getBzzBalance(wallet.address, swapEndpoint)
            if (bzzBalance >= Numbers.make('10.05bzz') * amountOfBees) {
                break
            }
            await System.sleepMillis(3_000)
        }
    }
    printSeparator()
    console.log('Step 4.) Sending xBZZ to the Bee wallets.')
    for (let i = 1; i <= amountOfBees; i++) {
        const beeWallet = await unlockV3(`./bee-${i}/keys/swarm.key`, 'password')
        const address = beeWallet.address
        const balance = await getBzzBalance(address, swapEndpoint)
        if (balance >= Numbers.make('10.025bzz')) {
            console.log(`Address ${address} already has enough xBZZ.`)
        } else {
            await sendBzzTransaction(wallet.privateKey, address, Numbers.make('10.05bzz').toFixed(0), swapEndpoint)
        }
    }
    printSeparator()
    console.log('Step 5.) Permitting xBZZ spend and depositing initial stake of 10 xBZZ.')
    for (let i = 1; i <= amountOfBees; i++) {
        const beeWallet = await unlockV3(`./bee-${i}/keys/swarm.key`, 'password')
        await depositStake(beeWallet.privateKey, Numbers.make('10.025bzz').toFixed(0), swapEndpoint)
    }
    printSeparator()
    console.log('Step 6.) Generating docker-compose.yaml.')
    await writeFile('docker-compose.yaml', runComposer(swapEndpoint, amountOfBees), 'utf8')
    printSeparator()
    console.log('Now you only need to launch the stack with `docker compose up`.')
}

function printSeparator() {
    console.log('')
    console.log('---')
    console.log('')
}
