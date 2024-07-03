import "./App.css";
import { TonConnectButton, useTonConnectUI, TonConnectUIProvider } from "@tonconnect/ui-react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTonWallet } from '@tonconnect/ui-react';
import { Address, toNano } from "ton";
import { useTonClient } from './hooks/useTonClient';
import "@twa-dev/sdk";
import { TonClient } from 'ton';
import BottomNavBar from './BottomNavBar'
import TonIcon from "./components/styled/ton.png";
import AppIcon from "./components/styled/AppIcon.png";

const StyledApp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 90vw;
  height: 100vh;
  padding: 20px 20px;
  overflow: hidden;
  background-color: #fff;
`;
const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 ;
  display: flex;
  justify-content: space-between;
  margin-bottom: calc(50px + env(safe-area-inset-bottom));
`;
const QuantityComponent = styled.div`
  width: 34vw;
  display: flex;
  height: 20vh;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: #f2f2f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const QuantityInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;
const QuantityTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
  white-space: nowrap; /* Добавьте это свойство */
`;
const QuantityCount = styled.span`
  font-size: 17px;
  font-weight: bold;
  color: #666;
`;
const SliderContainer = styled.div`
  width: 10vw;
  height: 20vh;
  background-color: #ddd;
  border-radius: 10px;
  margin-right: 16px;
  display: flex;
  flex-direction: column-reverse;
`;
const Slider = styled.div`
  width: 100%;
  height: 0%;
   background-color: #000; /* Черный цвет для слайдера */
  border-radius: 10px;
  transition: height 0.3s ease-in-out;
  align-self: flex-start;
`;

const NftComponent = styled.div`
  display: flex;
  height: 20vh;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: #f2f2f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const NftIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 16px;
`;
const NftInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const NftTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;
const NftCount = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #666;
`;
const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100vh; /* Установите высоту родительского элемента */
`;
const NewComponent = styled.div`
  height: 45vh; /* initial height */
  width: 82vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

`;
const BuyButton = styled.button`
  width: 70vw;
  background: #000;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 20px;
  transition: background 0.3s ease-in-out;
  margin: auto; /* Добавьте это свойство */
  transition: background 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:active {
    transform: scale(0.95);
  }
`;
const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const TimerContainer = styled.div`
  padding: 16px;
  border: 2px solid #888;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  box-sizing: border-box;
`;

