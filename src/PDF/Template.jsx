import React, { useRef, useState } from "react";
import ReactPrint from "react-to-print";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Close } from "@mui/icons-material";
import logo from "../Image/logo.png";
import icon from "../Image/icon.png";

function PdfTemplate(props) {
  const ref = useRef();
  const [openAirPopup, setAirPopup] = useState(false);

  const [Name, setName] = useState("");
  const [ListNo, setListNo] = useState("");
  const [Item, setItem] = useState("");
  const [RI, setRI] = useState("");
  const [QTY, setQTY] = useState("");
  const [TaxAmount, setTaxAmount] = useState("");
  const [Contact, setContact] = useState("");
  const [Discount, setDiscount] = useState("");
  const [List, setList] = useState([]);
  const [AmountPaid, setAmountPaid] = useState("");

  const addData = () => {
    const ratePerItem = parseFloat(RI);
    const quantity = parseInt(QTY);
    const taxableValue = ratePerItem * quantity;
    const taxRate = parseFloat(TaxAmount) / 100;
    const taxAmount = taxableValue * taxRate;
    const amount = taxableValue + taxAmount;
    const discount = parseFloat(Discount) || 0;
    const remain = amount - AmountPaid - discount;

    setList((prevList) => [
      ...prevList,
      {
        name: Name,
        contact: Contact,
        product: Item,
        listno: ListNo,
        ri: ratePerItem,
        qty: quantity,
        taxamount: taxAmount,
        amount: amount,
        discount: discount,
        remain: remain,
        amountpaid: AmountPaid,
      },
    ]);

    setName("");
    setContact("");
    setItem("");
    setListNo("");
    setRI("");
    setQTY("");
    setTaxAmount("");
    setDiscount("");
    setAirPopup(false);
    setAmountPaid("");
  };

  let sum = 0;
  let discountedTotal = 0;
  let remainingTotal = 0;
  List.forEach((item) => {
    sum += parseFloat(item.amount);
    discountedTotal += parseFloat(item.amount) - parseFloat(item.discount);
    remainingTotal += parseFloat(item.remain);
  });
  
  const getFirstCustomerName = () => {
    return List.length ? List[0].name : "";
  };
  
  return (
    <>
      <div className="px-5 background_color">
        <div className="container-fluid mt-5" ref={ref}>
          <div className=""></div>
          <div className="invoice-details"></div>
          <table>
            {/* -------------------top Bar-------------- */}
            <thead className="totals">
              <tr>
                <th colSpan="8" className="text-center">
                  <div className="header">
                    <h1 className="display-6">
                      Fee Receipt
                    </h1>
                  </div>
                </th>
              </tr>
            </thead>

            {/* ---------------------------logo company details-------------------- */}
            <thead className="invoice-details">
              <tr className="company-details">
                <th colSpan="4" className="px-1 text-start">
                <h3>CIN: U80903HR2022PTC108534</h3>
                <h3>GSTIN: 06AAGCI9703D1ZQ</h3>
                <h3>PAN: AAGC19703D.</h3>
                </th>
                <th colSpan="4" className="text-end">
                <img className="LOGO" src={logo} alt="Logo" /><h6 className="pt-1">Contact: (+91)93183 38245</h6>
                  <h6>support@internselite.com</h6>
                  <h6>
                  2nd Floor, P.D. House Building, Sohna Gurgaon Road, Opp.4 Season Resort, Sector-4, Haryana-122103
                  </h6>
                </th>
              </tr>
            </thead>

            {/* ---------------------------customer details-------------------- */}
            <thead className="invoice-details">
              <tr>
                <th colSpan="5" className="">
                  <h2 className="fs-5 text-dark">Customer Details:</h2>
                  {List.length
                    ? List.map((items, index) => (
                        <div key={index}>
                          <h2 className="fs-5 text-start text-dark">
                            Name: {items.name}
                          </h2>
                            Contact: {items.contact}
                        </div>
                      ))
                    : null}
                </th>
                <th colSpan="3" className="text-end">
                  <h2>Invoice Number: {props.InvoiceNumber}</h2>
                  Date: {props.date}
                </th>
              </tr>
            </thead>
            {/* -----------------------------header----------------------- */}
            <thead className="Header_bar">
              <tr>
                <th className="text-center">#</th>
                <th className="text-center" colSpan="2">Program Name</th>
                <th className="text-center">Rate/Item</th>
                <th className="text-center">Qty</th> 
                <th className="text-center">Taxable Value</th>
                <th className="text-center">Tax Amount</th>
                <th className="text-center">Amount</th>
              </tr>
            </thead>

            {/* -------------------------content-------------------- */}
            <tbody>
              {List.length
                ? List.map((items, index) => (
                    <tr key={index}>
                      <td className="text-center">{items.listno}</td>
                      <td className="text-center" colSpan="2">{items.product}</td>
                      <td className="text-center">{items.ri}</td>
                      <td className="text-center">{items.qty}</td>
                      <td className="text-center">
                        {items.ri * items.qty}
                      </td>
                      <td className="text-center">{items.taxamount}</td>
                      <td className="text-center">
                        <i className="fas fa-rupee-sign" aria-hidden="true"></i>{" "}
                        ₹ {items.amount} /-
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>

            {/* --------------------------------Subtotal:------------------------- */}
            <thead className="totals">
              <tr>
                <th colSpan="6" className="py-2 px-4">
                  Subtotal:
                </th>
                <th colSpan="2" className="text-end">
                  <strong>
                    <i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹{" "}
                    {sum} /-
                  </strong>
                </th>
              </tr>
              <tr>
                <th colSpan="6" className="py-2 px-4">
                  Discount:
                </th>
                <th colSpan="2" className="text-end">
                  {List.length
                    ? List.map((items, index) => (
                        <div key={index}>
                          <strong>
                            {" "}
                            <i
                              className="fas fa-rupee-sign"
                              aria-hidden="true"
                            ></i>{" "}
                            ₹ {items.discount} /-
                          </strong>
                        </div>
                      ))
                    : null}
                </th>
              </tr>
              <tr>
                <th colSpan="6" className="py-2 px-4">
                  Total:{" "}
                </th>
                <th colSpan="2" className="text-end">
                  <strong>
                    <i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹{" "}
                    {discountedTotal} /-
                  </strong>
                </th>
              </tr>
            </thead>
            <br></br>

            {/* -------------------------------Amount Paid:------------------- */}
            <thead className="totals">
              <tr>
                <th colSpan="7" className="px-4 fs-6">
                  Amount Paid:
                </th>
                <th colSpan="1" className="text-end">
                  {List.length
                    ? List.map((items, index) => (
                        <div key={index}>
                          <strong>
                            {" "}
                            <i
                              className="fas fa-rupee-sign"
                              aria-hidden="true"
                            ></i>{" "}
                            ₹ {items.amountpaid} /-
                          </strong>
                        </div>
                      ))
                    : null}
                </th>
              </tr>
              <tr>
                <th colSpan="7" className="px-4 fs-6  ">
                  Remaining Amount:
                </th>
                <th colSpan="1" className="text-end">
                  <strong>
                    <i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹{" "}
                    {remainingTotal} /-
                  </strong>
                </th>
              </tr>
            </thead>

            {/* -----------------------Authorized Signatory--------------------- */}
            <thead className="totals">
              <tr>
                <th colSpan="6" className="text-center"></th>
                <th colSpan="2" className="text-center">
                  FOR INTERNSELITE EDUTECH PRIVATE LIMITED
                  <br></br>
                  <h1 className="text-end pt-5 fs-6">Authorized Signatory</h1>
                </th>
              </tr>
            </thead>

            {/* -------------------Footer-------------- */}
            <thead className="footer">
              <tr>
                <th colSpan="8" className="text-center">
                  This is a Computer Generated Document and Requires no
                  signature
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <ReactPrint
        trigger={() => (
          <button className="border m-5 px-4 rounded py-2 fs-5 bg-primary text-white">
            Print
          </button>
        )}
        content={() => ref.current}
        documentTitle={`INVOICE ${props.InvoiceNumber}_${getFirstCustomerName()}`}
      />

      <button
        className="border px-4 rounded py-2 fs-5 bg-primary text-white"
        onClick={() => setAirPopup(true)}
      >
        Add Product
      </button>

      <Dialog open={openAirPopup}>
        <DialogTitle>
          <div className="title">
            <div className="hed">New product</div>
            <div className="icon-cross" onClick={() => setAirPopup(false)}>
              <Close />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="container">
            <div className="forms">
              <input
                type="text"
                value={ListNo}
                onChange={(e) => setListNo(e.target.value)}
                placeholder="#"
              />
              <input
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <input
                type="text"
                value={Item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Program Name"
              />
              <input
                type="tel"
                value={Contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Phn. Number"
              />
              <input
                type="text"
                value={RI}
                onChange={(e) => setRI(e.target.value)}
                placeholder="Rate/Item"
              />
              <input
                type="text"
                value={QTY}
                onChange={(e) => setQTY(e.target.value)}
                placeholder="Qty"
              />
              <input
                type="text"
                value={TaxAmount}
                onChange={(e) => setTaxAmount(e.target.value)}
                placeholder="Tax Amount %"
              />
              <input
                type="text"
                value={Discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="₹ Discount"
              />
              <input
                type="text"
                value={AmountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                placeholder="Amount Paid"
              />
            </div>
            <div className="buttons">
              <button onClick={addData}>Add</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PdfTemplate;
