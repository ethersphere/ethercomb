import { unlockV3 } from './common'

export async function unlock(path: string): Promise<void> {
    const wallet = await unlockV3(path)
    console.log(wallet.privateKey)
}
