import { sendBzzTransaction, unlockV3 } from './common'

export async function sendBzz(v3Path: string, toAddress: string, amount: string, jsonRpc: string): Promise<void> {
    const wallet = await unlockV3(v3Path)
    await sendBzzTransaction(wallet.privateKey, toAddress, amount, jsonRpc)
}
