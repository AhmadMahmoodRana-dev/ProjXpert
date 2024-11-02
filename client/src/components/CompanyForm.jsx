"use client";
import { useContext, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Context } from "@/context/Context";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup"; // For validation
import { darkBackground } from "./Colors";

const CompanyForm = () => {
  const {
    setOpenCompanyForm,
    openCompanyForm,
    setCompanies,
    countryData,
    cmpShowButton,
    updateCompany,
    storePeopleData,
    companyDetail,
    mode
  } = useContext(Context);
  
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Company name is required"),
    contact: Yup.string().required("Contact is required"),
    country: Yup.string().required("Country is required"),
    website: Yup.string().url("Invalid URL").required("Website is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <Dialog
      open={openCompanyForm}
      onClose={setOpenCompanyForm}
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
                    onClick={() => setOpenCompanyForm(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <X aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              
              <div className={`flex h-full flex-col overflow-y-scroll py-6 shadow-xl ${mode ? darkBackground : 'bg-white'}`}>
                <div className="px-4 sm:px-6 flex flex-col gap-4">
                  <Formik
                    initialValues={{
                      name:companyDetail.name || '',
                      contact:companyDetail.contact ||'',
                      country:companyDetail.country ||'',
                      website:companyDetail.website ||'',
                      phone:companyDetail.phone ||'',
                      email:companyDetail.email ||'',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      if (cmpShowButton) {
                        updateCompany(values); // Call updateCompany if updating
                      } else {
                        setCompanies(values); // Call setCompanies if adding a new company
                      }
                    }}
                  >
                    {({ errors, touched, setFieldValue, values }) => (
                      <Form>
                        <DialogTitle className="mt-20 pb-3 text-gray-400">Name</DialogTitle>
                        <Field name="name" as={Input} className="py-2 px-2 border w-full bg-transparent border-gray-600 text-gray-400" />
                        {errors.name && touched.name ? (
                          <div className="text-red-500">{errors.name}</div>
                        ) : null}

                        <DialogTitle className="mt-5 pb-3 text-gray-400" >Contact</DialogTitle>
                        <Popover open={open1} onOpenChange={setOpen1}>
                          <PopoverTrigger asChild className="py-2 px-2 border w-full bg-transparent border-gray-600 text-gray-400">
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open1}
                              className="w-full justify-between"
                            >
                              {values.contact || "Select Contact..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search contact..." />
                              <CommandList className="flex justify-center">
                                <CommandEmpty>No Contact found.</CommandEmpty>
                                <CommandGroup>
                                  {storePeopleData.map((contact) => (
                                    <CommandItem
                                      key={contact._id}
                                      value={`${contact.firstName} ${contact.lastName}`}
                                      onSelect={(currentValue) => {
                                        setFieldValue('contact', currentValue);
                                        setOpen1(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          values.contact === `${contact.firstName} ${contact.lastName}` ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      <span className="ml-3 w-full block truncate font-normal group-data-[selected]:font-semibold">
                                        {`${contact.firstName} ${contact.lastName}`}
                                      </span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        {errors.contact && touched.contact ? (
                          <div className="text-red-500">{errors.contact}</div>
                        ) : null}

                        <DialogTitle className="mt-5 pb-3 text-gray-400 "  >Country</DialogTitle>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild className="py-2 px-2 border w-full bg-transparent border-gray-600 text-gray-400">
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full justify-between"
                            >
                              {values.country || "Select country..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search country..." />
                              <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {countryData.map((country) => (
                                    <CommandItem
                                      key={country.cca3}
                                      value={country.name.common}
                                      onSelect={() => {
                                        setFieldValue("country", country.name.common);
                                        setOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          values.country === country.name.common ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                        {country.name.common}
                                      </span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        {errors.country && touched.country ? (
                          <div className="text-red-500">{errors.country}</div>
                        ) : null}

                        <DialogTitle className="mt-5 pb-3 text-gray-400">Website</DialogTitle>
                        <Field name="website" as={Input} className="py-2 px-2 border w-full bg-transparent border-gray-600 text-gray-400" />
                        {errors.website && touched.website ? (
                          <div className="text-red-500">{errors.website}</div>
                        ) : null}

                        <DialogTitle className="mt-5 pb-3 text-gray-400">Phone</DialogTitle>
                        <Field name="phone" as={Input} type="text" className="py-2 px-2 border w-full bg-transparent border-gray-600 text-gray-400" />
                        {errors.phone && touched.phone ? (
                          <div className="text-red-500">{errors.phone}</div>
                        ) : null}

                        <DialogTitle className="mt-5 pb-3 text-gray-400">Email</DialogTitle>
                        <Field name="email" as={Input} type="email" className="py-2 px-2 border w-full bg-transparent border-gray-600 text-gray-400" />
                        {errors.email && touched.email ? (
                          <div className="text-red-500">{errors.email}</div>
                        ) : null}

                        <Button type="submit" className="mt-10">
                          {!cmpShowButton ? "Save" : "Update"}
                        </Button>
                      </Form>
                    )}
                  </Formik>
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
