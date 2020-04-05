import React, { useState } from "react";

export const ModalContext = React.createContext({
  isOpen: null,
  propsModal: {},
  setStatus: () => {},
  setProps: () => {},
});

export default (props) => {
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [modalProps, setModalProps] = useState({job: '', priority: ''});

  const makeSetStatus = (data) => {
    setIsOpenStatus(() => {
      return data;
    });
  };
  const makeSetProps = (data) => {
    setModalProps(() => {
      return data;
    });
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen: isOpenStatus,
        propsModal: modalProps,
        setStatus: makeSetStatus,
        setProps: makeSetProps,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
