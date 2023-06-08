import styled from "styled-components/native";

const ProductItem = styled.View`
  height: 115px;
  margin: 10px;
  margin-left: 60px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #BEBEBE;
  border-style: solid;
  border-radius: 10px;
`;

const ProductImage = styled.Image`
  position: relative;
  left: -50px;
  width: 60px;
  height: 100px;
`;

const ProductTitle = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 18;
`;

const ProductDetails = styled.View`
    justify-content: center;
  position: relative;
  left: -40px;
  flex: 1;
  height: 100%;
`;

const ProductPrice = styled.Text`
  width: 100%;
  text-align: right;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #F15A24;
  height: 18px;
  position: absolute;
  bottom: 10px;
  right: 0px;
`;

const ProductName = styled.Text`
  margin-top: 3px;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
`

export const AnotherProduct = ({ productName, productPrice, productImg, productInfo }) => {
  return (
    <ProductItem>
      <ProductImage
        style={{
          height: 100,
          width: 100,
        }}
        source={{ uri: productImg }}
      />
      <ProductDetails>
        <ProductTitle>{productName}</ProductTitle>
        <ProductName>{productInfo}</ProductName>
        <ProductPrice>{"от " + productPrice + " ₽"}</ProductPrice>
      </ProductDetails>
    </ProductItem>
  )
}