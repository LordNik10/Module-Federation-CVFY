import PropTypes from 'prop-types';
import React from 'react';
import { useSkills } from 'features/skills/context';
import { ISkillsSelected } from 'features/cv/components/NewCvForm';
import MultipleListItem from 'common/components/ListItem/MultipleListItem';

interface IListSkills {
  setItemSelected: React.Dispatch<React.SetStateAction<ISkillsSelected[]>>;
  itemSelected: ISkillsSelected[];
  width: string | { [key: string]: string };
  required: boolean;
}

function ListSkills({
  setItemSelected,
  itemSelected,
  width,
  required,
}: IListSkills) {
  const { skillsList } = useSkills();

  return (
    <MultipleListItem
      listItem={skillsList}
      itemSelected={itemSelected}
      setItemSelected={setItemSelected}
      label="Skills"
      width={width}
      required={required}
    />
  );
}

export default ListSkills;

ListSkills.defaultProps = {
  setItemSelected: () => {},
  itemSelected: [],
  width: null,
  required: false,
};

ListSkills.propTypes = {
  setItemSelected: PropTypes.func,
  itemSelected: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  required: PropTypes.bool,
};
