import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import styled from "styled-components";
import "@twa-dev/sdk";
import BottomNavBar from "./BottomNavBar";
import AppIcon from "./components/styled/AppIcon.png";
import LazyLoad from "react-lazy-load";



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
  max-width: 800px;
  margin: 0 auto; /* Center the content */
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  gap: 10px;
  padding: 0 10px;
   /* Hide the scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollWrapper = styled.div`
   height: 80vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CollectionGridContainer = styled.div`
  overflow-y: scroll; /* Enable scrolling within the container */
  -webkit-overflow-scrolling: touch; /* Enable smooth scrolling on mobile devices */
  height: 100%; /* Fixed height */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  /* Hide the scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  /* Hide the scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;


const CollectionItem = styled.div`
  width:75px;
 background-color: rgba(247, 247, 247, 0.4); /* Полупрозрачный светло-серый цвет */
  border-radius: 10px;
  padding: 0px;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 75px;
  height: 75px; 
  overflow: hidden; /* Скрытие избыточного содержимого для чистого обрезания */
  border-radius: 8px;
    background-color: transparent; /* Прозрачный фон */
`;

const CollectionImage = styled.img`
  width: 99%;
  height: 100%;
  object-fit: cover; /* Scale image to fit container */

`;

const CollectionText = styled.div`
  font-size: 5px;
`;

const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;


function CollectionPage() {
  const [collectionData, setCollectionData] = useState<{ id: number; image: string; number: string }[]>([]);
  const [showCollection, setShowCollection] = useState(false);

  const getImageUrl = (imageKey: string) => {
    return new URL(`./components/styled/${imageKey}`, import.meta.url).href;
  };

  const loadCollectionData = useCallback(async () => {
    const batchSize = 20;
    const data = [];
    for (let i = 1; i <= 120; i += batchSize) {
      const batch = [];
      for (let j = i; j < i + batchSize; j++) {
        const imageKey = `nft/Neuron NFT ${j}.png`;
        const imageUrl = getImageUrl(imageKey);
        batch.push({
          id: j,
          image: imageUrl,
          number: `NO. ${String(j).padStart(3, "0")}`,
        });
      }
      data.push(...batch);
    }
    setCollectionData(data);
    setShowCollection(true);
  }, [getImageUrl]);

  useEffect(() => {
    loadCollectionData();
  }, []); 

  return (
    <StyledApp>
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
      {showCollection && (
        <AppContainer style={{ paddingTop: '5vh', width: "85vw" }}>
          <ScrollWrapper>
          <CollectionGridContainer>
            
              {collectionData.map((item) => (
                <CollectionItem key={item.id}>
                  <ImageContainer>
                    <LazyLoad>
                      <CollectionImage src={item.image} />
                    </LazyLoad>
                  </ImageContainer>
                  <CollectionText>
                    <p>{item.number}</p>
                  </CollectionText>
                </CollectionItem>
              ))}
            
          </CollectionGridContainer>
          </ScrollWrapper>
        </AppContainer>
      )}
      <BottomNavBar />
    </StyledApp>
  );
}

export default CollectionPage;
