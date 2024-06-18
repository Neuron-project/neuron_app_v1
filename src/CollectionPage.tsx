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
  margin: 0;
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
  height: 100vh; /* Set a height for mobile layout */
`;

const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap; /* Wrap rows for mobile */
`;

const NftComponent = styled.div`
  width: calc(25% - 10px); /* 25% width for 4 cards per row */
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: #f2f2f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
          color: '#666', // gray text color
          background: 'linear-gradient(to right, #666, #999)', // text gradient
          WebkitBackgroundClip: 'text', // for Chrome gradient display
          WebkitTextFillColor: 'transparent' // for Chrome gradient display
        }}>
          NEURON
        </h2>
        <TonConnectButton /> {/* Use styled TonConnect button */}
      </FlexBoxRow>
      <AppContainer style={{ marginTop: 60, width: '90vw' }}>
        <FlexBoxCol>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((index) => (
            <NftComponent key={index}>
              <NftIcon src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65942fafa4afb845b1e81163_659430a8b0a16502"/>
           </NftComponent>
          ))}
        </FlexBoxCol>
      </AppContainer>
      <BottomNavBar />
    </StyledApp>
  );
}

export default CollectionPage;