import { Numbers } from 'cafe-utility'
import { Contract } from 'ethers'
import { ABI } from './abi'
import { approveSpending, createWallet, makeReadySigner } from './common'
import { Contracts } from './contracts'

const NONCE = '0x0000000000000000000000000000000000000000000000000000000000000000'

export async function depositStake(walletSource: string, amount: string, jsonRpcProvider: string) {
    const wallet = await createWallet(walletSource)
    const signer = await makeReadySigner(wallet.privateKey, jsonRpcProvider)
    await approveSpending(wallet, Contracts.staking, amount, jsonRpcProvider)
    const staking = new Contract(Contracts.staking, ABI.staking, signer)
    console.log(`Executing depositStake with ${amount} BZZ...`)
    const transaction = await staking.depositStake(wallet.address, NONCE, amount, {
        gasLimit: 400_000,
        type: 2,
        maxFeePerGas: Numbers.make('2gwei'),
        maxPriorityFeePerGas: Numbers.make('1gwei')
    })
    console.log('Waiting on depositStake tx...')
    const receipt = await transaction.wait(1)
    return { transaction, receipt }
}
