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
  width: 100vw;
  height: 100vh;
  padding: 10px 10px; /* reduce padding to 10px */
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto; /* remove left margin */
  padding: 0 10px; /* reduce padding to 10px */
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  gap: 10px;
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(33.33%, 1fr)); /* reduce width to 1/3 of original size */
  gap: 10px;
`;

const CollectionItem = styled.div`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  width: 33.33%; /* reduce width to 1/3 of original size */
  height: 100px; /* reduce height to 1/3 of original size */
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 50px; /* reduce height to 1/3 of original size */
  overflow: hidden; /* Hide overflow to create a clean cut */
  border-radius: 8px;
`;

const CollectionImage = styled.img`
  width: 50px; /* reduce width to 1/3 of original size */
  height: 50px; /* reduce height to 1/3 of original size */
  object-fit: cover; /* Scale image to fit container */
`;

const CollectionText = styled.div`
  margin-top: 10px;
  font-size: 10px; /* reduce font size from default */
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
    image: "https://avatars.dzeninfra.ru/get-zen_doc/2359038/pub_6006f5ded5d729006d9d8142_6007051e267c3f280bf1964b/scale_1200",
    title: "AZUKI",
    number: "NO. 5983"
  },
  {
    id: 2,
    image: "https://avatars.dzeninfra.ru/get-zen_doc/2359038/pub_6006f5ded5d729006d9d8142_6007051e267c3f280bf1964b/scale_1200",
    title: "AZUKI",
    number: "NO. 8620"
  },
  {
    id: 3,
    image: "https://avatars.dzeninfra.ru/get-zen_doc/2359038/pub_6006f5ded5d729006d9d8142_6007051e267c3f280bf1964b/scale_1200",
    title: "AZUKI",
    number: "NO. 7169"
  },
  {
    id: 4,
    image: "https://avatars.dzeninfra.ru/get-zen_doc/2359038/pub_6006f5ded5d729006d9d8142_6007051e267c3f280bf1964b/scale_1200",
    title: "AZUKI",
    number: "NO. 4974"
  },
  {
    id: 5,
    image: "https://avatars.dzeninfra.ru/get-zen_doc/2359038/pub_6006f5ded5d729006d9d8142_6007051e267c3f280bf1964b/scale_1200",
    title: "AZUKI",
    number: "NO. 1069"
  },
  {
    id: 6,
    image: "https://avatars.dzeninfra.ru/get-zen_doc/2359038/pub_6006f5ded5d729006d9d8142_6007051e267c3f280bf1964b/scale_1200",
    title: "AZUKI",
    number: "NO. 299"
  },
  {
    id: 7,
    image: "https://avatars.dzeninfra.ru/get-zen_doc/2359038/pub_6006f5ded5d729006d9d8142_6007051e267c3f280bf1964b/scale_1200",
    title: "AZUKI",
    number: "NO. 2666"
  },
  {
    id: 8,
    image: "https://avatars.dzeninfra.ru/get-zen_doc/2359038/pub_6006f5ded5d729006d9d8142_6007051e267c3f280bf1964b/scale_1200",
    title: "AZUKI",
    number: "NO. 5155"
  },
  {
    id: 9,
    image: "https://avatars.dzeninfra.ru/get-zen_doc/2359038/pub_6006f5ded5d729006d9d8142_6007051e267c3f280bf1964b/scale_1200",
    title: "AZUKI",
    number: "NO. 9871"
  },
  {
    id: 10,
    image: "https://avatars.dzeninfra.ru/get-zen_doc/2359038/pub_6006f5ded5d729006d9d8142_6007051e267c3f280bf1964b/scale_1200",
    title: "AZUKI",
    number: "NO. 7084"
  },
];

function CollectionPage() {
  const [showCollection, setShowCollection] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCollection(true);
    }, 100); // Set a 100 millisecond delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledApp>
      <FlexBoxRow
        style={{
          justifyContent: "space-between",
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
        <h2
          style={{
            color: "#666", // gray text color
            background: "linear-gradient(to right, #666, #999)", // text gradient
            WebkitBackgroundClip: "text", // for Chrome gradient display
            WebkitTextFillColor: "transparent", // for Chrome gradient display
          }}
        >
          NEURON
        </h2>
        <TonConnectButton />{" "}
        {/* Use styled TonConnect button */}
      </FlexBoxRow>
      {showCollection && (
        <AppContainer style={{ marginTop: 60, width: "90vw" }}>
          <CollectionGrid>
            {collectionData.map((item) => (
              <CollectionItem key={item.id}>
                <ImageContainer>
                  <CollectionImage src={item.image} alt={item.title} />
                </ImageContainer>
                <CollectionText>
                  <p>{item.title}</p>
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