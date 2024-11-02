import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { useState, useContext } from "react";
import { ChevronsUpDown, Check, X } from "lucide-react";
import { Context } from "@/context/Context";
import { Button } from "./ui/button";
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
import { Formik, Field, Form } from "formik";
import * as Yup from "yup"; // For validation
import { Input } from "./ui/input";
import { darkBackground } from "./Colors";

const PeopleForm = () => {
  const {
    setOpenPersonForm,
    openPersonForm,
    setPeople,
    countryData,
    showButton,
    updatePeople,
    storeCompanyData,
    personDetail,
    mode
  } = useContext(Context);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  // Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    country: Yup.string().required("Country is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <Dialog
      open={openPersonForm}
      onClose={setOpenPersonForm}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700">
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpenPersonForm(false)}
                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <X aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className={`flex h-full flex-col overflow-y-scroll py-6 shadow-xl ${mode ? darkBackground : 'bg-white'}`}>
                <div className="px-4 sm:px-6 flex flex-col gap-4">
                  <Formik
                    initialValues={{
                      firstName: personDetail?.firstName || "",
                      lastName: personDetail?.lastName || "",
                      country: personDetail?.country || "",
                      company: personDetail?.company || "",
                      phone: personDetail?.phone || "",
                      email: personDetail?.email || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      console.log("Form Data Submitted:", values); // Watch form data

                      if (showButton) {
                        updatePeople(values); // Call updatePeople if showButton is true
                      } else {
                        setPeople(values); // Call setPeople if adding a new entry
                      }
                    }}
                  >
                    {({ errors, touched, setFieldValue, values }) => (
                      <div>
                        {/* Watch form data as it changes */}
                        <Form>
                          <h1 className="text-3xl font-bold text-center text-gray-400">
                            Public Form
                          </h1>
                          <DialogTitle className="mt-20 pb-2 text-gray-400">
                            First Name
                          </DialogTitle>
                          <Field name="firstName" as={Input} className="bg-transparent border-gray-600 text-gray-400" />
                          {errors.firstName && touched.firstName ? (
                            <div className="text-red-500">
                              {errors.firstName}
                            </div>
                          ) : null}

                          <DialogTitle className="mt-5 pb-2 text-gray-400">
                            Last Name
                          </DialogTitle>
                          <Field name="lastName" as={Input} className="bg-transparent border-gray-600 text-gray-400" />
                          {errors.lastName && touched.lastName ? (
                            <div className="text-red-500">
                              {errors.lastName}
                            </div>
                          ) : null}

                          <DialogTitle className="mt-5 pb-2 text-gray-400">
                            Country
                          </DialogTitle>
                          {/* Country Popover */}
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild className="bg-transparent border-gray-600 text-gray-400">
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                              >
                                {values.country || "Select country..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4" />
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
                                        onSelect={() =>
                                          setFieldValue(
                                            "country",
                                            country.name.common
                                          )
                                        }
                                      >
                                        <Check
                                          className={
                                            values.country ===
                                            country.name.common
                                              ? "opacity-100"
                                              : "opacity-0"
                                          }
                                        />
                                        <img
                                          src={country.flags.svg}
                                          alt={`${country.name.common} flag`}
                                          className="h-5 w-5 rounded-full"
                                        />
                                        <span className="ml-3">
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

                          <DialogTitle className="mt-5 pb-2 text-gray-400">
                            Company
                          </DialogTitle>
                          {/* Company Popover */}
                          <Popover open={open1} onOpenChange={setOpen1}>
                            <PopoverTrigger asChild className="bg-transparent border-gray-600 text-gray-400">
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open1}
                                className="w-full justify-between"
                              >
                                {values.company || "Select company..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search company..." />
                                <CommandList>
                                  <CommandEmpty>No company found.</CommandEmpty>
                                  <CommandGroup>
                                    {storeCompanyData.map((company) => (
                                      <CommandItem
                                        key={company._id}
                                        value={company.name}
                                        onSelect={() =>
                                          setFieldValue("company", company.name)
                                        }
                                      >
                                        <Check
                                          className={
                                            values.company === company.name
                                              ? "opacity-100"
                                              : "opacity-0"
                                          }
                                        />
                                        <span className="ml-3">
                                          {company.name}
                                        </span>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          {/* {errors.company && touched.company ? (
                            <div className="text-red-500">{errors.company}</div>
                          ) : null} */}

                          <DialogTitle className="mt-5 pb-2 text-gray-400">Phone</DialogTitle>
                          <Field name="phone" as={Input} type="text" className="bg-transparent border-gray-600 text-gray-400" />
                          {errors.phone && touched.phone ? (
                            <div className="text-red-500">{errors.phone}</div>
                          ) : null}

                          <DialogTitle className="mt-5 pb-2 text-gray-400">Email</DialogTitle>
                          <Field name="email" as={Input} type="email" className="bg-transparent border-gray-600 text-gray-400" />
                          {errors.email && touched.email ? (
                            <div className="text-red-500">{errors.email}</div>
                          ) : null}

                          {!showButton ? (
                            <Button type="submit" className="mt-10 w-full">
                              Save
                            </Button>
                          ) : (
                            <Button type="submit" className="mt-10 w-full">
                              Update
                            </Button>
                          )}
                        </Form>
                      </div>
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

export default PeopleForm;
