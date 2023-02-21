const assert = require('assert');
const {
  createAccountLink,
  createCustomAccountLink,
  createExplorerLink,
  createCustomExplorerLink,
  createTokenTrackerLink,
  createCustomTokenTrackerLink,
  createExplorerLinkForChain,
  createAccountLinkForChain,
  createTokenTrackerLinkForChain,
  getBlockExplorerLink,
  getAccountLink,
  getTokenTrackerLink,
} = require('../dist');

// `https://${prefix}polygonscan.com/address/${address}`
describe('account-link', function () {
  describe('by networkId', function () {
    it('should handle mainnet correctly', function () {
      const result = createAccountLink('foo', '137');
      assert.strictEqual(result, 'https://polygonscan.com/address/foo', 'should handle mainnet');
    });

    it('should handle mumbai correctly', function () {
      const result = createAccountLink('foo', '80001');
      assert.strictEqual(result, 'https://mumbai.polygonscan.com/address/foo', 'should handle mumbai');
    });

    it('should have null as a prefix', function () {
      const result = createAccountLink('foo', '3234');
      assert.strictEqual(result, '', 'should return an empty string');
    });
  });

  describe('by chainId', function () {
    it('should handle mainnet correctly', function () {
      const result = createAccountLinkForChain('foo', '0x89');
      assert.strictEqual(result, 'https://polygonscan.com/address/foo', 'should handle mainnet');
    });

    it('should handle mumbai correctly', function () {
      const result = createAccountLinkForChain('foo', '0x13881');
      assert.strictEqual(result, 'https://mumbai.polygonscan.com/address/foo', 'should handle mumbai');
    });

    it('should have null as a prefix', function () {
      const result = createAccountLinkForChain('foo', '0xca2');
      assert.strictEqual(result, '', 'should return an empty string');
    });
  });

  it('should handle customNetwork url correctly', function () {
    const result = createCustomAccountLink('foo', 'https://data-seed-prebsc-1-s1.binance.org:8545');
    assert.strictEqual(result, 'https://data-seed-prebsc-1-s1.binance.org:8545/address/foo', 'should return binance testnet address url');
  });

  describe('getAccountLink', function () {
    it('should return the correct account-link url for an account based on chainId, networkId and rpcPref args', function () {
      const getAccountLinkTests = [
        {
          expected: 'https://polygonscan.com/address/0xabcd',
          chainId: '0x89',
          address: '0xabcd',
        },
        {
          expected: 'https://polygonscan.com/address/0xabcd',
          networkId: '137',
          address: '0xabcd',
        },
        {
          expected: 'https://mumbai.polygonscan.com/address/0xdef0',
          chainId: '0x13881',
          address: '0xdef0',
          rpcPrefs: {},
        },
        {
          // test handling of `blockExplorerUrl` for a custom RPC
          expected: 'https://block.explorer/address/0xabcd',
          chainId: '0x21',
          address: '0xabcd',
          rpcPrefs: {
            blockExplorerUrl: 'https://block.explorer',
          },
        },
        {
          // test handling of trailing `/` in `blockExplorerUrl` for a custom RPC
          expected: 'https://another.block.explorer/address/0xdef0',
          chainId: '0x89f',
          address: '0xdef0',
          rpcPrefs: {
            blockExplorerUrl: 'https://another.block.explorer/',
          },
        },
      ];
      getAccountLinkTests.forEach(({ expected, address, chainId, rpcPrefs, networkId }) => {
        assert.strictEqual(getAccountLink(address, chainId, rpcPrefs, networkId), expected);
      });
    });
  });
});

