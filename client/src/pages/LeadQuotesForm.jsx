import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Context } from "@/context/Context";
import { darkBackground, lightBackground } from "@/components/Colors";

const LeadQuotesForm = () => {
  const {
    showInvoiceButton,
    setLeadQuotes,
    storeLeadData,
    singleLeadQuote,
    updateLeadQuotes,
    mode,
  } = useContext(Context);

  // State for initial form data
  const [initialData, setInitialData] = useState({
    client: "aaa",
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
  });

  // Update initial data based on singleInvoice when it's available
  useEffect(() => {
    if (singleLeadQuote) {
      setInitialData({
        client: singleLeadQuote.client || "",
        number: singleLeadQuote.number || "",
        year: singleLeadQuote.year || new Date().getFullYear(),
        currency: singleLeadQuote.currency || "USD",
        status: singleLeadQuote.status || "Draft",
        date: singleLeadQuote.date || "",
        expireDate: singleLeadQuote.expireDate || "",
        note: singleLeadQuote.note || "",
        items: singleLeadQuote.items || [
          {
            itemName: "",
            descriptionName: "",
            quantity: 1,
            price: 0,
            total: 0,
          },
        ],
        subTotal: singleLeadQuote.subTotal || 0,
        tax: singleLeadQuote.tax || 0,
        total: singleLeadQuote.total || 0,
      });
    }
  }, [singleLeadQuote]);

  // Currency and Status options
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

  // Validation schema for the form
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
    tax: Yup.number()
      .min(0, "Tax must be non-negative")
      .required("Tax is required"),
  });

  return (
    <div
      className={`w-full h-auto flex justify-center items-center py-4 ${
        mode ? darkBackground : lightBackground
      }`}
    >
      <div className={`w-[92%] p-4 ${mode ? darkBackground : lightBackground}`}>
        <Formik
          enableReinitialize
          initialValues={initialData}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form values:", values);
            if (showInvoiceButton) {
              updateLeadQuotes(values);
            } else {
              setLeadQuotes(values);
            }
          }}
        >
          {({ values, setFieldValue }) => {
            useEffect(() => {
              const subTotal = values.items.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              );

              const total = subTotal + Number(values.tax);

              setFieldValue("subTotal", subTotal);
              setFieldValue("total", total);
            }, [values.items, values.tax, setFieldValue]);

            return (
              <Form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Client Field */}
                  <div>
                    <label
                      htmlFor="client"
                      className="block py-2 text-gray-400 text-sm font-medium"
                    >
                      Client
                    </label>
                    <Field
                      as="select"
                      name="client"
                      className="py-2 px-2 border bg-transparent border-gray-600 text-gray-400 w-full rounded-sm"
                    >
                      <option value={"ahmad"}>Ahmad </option>
                      {storeLeadData.map((option) => (
                        <option key={option._id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="client"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Invoice Number */}
                  <div>
                    <label
                      htmlFor="number"
                      className="block py-2 text-gray-400 text-sm font-medium"
                    >
                      Number
                    </label>
                    <Field
                      name="number"
                      type="number"
                      as={Input}
                      className="bg-transparent border-gray-600 text-gray-400"
                    />
                    <ErrorMessage
                      name="number"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label
                      htmlFor="status"
                      className="block py-2 text-gray-400 text-sm font-medium"
                    >
                      Status
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className="py-2 px-2 border bg-transparent border-gray-600 text-gray-400 w-full rounded-sm"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label
                      htmlFor="year"
                      className="block py-2 text-gray-400 text-sm font-medium"
                    >
                      Year
                    </label>
                    <Field
                      name="year"
                      type="number"
                      as={Input}
                      className="bg-transparent border-gray-600 text-gray-400"
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
                      className="block py-2 text-gray-400 text-sm font-medium"
                    >
                      Currency
                    </label>
                    <Field
                      as="select"
                      name="currency"
                      className="py-2 px-2 border bg-transparent border-gray-600 text-gray-400 w-full"
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

                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="block py-2 text-gray-400 text-sm font-medium"
                    >
                      Date
                    </label>
                    <Field
                      name="date"
                      type="date"
                      as={Input}
                      className="bg-transparent border-gray-600 text-gray-400"
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Expire Date */}
                  <div>
                    <label
                      htmlFor="expireDate"
                      className="block py-2 text-gray-400 text-sm font-medium"
                    >
                      Expire Date
                    </label>
                    <Field
                      name="expireDate"
                      type="date"
                      as={Input}
                      className="bg-transparent border-gray-600 text-gray-400"
                    />
                    <ErrorMessage
                      name="expireDate"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Note */}
                  <div className="col-span-2">
                    <label
                      htmlFor="note"
                      className="block py-2 text-gray-400 text-sm font-medium"
                    >
                      Note
                    </label>
                    <Field
                      name="note"
                      as={Textarea}
                      className="bg-transparent border-gray-600 text-gray-400"
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
                          className="grid grid-cols-5 gap-4 mb-4"
                        >
                          {/* Item Name */}
                          <div>
                            <label className="block py-2 text-gray-400 text-sm font-medium">
                              Item Name
                            </label>
                            <Field
                              name={`items.${index}.itemName`}
                              as={Input}
                              className="bg-transparent border-gray-600 text-gray-400"
                            />
                            <ErrorMessage
                              name={`items.${index}.itemName`}
                              component="div"
                              className="text-red-600 text-sm"
                            />
                          </div>

                          {/* Description */}
                          <div>
                            <label className="block py-2 text-gray-400 text-sm font-medium">
                              Description
                            </label>
                            <Field
                              name={`items.${index}.descriptionName`}
                              as={Input}
                              className="bg-transparent border-gray-600 text-gray-400"
                            />
                          </div>

                          {/* Quantity */}
                          <div>
                            <label className="block py-2 text-gray-400 text-sm font-medium">
                              Quantity
                            </label>
                            <Field
                              name={`items.${index}.quantity`}
                              as={Input}
                              type="number"
                              className="bg-transparent border-gray-600 text-gray-400"
                            />
                            <ErrorMessage
                              name={`items.${index}.quantity`}
                              component="div"
                              className="text-red-600 text-sm"
                            />
                          </div>

                          {/* Price */}
                          <div>
                            <label className="block py-2 text-gray-400 text-sm font-medium">
                              Price
                            </label>
                            <Field
                              name={`items.${index}.price`}
                              as={Input}
                              type="number"
                              className="bg-transparent border-gray-600 text-gray-400"
                            />
                            <ErrorMessage
                              name={`items.${index}.price`}
                              component="div"
                              className="text-red-600 text-sm"
                            />
                          </div>

                          {/* Total */}
                          <div>
                            <label className="block py-2 text-gray-400 text-sm font-medium">
                              Total
                            </label>
                            <Field
                              name={`items.${index}.total`}
                              value={item.quantity * item.price}
                              className="bg-transparent border-gray-600 text-gray-400"
                              readOnly
                              as={Input}
                            />
                          </div>

                          <div className="flex justify-end items-center col-span-5">
                            <Button
                              variant="destructive"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        onClick={() =>
                          push({
                            itemName: "",
                            descriptionName: "",
                            quantity: 1,
                            price: 0,
                            total: 0,
                          })
                        }
                      >
                        Add Item
                      </Button>
                    </div>
                  )}
                </FieldArray>

                {/* Subtotal, Tax, Total */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block py-2 text-gray-400 text-sm font-medium">
                      SubTotal
                    </label>
                    <Field
                      name="subTotal"
                      value={values.subTotal}
                      readOnly
                      as={Input}
                      className="bg-transparent border-gray-600 text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block py-2 text-gray-400 text-sm font-medium">
                      Tax
                    </label>
                    <Field
                      name="tax"
                      type="number"
                      as={Input}
                      className="bg-transparent border-gray-600 text-gray-400"
                    />
                    <ErrorMessage
                      name="tax"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block py-2 text-gray-400 text-sm font-medium">
                      Total
                    </label>
                    <Field
                      name="total"
                      value={values.total}
                      readOnly
                      as={Input}
                      className="bg-transparent border-gray-600 text-gray-400"
                    />
                  </div>
                </div>

                <Button type="submit">
                  {showInvoiceButton ? "Update Invoice" : "Save Quotes"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LeadQuotesForm;
