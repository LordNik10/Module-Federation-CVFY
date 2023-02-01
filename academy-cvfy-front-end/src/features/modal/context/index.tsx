import PropTypes from 'prop-types';
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';

interface IModalOpen {
  isModalOpen: boolean;
  title: string;
  content: React.ReactNode | React.ReactNode[];
  disableClosing: boolean;
  maxWidth: string;
  isPending: boolean;
}

interface IModalContextValue {
  modalOpen: (obj: IModalOpen) => void;
  modalClose: () => void;
  setIsModalPending: (isPending: boolean) => void;
  modalInfo: { [key: string]: any };
}

const ModalContext = createContext<IModalContextValue>(
  {} as IModalContextValue,
);

export function useModal() {
  return useContext(ModalContext);
}

export function ModalContextProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [modalData, setModalData] = useState({});

  const modalOpen = useCallback(
    (obj: IModalOpen) => {
      setModalData(obj);
    },
    [setModalData],
  );

  const modalClose = useCallback(() => {
    setModalData({});
  }, [setModalData]);

  const modalInfo = useMemo(() => modalData, [modalData]);

  const setIsModalPending = useCallback(
    (isPending: boolean) => {
      setModalData((prevData) => ({ ...prevData, isPending }));
    },
    [setModalData],
  );

  const value = useMemo(
    () => ({
      modalOpen,
      modalClose,
      setIsModalPending,
      modalInfo,
    }),
    [modalOpen, modalClose, setIsModalPending, modalInfo],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export default ModalContext;

ModalContextProvider.defaultProps = {
  children: null,
};

ModalContextProvider.propTypes = {
  children: PropTypes.element,
};
