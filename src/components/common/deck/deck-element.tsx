import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Stack } from '@mui/system';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { fetchUpdateFlashCardFavorite } from '../../../services/store/actions';
import { TFlashCard } from '../../../utils/types';
import FlashCard from '../flash-card/flash-card';
import FlashCardActions from '../flash-card-actions/flash-card-actions';
import FlashCardEditModal from '../flash-card-edit/flash-card-edit';

const DeckElement = () => {
  const decks = useAppSelector((state) => state.decksSlice.decks);
  const deckId = useParams().deckId as string;
  const selectedDeck = decks.find((deck) => deck.id === deckId) || null;
  const dispatch = useAppDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synth = window.speechSynthesis;

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

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (selectedDeck?.cards.length || 1),
    );
    setShowAnswer(false);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (selectedDeck?.cards.length || 1)) %
        (selectedDeck?.cards.length || 1),
    );
    setShowAnswer(false);
  };

  const handleEditCardModal = (isOpen: boolean) => {
    setShowModal(isOpen);
  };

  const handleCardClick = () => {
    setShowAnswer((prevState) => !prevState);
  };

  const handleShowClue = () => {
    setShowClue((prevState) => !prevState);
  };

  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const textForSpeech = new SpeechSynthesisUtterance(text);
      if (voices.length > 0) {
        const rusVoice = voices.find((voice) => voice.lang === 'ru-RU') || null;
        const engVoice = voices.find((voice) => voice.lang === 'en-US') || null;

        const isEnglishText = /[a-zA-Z]/.test(text);
        textForSpeech.voice = isEnglishText ? engVoice : rusVoice;
        synth.speak(textForSpeech);
      }
    } else {
      alert('Ваш браузер не поддерживает эту функцию');
    }
  };

  const handleFavorite = (currentCard: TFlashCard) => {
    if (selectedDeck) {
      dispatch(
        fetchUpdateFlashCardFavorite({
          deckId: selectedDeck.id,
          cardId: currentCard.id,
          cardData: { favorite: !currentCard.favorite },
        }),
      );
    }
  };

  return (
    <>
      <FlashCard
        deck={selectedDeck}
        currentIndex={currentIndex}
        showAnswer={showAnswer}
        showClue={showClue}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleEditCardModal={handleEditCardModal}
        handleCardClick={handleCardClick}
        handleShowClue={handleShowClue}
        handleTextToSpeech={handleTextToSpeech}
        handleFavorite={() =>
          handleFavorite(selectedDeck?.cards[currentIndex]!)
        }
      />
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              component="h2"
              fontSize="20px"
              fontWeight="700"
              sx={{ mb: '40px' }}
            >
              Терминов в модуле: {selectedDeck?.cards.length}
            </Typography>
            <Stack display="flex" flexDirection="column" gap="20px">
              {selectedDeck?.cards.map((card) => (
                <Card
                  key={card.id}
                  sx={{
                    minWidth: '350px',
                    minHeight: '100px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <CardContent sx={{ display: 'flex', gap: '10px' }}>
                    <Typography fontSize="18px">{card.question}</Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography fontSize="18px">{card.answer}</Typography>
                  </CardContent>
                  <CardActions>
                    <FlashCardActions
                      isFavorite={card.favorite}
                      currentText={showAnswer ? card.answer : card.question}
                      handleEdit={() => handleEditCardModal(true)}
                      handleTextToSpeech={() =>
                        handleTextToSpeech(
                          showAnswer ? card.answer : card.question,
                        )
                      }
                      handleFavorite={() => handleFavorite(card)}
                    />
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {showModal && selectedDeck && selectedDeck.cards[currentIndex] && (
        <FlashCardEditModal
          open={showModal}
          handleOpen={handleEditCardModal}
          card={selectedDeck.cards[currentIndex]}
          deckId={selectedDeck.id}
        />
      )}
    </>
  );
};

export default DeckElement;
