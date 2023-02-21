export = function getPrefixForChain(chainId: string): string | null {
  let prefix;
  switch (chainId) {
    case '0x89': // main net
      prefix = '';
      break;
    case '0x13881': // mumbai test net
      prefix = 'mumbai.';
      break;
    default:
      prefix = null;
  }
  return prefix;
};
