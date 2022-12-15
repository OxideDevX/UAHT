import {useRouter} from 'next/router';
import {ethers} from 'ethers';
import {Row, Text, Modal, Button} from '@nextui-org/react';
import {useConnector} from '@space/components/Wallet';
import {Address} from '@space/components/Wallet/common';
import UAHT_ABI from '@space/contracts/UAHT.abi.json';
import {ADDRESS} from '@space/hooks/api';
import styles from './wallet.module.scss';

export const Actions = () => {
  const {query} = useRouter();
  if (query?.action === 'approve' && query?.spender && query?.amount) {
    return <AllowanceModal />;
  }
  return null;
};

export const AllowanceModal = () => {
  const MM = useConnector();
  const router = useRouter();
  const web3Provider = MM.provider;
  const signer = MM.signer || web3Provider;
  const uaht = new ethers.Contract(ADDRESS, UAHT_ABI, signer);

  const approve = async () => {
    try {
      await uaht.approve(router?.query?.spender, router?.query?.amount);
    } catch (e) {
      console.log(e);
    } finally {
      router.replace('/');
    }
  };

  return (
    <Modal closeButton aria-labelledby="a-modal" open={true} onClose={() => router.replace('/')}>
      <Modal.Header>
        <Text size={18}>❗ Дозвіл на операцію</Text>
      </Modal.Header>
      <Modal.Body>
        <Row align="center" className={styles.mv1}>
          Гаманець: <Address className={styles.ml1} account={router?.query?.spender as string} />
        </Row>
        <Row align="center" className={styles.mv1}>
          Сума: {router?.query?.amount}
        </Row>
        <Row align="center" justify="center" className={styles.mv1}>
          <Button onClick={() => approve()}>Даю згоду 👍</Button>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
