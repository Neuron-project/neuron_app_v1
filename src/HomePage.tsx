import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useState,useEffect } from "react";
import styled from "styled-components";
import { useTonWallet } from '@tonconnect/ui-react';
import { Address } from "ton";
import { useTonClient } from './hooks/useTonClient';
import "@twa-dev/sdk";
import { TonClient } from 'ton';
import React from 'react';
import { NavLink } from 'react-router-dom';
import BottomNavBar from './BottomNavBar'


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
  height: 45vh;
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const InputLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const InputField = styled.input`
  padding: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #aaa;
  }
`;





 function HomePage() {
  const maxQuantity = 300; // Replace with actual max quantity
  const nftCount = 2; // Replace with actual NFT count
  const wallet = useTonWallet();
  const { client } = useTonClient();
  const [tonAmount, setTonAmount] = useState<string>('----');
  const [usdAmount, setUsdAmount] = useState<string>(' ----');
  const [nftAmount, setNftAmount] = useState('');
  const [tonPrice, setTonPrice] = useState('');
  const [nextItemIndex, setNextItemIndex] = useState(0);
  
 const toncenter = new TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
  });
  
 const nftCollectionAddress = Address.parse('EQDP9nGW2Ho0V0_pbW8qpx2q3VJVd9n0BtbQjts2XqZIrfgF');

 interface NavItem {
  to: string;
  //icon: string;
  label: string;
}


  
 
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
  const handleNftAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setNftAmount(inputValue);

    if (inputValue && !isNaN(Number(inputValue))) {
      const nftPrice = 5; // Цена 1 NFT в TON
      const totalTonPrice = Number(inputValue) * nftPrice;
      setTonPrice(totalTonPrice.toFixed(2));
    } else {
      setTonPrice('');
    }
  };
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
  
  return (
    
    <StyledApp>
    <FlexBoxRow style={{ 
  justifyContent: 'space-between', 
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
  <h2 style={{
    color: '#666', // серый цвет текста
    background: 'linear-gradient(to right, #666, #999)', // градиент для текста
    WebkitBackgroundClip: 'text', // для корректного отображения градиента в Chrome
    WebkitTextFillColor: 'transparent' // для корректного отображения градиента в Chrome
  }}>
    NEURON
  </h2>
  <TonConnectButton/> {/* Используем стилизованную кнопку TonConnect */}
</FlexBoxRow>
    <AppContainer style={{ marginTop: 60, width: '90vw', marginLeft: 0, marginRight: 0 }}>
  <FlexBoxRow style={{ justifyContent: 'stretch', alignItems: 'center', width: '100%' }}>
    <FlexBoxCol style={{ flex: 1, width: '50%' }}>
    <NftComponent>
  <NftIcon src="https://img.icons8.com/?size=100&id=FgtvXcOD0APh&format=png&color=000000" alt="NFT Icon" />
  <NftInfo>
    <NftTitle>Your NFT Collection</NftTitle>
    <NftCount>{nftCount} NFT's</NftCount>
  </NftInfo>
</NftComponent>
      
<NewComponent>
<FlexBoxRow style={{ justifyContent: 'pace-between', alignItems: 'center', marginBottom: 16 }}>
      <span style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>Balance:</span>
      <span style={{ fontSize: 18, fontWeight: 600, color: '#666' }}>{tonAmount} TON {usdAmount} USD</span>
    </FlexBoxRow>
    <div style={{ borderBottom: '1px solid #ddd', marginBottom: 16 }} />
        <InputWrapper>
          <InputLabel>Количество NFT</InputLabel>
          <InputField 
             type="text"
             value={nftAmount}
             onChange={handleNftAmountChange}
             inputMode="numeric"
             pattern="[0-9]*" />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>Цена в TON</InputLabel>
          <InputField type="text" value={tonPrice} inputMode="numeric"
             pattern="[0-9]*" readOnly />
        </InputWrapper>
        <BuyButton>Buy</BuyButton>
      
</NewComponent>
    </FlexBoxCol>
    <FlexBoxCol style={{ flex: 1, width: '50%' }}>
    <QuantityComponent>
  <QuantityInfo>
    <QuantityTitle>Free NFT's</QuantityTitle>
    <QuantityCount>-/{nextItemIndex}</QuantityCount>
  </QuantityInfo>
  <SliderContainer>
    <Slider
      style={{
        height: `${(155 / nextItemIndex) * 100}%`,
      }}
    />
  </SliderContainer>
</QuantityComponent>
      
    </FlexBoxCol>
    
  </FlexBoxRow>
  
      
</AppContainer>
<BottomNavBar/>  
  </StyledApp>
  
);
}
export default HomePage;
