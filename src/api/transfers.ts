import { AbiItem } from 'web3-utils';
import abiCoder, { AbiCoder } from 'web3-eth-abi';
import { BaseTransaction, TokenBalance } from '@gnosis.pm/safe-apps-sdk';
import { ERC_20_ABI } from '../abis/erc20';

function encodeTxData(method: AbiItem, recipient: string, amount: string): string {
  const coder = abiCoder as unknown as AbiCoder;
  return coder.encodeFunctionCall(method, [recipient, amount]);
}

function getTransferTransaction(value: number, recipient: string): BaseTransaction {
  return {
    to: recipient,
    value: value,
    data: '0x'
  };

  // TODO: Remove this later if everything is working smoothly
  // if (item.tokenInfo.type === 'NATIVE_TOKEN') {
  //   return {
  //     // Send ETH directly to the recipient address
  //     to: recipient,
  //     value: value,
  //     data: '0x',
  //   };
  // }

  // return {
  //   // For other token types, generate a contract tx
  //   to: recipient,
  //   value: value,
  //   data: '0x'
  // };
}

export { getTransferTransaction };