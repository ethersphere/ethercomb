import { makeReadySigner, unlockV3 } from './common'

export async function cancelTransaction(v3Path: string, nonce: number, jsonRpcProvider: string): Promise<void> {
    const wallet = await unlockV3(v3Path)
    const signer = await makeReadySigner(wallet.privateKey, jsonRpcProvider)
    const gasLimit = 21_000
    await signer.sendTransaction({
        nonce,
        gasLimit,
        value: '0',
        data: '0x',
        gasPrice: 1000000001,
        to: await signer.getAddress()
    })
}
