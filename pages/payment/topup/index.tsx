// import { doTopup } from "@/redux/payment/action/payTransActionReducer";
import {
  doGetBankFintech,
  doGetUserAccount,
} from '@/redux/payment/action/userAccActionReducer'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TopUp = () => {
  const loginData: any = localStorage.getItem('loginData')
  const objLoginData = JSON.parse(loginData)
  const user_id = objLoginData.user_id
  const { payTrans, message, refresh } = useSelector(
    (state: any) => state.paymentTransactionReducers
  )

  let { accounts } = useSelector((state: any) => state.userAccountReducers)
  let { bankFintech } = useSelector((state: any) => state.userAccountReducers)
  const dispatch = useDispatch()

  const [senderAccount, setSenderAccount] = useState('')
  const [senderSaldo, setSenderSaldo] = useState(0)
  const [recipientAccount, setRecipientAccount] = useState('')
  const [recipientSaldo, setRecipientSaldo] = useState(0)
  const [transferAmount, setTransferAmount] = useState('')

  const [selectOption, setSelectOption] = useState<any>({})
  //   useEffect(() => {
  //     dispatch(doTopup());
  //   }, [dispatch, refresh]);

  const handleSenderAccountChange = (e: any) => {
    const dataSaldo = accounts.find((data: any) => {
      if (data.usac_account_number === e.target.value) {
        return data
      }
    })

    setSelectOption(dataSaldo)
  }

  // const handleSenderAccountChangename = (e:any) => {
  //   const accountName =    bankFintech.find((name:any)=>{
  //     console.log('oooooooooooo',accountName)
  //     if(name.usac_account_number === e.target.value){
  //       return name
  //     }
  //   })
  //   setSelectOption(accountName);
  // }
  useEffect(() => {
    dispatch(doGetUserAccount(user_id))
  }, [refresh])

  const handleTransferClick = () => {
    const confirmed = window.confirm(
      `You will Topup  ${transferAmount} from ${senderAccount} to ${recipientAccount}. Click the transfer button to confirm.`
    )
    if (confirmed) {
      // Handle transfer process
    }
  }

  console.log(accounts)
  return (
    <section>
      <div className='flex justify-center'>
        <article className='w-[28rem]'>
          <h1
            style={{ fontSize: '1.5em' }}
            className='text-center font-semibold mb-8 text-xl'
          >
            TOP UP
          </h1>

          <div className='flex justify-between items-center mb-6'>
            <label htmlFor='account' className='text-[14px]'>
              Account
            </label>
            <select
              name='account'
              id='account'
              className='w-56'
              onChange={handleSenderAccountChange}
            >
              <option value=''>Pilih Account Anda</option>
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

          <div className='flex justify-between items-center mb-6'>
            <label htmlFor='SourceName' className='text-[14px]'>
              Source Name
            </label>
            <input
              type='text'
              className='disabled'
              value={selectOption ? selectOption.entity_name : 'None'}
              placeholder='Bank name'
              readOnly
            />
          </div>
          <div className='flex justify-between items-center mb-6'>
            <label htmlFor='currentsaldo' className='text-[14px]'>
              Current Saldo
            </label>
            <input
              type='number'
              className='disabled'
              value={selectOption ? selectOption.usac_saldo : '0'}
              placeholder='Current Saldo'
              readOnly
            />
          </div>
          <div className='flex justify-between items-center mb-6'>
            <label htmlFor='account' className='text-[14px]'>
              Target Account
            </label>
            <input
              type='number'
              // value={recipientAccount}
              // onChange={handleRecipientAccountChange}
              placeholder='Masukkan Account Number'
            />
          </div>
          <div className='flex justify-between items-center mb-6'>
            <label htmlFor='account' className='text-[14px]'>
              Nominal Top Up
            </label>
            <input type='text' placeholder='Masukkan Nominal Transfer' />
          </div>
        </article>
      </div>
      <div className='flex items-center mt-12'>
        <div className='mx-auto'>
          {/* <input type="text" className="w-64 mb-6" placeholder="Masukkan Nominal Transfer" />  */}
          <button
            className='border-2 rounded-lg py-4 px-12 bg-blue-900 text-lg font-medium text-white'
            //  onClick={handleTransferClick}
          >
            Transfer
          </button>
        </div>
      </div>
    </section>
  )
}

export default TopUp