// `https://${prefix}polygonscan.com/tx/${hash}`
describe('explorer-link', function () {
  describe('by networkId', function () {
    it('should handle mainnet correctly', function () {
      const result = createExplorerLink('foo', '137');
      assert.strictEqual(result, 'https://polygonscan.com/tx/foo', 'should handle mainnet');
    });

    it('should handle mumbai correctly', function () {
      const result = createExplorerLink('foo', '80001');
      assert.strictEqual(result, 'https://mumbai.polygonscan.com/tx/foo', 'should handle mumbai');
    });

    it('should have null as a prefix', function () {
      const result = createExplorerLink('foo', '10');
      assert.strictEqual(result, '', 'should return an empty string');
    });
  });

  describe('by chainId', function () {
    it('should handle mainnet correctly', function () {
      const result = createExplorerLinkForChain('foo', '0x89');
      assert.strictEqual(result, 'https://polygonscan.com/tx/foo', 'should handle mainnet');
    });

    it('should handle mumbai correctly', function () {
      const result = createExplorerLinkForChain('foo', '0x13881');
      assert.strictEqual(result, 'https://mumbai.polygonscan.com/tx/foo', 'should handle mumbai');
    });

    it('should have null as a prefix', function () {
      const result = createExplorerLinkForChain('foo', '0xa');
      assert.strictEqual(result, '', 'should return an empty string');
    });
  });

  it('should handle customNetwork url correctly', function () {
    const result = createCustomExplorerLink('foo', 'https://data-seed-prebsc-1-s1.binance.org:8545');
    assert.strictEqual(result, 'https://data-seed-prebsc-1-s1.binance.org:8545/tx/foo', 'should return binance testnet transaction url');
  });
});

/**
 * `https://${prefix}polygonscan.com/token/${tokenAddress}${
 *    holderAddress ? `?a=${ holderAddress }` : ''
 *  }`
 */
