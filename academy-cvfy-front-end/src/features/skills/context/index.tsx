import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { ISkillsSelected } from 'features/cv/components/NewCvForm';
// import config from 'config/config';
import { useAuthContext } from 'features/auth/context/AuthContext';
import { useFetchGlobalData } from 'common/hooks/useFetchGlobalData';

interface ISkillContext {
  skillsList: ISkillsSelected[];
  fetchSkills: (api: string) => void;
}

const SkillsContext = createContext({} as ISkillContext);

export function useSkills() {
  return useContext(SkillsContext);
}

function SkillsProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const { isLogged } = useAuthContext();
  const { fetchGlobalData: fetchSkills, data: skillsList } =
    useFetchGlobalData();

  useEffect(() => {
    if (isLogged) {
      // fetchSkills(config.apiUrls.skills);
      // eslint-disable-next-line
      console.log('skills');
    }
  }, [isLogged, fetchSkills]);

  const skillsProviderValue = useMemo(
    () => ({
      skillsList,
      fetchSkills,
    }),
    [skillsList, fetchSkills],
  );

  return (
    <SkillsContext.Provider value={skillsProviderValue}>
      {children}
    </SkillsContext.Provider>
  );
}

export default SkillsProvider;

SkillsProvider.defaultProps = {
  children: null,
};

SkillsProvider.propTypes = {
  children: PropTypes.element,
};
