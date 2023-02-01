import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuMui from '@mui/material/Menu';
import { ITable, ITableData } from 'features/table/components/Table/Table';

interface IMenu {
  options: ITable['actionButtons'];
  row: ITableData;
}

// cambiare any
export default function Menu({ options, row }: IMenu) {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const open = Boolean(anchorEl);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <MenuMui
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {options?.map((option) => option.renderCell(row))}
      </MenuMui>
    </>
  );
}

Menu.defaultProps = {
  options: [],
  row: {},
};

Menu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})),
  row: PropTypes.objectOf(PropTypes.shape({})),
};
