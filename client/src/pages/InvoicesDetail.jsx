import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Context } from "@/context/Context";
import React, { useContext, useRef } from "react";
import html2pdf from "html2pdf.js";

const InvoicesDetail = () => {
  const { singleInvoice } = useContext(Context);
  const invoiceRef = useRef(); // Ref to capture the printable section

  // Function to generate PDF
  const generatePDF = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0.5,
      filename: `Invoice_${singleInvoice?.id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Invoice # 1/2024</h1>
          <div className="flex space-x-4 text-sm text-gray-500">
            <span className="bg-gray-200 px-2 py-1 rounded">Draft</span>
            <span className="bg-purple-200 px-2 py-1 rounded">Partially</span>
          </div>
        </div>
        <div className="flex space-x-4">
         
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={generatePDF} // Generate PDF on click
          >
            Download PDF
          </button>
          
        </div>
      </div>

      {/* Printable section */}
      <div ref={invoiceRef}>
        <div className="flex justify-between mb-6">
          <div className="text-lg font-medium">Subtotal</div>
          <div className="text-lg">$ 16,271,493.00</div>
        </div>
        <div className="flex justify-between mb-6">
          <div className="text-lg font-medium">Total</div>
          <div className="text-lg">$ 16,271,493.00</div>
        </div>
        <div className="flex justify-between mb-6">
          <div className="text-lg font-medium">Paid</div>
          <div className="text-lg">$ 20,000.00</div>
        </div>

        {/* Client Information */}
        <div className="mb-6">
          <h2 className="font-bold">Client: Ahmad Mahmood Rana</h2>
          <p>Email: ahmad@gmail.com</p>
          <p>Phone: 03284664654</p>
        </div>

        {/* Product Table */}
        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">Product</TableHead>
              <TableHead className="text-black">Quantity</TableHead>
              <TableHead className="text-black">Price</TableHead>
              <TableHead className="text-right text-black">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {singleInvoice?.items.map((val, id) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{val?.itemName}</TableCell>
                <TableCell>{val?.quantity}</TableCell>
                <TableCell>{val.price}</TableCell>
                <TableCell className="text-right">
                  ${val?.price * val.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Totals */}
        <div className="flex justify-between mt-6 font-bold">
          <div>Sub Total:</div>
          <div>${singleInvoice.subTotal}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>Tax Total (0 %):</div>
          <div>$ 0.00</div>
        </div>
        <div className="flex justify-between mt-2 text-lg font-bold">
          <div>Total:</div>
          <div>$ {singleInvoice.total}</div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesDetail;
