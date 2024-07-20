import React, { Suspense, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles.module.css";
import DeckPreview from "../deck-preview/deck-preview";
import { ModuleOption, TDeck, TDeckPreview } from "../../../utils/types";
import DeckSkeleton from "../skeletons/decks.skeleton";

interface DecksListUIProps {
  decks: TDeck[];
  handleOption: (option: ModuleOption | null) => void;
  currentOption: ModuleOption | null;
  optionsList: ModuleOption[];
  searchQuery: string;
  handleSearchQuery: (value: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const DecksListUI: React.FC<DecksListUIProps> = ({
  decks,
  handleOption,
  currentOption,
  optionsList,
  searchQuery,
  handleSearchQuery,
  isLoading,
  errorMessage,
}) => {
  return (
    <Box>
      <Typography variant="h4">Ваша библиотека</Typography>
      <Toolbar>
        <Typography
          variant="body1"
          component="a"
          href="/"
          className={styles.link}
        >
          Учебные модули
        </Typography>
        <Divider />
      </Toolbar>
      <Divider sx={{ mb: "5px" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        <Autocomplete
          value={currentOption}
          onChange={(event, newValue: ModuleOption | null) => {
            handleOption(newValue);
          }}
          disablePortal
          id="module-box"
          options={optionsList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Сортировка модулей" />
          )}
        />
        <TextField
          sx={{ width: "40%" }}
          color="secondary"
          id="search-modules"
          label="Поиск модулей"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
          variant="outlined"
          focused
          value={searchQuery}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleSearchQuery(event.target.value);
          }}
        />
      </Box>
      <>
        {isLoading && (
          <Stack spacing={1}>
            {Array.from({ length: 5 }).map((_, index) => (
              <DeckSkeleton key={index} />
            ))}
          </Stack>
        )}
        {errorMessage && <p>Возникла ошибка во время загрузки модулей</p>}
        {decks.length === 0 ? (
              <Box
                sx={{
                  mt: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3">Ничего не найдено</Typography>
              </Box>
            ) : (
              <>
                {decks.map((deck) => (
                  <DeckPreview key={deck.id} deck={deck} />
                ))}
              </>
            )
          }
      </>
    </Box>
  );
};

export default DecksListUI;
