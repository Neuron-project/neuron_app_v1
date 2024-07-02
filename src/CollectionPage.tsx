import React, { useState, useEffect } from "react";
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
  height: 100vh; /* Set height to 100vh */
  overflow: hidden; /* Set overflow to hidden */
  padding: 20px 20px;
  background-color: #fff;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
  overflow-anchor: none; /* Add this */
`;

const CollectionGridContainer = styled.div`
  overflow-y: scroll; /* Change from auto to scroll */
  -webkit-scrollbar: none; /* Add this to hide the scrollbar in WebKit browsers */
  -moz-scrollbar: none; /* Add this to hide the scrollbar in Mozilla browsers */
  scrollbar-width: none; /* Add this to hide the scrollbar in modern browsers */
  -webkit-overflow-scrolling: touch; /* Add this */
  height: 70vh; /* Keep the fixed height */
  padding: 10px;
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const CollectionItem = styled.div`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 0px;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 101%;
  height: 75px; /* Reduced image height */
  overflow: hidden; /* Hide overflow to create a clean cut */
  border-radius: 8px;
`;

const CollectionImage = styled.img`
  width: 100%;
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

const imageCache: { [key: string]: any } = {};

const getImageUrl = (imageKey: string) => {
  return new URL(`./components/styled/${imageKey}`, import.meta.url).href;
};

const loadCollectionData = async () => {
  const batchSize = 20;
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
    collectionData.push(...batch);
  }
};

const collectionData: { id: number; image: any; number: string }[] = [];

function CollectionPage() {
  const [showCollection, setShowCollection] = useState(false);

  useEffect(() => {
    loadCollectionData().then(() => {
      setShowCollection(true);
    });
  }, []);

  return (
    <StyledApp
    onTouchStart={(e) => e.preventDefault()} /* Add this */
    onTouchMove={(e) => e.preventDefault()} /* Add this */
    >
      <FlexBoxRow
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "8px 16px",
          backgroundColor: "#f7f7f7",
          height: 40,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <FlexBoxRow style={{ justifyContent: "flex-start" }}>
          <img
            src={AppIcon}
            alt="Neuron Icon"
            style={{
              width: 25,
              height: 25,
            }}
          />
          <h2
            style={{
              color: "#666", // серый цвет текста
              background: "linear-gradient(to right, #666, #999)", // градиент для текста
              WebkitBackgroundClip: "text", // для корректного отображения градиента в Chrome
              WebkitTextFillColor: "transparent", // для корректного отображения градиента в Chrome
            }}
          >
            NEURON
          </h2>
        </FlexBoxRow>
        <TonConnectButton style={{ marginLeft: "auto" }} /> {/* Используем стилизованную кнопку TonConnect */}
      </FlexBoxRow>
      {showCollection && (
        <AppContainer style={{ marginTop: 60, width: "85vw" }}>
          <CollectionGridContainer>
            <CollectionGrid>
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
            </CollectionGrid>
          </CollectionGridContainer>
        </AppContainer>
      )}
      <BottomNavBar />
    </StyledApp>
  );
}

export default CollectionPage;