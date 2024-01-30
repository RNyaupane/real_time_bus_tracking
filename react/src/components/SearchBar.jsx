import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';


function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topDestinations]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      size='small'
      sx={{ width: 420 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
        placeholder='Search Destination...'
        size="small"
        
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
                <InputAdornment position="start">
                  <PlaceIcon />
                </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
const topDestinations = [
    { title: 'Kathmandu Durbar Square', coordinates: '27.7046, 85.3240' },
    { title: 'Thamel', coordinates: '27.7145, 85.3063' },
    { title: 'Boudhanath Stupa', coordinates: '27.7212, 85.3614' },
    { title: 'Pashupatinath Temple', coordinates: '27.7104, 85.3475' },
    { title: 'Swayambhunath Stupa', coordinates: '27.7140, 85.2883' },
    { title: 'Patan Durbar Square', coordinates: '27.6739, 85.3223' },
    { title: 'Bhaktapur Durbar Square', coordinates: '27.6729, 85.4278' },
    { title: 'Garden of Dreams', coordinates: '27.7115, 85.3187' },
    { title: 'Nagarkot', coordinates: '27.7172, 85.5196' },
    { title: 'Chandragiri Hills', coordinates: '27.6467, 85.2379' },
    { title: 'Budhanilkantha Temple', coordinates: '27.7713, 85.3452' },
    { title: 'Nagarkot View Tower', coordinates: '27.7313, 85.5324' },
    { title: 'Rani Pokhari', coordinates: '27.7106, 85.3205' },
    { title: 'Godavari Botanical Garden', coordinates: '27.5782, 85.3076' },
    { title: 'Tribhuvan International Airport', coordinates: '27.6961, 85.3590' },
    { title: 'Bhaktapur Bus Park', coordinates: '27.6714, 85.4321' },
    { title: 'Kathmandu Bus Park', coordinates: '27.7115, 85.3170' },
    { title: 'Nagarkot Sunrise View Point', coordinates: '27.7296, 85.5372' },
    { title: 'Bhaktapur Durbar Square', coordinates: '27.6726, 85.4277' },
    { title: 'Sundarijal', coordinates: '27.7582, 85.4541' }
  ];
  