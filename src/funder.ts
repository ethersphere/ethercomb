import Big from 'big.js'
import { JsonRpcProvider, Signer, Wallet } from 'ethers'
import { readFile, readdir } from 'fs/promises'

const JSON_RPC = 'https://xdai.fairdatasociety.org'
const FAUCET_PK = process.env.FAUCET_PK

export async function runFunder() {
    if (!FAUCET_PK) {
        console.error('Please provide a faucet private key in the FAUCET_PK environment variable')
        return
    }
    console.log('🔥 Warming up')
    const wallet = new Wallet(FAUCET_PK)
    const provider = await makeReadyProvider(JSON_RPC)
    console.log('\n💰 Checking balance')
    const balance = await provider.getBalance(wallet.address)
    console.log(`${makeDecimalString(balance.toString()).slice(0, 8)} DAI`)
    console.log('\n🔎 Scanning dirs')
    const dirs = await readdir('.')
    const beeDirs = dirs.filter(x => x.startsWith('bee-'))
    console.log(`${beeDirs.length} dirs found`)
    for (const dir of beeDirs) {
        console.log(`\n🐝 ${dir}`)
        await maybeFundNode(dir)
    }
}

async function maybeFundNode(dir: string) {
    const path = `${dir}/keys/swarm.key`
    const password = 'Swarm'
    const { address } = await unlockV3(path, password)
    const provider = await makeReadyProvider(JSON_RPC)
    const balance = await provider.getBalance(address)
    console.log(`   ${makeDecimalString(balance.toString()).slice(0, 8)} DAI`)
    if (balance === BigInt(0)) {
        console.log('💸 Funding')
        await sendNativeTransaction(FAUCET_PK!, address, makeDai('0.01'), JSON_RPC).catch(console.error)
    }
}

async function sendNativeTransaction(privateKey: string, to: string, value: string, jsonRpcProvider: string) {
    const signer = await makeReadySigner(privateKey, jsonRpcProvider)
    const transactionResponse = await signer.sendTransaction({ to, value })
    const receipt = await transactionResponse.wait(1)
    return { transactionResponse, receipt }
}

async function unlockV3(path: string, password: string) {
    const json = await readFile(path, 'utf8')
    const wallet = await Wallet.fromEncryptedJson(json, password)
    const privateKey = wallet.privateKey
    const address = await wallet.getAddress()
    return { privateKey, address }
}

function makeDai(decimalString: string): string {
    return new Big(decimalString).mul(new Big(10).pow(18)).toString()
}

function makeDecimalString(dai: string): string {
    return new Big(dai).div(new Big(10).pow(18)).toString()
}

async function makeReadySigner(privateKey: string, jsonRpcProvider: string): Promise<Signer> {
    const provider = await makeReadyProvider(jsonRpcProvider)
    const signer = new Wallet(privateKey, provider)
    return signer
}

async function makeReadyProvider(jsonRpcProvider: string): Promise<JsonRpcProvider> {
    const provider = new JsonRpcProvider(jsonRpcProvider, 100)
    await provider._detectNetwork()
    return provider
}
