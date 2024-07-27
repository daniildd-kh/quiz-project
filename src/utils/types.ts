export type ModuleOption = {
  label: string;
  type: string;
};

export type TFlashCard = {
  id: string,
  question: string,
  answer: string,
  createdAt: string,
  updatedAt: string,
  difficulty: string | null,
  favorite: boolean
}
export type TUser = {
  id: string;
  email: string | null; 
  name: string | null;
};

export type TDeck = {
  id: string,
  name: string,
  author: TUser | null,
  description: string | null,
  favorite: boolean,
  lastVisitedAt: string,
  cards: TFlashCard[];
}

export type TDeckPreview = Omit<TDeck, 'cards'>;

export type TLoginUser = {
  email: string,
  password: string,
}

export type TRegisterUser = {
  email: string,
  password: string,
  name: string,
}
