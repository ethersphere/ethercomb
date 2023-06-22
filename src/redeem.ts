import { Contract } from 'ethers'
import { ABI } from './abi'
import { approveSpending, makeReadySigner, unlockV3 } from './common'
import { Contracts } from './contracts'

export async function runRedeem(v3Path: string, amountIn: string, amountOutMin: string, jsonRpcProvider: string) {
    const wallet = await unlockV3(v3Path)
    const signer = await makeReadySigner(wallet.privateKey, jsonRpcProvider)
    const gasLimit = 29000000
    await approveSpending(wallet, Contracts.uniswap, amountIn, jsonRpcProvider)
    const contract = new Contract(Contracts.uniswap, ABI.uniswap, signer)
    const WRAPPED_XDAI_CONTRACT = '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d'
    const BZZ_ON_XDAI_CONTRACT = '0xdbf3ea6f5bee45c02255b2c26a16f300502f68da'
    const response = await contract.swapExactTokensForETH(
        amountIn,
        amountOutMin,
        [BZZ_ON_XDAI_CONTRACT, WRAPPED_XDAI_CONTRACT],
        await signer.getAddress(),
        Date.now(),
        { gasLimit }
    )

    return response
}
