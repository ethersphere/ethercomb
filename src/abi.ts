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
        },
        {
            type: 'function',
            stateMutability: 'payable',
            outputs: [{ type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' }],
            name: 'swapETHForExactTokens',
            inputs: [
                { type: 'uint256', name: 'amountOut', internalType: 'uint256' },
                { type: 'address[]', name: 'path', internalType: 'address[]' },
                { type: 'address', name: 'to', internalType: 'address' },
                { type: 'uint256', name: 'deadline', internalType: 'uint256' }
            ]
        },
        {
            type: 'function',
            stateMutability: 'nonpayable',
            outputs: [{ type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' }],
            name: 'swapExactTokensForETH',
            inputs: [
                { type: 'uint256', name: 'amountIn', internalType: 'uint256' },
                { type: 'uint256', name: 'amountOutMin', internalType: 'uint256' },
                { type: 'address[]', name: 'path', internalType: 'address[]' },
                { type: 'address', name: 'to', internalType: 'address' },
                { type: 'uint256', name: 'deadline', internalType: 'uint256' }
            ]
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
    ],
    staking: [
        {
            type: 'constructor',
            inputs: [
                { type: 'address', name: '_bzzToken', internalType: 'address' },
                { type: 'uint64', name: '_NetworkId', internalType: 'uint64' }
            ]
        },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
            name: 'DEFAULT_ADMIN_ROLE',
            inputs: []
        },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
            name: 'PAUSER_ROLE',
            inputs: []
        },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
            name: 'REDISTRIBUTOR_ROLE',
            inputs: []
        },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'address', name: '', internalType: 'address' }],
            name: 'bzzToken',
            inputs: []
        },
        {
            type: 'function',
            stateMutability: 'nonpayable',
            outputs: [],
            name: 'depositStake',
            inputs: [
                { type: 'address', name: '_owner', internalType: 'address' },
                { type: 'bytes32', name: 'nonce', internalType: 'bytes32' },
                { type: 'uint256', name: 'amount', internalType: 'uint256' }
            ]
        },
        {
            type: 'function',
            stateMutability: 'nonpayable',
            outputs: [],
            name: 'freezeDeposit',
            inputs: [
                { type: 'bytes32', name: 'overlay', internalType: 'bytes32' },
                { type: 'uint256', name: 'time', internalType: 'uint256' }
            ]
        },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
            name: 'getRoleAdmin',
            inputs: [{ type: 'bytes32', name: 'role', internalType: 'bytes32' }]
        },
        {
            type: 'function',
            stateMutability: 'nonpayable',
            outputs: [],
            name: 'grantRole',
            inputs: [
                { type: 'bytes32', name: 'role', internalType: 'bytes32' },
                { type: 'address', name: 'account', internalType: 'address' }
            ]
        },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
            name: 'hasRole',
            inputs: [
                { type: 'bytes32', name: 'role', internalType: 'bytes32' },
                { type: 'address', name: 'account', internalType: 'address' }
            ]
        },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
            name: 'lastUpdatedBlockNumberOfOverlay',
            inputs: [{ type: 'bytes32', name: 'overlay', internalType: 'bytes32' }]
        },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'address', name: '', internalType: 'address' }],
            name: 'ownerOfOverlay',
            inputs: [{ type: 'bytes32', name: 'overlay', internalType: 'bytes32' }]
        },
        { type: 'function', stateMutability: 'nonpayable', outputs: [], name: 'pause', inputs: [] },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
            name: 'paused',
            inputs: []
        },
        {
            type: 'function',
            stateMutability: 'nonpayable',
            outputs: [],
            name: 'renounceRole',
            inputs: [
                { type: 'bytes32', name: 'role', internalType: 'bytes32' },
                { type: 'address', name: 'account', internalType: 'address' }
            ]
        },
        {
            type: 'function',
            stateMutability: 'nonpayable',
            outputs: [],
            name: 'revokeRole',
            inputs: [
                { type: 'bytes32', name: 'role', internalType: 'bytes32' },
                { type: 'address', name: 'account', internalType: 'address' }
            ]
        },
        {
            type: 'function',
            stateMutability: 'nonpayable',
            outputs: [],
            name: 'slashDeposit',
            inputs: [
                { type: 'bytes32', name: 'overlay', internalType: 'bytes32' },
                { type: 'uint256', name: 'amount', internalType: 'uint256' }
            ]
        },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
            name: 'stakeOfOverlay',
            inputs: [{ type: 'bytes32', name: 'overlay', internalType: 'bytes32' }]
        },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [
                { type: 'bytes32', name: 'overlay', internalType: 'bytes32' },
                { type: 'uint256', name: 'stakeAmount', internalType: 'uint256' },
                { type: 'address', name: 'owner', internalType: 'address' },
                { type: 'uint256', name: 'lastUpdatedBlockNumber', internalType: 'uint256' },
                { type: 'bool', name: 'isValue', internalType: 'bool' }
            ],
            name: 'stakes',
            inputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }]
        },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
            name: 'supportsInterface',
            inputs: [{ type: 'bytes4', name: 'interfaceId', internalType: 'bytes4' }]
        },
        { type: 'function', stateMutability: 'nonpayable', outputs: [], name: 'unPause', inputs: [] },
        {
            type: 'function',
            stateMutability: 'view',
            outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
            name: 'usableStakeOfOverlay',
            inputs: [{ type: 'bytes32', name: 'overlay', internalType: 'bytes32' }]
        },
        {
            type: 'function',
            stateMutability: 'nonpayable',
            outputs: [],
            name: 'withdrawFromStake',
            inputs: [
                { type: 'bytes32', name: 'overlay', internalType: 'bytes32' },
                { type: 'uint256', name: 'amount', internalType: 'uint256' }
            ]
        },
        {
            type: 'event',
            name: 'Paused',
            inputs: [{ type: 'address', name: 'account', indexed: false }],
            anonymous: false
        },
        {
            type: 'event',
            name: 'RoleAdminChanged',
            inputs: [
                { type: 'bytes32', name: 'role', indexed: true },
                { type: 'bytes32', name: 'previousAdminRole', indexed: true },
                { type: 'bytes32', name: 'newAdminRole', indexed: true }
            ],
            anonymous: false
        },
        {
            type: 'event',
            name: 'RoleGranted',
            inputs: [
                { type: 'bytes32', name: 'role', indexed: true },
                { type: 'address', name: 'account', indexed: true },
                { type: 'address', name: 'sender', indexed: true }
            ],
            anonymous: false
        },
        {
            type: 'event',
            name: 'RoleRevoked',
            inputs: [
                { type: 'bytes32', name: 'role', indexed: true },
                { type: 'address', name: 'account', indexed: true },
                { type: 'address', name: 'sender', indexed: true }
            ],
            anonymous: false
        },
        {
            type: 'event',
            name: 'StakeFrozen',
            inputs: [
                { type: 'bytes32', name: 'slashed', indexed: false },
                { type: 'uint256', name: 'time', indexed: false }
            ],
            anonymous: false
        },
        {
            type: 'event',
            name: 'StakeSlashed',
            inputs: [
                { type: 'bytes32', name: 'slashed', indexed: false },
                { type: 'uint256', name: 'amount', indexed: false }
            ],
            anonymous: false
        },
        {
            type: 'event',
            name: 'StakeUpdated',
            inputs: [
                { type: 'bytes32', name: 'overlay', indexed: true },
                { type: 'uint256', name: 'stakeAmount', indexed: false },
                { type: 'address', name: 'owner', indexed: false },
                { type: 'uint256', name: 'lastUpdatedBlock', indexed: false }
            ],
            anonymous: false
        },
        {
            type: 'event',
            name: 'Unpaused',
            inputs: [{ type: 'address', name: 'account', indexed: false }],
            anonymous: false
        }
    ],
    tokenProxy: [
        {
            type: 'function',
            stateMutability: 'nonpayable',
            payable: false,
            outputs: [{ type: 'bool', name: 'result' }],
            name: 'approve',
            inputs: [
                { type: 'address', name: '_to' },
                { type: 'uint256', name: '_value' }
            ],
            constant: false
        }
    ]
}
