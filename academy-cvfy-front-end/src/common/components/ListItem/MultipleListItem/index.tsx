import PropTypes from 'prop-types';
import React, { SyntheticEvent } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ISkillsSelected } from 'features/cv/components/NewCvForm';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IMultipleListItem {
  listItem: ISkillsSelected[];
  label: string;
  setItemSelected: React.Dispatch<React.SetStateAction<ISkillsSelected[]>>;
  itemSelected: ISkillsSelected[];
  width: string | { [key: string]: string };
  required: boolean;
}

function MultipleListItem({
  listItem,
  label,
  setItemSelected,
  itemSelected,
  width,
  required,
  ...others
}: IMultipleListItem) {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: ISkillsSelected[],
  ) => {
    setItemSelected(value);
  };

  return (
    <FormControl sx={{ width }} {...others} required={required}>
      <Autocomplete
        fullWidth
        sx={{ width }}
        value={itemSelected}
        multiple
        id="checkboxes-multiple"
        options={listItem}
        onChange={handleChange}
        disableClearable
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <MenuItem key={option.id} value={option.name} {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              required={required}
              checked={!!itemSelected.find((v) => v.id === option.id)}
            />
            {option.name}
          </MenuItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Skills"
            required={itemSelected.length === 0 && required}
          />
        )}
      />
    </FormControl>
  );
}

export default MultipleListItem;

MultipleListItem.defaultProps = {
  listItem: [],
  label: '',
  setItemSelected: () => {},
  itemSelected: [],
  width: null,
  required: false,
};

MultipleListItem.propTypes = {
  listItem: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  ),
  label: PropTypes.string,
  setItemSelected: PropTypes.func,
  itemSelected: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  required: PropTypes.bool,
};
