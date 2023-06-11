import Big from 'big.js'
import { Strings, System } from 'cafe-utility'
import { Contract, JsonRpcProvider, Signer, Wallet } from 'ethers'
import { readFile, readdir } from 'fs/promises'
import { ABI } from './abi'
import { NETWORK_ID } from './network-id'
import { promptForPassword } from './promp'

export function getFaucetWallet(): Wallet {
    const FAUCET_PK = process.env.FAUCET_PK
    if (!FAUCET_PK) {
        throw Error('Please provide a faucet private key in the FAUCET_PK environment variable')
    }
    return new Wallet(FAUCET_PK)
}

export function stringToDai(decimalString: string): string {
    return new Big(decimalString).mul(new Big(10).pow(18)).toString()
}

export function daiToString(dai: string): string {
    return new Big(dai).div(new Big(10).pow(18)).toString()
}

export function stringToBzz(decimalString: string): string {
    return new Big(decimalString).mul(new Big(10).pow(16)).toString()
}

export function bzzToString(dai: string): string {
    return new Big(dai).div(new Big(10).pow(16)).toString()
}

export async function makeReadySigner(privateKey: string, jsonRpcProvider: string): Promise<Signer> {
    const provider = await makeReadyProvider(jsonRpcProvider)
    const signer = new Wallet(privateKey, provider)
    return signer
}

export async function makeReadyProvider(jsonRpcProvider: string): Promise<JsonRpcProvider> {
    const provider = new JsonRpcProvider(jsonRpcProvider, NETWORK_ID)
    await provider._detectNetwork()
    return provider
}

export async function unlockV3(path: string): Promise<Wallet> {
    const json = await readFile(path, 'utf8')
    try {
        JSON.parse(json)
    } catch {
        return new Wallet(json)
    }
    const password = await promptForPassword()
    const wallet = (await Wallet.fromEncryptedJson(json, password)) as Wallet
    return wallet
}

export async function sendNativeTransaction(privateKey: string, to: string, value: string, jsonRpcProvider: string) {
    const signer = await makeReadySigner(privateKey, jsonRpcProvider)
    console.log(`Sending ${daiToString(value)} DAI to ${to}`)
    const transactionResponse = await signer.sendTransaction({ to, value })
    console.log(`Transaction hash: ${transactionResponse.hash}`)
    for (let i = 0; i < 30; i++) {
        console.log(`Waiting for tokens to arrive (${i + 1}/30)`)
        const provider = await makeReadyProvider(jsonRpcProvider)
        const balance = await provider.getBalance(to)
        if (balance !== BigInt(0)) {
            console.log(`Tokens arrived!`)
            break
        }
        await System.sleepMillis(1000)
    }
    return transactionResponse
}

export function generateEncryptedWallet(password: string): string {
    const wallet = new Wallet(Strings.randomHex(64))
    return wallet.encryptSync(password)
}

export async function getBeeDirectories(): Promise<string[]> {
    const dirs = await readdir('.')
    return dirs.filter(x => x.startsWith('bee-'))
}

export async function sendBzzTransaction(privateKey: string, to: string, value: string, jsonRpcProvider: string) {
    const signer = await makeReadySigner(privateKey, jsonRpcProvider)
    const bzz = new Contract('0xdBF3Ea6F5beE45c02255B2c26a16F300502F68da', ABI.bzz, signer)
    console.log('Sending BZZ tx...')
    const transaction = await bzz.transfer(to, value)
    console.log('Waiting on BZZ tx...')
    const receipt = await transaction.wait(1)
    return { transaction, receipt }
}

export async function swap(privateKey: string, value: string, minimumReturnValue: string, jsonRpcProvider: string) {
    const signer = await makeReadySigner(privateKey, jsonRpcProvider)
    const gasLimit = 29000000
    const contract = new Contract('0x1C232F01118CB8B424793ae03F870aa7D0ac7f77', ABI.uniswap, signer)
    const WRAPPED_XDAI_CONTRACT = '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d'
    const BZZ_ON_XDAI_CONTRACT = '0xdbf3ea6f5bee45c02255b2c26a16f300502f68da'
    const response = await contract.swapExactETHForTokens(
        minimumReturnValue,
        [WRAPPED_XDAI_CONTRACT, BZZ_ON_XDAI_CONTRACT],
        await signer.getAddress(),
        Date.now(),
        { value, gasLimit }
    )

    return response
}

export async function getBzzBalance(address: string, jsonRpcProvider: string) {
    const provider = await makeReadyProvider(jsonRpcProvider)
    const bzz = new Contract('0xdBF3Ea6F5beE45c02255B2c26a16F300502F68da', ABI.bzz, provider)
    const bigNumberBalance = await bzz.balanceOf(address)
    return bigNumberBalance.toString()
}
