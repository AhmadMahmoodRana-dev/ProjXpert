import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
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
import { X } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { darkBackground } from "./Colors";

// Validation schema using Yup
const LeadFormSchema = Yup.object().shape({
  leadBranch: Yup.string().required("Branch is required"),
  leadType: Yup.string().required("Type is required"),
  leadName: Yup.string().required("Name is required"),
  leadStatus: Yup.string().required("Status is required"),
  leadSource: Yup.string().required("Source is required"),
  leadCountry: Yup.string().required("Country is required"),
  leadPhone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]+$/, "Phone must be a number"),
  leadEmail: Yup.string().email("Invalid email").required("Email is required"),
  leadProject: Yup.string().required("Project details are required"),
});

const LeadForm = () => {
  const {
    countryData,
    setLeads,
    updateLead,
    openLeadForm,
    setOpenLeadForm,
    leadShowButton,
    leadDetail,
    mode
  } = useContext(Context);

  return (
    <Dialog open={openLeadForm} onClose={setOpenLeadForm} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
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
              <div className={`flex h-full flex-col overflow-y-scroll py-6 shadow-xl ${mode ? darkBackground : 'bg-white'}`}>
                <Formik
                  initialValues={{
                    leadBranch: leadDetail.branch || "",
                    leadType: leadDetail.type || "",
                    leadName: leadDetail.name || "",
                    leadStatus: leadDetail.status || "",
                    leadSource: leadDetail.source || "",
                    leadCountry: leadDetail.country || "",
                    leadPhone: leadDetail.phone || "",
                    leadEmail: leadDetail.email || "",
                    leadProject: leadDetail.project || "",
                  }}
                  validationSchema={LeadFormSchema}
                  onSubmit={(values) => {
                    if (leadShowButton) {
                      updateLead(values);
                    } else {
                      setLeads(values);
                    }
                  }}
                >
                  {({ setFieldValue, values }) => (
                    <Form className="px-4 sm:px-6 flex flex-col gap-4">
                      <DialogTitle className={"text-gray-400"}>Branch</DialogTitle>
                      <Field name="leadBranch">
                        {({ field }) => (
                          <Select onValueChange={(value) => setFieldValue(field.name, value)} value={field.value}>
                            <SelectTrigger className="w-full bg-transparent border-gray-500 border">
                              <SelectValue placeholder="Select a Company" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Main">Main</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage name="leadBranch" component="div" className="text-red-500 text-sm" />

                      <DialogTitle className={"text-gray-400"}>Type</DialogTitle>
                      <Field name="leadType">
                        {({ field }) => (
                          <Select onValueChange={(value) => setFieldValue(field.name, value)} value={field.value}>
                            <SelectTrigger className="w-full bg-transparent border-gray-500 border">
                              <SelectValue placeholder="Select a Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="People">People</SelectItem>
                                <SelectItem value="Company">Company</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage name="leadType" component="div" className="text-red-500 text-sm" />

                      <DialogTitle className={"text-gray-400"}>Name</DialogTitle>
                      <Field name="leadName" as={Input} className="bg-transparent border-gray-500 border" />
                      <ErrorMessage name="leadName" component="div" className="text-red-500 text-sm" />

                      <DialogTitle className={"text-gray-400"}>Status</DialogTitle>
                      <Field name="leadStatus">
                        {({ field }) => (
                          <Select onValueChange={(value) => setFieldValue(field.name, value)} value={field.value}>
                            <SelectTrigger className="w-full bg-transparent border-gray-500 border">
                              <SelectValue placeholder="Select a Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Draft">Draft</SelectItem>
                                <SelectItem value="New">New</SelectItem>
                                <SelectItem value="In Negociation">In Negociation</SelectItem>
                                <SelectItem value="Won">Won</SelectItem>
                                <SelectItem value="Loose">Loose</SelectItem>
                                <SelectItem value="Cancled">Cancled</SelectItem>
                                <SelectItem value="Assigned">Assigned</SelectItem>
                                <SelectItem value="On Hold">On Hold</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage name="leadStatus" component="div" className="text-red-500 text-sm" />

                      <DialogTitle className={"text-gray-400"}>Source</DialogTitle>
                      <Field name="leadSource">
                        {({ field }) => (
                          <Select onValueChange={(value) => setFieldValue(field.name, value)} value={field.value}>
                            <SelectTrigger className="w-full bg-transparent border-gray-500 border">
                              <SelectValue placeholder="Select a Source" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Linkedin">Linkedin</SelectItem>
                                <SelectItem value="Social Media">Social Media</SelectItem>
                                <SelectItem value="Professional Network">Professional Network</SelectItem>
                                <SelectItem value="Customer Referral">Customer Referral</SelectItem>
                                <SelectItem value="Website">Website</SelectItem>
                                <SelectItem value="Advertising">Advertising</SelectItem>
                                <SelectItem value="Friend">Friend</SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage name="leadSource" component="div" className="text-red-500 text-sm" />

                      <DialogTitle className={"text-gray-400"}>Country</DialogTitle>
                      <Popover className="bg-transparent border-gray-500 border">
                        <PopoverTrigger asChild className="bg-transparent border-gray-500 border">
                          <Button variant="outline" className="w-full justify-between">
                            {values.leadCountry || "Select country..."}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 bg-transparent border-gray-500 border">
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                {countryData.map((country) => (
                                  <CommandItem
                                    key={country.cca3}
                                    onSelect={() => setFieldValue("leadCountry", country.name.common)}
                                  >
                                    <img
                                      src={country.flags.svg}
                                      alt={`${country.name.common} flag`}
                                      className="h-5 w-5 flex-shrink-0 rounded-full"
                                    />
                                    <span className="ml-3 block truncate font-normal">
                                      {country.name.common}
                                    </span>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <ErrorMessage name="leadCountry" component="div" className="text-red-500 text-sm" />

                      <DialogTitle className={"text-gray-400"}>Phone</DialogTitle>
                      <Field name="leadPhone" as={Input} type="tel" className="bg-transparent border-gray-500 border" />
                      <ErrorMessage name="leadPhone" component="div" className="text-red-500 text-sm" />

                      <DialogTitle className={"text-gray-400"}>Email</DialogTitle>
                      <Field name="leadEmail" as={Input} type="email" className="bg-transparent border-gray-500 border" />
                      <ErrorMessage name="leadEmail" component="div" className="text-red-500 text-sm" />

                      <DialogTitle className={"text-gray-400"}>Project</DialogTitle>
                      <Field
                        name="leadProject"
                        as="textarea"
                        className="block w-full px-3 py-2 text-sm bg-transparent border-gray-500 border"
                        rows={5}
                      />
                      <ErrorMessage name="leadProject" component="div" className="text-red-500 text-sm" />

                      <Button className="mt-10" type="submit">
                        {leadShowButton ? "Update" : "Save"}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LeadForm;
