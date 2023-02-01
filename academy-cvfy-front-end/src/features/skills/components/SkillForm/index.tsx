import PropTypes from 'prop-types';
import { TextField, Grid, Stack, Button } from '@mui/material';
import React, { useState } from 'react';
import { useCallFetch } from 'common/hooks/useFetch';
import { useModal } from 'features/modal/context';
import { useSnackBar } from 'features/snackbar/context';
import { useSkills } from 'features/skills/context';
import config from 'config/config';

interface ISkillForm {
  loadSkills: () => void;
}

function SkillForm({ loadSkills }: ISkillForm) {
  const [skillInput, setSkillInput] = useState({
    skillInputValue: '',
    isSkillInputTouched: false,
  });
  const { skillInputValue, isSkillInputTouched } = skillInput;
  const [isFetching, setIsFetching] = useState(false);
  const { setSnackBar } = useSnackBar();
  const { modalClose } = useModal();
  // TODO
  const { fetchSkills } = useSkills();
  const { callFetch } = useCallFetch();

  const handleCreateSkills = async (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInputValue.length === 0) {
      return;
    }
    try {
      setIsFetching(true);
      await callFetch(config.apiUrls.skillAdd, {
        body: { name: skillInputValue },
        method: 'POST',
      });
      setSkillInput({
        skillInputValue: '',
        isSkillInputTouched: false,
      });
      fetchSkills('');
      await loadSkills();
      setSnackBar({ message: 'Skill successfully added', type: 'success' });
      modalClose();
    } catch (error: any) {
      setSkillInput({
        skillInputValue: '',
        isSkillInputTouched: false,
      });
      if (error.statusCode === 409) {
        setSnackBar({ message: 'Skill already exists', type: 'error' });
      } else {
        setSnackBar({
          message: 'There has been an error while adding a skill',
          type: 'error',
        });
      }

      console.error(error);
    }
    setIsFetching(false);
  };
  const inputSkillHandler = (e: React.FormEvent) => {
    const { target } = e;
    const { value } = target as HTMLInputElement;
    setSkillInput((prevSkillInputState) => ({
      ...prevSkillInputState,
      skillInputValue: value,
    }));
  };

  const skillInputBlurHandler = () => {
    setSkillInput((prevSkillInputState) => ({
      ...prevSkillInputState,
      isSkillInputTouched: true,
    }));
  };
  return (
    <form aria-label="Add new skill." onSubmit={handleCreateSkills}>
      <Grid container spacing={2} rowSpacing={2} columns={1}>
        <Grid item xs={1}>
          <TextField
            label="Skill name"
            id="skill_name"
            fullWidth
            placeholder="Skill name"
            size="small"
            variant="outlined"
            type="text"
            onChange={inputSkillHandler}
            onBlur={skillInputBlurHandler}
            required
            disabled={!!isFetching}
            value={skillInputValue}
            autoComplete="off"
            autoFocus
            helperText={
              isSkillInputTouched &&
              skillInputValue.length < 1 &&
              'Insert a new skill.'
            }
          />
        </Grid>
        <Grid item xs={1}>
          <Stack
            direction="row"
            justifyContent={{ xs: 'center', md: 'flex-end' }}
            spacing={2}
          >
            <Button
              type="reset"
              variant="outlined"
              size="medium"
              onClick={modalClose}
            >
              CANCEL
            </Button>
            <Button type="submit" variant="contained" size="medium">
              CREATE
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}

export default SkillForm;

SkillForm.defaultProps = {
  loadSkills: () => {},
};

SkillForm.propTypes = {
  loadSkills: PropTypes.func,
};
