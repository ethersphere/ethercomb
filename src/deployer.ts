import { Files } from 'cafe-node-utility'
import { mkdir, writeFile } from 'fs/promises'
import { generateEncryptedWallet } from './common'
import { createDefaultConfig } from './default-config'

export async function runDeployer(numberOfBees: number): Promise<void> {
    for (let i = 1; i <= numberOfBees; i++) {
        if (await Files.existsAsync(`bee-${i}/keys/swarm.key`)) {
            console.log(`Skipping bee-${i} because it already exists.`)
            continue
        }
        console.log(`Creating private key and config.yaml for bee-${i}...`)
        await mkdir(`bee-${i}/keys`, { recursive: true })
        const wallet = generateEncryptedWallet('password')
        await writeFile(`bee-${i}/keys/swarm.key`, wallet)
        await writeFile(`bee-${i}/config.yaml`, createDefaultConfig(1700 + i, 1800 + i, 1900 + i))
    }
}
