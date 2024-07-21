import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";
import {
  getDecksApi,
  updateFlashCardFavorite,
  updateFlashCardQA,
} from "../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TLoginUser, TRegisterUser } from "../../utils/types";

interface FirebaseError {
  code: string;
  message: string;
}

export const fetchGetDecks = createAsyncThunk("decks/getDecks", async () => {
  const response = await getDecksApi();
  return response;
});

export const fetchUpdateFlashCardQA = createAsyncThunk(
  "decks/updateFlashCardQA",
  async ({
    deckId,
    cardId,
    cardData,
  }: {
    deckId: string;
    cardId: string;
    cardData: { question: string; answer: string };
  }) => {
    const response = await updateFlashCardQA(deckId, cardId, cardData);
    return response;
  }
);

export const fetchUpdateFlashCardFavorite = createAsyncThunk(
  "decks/updateFlashCardFavorite",
  async ({
    deckId,
    cardId,
    cardData,
  }: {
    deckId: string;
    cardId: string;
    cardData: { favorite: boolean };
  }) => {
    const response = await updateFlashCardFavorite(deckId, cardId, cardData);
    return response;
  }
);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Некорректный email адрес.";
    case "auth/user-disabled":
      return "Пользователь заблокирован.";
    case "auth/user-not-found":
      return "Пользователь не найден.";
    case "auth/wrong-password":
      return "Неверный пароль.";
    case "auth/email-already-in-use":
      return "Email уже используется.";
    case "auth/operation-not-allowed":
      return "Операция не разрешена.";
    case "auth/weak-password":
      return "Слабый пароль.";
    case "auth/invalid-credential":
      return "Неверный логин или пароль";
    default:
      return "Произошла неизвестная ошибка.";
  }
};

export const fetchSignInWithEmailAndPassword = createAsyncThunk<
  any,
  TLoginUser,
  { rejectValue: string }
>("auth/login", async (formData: TLoginUser, { rejectWithValue }) => {
  const auth = getAuth();
  try {
    await delay(1000);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;
    const userData = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
    };
    return userData;
  } catch (error) {
    console.log(error);
    const firebaseError = error as FirebaseError;
    return rejectWithValue(getErrorMessage(firebaseError.code));
  }
});

export const fetchCreateUserWithEmailAndPassword = createAsyncThunk<
  any,
  TRegisterUser,
  { rejectValue: string }
>("auth/register", async (formData: TRegisterUser, { rejectWithValue }) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: formData.name });
    const userData = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
    };
    return userData;
  } catch (error) {
    console.error(error);
    const firebaseError = error as FirebaseError;
    return rejectWithValue(getErrorMessage(firebaseError.code));
  }
});
