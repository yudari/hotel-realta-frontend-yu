import type { NextPage } from "next";
import { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { doRequestGetListBooking } from "@/redux/booking/action/bookingActionReducer";
import secureLocalStorage from "react-secure-storage";
import moment from 'moment';
type InputPickDateCheckOpenProps = {
  value: string;
  onClick: () => void;
};

interface SearchBookingInterfaceProps {
  changeSearchData: any;
  classNames: any;
}
const SectionCardSearchBook: NextPage<SearchBookingInterfaceProps> = (props) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [startDateOpen, setStartDateOpen] = useState<Date>(today);
  const [startDateClose, setStartDateClose] = useState<Date>(tomorrow);
  const [cityName, setCityName] = useState('')
  const [provName, setProvName] = useState('')
  const [countryName, setCountryName] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const InputPickDateCheckOpen = forwardRef<HTMLInputElement, InputPickDateCheckOpenProps>(
    ({ value, onClick }, ref) => (
      <div className="relative z-0 w-full">
        <input
          type="text"
          id="floating_standard"
          className="block py-2.5 px-0 w-full text-[14px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onClick={onClick}
          value={value}
          ref={ref}
        />
        <label
          htmlFor="floating_standard"
          className="absolute text-[14px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Check In
        </label>
      </div>
    )
  );

  const InputPickDateCheckClose = forwardRef<HTMLInputElement, InputPickDateCheckOpenProps>(
    ({ value, onClick }, ref) => (
      <div className="relative z-0 w-full">
        <input
          type="text"
          id="floating_standard"
          className="block py-2.5 px-0 w-full text-[14px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onClick={onClick}
          value={value}
          ref={ref}
        />
        <label
          htmlFor="floating_standard"
          className="absolute text-[14px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Check Out
        </label>
      </div>
    )
  );


  const formik = useFormik({
    initialValues: {
      destinationAddress: '',
      checkOpen: '',
      checkClose: ''
    }, onSubmit: (values) => {
      let dataAddress = values.destinationAddress.split(', ')
      const dataAddressFinal = {
        addressCityName: dataAddress[0] ? dataAddress[0] : '',
        addressProvName: dataAddress[1] ? dataAddress[1] : '',
        addressCountryName: dataAddress[2] ? dataAddress[2] : 'Indonesia',
        checkOpen: moment(startDateOpen).format('MM/DD/YYYY'),
        checkClose: moment(startDateClose).format('MM/DD/YYYY')
      }


      dispatch(doRequestGetListBooking(1, 0, 100000000000000, dataAddressFinal.addressCityName, dataAddressFinal.addressProvName, dataAddressFinal.addressCountryName, 'Asia', dataAddressFinal.checkOpen, dataAddressFinal.checkClose, ['24-Hour Front Desk']))
      props.changeSearchData({
        page: 1,
        minSubTotal: 0,
        maxSubTotal: 100000000,
        cityName: dataAddressFinal.addressCityName,
        provName: dataAddressFinal.addressProvName,
        countryName: dataAddressFinal.addressCountryName,
        regionName: 'Asia',
        startDate: dataAddressFinal.checkOpen,
        endDate: dataAddressFinal.checkClose,
        facilities_support_filter: ['24-Hour Front Desk']
      })
      secureLocalStorage.setItem('yu_date', {
        page: 1,
        minSubTotal: 0,
        maxSubTotal: 100000000,
        cityName: dataAddressFinal.addressCityName,
        provName: dataAddressFinal.addressProvName,
        countryName: dataAddressFinal.addressCountryName,
        regionName: 'Asia',
        startDate: dataAddressFinal.checkOpen,
        endDate: dataAddressFinal.checkClose,
        facilities_support_filter: ['24-Hour Front Desk']
      })
      // handle form submission

    },
  })
  return (
    <div className={`self-stretch flex flex-col pt-12 px-[92px] pb-0 items-start justify-start text-left text-[18px] text-darkslategray-300 font-montserrat-semibold-14 yu_lg:pl-3 yu_lg:pr-3 yu_lg:box-border ${props.classNames}`}>
      <form onSubmit={formik.handleSubmit}
        className="self-stretch rounded-2xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col py-8 px-6 box-border items-start justify-start gap-[32px] [&.animate]:animate-[1s_ease-in_0s_1_normal_forwards_fade-in] opacity-[0] min-w-full yu_lg:self-stretch yu_lg:w-auto yu_md:self-stretch yu_md:w-auto yu_md:h-auto yu_sm:self-stretch yu_sm:w-auto yu_sm:items-center yu_sm:justify-center"
        data-animate-on-scroll
      >
        <div className="self-stretch relative font-semibold">
          Temukan Hotel Impianmu Sekarang!
        </div>
        <div className="self-stretch flex flex-row items-center justify-center gap-[16px] text-[16px] yu_md:flex-col">
          <div className="relative z-0 w-full">
            <input type="text" name="destinationAddress" id="IdDestinationAddress" className="block py-2.5 px-0 w-full text-[14px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={formik.values.destinationAddress} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            <label htmlFor="address" className="absolute text-[14px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cari Kota, Provinsi, Negara</label>
          </div>

          <ReactDatePicker portalId="root-portal" popperClassName="react-datepicker-popper"
            selected={startDateOpen}
            onChange={(date: Date) => setStartDateOpen(date)}
            customInput={<InputPickDateCheckOpen value={startDateOpen.toDateString()} onClick={() => { }} />}
            value={startDateOpen ? startDateOpen.toDateString() : ''}
            popperPlacement="top-start"
          />

          <ReactDatePicker portalId="root-portal" popperClassName="react-datepicker-popper"
            selected={startDateClose}
            onChange={(date: Date) => setStartDateClose(date)}
            customInput={<InputPickDateCheckClose value={startDateClose.toDateString()} onClick={() => { }} />}
            value={startDateClose ? startDateClose.toDateString() : ''}
            popperPlacement="top-start"
          />

        </div>
        <div className="self-stretch flex flex-row items-center justify-end">
          <div className="flex flex-col items-start justify-start">
            <button type="submit" className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 rounded h-12 shrink-0 flex flex-row box-border items-center justify-center gap-[4px] hover:bg-gray-700 active:bg-gray-700">
              <img
                className="relative w-4 h-4 shrink-0 overflow-hidden"
                alt=""
                src="/building1.svg"
              />
              <div className="relative text-[14px] font-medium font-montserrat-semibold-14 text-neutrals text-left">
                Show Places
              </div>
            </button>
          </div>
        </div>
      </form>




    </div >
  );
};

export default SectionCardSearchBook;
