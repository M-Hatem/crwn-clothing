import { useNavigate } from "react-router-dom";

import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";

const DirectoryItem = ({ category: { title, imageUrl } }) => {
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(`shop/${title.toLowerCase()}`);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
