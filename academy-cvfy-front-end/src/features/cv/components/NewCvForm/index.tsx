import {
  TextField,
  Grid,
  Stack,
  Container,
  Button,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import config from 'config/config';
import { useAuthContext } from 'features/auth/context/AuthContext';
import { useModal } from 'features/modal/context';
import { useCallFetch } from 'common/hooks/useFetch/index';
import { capitalize } from 'common/services/utility';
import ListCvStatus from 'features/cv/components/ListCvStatus';
import ListSkills from 'features/skills/components/ListSkills';
import { useSnackBar } from 'features/snackbar/context';
import { SelectChangeEvent } from '@mui/material/Select';

interface ICvInitialState {
  name: string;
  surname: string;
  file: any;
  accountId: string;
  statusId: number;
}

const cvInitialState = {
  name: '',
  surname: '',
  file: null,
  accountId: '',
  statusId: 5,
};

export interface ISkillsSelected {
  id: number;
  name: string;
}

function NewCvForm() {
  const { modalClose } = useModal();
  const { setSnackBar } = useSnackBar();
  const { userInfo } = useAuthContext();
  const { callFetch } = useCallFetch();
  const [cvInfo, setCvInfo] = useState<ICvInitialState>(cvInitialState);
  const [skillsSelected, setSkillsSelected] = useState<ISkillsSelected[]>([]);

  const formatCvInfo = () => {
    let formattedSurname: string | string[] = cvInfo.surname.trim();
    formattedSurname = formattedSurname.split(' ');
    if (formattedSurname.length > 1) {
      formattedSurname = `${formattedSurname[0]} ${capitalize(
        formattedSurname[1],
      )}`;
    } else {
      formattedSurname = capitalize(cvInfo.surname.trim());
    }
    return {
      accountId: userInfo.id,
      statusId: cvInfo.statusId,
      name: capitalize(cvInfo.name.trim()),
      surname: formattedSurname,
      skillsIds: skillsSelected.map((skill) => skill.id),
      file: cvInfo.file,
    };
  };

  const handleOnSubmitCvInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvInfo.file) {
      setSnackBar({ message: 'Select a file', type: 'error' });
      return;
    }
    const formData = new FormData();
    const { accountId, statusId, name, surname, skillsIds, file } =
      formatCvInfo();
    formData.append('accountId', String(accountId));
    formData.append('statusId', String(statusId));
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('skillsIds', String(skillsIds));
    formData.append('file', file);
    try {
      const res = await callFetch(config.apiUrls.curriculumAdd, {
        body: formData,
        method: 'POST',
        overrideParams: {
          headers: {
            'Content-Type': 'multipart/form-data', // multipart/form-data - application/x-www-form-urlencoded
          },
        },
      });
      if (res) {
        setSnackBar({
          message: 'Cv is inserted successfully',
          type: 'success',
        });
      }
    } catch (error) {
      setSnackBar({ message: 'Error in inserting Cv', type: 'error' });
      console.error(error);
    }
  };

  const handleOnChangeCvInfo = (
    e: React.FormEvent | SelectChangeEvent<string | number | {}>,
  ) => {
    const { target } = e;
    const { name, value, files } = target as HTMLInputElement;
    let inputValue: string | File;
    if (files !== null) {
      inputValue = name === 'file' ? files[0] : value;
    }
    setCvInfo((prevValue) => ({ ...prevValue, [name]: inputValue }));
  };

  const handleResetFile = () => {
    setCvInfo((prevValue) => ({ ...prevValue, file: null }));
  };

  return (
    <form
      style={{
        width: '100%',
        height: '100%',
      }}
      onSubmit={handleOnSubmitCvInfo}
      id="formElem"
    >
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2} rowSpacing={2} columns={2} direction="row">
          <Grid item xs={2} md={1}>
            <TextField
              label="Name"
              name="name"
              placeholder="Name"
              onChange={handleOnChangeCvInfo}
              required
              autoFocus
              fullWidth
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <TextField
              label="Surname"
              placeholder="Surname"
              name="surname"
              onChange={handleOnChangeCvInfo}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <ListSkills
              width="100%"
              setItemSelected={setSkillsSelected}
              itemSelected={skillsSelected}
              // name="statusId"
              required
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <ListCvStatus
              selectedItem={5}
              onChange={handleOnChangeCvInfo}
              required
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={1}
              alignItems={{ xs: 'flex-start', md: 'center' }}
            >
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  name="file"
                  hidden
                  onClick={(e) => {
                    // it was null before instead of ''
                    (e.target as HTMLInputElement).value = '';
                  }}
                  onChange={handleOnChangeCvInfo}
                  accept="application/doc,application/docx,application/pdf"
                />
              </Button>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography component="label">{cvInfo.file?.name}</Typography>
                {cvInfo.file?.name && (
                  <Button onClick={handleResetFile}>
                    <CloseIcon />
                  </Button>
                )}
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={2} md={2}>
            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-end' }}
              spacing={2}
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
              >
                Insert
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}

export default NewCvForm;
