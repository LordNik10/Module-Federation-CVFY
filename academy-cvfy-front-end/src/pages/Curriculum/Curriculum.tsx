import React, { useCallback, useState } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import CvFilter from 'features/cv/components/CvFilter';
import CvTable from 'features/cv/components/CvTable';
import NewCvForm from 'features/cv/components/NewCvForm';
// import Button from 'common/components/MUIOverride/Button/Button';
import { useModal } from 'features/modal/context';

function Curriculum() {
  const [filteredData, setFilteredData] = useState({ page: 1 });
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { modalOpen } = useModal();

  const onPageChange = useCallback(
    (page: number) => {
      setFilteredData((prevState) => ({ ...prevState, page }));
    },
    [setFilteredData],
  );

  const handleAddNewCV = () => {
    modalOpen({
      isModalOpen: true,
      title: 'Insert new CV',
      content: <NewCvForm />,
      disableClosing: true,
      maxWidth: 'md',
      isPending: false,
    });
  };

  return (
    <>
      <Typography variant="h1">Curriculum</Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Button
          type="button"
          variant="contained"
          size="large"
          onClick={handleAddNewCV}
        >
          +
        </Button>
        <CvFilter
          filter={filteredData}
          onSet={setFilteredData}
          // isFormSubmitted={isFormSubmitted}
          // setIsFormSubmitted={setIsFormSubmitted}
        />
      </Stack>
      <CvTable
        filter={filteredData}
        // setIsFormSubmitted={setIsFormSubmitted}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default Curriculum;
