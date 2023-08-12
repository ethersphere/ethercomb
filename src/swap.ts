import { Numbers } from 'cafe-utility'
import { Contract } from 'ethers'
import { ABI } from './abi'
import { createWallet, makeReadySigner } from './common'

export async function runSwap(walletSource: string, amountOut: string, jsonRpcProvider: string) {
    const wallet = await createWallet(walletSource)
    const signer = await makeReadySigner(wallet.privateKey, jsonRpcProvider)
    const gasLimit = 29000000
    const contract = new Contract('0x1C232F01118CB8B424793ae03F870aa7D0ac7f77', ABI.uniswap, signer)
    const WRAPPED_XDAI_CONTRACT = '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d'
    const BZZ_ON_XDAI_CONTRACT = '0xdbf3ea6f5bee45c02255b2c26a16f300502f68da'
    const response = await contract.swapETHForExactTokens(
        amountOut,
        [WRAPPED_XDAI_CONTRACT, BZZ_ON_XDAI_CONTRACT],
        await signer.getAddress(),
        Date.now(),
        {
            value: amountOut + '00',
            gasLimit,
            type: 2,
            maxFeePerGas: Numbers.make('2gwei'),
            maxPriorityFeePerGas: Numbers.make('1gwei')
        }
    )
    console.log({ response })
    return response
}
