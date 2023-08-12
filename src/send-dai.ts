import { createWallet, sendNativeTransaction } from './common'

export async function sendDai(walletSource: string, toAddress: string, amount: string, jsonRpc: string): Promise<void> {
    const wallet = await createWallet(walletSource)
    await sendNativeTransaction(wallet.privateKey, toAddress, amount, jsonRpc)
}
