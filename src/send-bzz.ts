import { createWallet, sendBzzTransaction } from './common'

export async function sendBzz(walletSource: string, toAddress: string, amount: string, jsonRpc: string): Promise<void> {
    const wallet = await createWallet(walletSource)
    await sendBzzTransaction(wallet.privateKey, toAddress, amount, jsonRpc)
}
