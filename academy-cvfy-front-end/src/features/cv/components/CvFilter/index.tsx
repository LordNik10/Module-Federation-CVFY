import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { Stack, Button, Paper, Box } from '@mui/material';
import ListSkills from 'features/skills/components/ListSkills';
import ListCvStatus from 'features/cv/components/ListCvStatus';
// import Box from '../MUIOverride/Box/Box';
import config from 'config/config';

interface ICvFilter {
  filter: {
    page: number;
    statusId?: number;
  };
  onSet: (param: any) => void;
}

export default function CvFilter({ filter, onSet }: ICvFilter) {
  const [skillsSelected, setSkillsSelected] = useState<
    { id: number; name: string }[]
  >([]);
  const [statusCvSelected, setStatusCvSelected] = useState<number | string>(
    filter.statusId || '',
  );

  const skillsIdSelected = skillsSelected.map((skill) => skill.id);
  const hasFilterActive = skillsIdSelected?.length > 0 || statusCvSelected;

  const applyFilter = useCallback(
    (newFilter: any) => {
      onSet(newFilter);
    },
    [onSet],
  );

  const handleReset = () => {
    onSet({ page: 1 });
    setSkillsSelected([]);
    setStatusCvSelected('');
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'sticky',
        top: { xs: '0', sm: config.appBarHeight },
        zIndex: 10,
        paddingTop: 2,
        paddingBottom: 2,
        width: '100%',
      }}
    >
      <Box>
        <form>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, md: 4 }}
            alignItems="center"
            justifyContent="flex-start"
          >
            <>
              <ListSkills
                width={{ xs: '100%', md: '250px' }}
                setItemSelected={setSkillsSelected}
                itemSelected={skillsSelected}
              />
              <ListCvStatus
                onSelectedItem={setStatusCvSelected}
                selectedItem={statusCvSelected}
                width={{ xs: '100%', md: '100px' }}
              />
              {hasFilterActive && (
                <Button size="large" type="reset" onClick={handleReset}>
                  Reset
                </Button>
              )}
              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={() =>
                  applyFilter({
                    page: 1,
                    skillsId: skillsIdSelected,
                    statusId: statusCvSelected,
                  })
                }
              >
                Applica
              </Button>
            </>
          </Stack>
        </form>
      </Box>
    </Paper>
  );
}

CvFilter.defaultProps = {
  filter: {},
  onSet: () => {},
};

CvFilter.propTypes = {
  filter: PropTypes.shape({
    page: PropTypes.number,
    skillsId: PropTypes.arrayOf(PropTypes.number),
    statusId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onSet: PropTypes.func,
};
