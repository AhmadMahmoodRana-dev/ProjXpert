import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Context } from "@/context/Context";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";

const InvoicesPaymentForm = () => {
  // Validation schema
  const validationSchema = Yup.object({
    number: Yup.number().required("Invoice number is required"),
    date: Yup.date().required("Date is required"),
    amount: Yup.number()
      .min(0, "Amount must be non-negative")
      .required("Amount is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
    reference: Yup.string().required("Reference is required"),
    description: Yup.string().required("Description is required"),
  });
const {singleInvoice,updateInvoicePayment} = useContext(Context)
  return (
    <div className="bg-[#ededed] w-full h-screen">
      <div className="w-full flex justify-center items-center h-auto min-h-screen px-10 flex-wrap">
        <div className="w-1/2 h-full">
          <h1>Payment Form</h1>
          <Formik
            initialValues={{
              number: singleInvoice.number || "",
              date: new Date().toISOString().split("T")[0], // Set current date as default
              amount: 0,
              paymentMethod: "",
              reference: "",
              description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Submit logic here
              console.log("Form values:", values);
              updateInvoicePayment(values, singleInvoice._id); // Call updateInvoicePayment with invoice id
            }}
          >
            {() => {
              return (
                <Form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Invoice Number */}
                    <div>
                      <label
                        htmlFor="number"
                        className="block text-sm font-medium"
                        
                      >
                        Invoice Number
                      </label>
                      <Field name="number" type="number" as={Input} readOnly />
                      <ErrorMessage
                        name="number"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium">
                        Date
                      </label>
                      <Field name="date" type="date" as={Input} />
                      <ErrorMessage
                        name="date"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Amount */}
                    <div className="col-span-2">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium"
                      >
                        Amount
                      </label>
                      <Field name="amount" type="number" as={Input} />
                      <ErrorMessage
                        name="amount"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Payment Method */}
                    <div className="col-span-2">
                      <label
                        htmlFor="paymentMethod"
                        className="block text-sm font-medium"
                      >
                        Payment Method
                      </label>
                      <Field name="paymentMethod" as="select" className="block w-full py-2 rounded-md22">
                        <option value="">Select Method</option>
                        <option value="creditCard">Credit Card</option>
                        <option value="bankTransfer">Bank Transfer</option>
                        <option value="paypal">PayPal</option>
                      </Field>
                      <ErrorMessage
                        name="paymentMethod"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Reference */}
                    <div className="col-span-2">
                      <label
                        htmlFor="reference"
                        className="block text-sm font-medium"
                      >
                        Reference
                      </label>
                      <Field name="reference" type="text" as={Input} />
                      <ErrorMessage
                        name="reference"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium"
                      >
                        Description
                      </label>
                      <Field name="description" as={Textarea} />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="mt-10 w-full">
                    Save
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="w-1/2 h-full bg-yellow-50"></div>
      </div>
    </div>
  );
};

export default InvoicesPaymentForm;
