import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTonWallet } from '@tonconnect/ui-react';
import { useTonConnect } from "./hooks/useTonConnect";
import { Address } from "ton";
import { useTonClient } from './hooks/useTonClient';
import "@twa-dev/sdk";
import { TonClient } from 'ton';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import BottomNavBar from "./BottomNavBar";



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
  width: 23%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: #f2f2f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const NftIcon = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const NftInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
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
    height: 50vh;
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
const BottomNav = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #f7f7f7;
    border-top: 1px solid #ddd;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
  `;

const NavItem = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0 16px;
    text-align: center;
  `;
const Navigation = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #f7f7f7;
    border-top: 1px solid #ddd;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
  `;

const NavLink = styled.a`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    text-decoration: none;
    margin: 0 16px;
    display: flex;
    align-items: center;
    height: 100%;
  `;
function CollectionPage() {
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
        <TonConnectButton /> {/* Используем стилизованную кнопку TonConnect */}
      </FlexBoxRow>
      <AppContainer style={{ marginTop: 60, width: '90vw', marginLeft: 0, marginRight: 0 }}>
        <FlexBoxRow style={{ justifyContent: 'tretch', alignItems: 'center', width: '100%' }}>
          <FlexBoxCol style={{ flex: 1, width: '50%' }}>
            <NftComponent>
              <NftIcon src="src/components/styled/nft.png" alt="Image 1" />
              <NftInfo>
                <NftTitle>Image 1</NftTitle>
                <NftCount>1/10</NftCount>
              </NftInfo>
            </NftComponent>
            <NftComponent>
              <NftIcon src="src/components/styled/nft.png" alt="Image 2" />
              <NftInfo>
                <NftTitle>Image 2</NftTitle>
                <NftCount>2/10</NftCount>
              </NftInfo>
            </NftComponent>
            <NftComponent>
              <NftIcon src="src/components/styled/nft.png" alt="Image 3" />
              <NftInfo>
                <NftTitle>Image 3</NftTitle>
                <NftCount>3/10</NftCount>
              </NftInfo>
            </NftComponent>
          </FlexBoxCol>
        </FlexBoxRow>
      </AppContainer>
      <BottomNavBar />
    </StyledApp>
  );
}
export default CollectionPage;