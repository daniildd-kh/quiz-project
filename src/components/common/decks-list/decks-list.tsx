import { useEffect, useState } from 'react';
import DecksListUI from '../../ui/decks-list/decks-list';
import { ModuleOption, TDeck } from '../../../utils/types';
import { useAppSelector } from '../../../services/store/store';

const DecksList = () => {
  const { decks, isLoading, error } = useAppSelector(
    (state) => state.decksSlice,
  );

  const moduleOptions: ModuleOption[] = [
    { label: 'Создано', type: 'created' },
    { label: 'Недавно просмотренные', type: 'recent' },
    { label: 'Изученные', type: 'studied' },
  ];

  const [selectedModuleOption, setSelectedModuleOption] =
    useState<ModuleOption | null>(moduleOptions[0]);

  const handleOption = (option: ModuleOption | null) => {
    setSelectedModuleOption(option);
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [decksEl, setDecksEl] = useState<TDeck[]>(decks);

  const handleSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchModule = (searchText: string, decks: TDeck[]) => {
    if (!searchText) {
      return decks;
    }
    const filteredDecks = decks.filter((deck) =>
      deck.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    return filteredDecks;
  };

  useEffect(() => {
    setDecksEl(decks);
  }, [decks]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const filteredDecks = handleSearchModule(searchQuery, decks);
      setDecksEl(filteredDecks);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchQuery, decks]);

  return (
    <DecksListUI
      decks={decksEl}
      isLoading={isLoading}
      errorMessage={error}
      handleOption={handleOption}
      currentOption={selectedModuleOption}
      optionsList={moduleOptions}
      searchQuery={searchQuery}
      handleSearchQuery={handleSearchQuery}
    />
  );
};

export default DecksList;
