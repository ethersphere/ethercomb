import { bzzToString, createWallet, daiToString, getBzzBalance, makeReadyProvider } from './common'

export async function printBalance(walletSource: string, jsonRpc: string): Promise<void> {
    const wallet = await createWallet(walletSource)
    const provider = await makeReadyProvider(jsonRpc)
    const balance = await provider.getBalance(wallet.address)
    const bzzBalance = await getBzzBalance(wallet.address, jsonRpc)
    console.log(wallet.address)
    console.log(`${daiToString(balance.toString()).slice(0, 8)} DAI`)
    console.log(`${bzzToString(bzzBalance.toString()).slice(0, 8)} BZZ`)
}
