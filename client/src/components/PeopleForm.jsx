import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { cn } from "@/lib/utils"
import { useContext, useState } from "react";
import { ChevronsUpDown, Check, X } from "lucide-react";
import { Context } from "@/context/Context";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
    countryData,
    showButton,
    updatePeople,
    storeCompanyData
  } = useContext(Context);

  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
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
                  {/* Popover Component for Country Selection */}
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {country || "Select country..."}
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
                                onSelect={(currentValue) => {
                                  setCountry(currentValue === country ? "" : currentValue);
                                  setOpenCountryPopover(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country === country.name.common ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                 <img
                                src={country.flags.svg} alt={`${country.name.common} flag`}
                                className="h-5 w-5 flex-shrink-0 rounded-full"
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

                  <DialogTitle>Company</DialogTitle>
                 
                  <Popover open={open1} onOpenChange={setOpen1}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open1}
                        className="w-full justify-between"
                      >
                        {company || "Select Company..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {storeCompanyData.map((company) => (
                              <CommandItem
                                key={company._id}
                                value={company.name}
                                onSelect={(currentValue) => {
                                  setCompany(currentValue === company ? "" : currentValue);
                                  setOpenCountryPopover(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    company === company.name ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                 <img
                                src="akjsalksal" alt={`${company.name} flag`}
                                className="h-5 w-5 flex-shrink-0 rounded-full"
                              />
                              <span className="ml-3 w-full block truncate font-normal group-data-[selected]:font-semibold">
                                {company.name}
                              </span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                  {!showButton ? (
                    <Button className="mt-10" onClick={setPeople}>
                      Save
                    </Button>
                  ) : (
                    <Button className="mt-10" onClick={updatePeople}>
                      Update
                    </Button>
                  )}
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
