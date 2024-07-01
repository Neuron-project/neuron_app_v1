import React, { useState, useEffect } from "react";
import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import styled from "styled-components";
import "@twa-dev/sdk";
import BottomNavBar from "./BottomNavBar";
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
  margin: 0 auto; /* Center the content */
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  gap: 10px;
  padding: 0 10px;
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

const collectionData = [
  {
    id: 1,
    image: "https://downloader.disk.yandex.ru/preview/e7ea17cc9e1c7df25f33c5151aedcbc84fe847eedb7a5daf44db8d219b4e8513/6682a6e9/zXMvliGMS8hS6Hr4xLUkQoQERc_tieMe8BFCn0dsg894IBP__0HsqY1AwOnxCNQOJ0G7w8MzTzjOaeW_2NwUZg%3D%3D?uid=0&filename=Neuron%20NFT%201.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",

    number: "NO. 5983"
  },
  {
    id: 2,
    image: "https://downloader.disk.yandex.ru/preview/847a8026f947bdbed44c7f79e9490812d2d134d2bfaf6bded77fedee90e2373f/667eae1e/qDblvd_CopKvaWHw1HDDzIQERc_tieMe8BFCn0dsg884YOrIobs6kD0dh1tFVCy2x7mWblUxa72CONMbtwhUaA%3D%3D?uid=0&filename=Neuron%20NFT%2010.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",

    number: "NO. 8620"
  },
  {
    id: 3,
    image: "https://downloader.disk.yandex.ru/preview/dd9d88d7c06f3a9c11adfb183e202dda5c18744cfbd96e2150c3cde885569f2e/667eae2f/ax9tbDzKze4YkbkspHlweIQERc_tieMe8BFCn0dsg8-vvr2sEkgEFHMJcJI5wUrXcFZkm8efe-PuKXvrUt9auA%3D%3D?uid=0&filename=Neuron%20NFT%20100.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",

    number: "NO. 7169"
  },
  {
    id: 4,
    image: "https://downloader.disk.yandex.ru/preview/5fe2fa5af541adb9f01c68389ef282407d55cb699af7d9aee4795d95da7d7ff1/667ea766/zXMvliGMS8hS6Hr4xLUkQoQERc_tieMe8BFCn0dsg894IBP__0HsqY1AwOnxCNQOJ0G7w8MzTzjOaeW_2NwUZg%3D%3D?uid=0&filename=Neuron%20NFT%201.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",

    number: "NO. 4974"
  },
  {
    id: 5,
    image: "https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/nft.png?raw=true",

    number: "NO. 1069"
  },
  {
    id: 6,
    image: "https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/nft.png?raw=true",

    number: "NO. 299"
  },
  {
    id: 7,
    image: "https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/nft.png?raw=true",

    number: "NO. 2666"
  },
  {
    id: 8,
    image: "https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/nft.png?raw=true",

    number: "NO. 5155"
  },

];

function CollectionPage() {
  const [showCollection, setShowCollection] = useState(false);

  useEffect(() => {
    document.documentElement.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCollection(true);
    }, 100); // Set a 100 millisecond delay
    return () => clearTimeout(timer);
  }, []);

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
      {showCollection && (
        <AppContainer style={{ marginTop: 60, width: "85vw" }}>
          <CollectionGrid>
            {collectionData.map((item) => (
              <CollectionItem key={item.id}>
                <ImageContainer>
                  <CollectionImage src={item.image} />
                </ImageContainer>
                <CollectionText>
                  <p>{item.number}</p>
                </CollectionText>
              </CollectionItem>
            ))}
          </CollectionGrid>
        </AppContainer>
      )}
      <BottomNavBar />
    </StyledApp>
  );
}

export default CollectionPage;