import PropTypes from 'prop-types';
import React from 'react';
import { useCvStatusContext } from 'features/cv/context';
import ListItem from 'common/components/ListItem/ListItem';
import { SelectChangeEvent } from '@mui/material';

interface IListCvStatus {
  width: { xs: string; md: string };
  onSelectedItem: React.Dispatch<React.SetStateAction<number | string>>;
  selectedItem?: number | string;
  required: boolean;
  onChange: (
    param: SelectChangeEvent<string | number | {}> | React.FormEvent,
  ) => void;
}

export default function ListCvStatus({
  width,
  onSelectedItem,
  selectedItem,
  required,
  onChange,
}: IListCvStatus) {
  const { cvStatusList } = useCvStatusContext();

  return (
    <ListItem
      width={width}
      onSelectedItem={onSelectedItem}
      selectedItem={selectedItem}
      listItem={cvStatusList}
      label="CV Status"
      required={required}
      onChange={onChange}
    />
  );
}

ListCvStatus.defaultProps = {
  width: null,
  onSelectedItem: () => {},
  required: false,
  onChange: () => {},
};

ListCvStatus.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSelectedItem: PropTypes.func,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};
