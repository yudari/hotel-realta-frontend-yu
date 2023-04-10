import { doTopup } from "@/redux/payment/action/payTransActionReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopUp = () => {
  const { payTrans, message, refresh } = useSelector(
    (state: any) => state.paymentTransactionReducers
  );
  const dispatch = useDispatch();

  const [senderAccount, setSenderAccount] = useState("");
  const [senderSaldo, setSenderSaldo] = useState(0);
  const [recipientAccount, setRecipientAccount] = useState("");
  const [recipientSaldo, setRecipientSaldo] = useState(0);
  const [transferAmount, setTransferAmount] = useState("");

//   useEffect(() => {
//     dispatch(doTopup());
//   }, [dispatch, refresh]);

  const handleSenderAccountChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedAccount = payTrans.find(
      (pt: any) => pt.patr_user_id === event.target.value
    );
    setSenderAccount(selectedAccount.patr_source_id);
    setSenderSaldo(selectedAccount.usac_saldo);
  };

  const handleRecipientAccountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipientAccount(event.target.value);
  };

  const handleTransferAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransferAmount(event.target.value);
  };

  const handleTransferClick = () => {
    const confirmed = window.confirm(
      `You will transfer ${transferAmount} from ${senderAccount} to ${recipientAccount}. Click the transfer button to confirm.`
    );
    if (confirmed) {
      // Handle transfer process
    }
  };

  return (
    <section>
      <div className="flex justify-around items-start">
        <article className="w-[25rem]">
          <h1 className="text-center font-semibold mb-8 text-xl">Source</h1>
          <div className="flex justify-between items-center mb-6">
            <label htmlFor="SourceName">Source Name</label>
            <input type="text" placeholder="Bank BCA" />
          </div>
          <div className="flex justify-between items-center mb-6">
            <label htmlFor="account">Account</label>
            <select
              name="account"
              id="account"
              className="w-56"
              onChange={handleSenderAccountChange}
            >
              <option value="">Pilih Account Anda</option>
              {(payTrans || []).map((pt: any) => (
                <option key={pt.patr_user_id} value={pt.patr_user_id}>
                  {pt.patr_source_id}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center mb-6">
            <label htmlFor="currentsaldo">Current Saldo</label>
            <input
              type="number"
              className="disabled"
              value={senderSaldo}
              readOnly
            />
          </div>
        </article>
        <article className="w-[25rem]">
          <h1 className="text-center font-semibold mb-8 text-xl">Target</h1>
          <div className="flex justify-between items-center mb-6">
            <label htmlFor="SourceName">Target Name</label>
            <input type="text" placeholder="Bank BCA" />
          </div>
          <div className="flex justify-between items-center mb-6" >
            <label htmlFor="account">Target Account</label>
            <input
              type="number"
              value={recipientAccount}
              onChange={handleRecipientAccountChange}
              placeholder="Masukkan Account Number"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <label htmlFor="currentsaldo">Current Saldo</label>
            <input type="number" value={recipientSaldo} readOnly />
          </div>
        </article>
      </div>
      <div className="flex items-center mt-12">
        <div className="flex flex-col mx-auto">
          <input type="text" className="w-64 mb-6" placeholder="Masukkan Nominal Transfer" />
          <button className="border-2 py-2 rounded-lg  bg-blue-900 text-sm font-medium text-white" onClick={handleTransferClick}>
            Transfer
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopUp;
