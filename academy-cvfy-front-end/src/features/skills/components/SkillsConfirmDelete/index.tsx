import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Container, Stack, Grid, Button } from '@mui/material';
import { useModal } from 'features/modal/context';
import { useCallFetch } from 'common/hooks/useFetch';
import config from 'config/config';
import { useSnackBar } from 'features/snackbar/context';
import { useSkills } from 'features/skills/context';

export interface ISkillConfirmDelete {
  dataSkill: { id: number; name: string };
  onSuccess: () => void;
}

function SkillConfirmDelete({ dataSkill, onSuccess }: ISkillConfirmDelete) {
  const { modalClose } = useModal();
  const { fetchSkills } = useSkills();
  const { setSnackBar } = useSnackBar();
  const { callFetch } = useCallFetch();

  const handleAccountDelete = async () => {
    try {
      await callFetch(config.apiUrls.skillDelete, {
        body: dataSkill.id,
        method: 'POST',
      });
      setSnackBar({ message: 'Skill successfully deleted', type: 'success' });
      onSuccess();
      fetchSkills('');
      modalClose();
    } catch (error) {
      setSnackBar({ message: 'Error in deleting the skill', type: 'error' });
      console.error(error);
    }
  };

  return (
    <Container disableGutters maxWidth={false}>
      <Grid container spacing={2} rowSpacing={2} columns={2} direction="row">
        <Grid item xs={2}>
          <Typography component="span" margin={0}>
            Skill: {dataSkill.name}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Stack
            direction="row"
            spacing={2}
            width="100%"
            justifyContent="flex-end"
          >
            <Button
              sx={{ marginTop: 5 }}
              type="button"
              variant="outlined"
              size="large"
              onClick={modalClose}
            >
              Cancel
            </Button>
            <Button
              sx={{ marginTop: 5 }}
              type="submit"
              variant="contained"
              size="large"
              onClick={handleAccountDelete}
            >
              Delete
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SkillConfirmDelete;

SkillConfirmDelete.defaultProps = {
  dataSkill: null,
  onSuccess: () => {},
};

SkillConfirmDelete.propTypes = {
  dataSkill: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
  onSuccess: PropTypes.func,
};
