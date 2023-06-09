import { prompt } from 'inquirer'

export async function promptForPassword(): Promise<string> {
    const value = await prompt({
        type: 'password',
        name: 'value',
        message: 'Enter password: '
    }).then(x => x.value)
    return value
}
