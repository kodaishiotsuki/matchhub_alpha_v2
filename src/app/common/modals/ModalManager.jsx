import React from "react";
import { useSelector } from "react-redux";
import TestModal from "../../../features/sandbox/TestModal";
import LoginForm from "../../../features/auth/LoginForm";
import RegisterForm from "../../../features/auth/RegisterForm";
import UserTypePage from "../../../features/auth/UserTypePage"

export default function ModalManager() {
  const modalLookup = {
    TestModal,
    LoginForm,
    RegisterForm,
    UserTypePage,
  };
  const currentModal = useSelector((state) => state.modals);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
}
