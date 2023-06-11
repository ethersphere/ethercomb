import { Wallet } from 'ethers'
import { bzzToString, daiToString, getBzzBalance, makeReadyProvider, unlockV3 } from './common'

export async function printBalance(wallet: Wallet | string, jsonRpc: string): Promise<void> {
    if (typeof wallet === 'string') {
        wallet = await unlockV3(wallet)
    }
    const provider = await makeReadyProvider(jsonRpc)
    const balance = await provider.getBalance(wallet.address)
    const bzzBalance = await getBzzBalance(wallet.address, jsonRpc)
    console.log(wallet.address)
    console.log(`${daiToString(balance.toString()).slice(0, 8)} DAI`)
    console.log(`${bzzToString(bzzBalance.toString()).slice(0, 8)} BZZ`)
}
