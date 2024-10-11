"use client";
import { useContext, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import { Context } from "@/context/Context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

const CompanyForm = () => {
  const {
    openCustomerForm,
    setOpenCustomerForm,
    storeCompanyData,
    storePeopleData,
    getSingleCompanyId,
    setGetSingleCompanyId,
    getSinglePeopleId,
    setGetSinglePeopleId,
    storeSingleCustomerCompany,
    storeSingleCustomerPeople
  } = useContext(Context);
  const [selectType, setSelectType] = useState("");
  console.log(getSinglePeopleId);
  return (
    <Dialog
      open={openCustomerForm}
      onClose={setOpenCustomerForm}
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
                    onClick={() => setOpenCustomerForm(false)}
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
                  <DialogTitle> Type</DialogTitle>
                  <Select
                    onValueChange={(value) => setSelectType(value)}
                    value={selectType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="people">People</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="px-4 sm:px-6 flex flex-col gap-4 mt-4">
                  {selectType == "people" ? (
                    <>
                      <DialogTitle> People</DialogTitle>
                      <Select
                        onValueChange={(value) => setGetSinglePeopleId(value)}
                        value={getSinglePeopleId}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a People" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {storePeopleData.map((val, ind) => {
                              return (
                                <SelectItem key={ind} value={val._id}>
                                  {val.firstName} {val.lastName}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button onClick={() => storeSingleCustomerPeople()}>Submit</Button>
                    </>
                  ) : selectType == "company" ? (
                    <>
                      <DialogTitle> Company</DialogTitle>
                      <Select
                        onValueChange={(value) => setGetSingleCompanyId(value)}
                        value={getSingleCompanyId}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {storeCompanyData.map((val, ind) => {
                              return (
                                <SelectItem key={ind} value={val._id}>
                                  {val.name}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button onClick={() => storeSingleCustomerCompany()}>Submit</Button>
                    </>
                  ) : null}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CompanyForm;
