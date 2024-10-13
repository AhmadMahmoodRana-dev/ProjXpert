import React, { useContext } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Context } from "@/context/Context";


const InvoicesForm = () => {
const {showInvoiceButton,setInvoice} = useContext(Context)

  // Options for currency select
  const currencyOptions = [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
  ];
  
  // Validation schema
  const validationSchema = Yup.object({
    client: Yup.string().required("Client is required"),
    number: Yup.number().required("Invoice number is required"),
    year: Yup.number().required("Year is required"),
    currency: Yup.string().required("Currency is required"),
    date: Yup.date().required("Date is required"),
    expireDate: Yup.date().required("Expire Date is required"),
    items: Yup.array()
      .of(
        Yup.object({
          itemName: Yup.string().required("Item Name is required"),
          quantity: Yup.number()
            .min(1, "Quantity must be at least 1")
            .required("Quantity is required"),
          price: Yup.number()
            .min(0, "Price must be non-negative")
            .required("Price is required"),
        })
      )
      .required("At least one item is required"),
  });
  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-[92%] bg-[#ededed] p-4">
        <Formik
          initialValues={{
            client: "",
            number: "",
            year: new Date().getFullYear(),
            currency: "USD",
            status: "Draft",
            date: "",
            expireDate: "",
            note: "",
            items: [
              {
                itemName: "",
                descriptionName: "",
                quantity: 1,
                price: 0,
                total: 0,
              },
            ],
            subTotal: 0,
            tax: 0,
            total: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Submit logic here
            console.log("Form values:", values);
            if (showInvoiceButton) {
              // updatePeople(values); // Call updatePeople if showButton is true
            } else {
              setInvoice(values); // Call setPeople if adding a new entry
            }
          }}
        >
          {({ values, setFieldValue }) => {
            // Calculate totals dynamically

            return (
              <Form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Client */}
                  <div>
                    <label
                      htmlFor="client"
                      className="block text-sm font-medium"
                    >
                      Client
                    </label>
                    <Field
                      name="client"
                      as={Input}
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    <ErrorMessage
                      name="client"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Number */}
                  <div>
                    <label
                      htmlFor="number"
                      className="block text-sm font-medium"
                    >
                      Number
                    </label>
                    <Field
                      name="number"
                      type="number"
                      as={Input}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    <ErrorMessage
                      name="number"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium">
                      Year
                    </label>
                    <Field
                      name="year"
                      type="number"
                      as={Input}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    <ErrorMessage
                      name="year"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Currency */}
                  <div>
                    <label
                      htmlFor="currency"
                      className="block text-sm font-medium"
                    >
                      Currency
                    </label>
                    <Field
                      as="select"
                      name="currency"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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

                  {/* Date and Expire Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium">
                      Date
                    </label>
                    <Field
                      name="date"
                      type="date"
                      as={Input}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="expireDate"
                      className="block text-sm font-medium"
                    >
                      Expire Date
                    </label>
                    <Field
                      name="expireDate"
                      type="date"
                      as={Input}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    <ErrorMessage
                      name="expireDate"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Note */}
                  <div className="col-span-2">
                    <label htmlFor="note" className="block text-sm font-medium">
                      Note
                    </label>
                    <Field
                      name="note"
                      as={Textarea}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>

                {/* Items FieldArray */}
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <div>
                      {values.items.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-5 gap-4 items-center justify-center mb-4"
                        >
                          {/* Item Fields */}
                          <div>
                            <label className="block text-sm font-medium">
                              Item Name
                            </label>
                            <Field
                              name={`items.${index}.itemName`}
                              as={Input}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            <ErrorMessage
                              name={`items.${index}.itemName`}
                              component="div"
                              className="text-red-600 text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium">
                              Description
                            </label>
                            <Field
                              name={`items.${index}.descriptionName`}
                              as={Input}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium">
                              Quantity
                            </label>
                            <Field
                              name={`items.${index}.quantity`}
                              as={Input}
                              type="number"
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                              onChange={(e) => {
                                setFieldValue(
                                  `items.${index}.quantity`,
                                  e.target.value
                                );
                              }}
                            />
                            <ErrorMessage
                              name={`items.${index}.quantity`}
                              component="div"
                              className="text-red-600 text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium">
                              Price
                            </label>
                            <Field
                              name={`items.${index}.price`}
                              as={Input}
                              type="number"
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                              onChange={(e) => {
                                setFieldValue(
                                  `items.${index}.price`,
                                  e.target.value
                                );
                              }}
                            />
                            <ErrorMessage
                              name={`items.${index}.price`}
                              component="div"
                              className="text-red-600 text-sm"
                            />
                          </div>

                          {/* Remove Button */}
                          <div>
                            <label className="block text-sm font-medium opacity-0">
                              Remove
                            </label>
                            <Button onClick={() => remove(index)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() =>
                          push({
                            itemName: "",
                            descriptionName: "",
                            quantity: 1,
                            price: 0,
                          })
                        }
                      >
                        Add Item
                      </Button>
                    </div>
                  )}
                </FieldArray>

                {/* Totals */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="subTotal"
                      className="block text-sm font-medium"
                    >
                      Sub Total
                    </label>
                    <Field
                      name="subTotal"
                      as={Input}
                      type="number"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      readOnly
                    />
                  </div>

                  <div>
                    <label htmlFor="tax" className="block text-sm font-medium">
                      Tax
                    </label>
                    <Field
                      name="tax"
                      as={Input}
                      type="number"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      onChange={(e) => {
                        setFieldValue("tax", e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium"
                    >
                      Total
                    </label>
                    <Field
                      name="total"
                      type="number"
                      as={Input}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      readOnly
                    />
                  </div>
                </div>

                {/* Submit Button */}
                {!showInvoiceButton ? (
                  <Button type="submit" className="mt-10 w-full">
                    Save
                  </Button>
                ) : (
                  <Button type="submit" className="mt-10 w-full">
                    Update
                  </Button>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default InvoicesForm;
