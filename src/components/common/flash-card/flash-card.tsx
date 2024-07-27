import React from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Card, CardActions, CardContent, Grid, Typography, Button, ButtonGroup, IconButton, Stack } from "@mui/material";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { transformStringToClue } from "../../../utils/utils";
import { TDeck } from "../../../utils/types";
import FlashCardActions from "../flash-card-actions/flash-card-actions";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface FlashCardProps {
  deck: TDeck | null;
  currentIndex: number;
  showAnswer: boolean;
  showClue: boolean;
  handleNext: () => void;
  handlePrev: () => void;
  handleEditCardModal: (isOpen: boolean) => void;
  handleCardClick: (event: React.SyntheticEvent) => void;
  handleShowClue: () => void;
  handleTextToSpeech: (text: string) => void;
  handleFavorite: () => void;
}

const FlashCard: React.FC<FlashCardProps> = ({
  deck,
  currentIndex,
  showAnswer,
  showClue,
  handleNext,
  handlePrev,
  handleEditCardModal,
  handleCardClick,
  handleShowClue,
  handleTextToSpeech,
  handleFavorite
}) => {
  if (!deck) {
    return <Typography>Карточки не были найдены</Typography>;
  }

  const currentCard = deck.cards[currentIndex];
  const currentStateCard = showAnswer ? currentCard.answer : currentCard.question;

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4">{deck.name}</Typography>
        </Grid>
        <Grid item>
          <motion.div
            className={styles.box}
            animate={{ rotateX: showAnswer ? 360 : 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <Card onClick={handleCardClick} sx={{ width: "800px" }}>
              <CardActions onClick={(event) => event.stopPropagation()}>
                {showAnswer ? null : (
                  <Button onClick={handleShowClue} sx={{ marginRight: "auto" }}>
                    {showClue ? (
                      <p>{transformStringToClue(currentCard.answer)}</p>
                    ) : (
                      <>
                        <TipsAndUpdatesIcon sx={{ marginRight: "10px" }} />
                        Показать подсказку
                      </>
                    )}
                  </Button>
                )}
                <FlashCardActions
                  isFavorite={currentCard.favorite}
                  currentText={currentStateCard}
                  handleEdit={() => handleEditCardModal(true)}
                  handleTextToSpeech={handleTextToSpeech}
                  handleFavorite={handleFavorite}
                />
              </CardActions>
              <CardContent className={styles.cardContent}>
                <Typography variant="h5">{currentStateCard}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item>
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="10px"
          >
            <IconButton
              onClick={handlePrev}
              disabled={currentIndex === 0}
              size="large"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography fontSize="18px">
              {currentIndex + 1 + " / " + deck.cards.length}
            </Typography>
            <IconButton
              onClick={handleNext}
              disabled={currentIndex === deck.cards.length - 1}
              size="large"
            >
              <ArrowForwardIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default FlashCard;
