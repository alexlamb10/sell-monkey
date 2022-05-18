import './payButton.scss'

function PayButton(props) {
  return (
    <button className="pay-modal-btn" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default PayButton