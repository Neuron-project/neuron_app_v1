import React, { useState, useEffect } from "react";
import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import styled from "styled-components";
import "@twa-dev/sdk";
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
    image: "https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/nft.png?raw=true",

    number: "NO. 5983"
  },
  {
    id: 2,
    image: "https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/nft.png?raw=true",

    number: "NO. 8620"
  },
  {
    id: 3,
    image: "https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/nft.png?raw=true",

    number: "NO. 7169"
  },
  {
    id: 4,
    image: "https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/nft.png?raw=true",

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
  {
    id: 9,
    image: "https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/nft.png?raw=true",

    number: "NO. 9871"
  },
  {
    id: 10,
    image: "https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/nft.png?raw=true",

    number: "NO. 7084"
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
          <img src="https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/soedinenie_elnzwb49u9y9_512.png?raw=true" alt="Neuron Icon" style={{
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