import { getBeeDirectories, makeReadyProvider, sendNativeTransaction, unlockV3 } from './common'
import { MINIMUM_XDAI_ON_ADDRESS, XDAI_TO_SEND } from './constants'

export async function runFunder(privateKey: string, jsonRpc: string) {
    const password = 'password'
    const dirs = await getBeeDirectories()
    console.log(`Found ${dirs.length} Bee nodes that maybe require funding`)
    const addresses = []
    for (const dir of dirs) {
        const address = await getAddressIfRequiresFunding(password, dir, jsonRpc)
        if (address) {
            addresses.push(address)
        }
    }
    console.log(`${addresses.length} out of the ${dirs.length} addresses require funding`)
    await fundAddresses(privateKey, addresses, jsonRpc)
}

async function getAddressIfRequiresFunding(password: string, dir: string, jsonRpc: string): Promise<string | null> {
    const path = `${dir}/keys/swarm.key`
    const { address } = await unlockV3(path, password)
    const provider = await makeReadyProvider(jsonRpc)
    const balance = await provider.getBalance(address)
    if (balance < MINIMUM_XDAI_ON_ADDRESS) {
        console.log(`Address ${address} requires funding, current balance is ${balance}`)
        return address
    }
    console.log(`Address ${address} does not require funding, current balance is ${balance}`)
    return null
}

async function fundAddresses(privateKey: string, addresses: string[], jsonRpc: string) {
    for (const address of addresses) {
        console.log('Funding address', address)
        await sendNativeTransaction(privateKey, address, XDAI_TO_SEND.toFixed(0), jsonRpc)
    }
}
