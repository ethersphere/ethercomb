export const ABI = {
    uniswap: [
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'amountOutMin',
                    type: 'uint256'
                },
                {
                    internalType: 'address[]',
                    name: 'path',
                    type: 'address[]'
                },
                {
                    internalType: 'address',
                    name: 'to',
                    type: 'address'
                },
                {
                    internalType: 'uint256',
                    name: 'deadline',
                    type: 'uint256'
                }
            ],
            name: 'swapExactETHForTokens',
            outputs: [
                {
                    internalType: 'uint256[]',
                    name: 'amounts',
                    type: 'uint256[]'
                }
            ],
            stateMutability: 'payable',
            type: 'function'
        }
    ],
    bzz: [
        {
            type: 'function',
            stateMutability: 'nonpayable',
            payable: false,
            outputs: [
                {
                    type: 'bool',
                    name: ''
                }
            ],
            name: 'transfer',
            inputs: [
                {
                    type: 'address',
                    name: '_to'
                },
                {
                    type: 'uint256',
                    name: '_value'
                }
            ],
            constant: false
        },
        {
            constant: true,
            inputs: [
                {
                    name: '_owner',
                    type: 'address'
                }
            ],
            name: 'balanceOf',
            outputs: [
                {
                    name: 'balance',
                    type: 'uint256'
                }
            ],
            payable: false,
            type: 'function'
        }
    ]
}
