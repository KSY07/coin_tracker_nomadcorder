import styled from "styled-components";
import React from 'react';
import { Link } from "react-router-dom";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.div`
    height: 10ch;
    display: flex;
    justify-content: center;
    align-item: center;
`;

const CoinsList = styled.h1``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    list-style: none;
    a{
        display: flex;
        align-items: center;
        transition: color 0.2s ease-in;
        display: block;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;


const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor}  
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface CoinProps {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Coins() {

    const [coins,setCoins] = React.useState<CoinProps[]>([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            setLoading(false);
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {loading ? "Loading..." : 
            (<CoinsList>
                {coins.map((coin) => (
                <Coin key = "coin.id">
                    <Link to={{
                        pathname: `/${coin.id}`,
                        state: { name: coin.name },
                    }}>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                    {coin.name} &rarr;</Link> 
                </Coin>))}
            </CoinsList>)}
        </Container>
        
        );
}

export default Coins;