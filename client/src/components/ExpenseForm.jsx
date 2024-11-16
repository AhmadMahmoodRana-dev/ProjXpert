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

import { Context } from "@/context/Context";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { darkBackground } from "./Colors";

// Validation schema using Yup
const ExpenseFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  expenseCategory: Yup.string().required("Expense category is required"),
  currency: Yup.string().required("Currency is required"),
  total: Yup.number()
    .min(0, "Total must be a positive number")
    .required("Total is required"),
  ref: Yup.string().required("Reference is required"),
  description: Yup.string().required("Description is required"),
});

const ExpenseForm = () => {
  const {
    setExpense,
    openExpenseForm,
    storeExpenseCategory,
    showExpenseButton,
    setOpenExpenseForm,
    updateSingleExpense,
    singleExpense,
    mode
  } = useContext(Context);

  const currencyOptions = [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
  ];

  return (
    <Dialog
      open={openExpenseForm}
      onClose={() => setOpenExpenseForm(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpenExpenseForm(false)} // Close form on clicking X
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
                    name: singleExpense.name || "",
                    expenseCategory:singleExpense.expenseCategory || "",
                    currency: singleExpense.currency || "USD", // Default currency can be USD
                    total: singleExpense.total || 0,
                    ref: singleExpense.ref || "",
                    description: singleExpense.description || "",
                  }}
                  validationSchema={ExpenseFormSchema}
                  onSubmit={(values) => {
                    if (showExpenseButton) {
                      updateSingleExpense(values);
                    } else {
                      setExpense(values);
                    }
                    setOpenExpenseForm(false); // Close form on successful submission
                  }}
                >
                  {() => (
                    <Form className="px-4 sm:px-6 flex flex-col gap-4">
                      <DialogTitle className={"text-gray-400"}>Name</DialogTitle>
                      <Field name="name" as={Input} className="bg-transparent border-gray-600 text-gray-400" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <DialogTitle className={"text-gray-400"}>Expense Category</DialogTitle>
                      <Field
                          as="select"
                          name="expenseCategory"
                          className="py-2 px-2 border w-full bg-transparent border-gray-600 text-gray-400"
                        >
                          {storeExpenseCategory.map((option) => (
                            <option key={option._id} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </Field>
                      <ErrorMessage
                        name="expenseCategory"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <div>
                        <label
                          htmlFor="currency"
                          className="block text-sm font-medium pb-4 text-gray-400"
                        >
                          Currency
                        </label>
                        <Field
                          as="select"
                          name="currency"
                          className="py-2 px-2 border w-full bg-transparent border-gray-600 text-gray-400"
                        >
                          {currencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="currency"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>

                      <DialogTitle className={"text-gray-400"}>Total</DialogTitle>
                      <Field name="total" as={Input} type="number" className="bg-transparent border-gray-600 text-gray-400" />
                      <ErrorMessage
                        name="total"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <DialogTitle className={"text-gray-400"}>Reference</DialogTitle>
                      <Field name="ref" as={Input} className="bg-transparent border-gray-600 text-gray-400" />
                      <ErrorMessage
                        name="ref"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <DialogTitle className={"text-gray-400"}>Description</DialogTitle>
                      <Field
                        name="description"
                        as={Textarea}
                        className="block w-full px-3 py-2 text-sm bg-transparent border-gray-600 text-gray-400"
                        rows={5}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <Button className="mt-10" type="submit">
                        {showExpenseButton ? "Update" : "Save"}{" "}
                        {/* Button text logic */}
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

export default ExpenseForm;
