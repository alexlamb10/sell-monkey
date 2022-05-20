import './payButton.scss'

function PayButton(props) {
  return (
    <button className={!props.paid ? "pay-modal-btn" : 'paid'} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default PayButton