describe('token-tracker-link', function () {
  describe('by networkId', function () {
    it('should handle mainnet correctly (no account)', function () {
      const result = createTokenTrackerLink('foo', '137');
      assert.strictEqual(result, 'https://polygonscan.com/token/foo', 'should handle mainnet');
    });

    it('should handle mumbai correctly (no account)', function () {
      const result = createTokenTrackerLink('foo', '80001');
      assert.strictEqual(result, 'https://mumbai.polygonscan.com/token/foo', 'should handle mumbai');
    });

    it('should handle mainnet correctly (account)', function () {
      const result = createTokenTrackerLink('foo', '137', '0xabc');
      assert.strictEqual(result, 'https://polygonscan.com/token/foo?a=0xabc', 'should handle mainnet');
    });

    it('should handle mumbai correctly (account)', function () {
      const result = createTokenTrackerLink('foo', '80001', '0xabc');
      assert.strictEqual(result, 'https://mumbai.polygonscan.com/token/foo?a=0xabc', 'should handle mumbai');
    });

    it('should null has a prefix', function () {
      const result = createTokenTrackerLink('foo', '3654', '0xabc');
      assert.strictEqual(result, '', 'should return an empty string');
    });
  });

  describe('by chainId', function () {
    it('should handle mainnet correctly (no account)', function () {
      const result = createTokenTrackerLinkForChain('foo', '0x89');
      assert.strictEqual(result, 'https://polygonscan.com/token/foo', 'should handle mainnet');
    });

    it('should handle mumbai correctly (no account)', function () {
      const result = createTokenTrackerLinkForChain('foo', '0x13881');
      assert.strictEqual(result, 'https://mumbai.polygonscan.com/token/foo', 'should handle mumbai');
    });

    it('should handle mainnet correctly (account)', function () {
      const result = createTokenTrackerLinkForChain('foo', '0x89', '0xabc');
      assert.strictEqual(result, 'https://polygonscan.com/token/foo?a=0xabc', 'should handle mainnet');
    });

    it('should handle mumbai correctly (account)', function () {
      const result = createTokenTrackerLinkForChain('foo', '0x13881', '0xabc');
      assert.strictEqual(result, 'https://mumbai.polygonscan.com/token/foo?a=0xabc', 'should handle mumbai');
    });

    it('should null has a prefix', function () {
      const result = createTokenTrackerLinkForChain('foo', '0xe46', '0xabc');
      assert.strictEqual(result, '', 'should return an empty string');
    });

    it('should handle customNetwork url correctly', function () {
      const result = createCustomTokenTrackerLink('foo', 'https://data-seed-prebsc-1-s1.binance.org:8545/');
      assert.strictEqual(result, 'https://data-seed-prebsc-1-s1.binance.org:8545/token/foo', 'should return binance testnet token url');
    });

    describe('getTokenTrackerLink', function () {
      it('should return the correct token tracker url based on chainId, networkId and rpcPref args', function () {

        const getTokenTrackerTests = [
          {
            expected: 'https://polygonscan.com/token/0xabcd',
            networkId: '137',
            tokenAddress: '0xabcd',
          },
          {
            expected: 'https://mumbai.polygonscan.com/token/0xdef0',
            networkId: '80001',
            tokenAddress: '0xdef0',
          },
          {
            // test handling of `blockExplorerUrl` for a custom RPC
            expected: 'https://block.explorer/token/0xar31',
            tokenAddress: '0xar31',
            rpcPrefs: {
              blockExplorerUrl: 'https://block.explorer',
            },
          },
          {
            // test handling of trailing `/` in `blockExplorerUrl` for a custom RPC
            expected: 'https://another.block.explorer/token/0xdef0',
            tokenAddress: '0xdef0',
            rpcPrefs: {
              blockExplorerUrl: 'https://another.block.explorer/',
            },
          },
          {
            expected: 'https://polygonscan.com/token/0xabcd',
            chainId: '0x89',
            tokenAddress: '0xabcd',
          },
          {
            expected: 'https://mumbai.polygonscan.com/token/0xdef0',
            chainId: '0x13881',
            tokenAddress: '0xdef0',
            rpcPrefs: {},
          },
          {
            // test handling of `blockExplorerUrl` for a custom RPC
            expected: 'https://block.explorer/token/0xabcd',
            chainId: '0x89f',
            tokenAddress: '0xabcd',
            rpcPrefs: {
              blockExplorerUrl: 'https://block.explorer',
            },
          },
          {
            // test handling of trailing `/` in `blockExplorerUrl` for a custom RPC
            expected: 'https://another.block.explorer/token/0xdef0',
            chainId: '0x21',
            tokenAddress: '0xdef0',
            rpcPrefs: {
              blockExplorerUrl: 'https://another.block.explorer/',
            },
          },
        ];

        getTokenTrackerTests.forEach((test) => {
          assert.strictEqual(
            getTokenTrackerLink(test.tokenAddress, test.chainId, test.networkId, test.holderAddress, test.rpcPrefs),
            test.expected
          );
        });
      });
    });
  });

  /*
 * Test getBlockExplorerLink,
  * Which applies correct explorer-link generator based on args
  */
  describe('getBlockExplorerLink', function () {
    it('should return the correct block explorer url for an account based on chainId, networkId and rpcPref args', function () {

      const getBlockExplorerLinkTests = [
        {
          expected: 'https://polygonscan.com/tx/0xabcd',
          transaction: {
            metamaskNetworkId: '137',
            hash: '0xabcd',
          },
        },
        {
          expected: 'https://mumbai.polygonscan.com/tx/0xdef0',
          transaction: {
            metamaskNetworkId: '80001',
            hash: '0xdef0',
          },
          rpcPrefs: {},
        },
        {
          // test handling of `blockExplorerUrl` for a custom RPC
          expected: 'https://block.explorer/tx/0xabcd',
          transaction: {
            metamaskNetworkId: '31',
            hash: '0xabcd',
          },
          rpcPrefs: {
            blockExplorerUrl: 'https://block.explorer',
          },
        },
        {
          // test handling of trailing `/` in `blockExplorerUrl` for a custom RPC
          expected: 'https://another.block.explorer/tx/0xdef0',
          transaction: {
            metamaskNetworkId: '33',
            hash: '0xdef0',
          },
          rpcPrefs: {
            blockExplorerUrl: 'https://another.block.explorer/',
          },
        },
        {
          expected: 'https://polygonscan.com/tx/0xabcd',
          transaction: {
            chainId: '0x89',
            hash: '0xabcd',
          },
        },
        {
          expected: 'https://mumbai.polygonscan.com/tx/0xdef0',
          transaction: {
            chainId: '0x13881',
            hash: '0xdef0',
          },
          rpcPrefs: {},
        },
        {
          // test handling of `blockExplorerUrl` for a custom RPC
          expected: 'https://block.explorer/tx/0xabcd',
          transaction: {
            chainId: '0x89f',
            hash: '0xabcd',
          },
          rpcPrefs: {
            blockExplorerUrl: 'https://block.explorer',
          },
        },
        {
          // test handling of trailing `/` in `blockExplorerUrl` for a custom RPC
          expected: 'https://another.block.explorer/tx/0xdef0',
          transaction: {
            chainId: '0x21',
            hash: '0xdef0',
          },
          rpcPrefs: {
            blockExplorerUrl: 'https://another.block.explorer/',
          },
        },
      ];

      getBlockExplorerLinkTests.forEach((test) => {
        assert.strictEqual(
          getBlockExplorerLink(test.transaction, test.rpcPrefs),
          test.expected
        );
      });
    });
  });
});
