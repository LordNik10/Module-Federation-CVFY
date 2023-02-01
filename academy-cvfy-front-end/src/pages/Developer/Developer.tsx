import React from 'react';
import ListSkills from 'features/skills/components/ListSkills';
import ListCvStatus from 'features/cv/components/ListCvStatus';

function Developer() {
  return (
    <>
      Page accessible only for devs.
      <ListSkills />
      <ListCvStatus />
    </>
  );
}

export default Developer;
