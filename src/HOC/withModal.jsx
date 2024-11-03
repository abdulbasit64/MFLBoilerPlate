import React, { useState } from "react";
import CustomModal from "../Components/CustomModal";

const MODAL_STEPS = {
  INITIAL: 0,
  REASON_INPUT: 1,
  SUCCESS: 2,
};

const withModal = (WrappedComponent) => {
  return (props) => {
    const [modalState, setModalState] = useState({
      currentStep: MODAL_STEPS.INITIAL, // 0: initial, 1: reason input, 2: success
      show: false,
      success: false,
      title: "",
      description: "",
      action: null,
      postAction: null, // Function to be called after modal is closed
      showReason: false,
      reasonValue: "",
      errorMessage: "", // For error messages
    });

    const reasonModal = (
      title,
      action,
      success = false,
      showReason = false,
      postAction = null // Add postAction parameter

    ) => {
      setModalState({
        currentStep: MODAL_STEPS.INITIAL, // Reset to the initial step
        show: true,
        success,
        title,
        action,
        postAction, // Set postAction
        showReason,
        reasonValue: "", // Reset reason value for each new modal
        errorMessage: "", // Clear previous error messages
      });
    };

    const showModal = (title, description, action, success = false, postAction = null) => {
      setModalState({
        title, description, action, success, show: true, postAction, // Set postAction
      });
    };


    const handleModalClose = () => {
      setModalState((prev) => ({ ...prev, show: false, action: null }));
      if (modalState.postAction) {
        modalState.postAction(); // Execute the postAction after closing the modal
      }
    };

    const handleReasonChange = (e) => {
      setModalState((prev) => ({
        ...prev,
        reasonValue: e.target.value,
        errorMessage: "", // Clear error message on input change
      }));
    };

    const handleSubmit = () => {
      if (modalState.currentStep === MODAL_STEPS.INITIAL) {
        // Move to reason input step
        setModalState((prev) => ({
          ...prev,
          currentStep: MODAL_STEPS.REASON_INPUT,
        }));
      } else if (modalState.currentStep === MODAL_STEPS.REASON_INPUT) {
        // Validate reason input
        if (modalState.reasonValue.trim() === "") {
          setModalState((prev) => ({
            ...prev,
            errorMessage: "Reason is required.",
          }));
          return;
        }
        // Execute action and move to success step
        if (modalState.action) {
          modalState.action(modalState.reasonValue);
        }
        setModalState((prev) => ({
          ...prev,
          currentStep: MODAL_STEPS.SUCCESS,
        }));
      }
    };

    return (
      <>
        <WrappedComponent {...props} showModal={showModal} reasonModal={reasonModal} />
        <CustomModal
          show={modalState.show}
          close={handleModalClose}
          action={modalState.showReason ? handleSubmit : modalState.action}
          title={modalState.title}
          description={modalState.description}
          success={modalState.success}
          showReason={modalState.currentStep === MODAL_STEPS.REASON_INPUT}
          onChange={handleReasonChange}
          value={modalState.reasonValue}
          reasonLabel={"Please provide a reason"}
          reasonPlaceholder={"Enter reason here..."}
          btnText={"Submit"}
          errorMessage={modalState.errorMessage}
        />
      </>
    );
  };
};

export default withModal;

//Example-1 for just confirmation

// const confirmPopup = (id, status) => {
//   showModal(
//     `Are you sure you want to ${status === "Active" ? "Inactivate" : "Activate"} this User?`, //heading
//1-     () => onConfirm(status, id) //action
//2-     () => navigate(`/dashboard`) // If you want direct navigate without any confirmation just use navigate do not use 2 actions
//   );
// };

//Example-2 for confirmation with reason

// const confirmPopup = (id, status) => {
//   reasonModal(
//     "Are you sure you want to cancel this user?",  //heading
//     (reason) => onConfirm(id, reason), //action
//     false, //success
//     true, //reason
//   );
// };

// const onConfirm = async (id, status) => {
//   try {
//     reasonModal(
//       `User ${status === "Active" ? "inactivated" : "activated"
//       } successfully`, //heading
//       null, //action
//       true, //sucess
//       false, // showReason
//       () => {
//       // If you want to Navigate after the modal closes
//      navigate(`/dashboard`);
//      }

//     );
//   } catch (error) {
//     console.error("Error updating user status:", error);
//   }
// };

// const onConfirm = async (id, status) => {
//   try {
// showModal(
//   `User ${status === "Active" ? "inactivated" : "activated"
//   } successfully`, //heading
//   null, //action
//   true, //sucess
//   () => {
//  // If you want to Navigate after the modal closes
//   navigate(`/dashboard`);
//  }
// );
//   } catch (error) {
//     console.error("Error updating user status:", error);
//   }
// };
