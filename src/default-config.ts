export function createDefaultConfig(apiAddr: number, p2pAddr: number, debugApiAddr: number) {
    return `
api-addr: :${apiAddr}
blockchain-rpc-endpoint: "http://etherproxy:4000"
cors-allowed-origins: ["*"]
debug-api-addr: :${debugApiAddr}
debug-api-enable: true
full-node: true
mainnet: true
network-id: "1"
p2p-addr: :${p2pAddr}
p2p-ws-enable: false
password: "password"
storage-incentives-enable: true
swap-enable: true
swap-endpoint: "http://etherproxy:4000"
swap-initial-deposit: "0"
use-postage-snapshot: false
verbosity: info
data-dir: /home/bee/.bee
`
}
