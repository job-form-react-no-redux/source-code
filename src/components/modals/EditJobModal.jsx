import React, { useContext, useState } from "react";
import ReactModal from "react-modal";

import PrioritySelect from "../PrioritySelect";

import { ModalContext } from "../../context/modalContext";
import { JobsContext } from "../../context/jobsContext";

ReactModal.setAppElement("#root");

const MODAL_STYLES = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.70)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "500px",
    minHeight: "200px",
    padding: "10px 20px",
  },
};

const EditJobModal = () => {
  const isModalOpen = useContext(ModalContext).isOpen;
  const modalProps = useContext(ModalContext).propsModal;

  const [priority, setPriority] = useState(modalProps?.priority);

  const modalSetStatus = useContext(ModalContext).setStatus;
  const makeEdit = useContext(JobsContext).editJob;

  const handleCloseModal = () => {
    modalSetStatus(false);
  };
  const handleSelect = (e) => {
    setPriority(e.target.value)
  };
  const handleUpdate = () => {
    if(priority){
      let editedJob = {...modalProps, newPriority: priority};
      makeEdit(editedJob);
    }
    modalSetStatus(false);
  };

  return (
    <ReactModal
      style={MODAL_STYLES}
      isOpen={isModalOpen}
      contentLabel="Minimal Modal Example"
    >
      <div className="EditJobModal">
        <div className="EditJobModal__close">
          <div className="EditJobModal__close-icon" onClick={() => {handleCloseModal()}}>+</div>
        </div>
        <div className="EditJobModal__header">
          <h4>{modalProps.job}</h4>
        </div>
        <div className="EditJobModal__body">
        <PrioritySelect
            reset={false}
            value={modalProps.priority}
            onSelectPriority={(e) => handleSelect(e)}
          />
        </div>
        <div className="EditJobModal__buttons">
          <button onClick={() => {handleUpdate()}}>Update</button>
        </div>
      </div>
    </ReactModal>
  );
};

export default EditJobModal;
