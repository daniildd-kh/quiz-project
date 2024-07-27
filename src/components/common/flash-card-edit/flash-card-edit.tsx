import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../services/store/store';
import { fetchUpdateFlashCardQA } from '../../../services/store/actions';
import styles from './styles.module.css';

interface FlashCardEditModalProps {
  open: boolean;
  handleOpen: (isOpen: boolean) => void;
  deckId: string;
  card: { id: string; question: string; answer: string };
}

const FlashCardEditModal: React.FC<FlashCardEditModalProps> = ({
  open,
  handleOpen,
  card,
  deckId,
}) => {
  const [cardData, setCardData] = useState({ answer: '', question: '' });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (card) {
      setCardData({ answer: card.answer, question: card.question });
    }
  }, [card]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(fetchUpdateFlashCardQA({ deckId, cardId: card.id, cardData }));
    handleOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => handleOpen(false)}>
      <DialogTitle>Редактирование карточки</DialogTitle>
      <DialogContent>
        <Box
          className={styles.modalEditCard}
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <TextField
            label="Вопрос"
            margin="dense"
            fullWidth
            value={cardData.question}
            onChange={(e) =>
              setCardData((prevData) => ({
                ...prevData,
                question: e.target.value,
              }))
            }
          />
          <TextField
            label="Ответ"
            margin="dense"
            fullWidth
            value={cardData.answer}
            onChange={(e) =>
              setCardData((prevData) => ({
                ...prevData,
                answer: e.target.value,
              }))
            }
          />
          <DialogActions>
            <Button onClick={() => handleOpen(false)} color="primary">
              Отмена
            </Button>
            <Button type="submit" color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FlashCardEditModal;
