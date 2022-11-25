import styled from "styled-components";

const Quantity = styled.span`
  display: flex;

  .arrow {
    cursor: pointer;
  }

  .value {
    margin: 0 10px;
  }
`;

const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  .name,
  ${Quantity}, .price {
    width: 23%;
  }
`;

const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;

export { Quantity, ImageContainer, CheckoutItemContainer, RemoveButton };
