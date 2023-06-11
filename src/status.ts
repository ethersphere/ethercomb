import chalk from 'chalk'
import { readFile } from 'fs/promises'
import { load } from 'js-yaml'

export async function runStatus(path: string): Promise<void> {
    const yaml = load(await readFile(path, 'utf-8')) as Record<string, unknown>
    if (!yaml['swap-endpoint'] && !yaml['blockchain-rpc-endpoint']) {
        console.log(`${chalk.red('ERROR')} Specify either swap-endpoint or blockchain-rpc-endpoint`)
    } else {
        console.log(`${chalk.green('OK')} swap-endpoint or blockchain-rpc-endpoint is specified`)
    }
    checkForEnabledFeature(yaml, 'swap-enable')
    checkForEnabledFeature(yaml, 'full-node')
    checkForEnabledFeature(yaml, 'storage-incentives-enable')
}

function checkForEnabledFeature(yaml: Record<string, unknown>, feature: string): void {
    if (yaml[feature] !== true && yaml[feature] !== 'true') {
        console.log(`${chalk.red('ERROR')} Specify ${feature}: true`)
    } else {
        console.log(`${chalk.green('OK')} ${feature}: ${yaml[feature]}`)
    }
}
