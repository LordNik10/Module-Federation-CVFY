import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IListItem {
  listItem: { id: number; name: string }[];
  label: string;
  width: { xs: string; md: string } | string;
  onChange: (param: SelectChangeEvent<string | number | {}>) => void;
  onSelectedItem: React.Dispatch<React.SetStateAction<number | string>>;
  selectedItem?: number | string | {};
  required: boolean;
}

function ListItem({
  listItem,
  label,
  width,
  onChange,
  onSelectedItem,
  selectedItem,
  // isChangedIdRole,
  // setIsChangedIdRole,
  required,
  ...others
}: IListItem) {
  const handleChange = (event: SelectChangeEvent<string | number | {}>) => {
    const target = event.target as HTMLInputElement;
    onSelectedItem(target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Box
      sx={{
        minWidth: 120,
        width,
      }}
    >
      <FormControl fullWidth {...others}>
        <InputLabel id="list-item-label">{label}</InputLabel>
        <Select
          defaultValue=""
          labelId="list-item-label"
          id="list-item-select"
          value={selectedItem}
          label={label}
          onChange={handleChange}
          required={required}
        >
          {listItem.map((el) => (
            <MenuItem key={el.id} value={el.id}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ListItem;

ListItem.defaultProps = {
  listItem: [],
  label: '',
  width: null,
  onChange: () => {},
  // isChangedIdRole: false,
  // setIsChangedIdRole: () => {},
  required: false,
  onSelectedItem: () => {},
};

ListItem.propTypes = {
  listItem: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  label: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  // isChangedIdRole: PropTypes.bool,
  // setIsChangedIdRole: PropTypes.func,
  required: PropTypes.bool,
  onSelectedItem: PropTypes.func,
};
