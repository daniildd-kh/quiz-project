import dayjs from "dayjs";
import { TDeck, TFlashCard } from "./types";

const checkResponce = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((error) => Promise.reject(error));

export const getDecksApi = (): Promise<TDeck[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("http://localhost:3000/decks/")
        .then((res) => checkResponce<TDeck[]>(res))
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    }, 1000);
  });
};

export const updateCards = (
  deckId: string,
  cardId: string,
  updatedData: Partial<TFlashCard>
): Promise<TDeck> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`http://localhost:3000/decks/${deckId}/`)
        .then((res) => checkResponce<TDeck>(res))
        .then((deck) => {
          const updatedCards = deck.cards.map((card) => {
            if (card.id === cardId) {
              return {
                ...card,
                ...updatedData,
                updatedAt: dayjs(new Date().toISOString()).format('YYYY-MM-DD'),
              };
            }
            return card;
          });

          const updatedDeck: TDeck = { ...deck, cards: updatedCards };

          return fetch(`http://localhost:3000/decks/${deckId}/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDeck),
          })
            .then((res) => checkResponce<TDeck>(res))
            .then((updatedDeck) => {
              resolve(updatedDeck);
            });
        })
        .catch((error) => reject(error));
    }, 1000);
  });
};

export const updateFlashCardQA = (
  deckId: string,
  cardId: string,
  updatedData: { question: string; answer: string }
): Promise<TDeck> => {
  return updateCards(deckId, cardId, updatedData);
};

export const updateFlashCardFavorite = (
  deckId: string,
  cardId: string,
  updatedData: { favorite: boolean }
): Promise<TDeck> => {
  return updateCards(deckId, cardId, updatedData);
};



