import styled from "styled-components";

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`;

const CategoryTitle = styled.h2`
  font-size: 38px;
  text-align: center;
  margin: 20px auto;
`;

export { CategoryContainer, CategoryTitle };
