export = function getPrefixForNetwork(networkId: string): string | null {
  // eslint-disable-next-line radix
  const net = parseInt(networkId);
  let prefix;

  switch (net) {
    case 137: // main net
      prefix = '';
      break;
    case 80001: // mumbai test net
      prefix = 'mumbai.';
      break;
    default:
      prefix = null;
  }
  return prefix;
};
