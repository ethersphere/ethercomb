export const bzzABI = [
    {
        constant: false,
        inputs: [
            { name: '_tokenAmount', type: 'uint256' },
            { name: '_maxDaiSpendAmount', type: 'uint256' },
            { name: '_deadline', type: 'uint256' }
        ],
        name: 'mint',
        outputs: [{ name: '', type: 'bool' }],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: '_buy', type: 'bool' }],
        name: 'getPath',
        outputs: [{ name: '', type: 'address[]' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: '_daiAmount', type: 'uint256' }],
        name: 'sellRewardDai',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getTime',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: '_tokenAmount', type: 'uint256' },
            { name: '_minDaiSellValue', type: 'uint256' },
            { name: '_deadline', type: 'uint256' }
        ],
        name: 'redeem',
        outputs: [{ name: '', type: 'bool' }],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: '_tokenAmount', type: 'uint256' },
            { name: '_maxDaiSpendAmount', type: 'uint256' },
            { name: '_deadline', type: 'uint256' },
            { name: '_to', type: 'address' }
        ],
        name: 'mintTo',
        outputs: [{ name: '', type: 'bool' }],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: '_amount', type: 'uint256' }],
        name: 'buyPrice',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: '_amount', type: 'uint256' }],
        name: 'sellReward',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { name: '_bzzCurve', type: 'address' },
            { name: '_collateralToken', type: 'address' },
            { name: '_router02', type: 'address' }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    { payable: true, stateMutability: 'payable', type: 'fallback' },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'buyer', type: 'address' },
            { indexed: false, name: 'amount', type: 'uint256' },
            { indexed: false, name: 'priceForTokensDai', type: 'uint256' },
            { indexed: false, name: 'EthTradedForDai', type: 'uint256' },
            { indexed: false, name: 'maxSpendDai', type: 'uint256' }
        ],
        name: 'mintTokensWithEth',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'buyer', type: 'address' },
            { indexed: true, name: 'receiver', type: 'address' },
            { indexed: false, name: 'amount', type: 'uint256' },
            { indexed: false, name: 'priceForTokensDai', type: 'uint256' },
            { indexed: false, name: 'EthTradedForDai', type: 'uint256' },
            { indexed: false, name: 'maxSpendDai', type: 'uint256' }
        ],
        name: 'mintTokensToWithEth',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'seller', type: 'address' },
            { indexed: false, name: 'amount', type: 'uint256' },
            { indexed: false, name: 'rewardReceivedDai', type: 'uint256' },
            { indexed: false, name: 'ethReceivedForDai', type: 'uint256' },
            { indexed: false, name: 'minRewardDai', type: 'uint256' }
        ],
        name: 'burnTokensWithEth',
        type: 'event'
    }
]
