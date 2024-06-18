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
    margin: 0 ;
    display: flex;
    justify-content: space-between;
  `;




  const NftComponent = styled.div`
  width: calc(25% - 10px);
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: #f2f2f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: calc(50% - 10px);
  }

  @media (max-width: 480px) {
    width: calc(100% - 10px);
  }
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







const FlexBoxRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
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
              <NftIcon src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65942fafa4afb845b1e81163_659430a8b0a16502671854b3/scale_1200" alt="Image 1" />
              <NftInfo>
                <NftTitle>Image 1</NftTitle>
                <NftCount>1/10</NftCount>
              </NftInfo>
            </NftComponent>
            <NftComponent>
              <NftIcon src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65942fafa4afb845b1e81163_659430a8b0a16502671854b3/scale_1200" alt="Image 2" />
              <NftInfo>
                <NftTitle>Image 2</NftTitle>
                <NftCount>2/10</NftCount>
              </NftInfo>
            </NftComponent>
            <NftComponent>
              <NftIcon src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65942fafa4afb845b1e81163_659430a8b0a16502671854b3/scale_1200" alt="Image 3" />
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