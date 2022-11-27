import React from 'react';
import styled from 'styled-components';
import { Title, TextField, Button } from '@gnosis.pm/safe-react-components';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { useSafeBalances } from './hooks/useSafeBalances';
import BalancesTable from './components/BalancesTable';
import { getTransferTransaction } from './api/transfers';

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK();
  const [balances] = useSafeBalances(sdk);
  const [amounts, setAmounts] = React.useState([0])
  const [recipients, setRecipients] = React.useState(["0xf5659a11DD4d67aC31026AbA12085ee9e3070E13"]);

  const handleTransfer = async (): Promise<void> => {
    const transactions = [];
    for(let i=0; i < recipients.length; i++) {
      transactions.push(getTransferTransaction(amounts[i], recipients[i]));
    }
    console.log(transactions);
    const { safeTxHash } = await sdk.txs.send({ txs: transactions });
    console.log({ safeTxHash });
    };

  // TODO: Remove later as is likely unnecessary
  // Commented out transactions for testing in case txns above fails to populate
  // const handleTransfer = async (): Promise<void> => {
  //     // const transactions = balances.map((balance) => getTransferTransaction(balance, recipient));
  //     const { safeTxHash } = await sdk.txs.send({ txs:
  //       [
  //         {
  //           value: '0', // Ether value of the transaction in WEI
  //           to: '0x0000000000000000000000000000000000000000', // Transaction recipient
  //           data: '0x', // Transaction data
  //         },
  //       ]});
  //     console.log({ safeTxHash });
  //   };

  return (
    <Container>
      <Title size="sm">Safe: {safe.safeAddress}</Title>
      <BalancesTable balances={balances} />

      {/* <TextField
        label="Recipient"
        onChange={(e) => {
          setRecipient(e.target.value);
        }}
        value={recipient}
      /> */}
      <Button size="lg" color="primary" onClick={handleTransfer}>
        Send the assets
      </Button>
    </Container>
  );
};

export default SafeApp;