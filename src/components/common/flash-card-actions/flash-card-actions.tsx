import React from "react";
import { IconButton, Button, ButtonGroup } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

interface FlashCardActionsProps {
  isFavorite: boolean;
  currentText: string;
  handleEdit: () => void;
  handleTextToSpeech: (text: string) => void;
  handleFavorite: () => void;
}

const FlashCardActions: React.FC<FlashCardActionsProps> = ({
  isFavorite,
  currentText,
  handleEdit,
  handleTextToSpeech,
  handleFavorite
}) => {
  return (
    <ButtonGroup>
      <IconButton onClick={handleFavorite}>
        {isFavorite ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon color="error" />
        )}
      </IconButton>
      <IconButton onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => handleTextToSpeech(currentText)}>
        <VolumeUpIcon />
      </IconButton>
    </ButtonGroup>
  );
};

export default FlashCardActions;
