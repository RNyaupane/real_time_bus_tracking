import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import PlaceIcon from "@mui/icons-material/Place";
import TimelineIcon from '@mui/icons-material/Timeline';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export const StyledCard = styled(Card)(({ theme }) => ({
    border: "2px solid transparent",
    "&.active": {
        border: "2px solid #ff4400",
    },

    "& .MuiCardContent-root": {
        padding: 8,
        paddingBottom: "12px!important",

        "& p": {
            marginBottom: 0,
        }
    },
}));

const StyledRouteBox = styled(Box)(({theme}) => ({
    display: "flex",
    position: "absolute",
    zIndex: 9999,
    bottom: "1rem",
    left: "1rem",
    flexDirection: "column",
    gap: "0.5rem",
}));

export  {StyledRouteBox};

export default function BusRouteCard(props) {
    return (
        <StyledCard sx={{ minWidth: 275 }} onClick={props.onClick}>
            <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <PlaceIcon/> {props.title}
                </Typography>
               {props.type !== "Toilets" &&  <Typography variant="body2">
                   <TimelineIcon/> Estimated Duration: {props.duration}min
                </Typography>}
            </CardContent>
        </StyledCard>
    );
}
