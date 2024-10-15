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
import { Switch } from "./ui/switch";

// Validation schema using Yup
const ExpenseCategoryFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  color: Yup.string()
    .matches(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      "Invalid color format (use hex code)"
    )
    .required("Color is required"),
  enabled: Yup.boolean().required("Enabled status is required"),
});

const ExpenseCategoryForm = () => {
  const {
    setExpenseCategory,
    updateCategory,
    showExpenseCategoryForm,
    setShowExpenseCategoryForm,
    showExpenseCategoryButton,
  } = useContext(Context);

  const colorOptions = [
    { name: "aliceblue", value: "#f0f8ff" },
    { name: "antiquewhite", value: "#faebd7" },
    { name: "aqua", value: "#00ffff" },
    { name: "aquamarine", value: "#7fffd4" },
    { name: "azure", value: "#f0ffff" },
    { name: "beige", value: "#f5f5dc" },
    { name: "bisque", value: "#ffe4c4" },
    { name: "black", value: "#000000" },
    { name: "blue", value: "#0000ff" },
    { name: "blueviolet", value: "#8a2be2" },
    { name: "brown", value: "#a52a2a" },
    { name: "burlywood", value: "#deb887" },
    { name: "chartreuse", value: "#7fff00" },
    { name: "chocolate", value: "#d2691e" },
    { name: "coral", value: "#ff7f50" },
    { name: "cornflowerblue", value: "#6495ed" },
    { name: "cornsilk", value: "#fff8dc" },
    { name: "crimson", value: "#dc143c" },
    { name: "cyan", value: "#00ffff" },
    { name: "darkblue", value: "#00008b" },
    { name: "darkcyan", value: "#008b8b" },
  ];

  return (
    <Dialog
      open={showExpenseCategoryForm}
      onClose={setShowExpenseCategoryForm}
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
                    onClick={() => setShowExpenseCategoryForm(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <X aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <Formik
                  initialValues={{
                    name: "",
                    description: "",
                    color: "#ffffff",
                    enabled: false,
                  }}
                  validationSchema={ExpenseCategoryFormSchema}
                  onSubmit={(values) => {
                    if (showExpenseCategoryButton) {
                        // setExpenseCategory(values);
                        console.log("UPDATE")
                    } else {
                        setExpenseCategory(values);
                    }
                    // console.log("VALUES", values);
                  }}
                >
                  {({ setFieldValue, values }) => (
                    <Form className="px-4 sm:px-6 flex flex-col gap-4">
                      <DialogTitle>Name</DialogTitle>
                      <Field name="name" as={Input} />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <DialogTitle>Color</DialogTitle>
                      <Field
                        as="select"
                        name="color"
                        className="py-2 px-2 border w-full"
                      >
                        {colorOptions.map((option) => (
                          <option key={option.name} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="color"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <DialogTitle>Description</DialogTitle>
                      <Field
                        name="description"
                        as={Textarea}
                        className="block w-full px-3 py-2 text-sm"
                        rows={5}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <DialogTitle>Enabled</DialogTitle>
                      {/* Toggle Switch with Formik */}
                      <Switch
                        checked={values.enabled} // Properly bind the checked prop to Formik's value
                        onCheckedChange={(checked) =>
                          setFieldValue("enabled", checked)
                        } // Use onCheckedChange to toggle the value
                      />
                      <ErrorMessage
                        name="enabled"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <Button className="mt-10" type="submit">
                        {showExpenseCategoryButton ? "Update" : "Save"}
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

export default ExpenseCategoryForm;
