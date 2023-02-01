import React, { useCallback, useEffect, useState } from 'react';
import {
  Stack,
  Autocomplete,
  MenuItem,
  TextField,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallFetch } from 'common/hooks/useFetch';
import { useModal } from 'features/modal/context';
import config from 'config/config';
import { useSnackBar } from 'features/snackbar/context';
import { useSkills } from 'features/skills/context';
import { ITable, Table } from 'features/table/components/Table/Table';
import { theme } from 'theme/theme';
import SkillConfirmDelete, {
  ISkillConfirmDelete,
} from '../SkillsConfirmDelete';
import SkillForm from '../SkillForm';

function SkillsTable() {
  const [isFetching, setIsFetching] = useState(false);
  const [skillsListpaged, setSkillsListpaged] = useState([]);
  const { skillsList } = useSkills();
  const [skillsListComboBox, setSkillsListComboBox] = useState<
    never[] | string[]
  >([]);
  const [isInputInitialize, setIsInputInitialize] = useState(false);
  const [researchedSkill, setResearchedSkill] = useState<string | null>('');
  const [pagination, setPagination] = useState({
    totalPages: 1,
    rowsPerPage: 10,
    totalRows: 1,
  });
  const [page, setPage] = useState(1);
  const [checkHasPagination, setCheckHasPagination] = useState(true);
  const { callFetch } = useCallFetch();
  const { setSnackBar } = useSnackBar();
  const { modalOpen } = useModal();

  const fetchSkills = useCallback(async () => {
    setCheckHasPagination(true);
    try {
      setIsFetching(true);
      const res = await callFetch(
        `${config.apiUrls.skillsPaged}?page=${page}`,
        undefined,
      );
      setIsFetching(false);
      setSkillsListpaged(res.content);
      setPagination({
        totalPages: res.totalPages,
        rowsPerPage: res.pageable.pageSize,
        totalRows: res.totalElements,
      });
      setPage(res.pageable.pageNumber + 1);
      setSkillsListComboBox(skillsList.map((skill) => skill.name));
    } catch (error) {
      setIsFetching(false);
      console.error(error);
      setSnackBar({
        message: 'An error has occurred while fetching skills',
        type: 'error',
      });
    }
  }, [callFetch, setSnackBar, page, skillsList]);

  const columns: ITable['headers'] = [
    {
      id: 'name',
      label: 'Name',
      align: 'left',
    },
  ];

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleNewSkillModal = () => {
    modalOpen({
      isModalOpen: true,
      title: 'Create new skill',
      content: <SkillForm loadSkills={fetchSkills} />,
      maxWidth: 'md',
      isPending: false,
      disableClosing: false,
    });
  };

  const handleDeleteSkill = (dataSkill: ISkillConfirmDelete['dataSkill']) => {
    modalOpen({
      isModalOpen: true,
      title: 'Delete skill',
      content: (
        <SkillConfirmDelete dataSkill={dataSkill} onSuccess={fetchSkills} />
      ),
      disableClosing: true,
      maxWidth: 'md',
      isPending: false,
    });
  };

  async function fetchSkillsByName(
    name: string | null,
    isInputInitializeReset: boolean,
  ) {
    try {
      const res = await callFetch(
        `${config.apiUrls.skillsSearch}?name=${name}`,
      );
      setSkillsListpaged(res);
      setCheckHasPagination(false);
      setIsFetching(false);
      if (isInputInitializeReset) {
        setIsInputInitialize(true);
      }
    } catch (error) {
      setIsFetching(false);
      console.error(error);
    }
  }

  const handleOnChangeSkills = async (e: React.FormEvent) => {
    const { target } = e;
    const { textContent, value } = target as HTMLInputElement;
    setIsFetching(true);
    if (!textContent && !value && e.type !== 'keydown') {
      fetchSkills();
      setResearchedSkill('');
      setIsFetching(false);
      return;
    }

    setTimeout(() => {
      setResearchedSkill(textContent !== '' ? textContent : value);
      fetchSkillsByName(textContent !== '' ? textContent : value, false);
    }, 0);
  };

  const handleOnKeyDownSkills = async (e: React.KeyboardEvent) => {
    const { target } = e;
    const { value } = target as HTMLInputElement;
    setResearchedSkill(value);
    if (e.code === 'Enter' && value.length > 3) {
      setIsFetching(true);
      fetchSkillsByName(value, false);
    }
  };

  const handleTypingSkills = async (e: React.FormEvent) => {
    const { target } = e;
    const { value } = target as HTMLInputElement;
    setResearchedSkill(value);
    if (value.length >= 3) {
      setIsFetching(true);
      fetchSkillsByName(value, true);
    } else if (isInputInitialize) {
      if (page >= 2) {
        setPage(1);
      } else fetchSkills();
      setIsInputInitialize(false);
    }
  };

  const actionButtons = [
    {
      renderCell: (row: ISkillConfirmDelete['dataSkill']) => (
        <MenuItem
          onClick={() => {
            handleDeleteSkill(row);
          }}
          id={`${row.id}-delete`}
          key={`${row.id}-delete`}
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      ),
    },
  ];

  return (
    <>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        width="100%"
        mb={3}
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={handleNewSkillModal}
          disabled={isFetching}
        >
          NEW SKILL
        </Button>
        <Autocomplete
          sx={{
            width: 300,
            marginLeft: { xs: 0, md: theme.spacing(2) },
            marginTop: { xs: theme.spacing(2), md: 0 },
          }}
          disablePortal
          clearOnBlur={false}
          id="combo-box"
          onChange={(e) => handleOnChangeSkills(e)}
          onKeyDown={(e) => handleOnKeyDownSkills(e)}
          value={researchedSkill}
          options={skillsListComboBox}
          freeSolo
          noOptionsText={null}
          onClose={() => setResearchedSkill('')}
          renderOption={(props, skill) =>
            researchedSkill &&
            researchedSkill.length < 3 && (
              <MenuItem
                key={skill}
                value={skill}
                {...props}
                onKeyDown={(e) => handleOnKeyDownSkills(e)}
              >
                {skill}
              </MenuItem>
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Skills"
              value={researchedSkill}
              onChange={handleTypingSkills}
              onKeyDown={handleOnKeyDownSkills}
            />
          )}
        />
      </Stack>
      <Table
        // TODO
        headers={columns}
        data={skillsListpaged}
        isStriped
        hasPagination={checkHasPagination === true}
        actionButtons={actionButtons}
        isLoading={isFetching}
        pageCurrent={page - 1}
        setPage={setPage}
        pageTotal={pagination.totalPages}
        rowsPerPage={pagination.rowsPerPage}
        rowsTotal={pagination.totalRows}
      />
    </>
  );
}

export default SkillsTable;
