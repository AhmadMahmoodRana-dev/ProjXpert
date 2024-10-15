import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Context } from "@/context/Context";

const InvoicesForm = () => {
  const { showInvoiceButton, setInvoice,storeCustomerData } = useContext(Context);

  // Options for currency and status
  const currencyOptions = [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
  ];
  const statusOptions = [
    { label: "Draft", value: "Draft" },
    { label: "Pending", value: "Pending" },
    { label: "Paid", value: "Paid" },
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
    tax: Yup.number().min(0, "Tax must be non-negative").required("Tax is required"),
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
              updatePeople(values); 
            } else {
              setInvoice(values); 
            }
          }}
        >
          {({ values, setFieldValue }) => {
            // Effect to calculate subTotal and total
            useEffect(() => {
              // Calculate subTotal by summing the quantity * price for all items
              const subTotal = values.items.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              );

              // Calculate total by adding tax to subTotal
              const total = subTotal + Number(values.tax);

              // Update subTotal and total in the form values
              setFieldValue("subTotal", subTotal);
              setFieldValue("total", total);
            }, [values.items, values.tax, setFieldValue]);

            return (
              <Form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="client" className="block text-sm font-medium">
                      Client
                    </label>
                    <Field as="select" name="client" className="py-2 px-2 border w-full rounded-sm">
                      {storeCustomerData.map((option) => (
                        <option key={option._id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="client" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="number" className="block text-sm font-medium">
                      Number
                    </label>
                    <Field name="number" type="number" as={Input} />
                    <ErrorMessage name="number" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium">
                      Status
                    </label>
                    <Field as="select" name="status" className="py-2 px-2 border w-full rounded-sm">
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="status" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Year */}
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium">
                      Year
                    </label>
                    <Field name="year" type="number" as={Input} />
                    <ErrorMessage name="year" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Currency */}
                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium">
                      Currency
                    </label>
                    <Field as="select" name="currency" className="py-2 px-2 border w-full">
                      {currencyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="currency" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium">
                      Date
                    </label>
                    <Field name="date" type="date" as={Input} />
                    <ErrorMessage name="date" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Expire Date */}
                  <div>
                    <label htmlFor="expireDate" className="block text-sm font-medium">
                      Expire Date
                    </label>
                    <Field name="expireDate" type="date" as={Input} />
                    <ErrorMessage name="expireDate" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Note */}
                  <div className="col-span-2">
                    <label htmlFor="note" className="block text-sm font-medium">
                      Note
                    </label>
                    <Field name="note" as={Textarea} />
                  </div>
                </div>

                {/* Items FieldArray */}
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <div>
                      {values.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-5 gap-4 mb-4">
                          {/* Item Name */}
                          <div>
                            <label className="block text-sm font-medium">Item Name</label>
                            <Field name={`items.${index}.itemName`} as={Input} />
                            <ErrorMessage name={`items.${index}.itemName`} component="div" className="text-red-600 text-sm" />
                          </div>

                          {/* Description */}
                          <div>
                            <label className="block text-sm font-medium">Description</label>
                            <Field name={`items.${index}.descriptionName`} as={Input} />
                          </div>

                          {/* Quantity */}
                          <div>
                            <label className="block text-sm font-medium">Quantity</label>
                            <Field
                              name={`items.${index}.quantity`}
                              as={Input}
                              type="number"
                              onChange={(e) => {
                                setFieldValue(`items.${index}.quantity`, e.target.value);
                              }}
                            />
                            <ErrorMessage name={`items.${index}.quantity`} component="div" className="text-red-600 text-sm" />
                          </div>

                          {/* Price */}
                          <div>
                            <label className="block text-sm font-medium">Price</label>
                            <Field
                              name={`items.${index}.price`}
                              as={Input}
                              type="number"
                              onChange={(e) => {
                                setFieldValue(`items.${index}.price`, e.target.value);
                              }}
                            />
                            <ErrorMessage name={`items.${index}.price`} component="div" className="text-red-600 text-sm" />
                          </div>

                          {/* Remove Button */}
                          <div>
                          <label className="block text-sm font-medium opacity-0">Price</label>
                            <Button onClick={() => remove(index)}>Delete</Button>
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
                    <label htmlFor="subTotal" className="block text-sm font-medium">
                      Sub Total
                    </label>
                    <Field name="subTotal" as={Input} type="number" readOnly />
                  </div>

                  <div>
                    <label htmlFor="tax" className="block text-sm font-medium">
                      Tax
                    </label>
                    <Field
                      name="tax"
                      as={Input}
                      type="number"
                      onChange={(e) => {
                        setFieldValue("tax", e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="total" className="block text-sm font-medium">
                      Total
                    </label>
                    <Field name="total" as={Input} type="number" readOnly />
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
