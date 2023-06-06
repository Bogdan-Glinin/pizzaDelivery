import styled from "styled-components/native";

const ProductItem = styled.View`

  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const ProductImage = styled.Image`
  width: 60px;
  height: 100px;
`;

const ProductTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;

const ProductDetails = styled.View`
  flex: 1;
  justify-content: center;
`;

const ProductPrice = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`;

export const Product = ({productName, productPrice, productImg}) => {
    return (
        <ProductItem>
        <ProductImage
          style={{
            height: 100,
            width: 100,
          }} 
          source={{uri: productImg}}
        />
        <ProductDetails>
          <ProductTitle>{productName}</ProductTitle>
          <ProductPrice>{productPrice + " руб."}</ProductPrice>
        </ProductDetails>
      </ProductItem>
    )
}