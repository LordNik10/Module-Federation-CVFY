import React from 'react';
import { Typography } from '@mui/material';
import SkillsTable from 'features/skills/components/SkillsTable';

function Skills() {
  return (
    <>
      <Typography variant="h1">Skills</Typography>
      <SkillsTable />
    </>
  );
}

export default Skills;
