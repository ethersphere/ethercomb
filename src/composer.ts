import { Numbers } from 'cafe-utility'

export function runComposer(swapEndpoint: string, numberOfBees: number): string {
    const preBee = `services:`
    const postBee = `
    etherproxy:
        image: cafe137/etherproxy:1.0.3
        networks:
            - public
        environment:
            PORT: 4000
            TARGET: ${swapEndpoint}

networks:
    public:
`
    const string =
        preBee +
        Numbers.range(0, numberOfBees - 1)
            .map(createBeeSnippet)
            .join('') +
        postBee +
        createVolumeSnippet(numberOfBees)
    return string
}

function createBeeSnippet(zeroBasedIndex: number): string {
    const portIndex = zeroBasedIndex + 1
    return `
    bee-${zeroBasedIndex + 1}:
        image: ethersphere/bee
        command: start --config=/home/bee/.bee/config.yaml
        ports:
            - ${1700 + portIndex}:${1700 + portIndex}
            - ${1800 + portIndex}:${1800 + portIndex}
            - ${1900 + portIndex}:${1900 + portIndex}
        networks:
            - public
        volumes:
            - ./bee-${zeroBasedIndex + 1}:/home/bee/.bee
`
}

function createVolumeSnippet(numberOfBees: number): string {
    return `
volumes:
    proxy:
${Numbers.range(1, numberOfBees)
    .map(x => `    bee-${x}:`)
    .join('\n')}
`
}
