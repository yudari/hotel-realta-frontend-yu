import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdArrowDropDown } from "react-icons/md";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

export default function InputSelect() {
  const [selected, setSelected] = useState(people[0]);

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="w-full cursor-default rounded bg-white py-3 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border border-gray-300">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <MdArrowDropDown
                className="h-5 w-5 text-variant"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-gray-300">
              {people.map((person, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-3 pl-10 pr-4 ${
                      active ? "bg-primary text-white" : "text-black"
                    }`
                  }
                  value={person.name}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
