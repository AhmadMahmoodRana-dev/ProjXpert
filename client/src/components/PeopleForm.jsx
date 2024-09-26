"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useContext, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon, X } from "lucide-react";
import { Context } from "@/context/Context";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const PeopleForm = () => {
  const {
    setOpenPersonForm,
    openPersonForm,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    company,
    setCompany,
    country,
    setCountry,
    phone,
    setPhone,
    email,
    setEmail,
    setPeople,
    countryData
  } = useContext(Context);
  
  // State for selected company
  // const [selectedCompany, setSelectedCompany] = useState('');
console.log(country,"AHmMAM")
  return (
    <Dialog
      open={openPersonForm}
      onClose={setOpenPersonForm}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpenPersonForm(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <X aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6 flex flex-col gap-4">
                  <DialogTitle>First Name</DialogTitle>
                  <Input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                  <DialogTitle>Last Name</DialogTitle>
                  <Input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                  <DialogTitle>Country</DialogTitle>
                  <Listbox value={country} onChange={setCountry}>
                    <div className="relative mt-2">
                      <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="block truncate">
                          {country || "Select a company"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronsUpDownIcon
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-400"
                          />
                        </span>
                      </ListboxButton>

                      <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        {countryData.map((country) => (
                          <ListboxOption
                            key={country.cca3}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                            value={country.name.common} 
                          >
                            <div className="flex items-center">
                              <img
                                src={country.flags.svg} alt={`${country.name.common} flag`}
                                className="h-5 w-5 flex-shrink-0 rounded-full"
                              />
                              <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                {country.name.common}
                              </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                              <CheckIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            </span>
                          </ListboxOption>
                          
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>

                  <DialogTitle>Company</DialogTitle>
                  <Input
                    type="text"
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}
                  />
                  <DialogTitle>Phone</DialogTitle>
                  <Input
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                  <DialogTitle>Email</DialogTitle>
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <Button className="mt-10" onClick={() => {
                    setPeople();
                  }}>
                    Save
                  </Button>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {/* Your content */}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PeopleForm;
