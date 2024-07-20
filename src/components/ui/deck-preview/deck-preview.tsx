import { Card, CardContent, CardActions, Typography, Button, Grid, CardActionArea } from "@mui/material";
import React from "react";
import { TDeckPreview } from "../../../utils/types";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { toggleFavoriteDeck } from "../../../services/store/reducers/DecksSlice";
import { useAppDispatch } from "../../../services/store/store";

type DeckPreviewProps = {
  deck: TDeckPreview;
};

const DeckPreview: React.FC<DeckPreviewProps> = ({ deck }) => {

  const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit'
  })
  const dispatch = useAppDispatch();

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteDeck(deck.id));
  };

  return (
    <Card sx={{ display: 'flex', mb: 2}}>
      <Grid container>
        <Grid item xs={10}>
        <CardActionArea>
          <StyledLink to={`/flash-cards/${deck.id}`}>
          <CardContent>
            <Typography variant="h5" component="div">
              {deck.name}
            </Typography>
            {deck.author && (
              <Typography variant="body2" color="text.secondary">
                Автор: {deck.author.name}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {deck.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Последний визит: {new Date(deck.lastVisitedAt).toLocaleDateString()}
            </Typography>
          </CardContent>
          </StyledLink>
          </CardActionArea>
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
          <Button size="small" color="primary">
            Поделиться
          </Button>
          <Button size="small" color="primary" onClick={handleToggleFavorite}>
            {deck.favorite ? "Удалить из избранного" : "Добавить в избранное"}
          </Button>
          
        </Grid>
      </Grid>
    </Card>
  );
};

export default DeckPreview;