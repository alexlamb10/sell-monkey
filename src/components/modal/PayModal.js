import React, {useEffect, useRef} from "react";
import "./modal.scss";

function PayModal(props) {
    const modalRef = useRef();

    useEffect(() => {
      const clickOutsideContent = (e) => {
        if (e.target === modalRef.current) {
          props.setShow(false);
        }
      };
      window.addEventListener("click", clickOutsideContent);

      return () => {
        window.removeEventListener("click", clickOutsideContent);
      };
    }, [props]);
  return (
    <div ref={modalRef} className={`modal ${props.show ? "active" : ""}`}>
      <div className="modal__content pay">
        {!props.hideCloseButton && (
          <span onClick={() => props.setShow(false)} className="modal__close">
            &times;
          </span>
        )}

        {props.children}
      </div>
    </div>
  );
}

export default PayModal;

export const PayModalHeader = (props) => {
  return <div className="modal__header">{props.children}</div>;
};

export const PayModalBody = (props) => {
  return <div className="modal__body">{props.children}</div>;
};

export const PayModalFooter = (props) => {
  return <div className="modal__footer">{props.children}</div>;
};
