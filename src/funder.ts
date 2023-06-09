import {
    getBeeDirectories,
    getFaucetWallet,
    makeReadyProvider,
    sendNativeTransaction,
    stringToDai,
    unlockV3
} from './common'

export async function runFunder(jsonRpc: string) {
    const wallet = getFaucetWallet()
    const password = 'password' // TODO
    const dirs = await getBeeDirectories()
    console.log(`${dirs.length} dirs found`)
    const addresses = []
    for (const dir of dirs) {
        const address = await getAddressIfRequiresFunding(password, dir, jsonRpc)
        if (address) {
            addresses.push(address)
        }
    }
    console.log(`${addresses.length} addresses require funding`)
    console.log(addresses)
    await fundAddresses(wallet.privateKey, addresses, jsonRpc)
}

async function getAddressIfRequiresFunding(password: string, dir: string, jsonRpc: string): Promise<string | null> {
    const path = `${dir}/keys/swarm.key`
    const { address } = await unlockV3(path)
    const provider = await makeReadyProvider(jsonRpc)
    const balance = await provider.getBalance(address)
    if (balance === BigInt(0)) {
        return address
    }
    return null
}

async function fundAddresses(privateKey: string, addresses: string[], jsonRpc: string) {
    for (const address of addresses) {
        await sendNativeTransaction(privateKey, address, stringToDai('0.004'), jsonRpc)
    }
}
