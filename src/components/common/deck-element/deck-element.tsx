import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import EditIcon from "@mui/icons-material/Edit";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import SpatialTrackingIcon from "@mui/icons-material/SpatialTracking";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { transformStringToClue } from "../../../utils/utils";
import FlashCardEditModal from "../flash-card-edit/flash-card-edit";
import { fetchUpdateFlashCardFavorite } from "../../../services/store/actions";

const DeckElement = () => {
  const synth = window.speechSynthesis;
  let { deckId } = useParams();
  const decks = useAppSelector((state) => state.decksSlice.decks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const selectedDeck = decks.find((deck) => deck.id === deckId);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    fetchVoices();

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = fetchVoices;
    }
  }, [synth]);

  if (!selectedDeck) {
    return <Typography>Deck not found</Typography>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedDeck.cards.length);
    setShowAnswer(false);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + selectedDeck.cards.length) % selectedDeck.cards.length
    );
    setShowAnswer(false);
  };

  const handleEditCardModal = (isOpen: boolean) => {
    setShowModal(isOpen);
  };

  const handleCardClick = (event: React.SyntheticEvent) => {
    setShowAnswer((prevState) => !prevState);
  };

  const handleShowClue = () => {
    setShowClue((prevState) => !prevState);
  };

  const handleFavorite = () => {
    dispatch(
      fetchUpdateFlashCardFavorite({
        deckId: selectedDeck.id,
        cardId: currentCard.id,
        cardData: { favorite: !currentCard.favorite },
      })
    );
  };

  const handleTextToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const textForSpeech = new SpeechSynthesisUtterance(text);
      if (voices.length > 0) {
        const rusVoice = voices.find((voice) => voice.lang === "ru-RU") || null;
        const engVoice = voices.find((voice) => voice.lang === "en-US") || null;

        const isEnglishText = /[a-zA-Z]/.test(text);
        textForSpeech.voice = isEnglishText ? engVoice : rusVoice;
        synth.speak(textForSpeech);
      }
    } else {
      alert("Ваш браузер не поддерживает эту функцию");
    }
  };
  const currentCard = selectedDeck.cards[currentIndex];
  const currentStateCard = showAnswer
    ? currentCard.answer
    : currentCard.question;
  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4">{selectedDeck.name}</Typography>
        </Grid>
        <Grid item>
          <motion.div
            className={styles.box}
            animate={{ rotateX: showAnswer ? 360 : 0 }}
            transition={{
              duration: 1,
              type: "spring",
            }}
          >
            <Card onClick={handleCardClick} sx={{ width: "800px" }}>
              <CardActions onClick={(event) => event.stopPropagation()}>
                {showAnswer ? (
                  <></>
                ) : (
                  <Button onClick={handleShowClue} sx={{ marginRight: "auto" }}>
                    {showClue ? (
                      <p>{transformStringToClue(currentCard.answer)}</p>
                    ) : (
                      <>
                        <TipsAndUpdatesIcon sx={{ marginRight: "10px" }} />{" "}
                        Показать подсказку
                      </>
                    )}
                  </Button>
                )}
                <ButtonGroup
                  variant="outlined"
                  aria-label="Озвучивание, редактирование, избранное"
                >
                  <Button onClick={() => handleTextToSpeech(currentStateCard)}>
                    <SpatialTrackingIcon />
                  </Button>
                  <Button onClick={() => handleEditCardModal(true)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={handleFavorite}>
                    {currentCard.favorite ? (
                      <StarOutlinedIcon />
                    ) : (
                      <StarBorderOutlinedIcon />
                    )}
                  </Button>
                </ButtonGroup>
              </CardActions>
              <CardContent className={styles.cardContent}>
                <Typography variant="h5">{currentStateCard}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item>
          <Button onClick={handlePrev} disabled={currentIndex === 0}>
            Prev
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === selectedDeck.cards.length - 1}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      <FlashCardEditModal
        deckId={selectedDeck.id}
        open={showModal}
        handleOpen={handleEditCardModal}
        card={currentCard}
      />
    </>
  );
};

export default DeckElement;
