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
  padding: 20px;
  background: linear-gradient(
    135deg,
    #ffffff 0%,    /* Белый */
    #f8f8f8 25%,   /* Очень светло-серый */
    #e0e0e0 50%,   /* Светло-серый */
    #f8f8f8 75%,   /* Очень светло-серый */
    #ffffff 100%   /* Белый */
  );
  background-blend-mode: overlay;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 ;
  display: flex;
  justify-content: space-between;
  margin-bottom: calc(50px + env(safe-area-inset-bottom));
`;
const QuantityComponent = styled.div`
  display: flex;
  height: 20vh;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.03); /* Прозрачный белый цвет */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Тень */
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
  background-color: rgba(0, 0, 0, 0.03); /* Прозрачный белый цвет */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Тень */
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
  // height: 100vh; /* Установите высоту родительского элемента */
`;
const NewComponent = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.03); /* Прозрачный белый цвет */
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Менее выразительная тень */
`;

const BuyButton = styled.button`
  width: 70%;
  background: #000;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 20px;
  transition: background 0.3s ease-in-out;
  
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
  background-color: rgba(242, 242, 242, 0.2); /* Более прозрачный белый цвет */
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
        bounce: false // Отключаем bounce
      }
    ]
  }
  useEffect(() => {
    document.documentElement.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
  }, []);


  const [isRegistered, setIsRegistered] = useState(false);

  const [transactionSent, setTransactionSent] = useState(false);

  useEffect(() => {
    const storedRegistrationState = localStorage.getItem('isRegistered');
    if (storedRegistrationState === 'true') {
      setTransactionSent(true);
    }
  }, []);
  const handleTransactionSend = async () => {
    try {
      await tonConnectUI.sendTransaction(myTransaction);
      setTransactionSent(true);
      localStorage.setItem('isRegistered', 'true');
    } catch (error) {
      console.error(`Transaction failed: ${error}`);
    }
  };

  
  return (
    
    <StyledApp style={{paddingTop: '10vh' }}>

      <FlexBoxRow style={{
display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: 'rgba(247, 247, 247, 0.9)', // Полупрозрачный серый цвет, похожий на другие компоненты
    height: '40px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Тень, аналогичная другим компонентам
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

      <AppContainer style={{  width: '100%', marginLeft: 0, marginRight: 0 }}>

        <FlexBoxRow style={{ flexDirection: 'column', alignItems: 'center', width: '100%', rowGap: 10 }}>
        <NewComponent style={{ height: '25vh', backgroundColor: '#fff', boxShadow: 'inherit', padding: 0, background: 'transparent', border: 'none'  }}>
          <FlexBoxRow style={{ flexDirection: 'row', alignItems: 'center', width: '100%'  }}>

            <FlexBoxCol style={{ width: '50%', marginRight: 10 }}>
              <NftComponent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <NftInfo>
                  <NftTitle style={{ textAlign: 'center' }}>
                    My<br />NEURONs
                  </NftTitle>
                  <NftCount style={{ textAlign: 'center' }}>{nftCount}</NftCount>
                </NftInfo>
              </NftComponent>


            </FlexBoxCol>
            <FlexBoxCol style={{ width: '50%' }}>
              <QuantityComponent >
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
          </NewComponent>
          <NewComponent style={{ paddingTop: 16, paddingBottom: 16, paddingLeft: 0, paddingRight: 0, height: '45vh' }}>
            <FlexBoxRow style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#333' }}>Balance:</span>
              <FlexBoxRow style={{ alignItems: 'center' }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#666' }}>
                  {tonAmount}
                </span>
                <img src={TonIcon} alt="TON icon" style={{ width: 24, height: 24, verticalAlign: 'middle', marginLeft: 8 }} />
              </FlexBoxRow>
            </FlexBoxRow>
            <FlexBoxCol style={{  justifyContent: 'center', alignItems: 'center', marginTop: 0, paddingTop: 5 }}>
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
              onClick={handleTransactionSend}
              disabled={transactionSent || !wallet}
              style={{                
                width: '90%',
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
                opacity: transactionSent ? 0.1 : 1, // make button semi-transparent when transaction is sent
                pointerEvents: transactionSent ? 'none' : 'auto', // disable pointer events when button is disabled
              }}
            >
              {wallet && !transactionSent ? 'Whitelist' : wallet ? isRegistered ? 'You are registered' : 'You are registered' : 'Whitelist'}
            </BuyButton>
          </NewComponent>
        </FlexBoxRow>
      </AppContainer>
      <BottomNavBar />
    </StyledApp>
    
  );
}
export default HomePage;
