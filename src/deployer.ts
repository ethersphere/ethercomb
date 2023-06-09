import { mkdir, writeFile } from 'fs/promises'
import { generateEncryptedWallet } from './common'

export async function runDeployer(numberOfBees: number): Promise<void> {
    for (let i = 1; i <= numberOfBees; i++) {
        await mkdir(`bee-${i}/keys`, { recursive: true })
        const wallet = generateEncryptedWallet('password')
        await writeFile(`bee-${i}/keys/swarm.key`, wallet)
    }
}
