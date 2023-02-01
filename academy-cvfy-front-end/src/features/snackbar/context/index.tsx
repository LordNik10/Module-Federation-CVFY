import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import PropTypes from 'prop-types';

export interface ISnackBarValue {
  message: string;
  type: 'info' | 'error' | 'success';
}

interface IConfigureContext extends ISnackBarValue {
  setSnackBar: (params: ISnackBarValue) => void;
}

const configureContext: IConfigureContext = {
  message: '',
  type: 'info',
  setSnackBar: () => {},
};

const SnackBarContext = createContext(configureContext);

export function useSnackBar() {
  return useContext(SnackBarContext);
}

function SnackBarProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [snackBarValue, setSnackBarValue] =
    useState<ISnackBarValue>(configureContext);

  const setSnackBar = useCallback(({ message, type }: ISnackBarValue) => {
    setSnackBarValue({
      message,
      type,
    });
  }, []);

  const snackBarProviderValue = useMemo(
    () => ({
      message: snackBarValue.message,
      type: snackBarValue.type,
      setSnackBar,
    }),
    [snackBarValue.message, snackBarValue.type, setSnackBar],
  );

  return (
    <SnackBarContext.Provider value={snackBarProviderValue}>
      {children}
    </SnackBarContext.Provider>
  );
}

export default SnackBarProvider;

SnackBarProvider.defaultProps = {
  children: null,
};

SnackBarProvider.propTypes = {
  children: PropTypes.element,
};
