import { ReactNode } from "react";

import BootstrapModal from "react-bootstrap/esm/Modal";

interface IModalProps {
  show: boolean;
  title?: string;
  children: ReactNode;
  handleClose: () => void;
}

const Modal = ({ show, title, children, handleClose }: IModalProps) => (
  <BootstrapModal
    show={show}
    onHide={handleClose}
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <BootstrapModal.Header closeButton>
      <BootstrapModal.Title>{title}</BootstrapModal.Title>
    </BootstrapModal.Header>
    {children}
  </BootstrapModal>
);

export default Modal;