const CountdownTimer = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin: 0 8px;
`;



function HomePage() {
  const nftCount = 0;
  const wallet = useTonWallet();
  const { client } = useTonClient();
  const [tonAmount, setTonAmount] = useState<string>('----');
  const [usdAmount, setUsdAmount] = useState<string>(' ----');
  const [nextItemIndex, setNextItemIndex] = useState(0);
  const toncenter = new TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
  });
  const nftCollectionAddress = Address.parse('EQDP9nGW2Ho0V0_pbW8qpx2q3VJVd9n0BtbQjts2XqZIrfgF');
  useEffect(() => {
    (async () => {
      let { stack } = await toncenter.callGetMethod(
        nftCollectionAddress,
        'get_collection_data'
      );
      let nextItemIndexValue = stack.readBigNumber();
      setNextItemIndex(Number(nextItemIndexValue));
    })();
  }, []);
  useEffect(() => {
    const update = async () => {
      if (client && wallet) {
        const walletAddress = Address.parse(wallet.account.address);

        client.getBalance(walletAddress).then((b) => {
          setUsdAmount(
            (Math.round(11 * Number(b / 1000_000_0n)) / 100).toString()
          );
          setTonAmount((Math.round(Number(b / 1000_000_0n)) / 100).toString());
        });
      }
    };
    update();
  }, [wallet, client]);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const targetDate = new Date('2024-07-15T10:00:00.000Z');
const now = new Date();

useEffect(() => {
  const timeDiff = targetDate.getTime() - now.getTime();
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  setCountdown({ days, hours, minutes, seconds });

  const intervalId = setInterval(() => {
    now.setTime(now.getTime() + 1000);
    const timeDiff = targetDate.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    setCountdown({ days, hours, minutes, seconds });
  }, 1000);

  return () => clearInterval(intervalId);
}, []); // <--- empty dependency array
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const myTransaction = {
    validUntil: Math.floor(Date.now() / 1000) + 360,
    messages: [
      {
        address: 'UQB3BPxv7y35z0JVJb7YHu91vg5b4hhAAw7y-nTO8zk24Qq-',  // NFT Sale contract, that is current desired NFT Item
        amount: "1000000", // NFT Price + exactly 1 TON, excess will be returned
      }
    ]
  }
  useEffect(() => {
    document.documentElement.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
  }, []);

  const [transactionSent, setTransactionSent] = useState(false);

const handleTransactionSend = () => {
  tonConnectUI.sendTransaction(myTransaction);
  setTransactionSent(true);
};


  return (
    
    <StyledApp>
      <FlexBoxRow style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: '#f7f7f7',
        height: 40,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
      }}>
        <FlexBoxRow style={{ justifyContent: 'flex-start' }}>
          <img src={AppIcon} alt="Neuron Icon" style={{
            width: 25,
            height: 25
          }} />
          <h2 style={{
            color: '#666', // серый цвет текста
            background: 'linear-gradient(to right, #666, #999)', // градиент для текста
            WebkitBackgroundClip: 'text', // для корректного отображения градиента в Chrome
            WebkitTextFillColor: 'transparent' // для корректного отображения градиента в Chrome
          }}>
            NEURON
          </h2>
        </FlexBoxRow>
        <TonConnectButton style={{ marginLeft: 'auto' }} /> {/* Используем стилизованную кнопку TonConnect */}
      </FlexBoxRow>
      <AppContainer style={{ marginTop: 60, width: '90vw', marginLeft: 0, marginRight: 0 }}>
        <FlexBoxRow style={{ justifyContent: 'stretch', alignItems: 'center', width: '100%' }}>
          <FlexBoxCol style={{ flex: 1, width: '50%' }}>
            <NftComponent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <NftInfo>
                <NftTitle style={{ textAlign: 'center' }}>
                  My<br />NEURONs
                </NftTitle>
                <NftCount style={{ textAlign: 'center' }}>{nftCount}</NftCount>
              </NftInfo>
            </NftComponent>
            <NewComponent>
              <FlexBoxRow style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#333' }}>Balance:</span>
                <FlexBoxRow style={{ alignItems: 'center' }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: '#666' }}>
                    {tonAmount}
                  </span>
                  <img src={TonIcon} alt="TON icon" style={{ width: 24, height: 24, verticalAlign: 'middle', marginLeft: 8 }} />
                </FlexBoxRow>
              </FlexBoxRow>
              <FlexBoxCol style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
  <span style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 8 }}>
    The sale will starts in
  </span>
  <TimerContainer style={{ marginTop: -16 }}>
    <CountdownTimer>
    {countdown.days.toString().padStart(2, '0')}: 
  {countdown.hours.toString().padStart(2, '0')}: 
  {countdown.minutes.toString().padStart(2, '0')}: 
  {countdown.seconds.toString().padStart(2, '0')}
    </CountdownTimer>
  </TimerContainer>
</FlexBoxCol>
<BuyButton
  style={{
    marginTop: 16,
    width: '100%',
    zIndex: 1,
    fontSize: 21,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#fff',
    backgroundColor: wallet ? '#000' : '#ccc', // disable button if wallet is not connected
    borderRadius: 10,
    padding: '1.5vh 24px',
    cursor: transactionSent ? 'not-allowed' : (wallet ? 'pointer' : 'not-allowed'), // disable cursor if transaction has been sent or wallet is not connected
    transition: transactionSent ? 'none' : 'background 0.3s ease-in-out', // disable animation when button is disabled
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    WebkitTapHighlightColor: 'transparent',
    opacity: transactionSent ? 0.5 : 1, // make button semi-transparent when transaction is sent
    pointerEvents: transactionSent ? 'none' : 'auto', // disable pointer events when button is disabled
  }}
  onClick={(e) => {
    if (transactionSent) {
      return; // do nothing if transaction is sent
    }
    handleTransactionSend();
  }}
>
  {wallet && !transactionSent ? 'Whitelist' : wallet ? 'You are registered' : 'Connect wallet'}
</BuyButton>
            </NewComponent>
          </FlexBoxCol>
          <FlexBoxCol style={{ flex: 1, width: '50%' }}>
            <QuantityComponent>
              <QuantityInfo>
                <QuantityTitle style={{ textAlign: 'center' }} >Open <br /> NEURONs</QuantityTitle>
                <QuantityCount style={{ textAlign: 'center' }} >300/300</QuantityCount>
              </QuantityInfo>
              <SliderContainer>
                <Slider
                  style={{
                    height: `${(300 / 300) * 100}%`,
                  }}
                />
              </SliderContainer>
            </QuantityComponent>
          </FlexBoxCol>
        </FlexBoxRow>
      </AppContainer>
      <BottomNavBar />
    </StyledApp>
  );
}
export default HomePage;
