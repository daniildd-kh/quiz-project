import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface BlobElementProps {
  SvgElement: React.ComponentType;
  title: string;
  subTitle: string;
}

const BlobElement = ({ SvgElement, title, subTitle }: BlobElementProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      zIndex='1'
    >
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography
          position="absolute"
          fontSize="48px"
          fontWeight="700"
          top="50%"
          left="50%"
          sx={{
            transform: 'translate(-50%, -50%)',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
        <SvgElement />
      </Box>
      <Typography
        mt="30px"
        fontSize="24px"
        fontWeight="700"
        sx={{ wordBreak: 'break-word' }}
      >
        {subTitle}
      </Typography>
    </Box>
  );
};

export default BlobElement;
