// import { doTopup } from "@/redux/payment/action/payTransActionReducer";
import { doTopup } from "@/redux/payment/action/payTransActionReducer";
import {
  doGetBankFintech,
  doGetUserAccount,
} from "@/redux/payment/action/userAccActionReducer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const TopUp = () => {
  const loginData: any = localStorage.getItem("loginData");
  const objLoginData = JSON.parse(loginData);
  const user_id = objLoginData.user_id;

  const { payTrans, message, refresh } = useSelector(
    (state: any) => state.paymentTransactionReducers
  )


  type FormValues = {
    patr_debet: number;
    patr_source_id: number;
    patr_target_id: number;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();


  let { accounts  } = useSelector(
    (state: any) => state.userAccountReducers
  );
  let { bankFintech } = useSelector(
    (state: any) => state.userAccountReducers
  );
  const dispatch = useDispatch();
  const handleError = (errors: any) => {};
  const router = useRouter()
  

  const handleSave = (data: any) => {
    const transferAmount = data.patr_debet;
    const senderAccount = data.patr_source_id;
    const recipientAccount = data.patr_target_id;
  
    const confirmed = window.confirm(
      `Are you sure you want to Topup  ${transferAmount} from account ${senderAccount} to account ${recipientAccount}?`
    );
  
    if (confirmed) {
      const dataAll = {
        debit: transferAmount,
        sourceId: senderAccount,
        targetId: recipientAccount,
      };
      dispatch(doTopup(dataAll));
      
    }
  
  };
  

  const [selectOption, setSelectOption] = useState<any>({});
  const handleSenderAccountChange = (e: any) => {
    const dataSaldo = accounts.find((data: any) => {
      if (data.usac_account_number === e.target.value) {
        return data;
      }
    });
    setSelectOption(dataSaldo);
  };

  const registerOptions = {
    patr_source_id: { required: "Source is required" },
    patr_debet: { required: "Amount is required" },
    patr_target_id: { required: "Target Account is required" },
  };

  useEffect(() => {
    dispatch(doGetUserAccount(user_id));
  }, [refresh]);


console.log(accounts)
  return (
    <section>
      <div className="flex justify-center">
        
        <article className="w-[28rem]">
          <h1
            style={{ fontSize: "1.5em" }}
            className="text-center font-semibold mb-8 text-xl"
          >
            TOP UP
          </h1>
          <form onSubmit={handleSubmit(handleSave, handleError)}>
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="account" className="text-[14px]">
                Account
              </label>
              <select
                id="account"
                className="w-[245.6px]"
                {...register("patr_source_id")}
                onChange={handleSenderAccountChange}
              >
                <option value="">Pilih Account Anda</option>
                {(accounts || []).map((a: any) => (
                  <option
                    key={a.usac_account_number}
                    value={a.usac_account_number}
                  >
                    {a.usac_account_number}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center mb-6">
              <label htmlFor="SourceName" className="text-[14px]">
                Source Name
              </label>
              <input
                type="text"
                className="disabled"
                value={selectOption ? selectOption.entity_name : "None"}
                placeholder="Bank name"
                readOnly
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="currentsaldo" className="text-[14px]">
                Current Saldo
              </label>
              <input
                type="number"
                className="disabled"
                value={selectOption ? selectOption.usac_saldo : "0"}
                placeholder="Current Saldo"
                readOnly
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="account" className="text-[14px]">
                Target Account
              </label>

              <input
                type="number"
                placeholder="Masukkan Account Number"
                {...register("patr_target_id")}
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <label htmlFor="account" className="text-[14px]">
                Nominal Top Up
              </label>
              <input
                type="number"
                placeholder="Masukkan Nominal Transfer"
                
                {...register("patr_debet")}
              />
            </div>
            
            <div className="flex items-center mt-12">
        <div className="mx-auto">
          <button
            type="submit"
            className="text-white bg-primary/90 hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Topup
          </button>
        </div>
      </div>
          </form>
        </article>
      </div>
      
    </section>
  )
}

export default TopUp
