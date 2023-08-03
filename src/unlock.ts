import { createWallet } from './common'

export async function unlock(walletSource: string): Promise<void> {
    const wallet = await createWallet(walletSource)
    console.log(wallet.privateKey)
}
