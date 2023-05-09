import { Numbers, Types } from 'cafe-utility'

export function runComposer() {
    const numberOfBees = parseInt(process.argv[3], 10)
    if (!Types.isNumber(numberOfBees)) {
        console.error('Please provide a number of bees')
        return
    }
    const preBee = `services:`
    const postBee = `
    bee-dashboard:
        image: cafe137/bee-dashboard
        ports:
            - 8080:8080
        networks:
            - public

    gateway-proxy:
        image: cafe137/gateway-proxy
        ports:
            - 3000:3000
        networks:
            - public
        volumes:
            - ./proxy:/usr/src/config


networks:
    public:
`
    console.log(
        preBee +
            Numbers.range(0, numberOfBees - 1)
                .map(createBeeSnippet)
                .join('') +
            postBee +
            createVolumeSnippet(numberOfBees)
    )
}

function createBeeSnippet(zeroBasedIndex: number): string {
    const portIndex = 163 + zeroBasedIndex
    return `
    bee-${zeroBasedIndex + 1}:
        image: ethersphere/bee
        command: start --password=Swarm --blockchain-rpc-endpoint=https://xdai.fairdatasociety.org --debug-api-enable=true --cors-allowed-origins="*" --api-addr=:${portIndex}3 --p2p-addr=:${portIndex}4 --debug-api-addr=:${portIndex}5
        ports:
            - ${portIndex}3:${portIndex}3
            - ${portIndex}4:${portIndex}4
            - ${portIndex}5:${portIndex}5
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
