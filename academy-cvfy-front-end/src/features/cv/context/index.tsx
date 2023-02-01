import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
// import config from 'config/config';
import { useAuthContext } from 'features/auth/context/AuthContext';
import { useFetchGlobalData } from 'common/hooks/useFetchGlobalData';

const CvStatusContext = createContext({
  cvStatusList: [] as { id: number; name: string }[],
});

export function useCvStatusContext() {
  return useContext(CvStatusContext);
}

function CvStatusProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const { isLogged } = useAuthContext();
  const { fetchGlobalData: fetchCvStatusList, data: cvStatusList } =
    useFetchGlobalData();

  useEffect(() => {
    if (isLogged) {
      // fetchCvStatusList(config.apiUrls.curriculumStatus);
      // eslint-disable-next-line
      console.log('cv');
    }
  }, [isLogged, fetchCvStatusList]);

  const cvStatusProviderValue = useMemo(
    () => ({
      cvStatusList,
    }),
    [cvStatusList],
  );

  return (
    <CvStatusContext.Provider value={cvStatusProviderValue}>
      {children}
    </CvStatusContext.Provider>
  );
}

export default CvStatusProvider;

CvStatusProvider.defaultProps = {
  children: null,
};

CvStatusProvider.propTypes = {
  children: PropTypes.element,
};
