import {NextPage} from 'next';
import Head from 'next/head';
import {Container, Row, Col, Text} from '@nextui-org/react';
import {useMetaMask} from 'metamask-react';
import {BASE, CONTRACT, CODE} from '@space/hooks/api';
import {Logo} from '@space/components/Logo';
import {Presentation} from '@space/components/Presentation';
import {MetamaskStatus} from '@space/components/Metamask';
import {Wallet} from '@space/components/Wallet';
import {Info} from '@space/components/Info';
import styles from '../styles/home.module.scss';

const Home: NextPage = () => {
  const MM = useMetaMask();
  return (
    <>
      <Head>
        <link rel="canonical" href={BASE} />
        <title>UAHT</title>
        <meta name="description" content="токен без меж для вільних людей" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇺🇦</text></svg>"
        />
      </Head>
      <Container className={styles.container}>
        <Col>
          <main>
            <section>
              <Row justify="flex-end" align="center">
                <MetamaskStatus />
                <div className={styles.metamask} title="MetaMask" />
              </Row>
              <Row justify="center" align="center">
                <Logo href={CONTRACT} target="_blank" />
              </Row>
              <Row justify="center" align="center">
                <Text h6 size={17} color="white" css={{m: 0}}>
                  токен без меж для вільних людей
                </Text>
                <Info link={'https://t.me/uaht_info'} className={styles.ml05} />
              </Row>
              {MM.status === 'connected' ? <Wallet /> : <Presentation />}
            </section>
          </main>
          <footer className={styles.footer}>
            <Row justify="center" align="center">
              <a href={`${CODE}#readme`} target="_blank" rel="noreferrer" title="Статут - Воля 1.0">
                🔱
              </a>
            </Row>
          </footer>
        </Col>
      </Container>
    </>
  );
};

export default Home;
