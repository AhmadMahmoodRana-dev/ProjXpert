"use client";
import { useContext, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const LeadForm = () => {
  const {
    countryData,
    setLeadType,
    setLeadBranch,
    setLeadCountry,
    setLeadEmail,
    setLeadPhone,
    setLeadProject,
    setLeadName,
    setLeadStatus,
    setLeadSource,
    leadBranch,
    leadType,
    leadCountry,
    leadEmail,
    leadPhone,
    leadProject,
    leadName,
    leadStatus,
    leadSource,
    openLeadForm,
    setOpenLeadForm,
    updateLead,
    setLeads,
    showLeadButton,
  } = useContext(Context);
  const [open, setOpen] = useState(false);
  console.log(leadType);
  return (
    <Dialog
      open={openLeadForm}
      onClose={setOpenLeadForm}
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
                    onClick={() => setOpenLeadForm(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <X aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <form className="px-4 sm:px-6 flex flex-col gap-4">
                  <DialogTitle> Branch</DialogTitle>

                  <Select
                     onValueChange={(value) => setLeadBranch(value)}  // Accept value directly
                     value={leadBranch}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Branch</SelectLabel>
                        <SelectItem value="Main">Main</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <DialogTitle>Type</DialogTitle>
                  <Select
                    onValueChange={(value) => setLeadType(value)}
                    value={leadType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="People">People</SelectItem>
                        <SelectItem value="Company">Company</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <DialogTitle>Name</DialogTitle>
                  <Input
                    type="text"
                    onChange={(e) => setLeadName(e.target.value)}
                    value={leadName}
                  />
                  <DialogTitle>Status</DialogTitle>
                  <Select
                    onValueChange={(value) => setLeadStatus(value)}
                    value={leadStatus}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="In Negociation">
                          In Negociation
                        </SelectItem>
                        <SelectItem value="Won">Won</SelectItem>
                        <SelectItem value="Loose">Loose</SelectItem>
                        <SelectItem value="Cancled">Cancled</SelectItem>
                        <SelectItem value="Assigned">Assigned</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <DialogTitle>Source</DialogTitle>
                  <Select
                    onValueChange={(value) => setLeadSource(value)}
                    value={leadSource}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="Linkedin">Linkedin</SelectItem>
                        <SelectItem value="Social Media">
                          Social Media
                        </SelectItem>
                        <SelectItem value="Professional Network">
                          Professional Network
                        </SelectItem>
                        <SelectItem value="Customer Referral">
                          Customer Referral
                        </SelectItem>
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="Advertising">Advertising</SelectItem>
                        <SelectItem value="Friend">Friend</SelectItem>
                        <SelectItem value="Advertising">Advertising</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                        {leadCountry || "Select country..."}
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
                                  setLeadCountry(
                                    currentValue === country ? "" : currentValue
                                  );
                                  setOpenCountryPopover(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country === country.name.common
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <img
                                  src={country.flags.svg}
                                  alt={`${country.name.common} flag`}
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

                  <DialogTitle>Phone</DialogTitle>
                  <Input
                    type="number"
                    onChange={(e) => setLeadPhone(e.target.value)}
                    value={leadPhone}
                  />
                  <DialogTitle>Email</DialogTitle>
                  <Input
                    type="email"
                    onChange={(e) => setLeadEmail(e.target.value)}
                    value={leadEmail}
                  />
                  <DialogTitle>Project</DialogTitle>
                  <textarea
                    onChange={(e) => setLeadProject(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5"
                    rows={5}
                    value={leadProject}
                  ></textarea>
                  {!showLeadButton ? (
                    <Button className="mt-10" onClick={() => setLeads()}>
                      Save
                    </Button>
                  ) : (
                    <Button className="mt-10" onClick={() => updateLead()}>
                      Update
                    </Button>
                  )}
                </form>
                <div className="relative mt-6 flex-1 px-4 sm:px-6"></div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LeadForm;
