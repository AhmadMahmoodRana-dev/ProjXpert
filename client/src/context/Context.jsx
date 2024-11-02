import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

const ContextProvider = (props) => {
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState([]);

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("mode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Update localStorage whenever mode changes
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(mode));
  }, [mode]);
  // ## PEOPLE
  const [openPersonForm, setOpenPersonForm] = useState(false);
  const [openPersonDetail, setOpenPersonDetail] = useState(false);
  const [storePeopleData, setStorePeopleData] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [personDetail, setPersonDetail] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // ## COMPANY
  const [openCompanyForm, setOpenCompanyForm] = useState(false);
  const [openCompanyDetail, setOpenCompanyDetail] = useState(false);
  const [storeCompanyData, setStoreCompanyData] = useState([]);
  const [cmpShowButton, setCmpShowButton] = useState(false);
  const [cmpUpdateId, setCmpUpdateId] = useState("");
  const [companyDetail, setCompanyDetail] = useState({});
  const [cmpSearchTerm, setCmpSearchTerm] = useState("");

  // ## LEAD

  const [openLeadForm, setOpenLeadForm] = useState(false);
  const [openLeadDetail, setOpenLeadDetail] = useState(false);
  const [storeLeadData, setStoreLeadData] = useState([]);
  const [leadShowButton, setLeadShowButton] = useState(false);
  const [leadUpdateId, setLeadUpdateId] = useState("");
  const [leadDetail, setLeadDetail] = useState({});
  const [leadSearchTerm, setLeadSearchTerm] = useState("");

  // ## CUSTOMER

  const [openCustomerForm, setOpenCustomerForm] = useState(false);
  const [getSingleCompanyId, setGetSingleCompanyId] = useState("");
  const [getSinglePeopleId, setGetSinglePeopleId] = useState("");
  const [storeCustomerData, setStoreCustomerData] = useState([]);
  const [singleCustomerData, setSingleCustomerData] = useState({});
  const [openCustomerDetail, setOpenCUstomerDetail] = useState(false);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");

  // ## INVOICES
  const [showInvoiceButton, setShowInvoiceButton] = useState(false);
  const [storeInvoices, setStoreInvoices] = useState([]);
  const [singleInvoice, setSingleInvoice] = useState({});
  const [updateInvoiceId, setUpdateInvoiceId] = useState("");
  const [invoiceSearchTerm, setInvoiceSearchTerm] = useState("");

  // ## EXPENSE CATEGORY
  const [storeExpenseCategory, setStoreExpenseCategory] = useState([]);
  const [showExpenseCategoryButton, setShowExpenseCategoryButton] =
    useState(false);
  const [showExpenseCategoryForm, setShowExpenseCategoryForm] = useState(false);
  const [SingleExpenseCategory, setSingleExpenseCategory] = useState({});
  const [openExpensiveCategoryDetailPage, setOpenExpensiveCategoryDetailPage] =
    useState(false);
  const [singleExpenseUpdateId, setSingleExpenseUpdateId] = useState("");
  const [expenseCategorySearchTerm, setExpenseCategorySearchTerm] =
    useState("");

  // ## PRODUCT CATEGORY
  const [storeProductCategory, setStoreProductCategory] = useState([]);
  const [showProductCategoryButton, setShowProductCategoryButton] =
    useState(false);
  const [showProductCategoryForm, setShowProductCategoryForm] = useState(false);
  const [SingleProductCategory, setSingleProductCategory] = useState({});
  const [openProductCategoryDetailPage, setOpenProductCategoryDetailPage] =
    useState(false);
  const [singleProductUpdateId, setSingleProductUpdateId] = useState("");
  const [productCategorySearchTerm, setProductCategorySearchTerm] =
    useState("");

  // ## EXPENSE
  const [openExpenseForm, setOpenExpenseForm] = useState(false);
  const [showExpenseButton, setShowExpenseButton] = useState(false);
  const [storeExpense, setStoreExpense] = useState([]);
  const [expenseDetailShow, setExpenseDetailShow] = useState(false);
  const [singleExpense, setSingleExpense] = useState({});
  const [singleExpenseUpdatedId, setSingleExpenseUpdatedId] = useState("");
  const [expenseSearchTerm, setExpenseSearchTerm] = useState("");

  // ## Product
  const [openProductForm, setOpenProductForm] = useState(false);
  const [showProductButton, setShowProductButton] = useState(false);
  const [storeProduct, setStoreProduct] = useState([]);
  const [productDetailShow, setProductDetailShow] = useState(false);
  const [singleProduct, setSingleProduct] = useState({});
  const [singleProductUpdatedId, setSingleProductUpdatedId] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");

  // ## QUOTES FOR LEAD
  const [storeLeadQuotes, setStoreLeadQuotes] = useState([]);
  const [singleLeadQuote, setSingleLeadQuote] = useState({});
  const [updateLeadQuotesId, setUpdateLeadQuotesId] = useState("");
  const [quotesLeadSearchTerm, setQuotesLeadSearchTerm] = useState("");

// ## USERS 
const [allUser,setAllUser] = useState([])
const [user, setUser] = useState(null);
const [openUserForm,setOpenUserForm] = useState(false)
  // ### PEOPLE FORM API ###

  // post

  const setPeople = async (val) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `http://localhost:1337/api/form/post-people`,
        {
          firstName: val.firstName,
          lastName: val.lastName,
          company: val.company,
          country: val.country,
          phone: val.phone,
          email: val.email,
          type: "people",
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenPersonForm(false);
      getPeople();
      console.log("Form submitted", result);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // get

  const getPeople = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-people`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStorePeopleData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const deletePeople = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.delete(
        `http://localhost:1337/api/form/delete-people/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getPeople();
      console.log("people delete SuccessFully !", result);
    } catch (error) {
      console.log(error);
    }
  };

  // update

  const getSinglePeople = async (people) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-people/${people._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPersonDetail(data);
      setOpenPersonForm(!openPersonForm);
      setShowButton(!showButton);
      setUpdateId(data._id);
      console.log("data fetch sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updatePeople = async (value) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `http://localhost:1337/api/form/update-people/${updateId}`,
        {
          firstName: value.firstName,
          lastName: value.lastName,
          company: value.company,
          country: value.country,
          phone: value.phone,
          email: value.email,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Succesfully Updated");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // detailpageInfo
  const getPeopleDetail = async (id) => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `http://localhost:1337/api/form/get-single-people/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPersonDetail(result.data);
    console.log(result.data);
    setOpenPersonDetail(true);
  };

  //           #########################################################################################          //

  // ## COMPANIES FORM APIS

  // post

  const setCompanies = async (val) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `http://localhost:1337/api/form/post-company`,
        {
          name: val.name,
          contact: val.contact,
          website: val.website,

          country: val.country,
          phone: val.phone,
          email: val.email,
          type: "company",
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenCompanyForm(false);
      getCompany();
      console.log("CompanyForm submitted", result);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // get

  const getCompany = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-company`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStoreCompanyData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const deleteCompany = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.delete(
        `http://localhost:1337/api/form/delete-company/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCompany();
      console.log("Company delete SuccessFully !", result);
    } catch (error) {
      console.log(error);
    }
  };

  // update

  const getSingleCompany = async (company) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-company/${company._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompanyDetail(data);
      setOpenCompanyForm(!openPersonForm);
      setCmpShowButton(!cmpShowButton);
      setCmpUpdateId(data._id);
      console.log("Companydata fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompany = async (val) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `http://localhost:1337/api/form/update-company/${cmpUpdateId}`,
        {
          name: val.name,
          contact: val.contact,
          website: val.website,

          country: val.country,
          phone: val.phone,
          email: val.email,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // detailpageInfo
  const getCompanyDetail = async (id) => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `http://localhost:1337/api/form/get-single-company/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCompanyDetail(result.data);
    console.log(result.data);
    setOpenCompanyDetail(true);
  };

  //           #########################################################################################          //

  //   ## LEAD FORM APIS

  // post

  const setLeads = async (val) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `http://localhost:1337/api/form/post-lead`,
        {
          branch: val.leadBranch,
          type: val.leadType,
          name: val.leadName,

          status: val.leadStatus,
          source: val.leadSource,
          country: val.leadCountry,
          phone: val.leadPhone,
          email: val.leadEmail,
          project: val.leadProject,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenLeadForm(false);
      getLead();
      console.log("LeadForm submitted", result);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // get

  const getLead = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-lead`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStoreLeadData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const deleteLead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.delete(
        `http://localhost:1337/api/form/delete-lead/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getLead();
      console.log("Lead delete SuccessFully !", result);
    } catch (error) {
      console.log(error);
    }
  };

  // update

  const getSingleLead = async (Lead) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-lead/${Lead._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLeadDetail(data);
      setOpenLeadForm(!openPersonForm);
      setLeadShowButton(!leadShowButton);
      setLeadUpdateId(data._id);
      console.log("Leaddata fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLead = async (val) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `http://localhost:1337/api/form/update-lead/${leadUpdateId}`,
        {
          branch: val.leadBranch,
          type: val.leadType,
          name: val.leadName,

          status: val.leadStatus,
          source: val.leadSource,
          country: val.leadCountry,
          phone: val.leadPhone,
          email: val.leadEmail,
          project: val.leadProject,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // detailpageInfo
  const getLeadDetail = async (id) => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `http://localhost:1337/api/form/get-single-lead/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLeadDetail(result.data);
    console.log(result.data);
    setOpenLeadDetail(true);
  };

  //           #########################################################################################          //

  // CUSTOMER FORM API

  const storeSingleCustomerCompany = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-company/${getSingleCompanyId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      data
        ? await axios.post(`http://localhost:1337/api/form/post-customer`, {
            name: data.name,
            country: data.country,
            phone: data.phone,
            email: data.email,
            type: data.type,
          },{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : console.log("null");
    } catch (error) {
      console.log("Error fetching company data:", error);
    }
  };
  const storeSingleCustomerPeople = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-people/${getSinglePeopleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (data) {
        await axios.post(
          `http://localhost:1337/api/form/post-customer`,
          {
            name: `${data.firstName} ${data.lastName}`,
            country: data.country,
            phone: data.phone,
            email: data.email,
            type: data.type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getCustomerData();
      } else {
        console.log("No data found for the specified ID.");
      }
    } catch (error) {
      console.error("Error in storeSingleCustomerPeople:", error);
    }
  };
  


  // ## GET DATA
  const getCustomerData = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-customer`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStoreCustomerData(data.message);
      console.log("customer data", storeCustomerData);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCustomer = async (customerId) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.delete(
        `http://localhost:1337/api/form/delete-customer/${customerId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCustomerData();
      console.log("Customer delete successFully!", result);
    } catch (error) {
      console.log(error);
    }
  };

  //  UPDATE

  const getSingleCustomer = async (customer) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form//get-customer/${customer.name}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenCUstomerDetail(true);
      setSingleCustomerData(data);
      console.log("data fetch sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  //           #########################################################################################          //

  // INVOICES

  // POST

  const setInvoice = async (invoice) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `http://localhost:1337/api/form/post-invoice`,
        invoice,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Invoice submitted", result);
      setShowInvoiceButton(!showInvoiceButton);
      getInvoice();
      navigate("/invoices");
    } catch (error) {
      console.log(error);
    }
  };

  // GET
  const getInvoice = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-invoice`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStoreInvoices(data);
      console.log("INVOICES", storeInvoices);
    } catch (error) {
      console.log(error);
    }
  };

  //  DELETE
  const deleteInvoice = async (invoiceId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:1337/api/form/delete-invoice/${invoiceId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Invoice deleted successfully!");
      getInvoice();
    } catch (error) {
      console.log(error);
    }
  };

  // SINGLE INVOICE
  const getSingleinvoice = async (invoice) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-invoice/${invoice._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSingleInvoice(data);
      navigate("/invoices-payment-form");
      console.log("Leaddata fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  // SHOW INVOICE DETAIL

  const getSingleinvoiceDetail = async (invoice) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-invoice/${invoice}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSingleInvoice(data);
      navigate("/invoices-detail");
      console.log(singleInvoice, "SINGLE INVOIC DETAIL");
      console.log("Invoice data fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleinvoiceDetail1 = async (invoice) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-invoice/${invoice._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSingleInvoice(data);
      setUpdateInvoiceId(invoice._id);
      setShowInvoiceButton(true);
      navigate("/invoices-form");
      console.log(singleInvoice, "SINGLE INVOIC DETAIL");
      console.log("Invoice data fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  //  UPDATE INVOICE PAYMENT
  const updateInvoicePayment = async (value, id) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `http://localhost:1337/api/form/update-invoice/${id}`,
        {
          paidAmount: value.amount,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      console.log("Invoice Payment Updated Successfully", value, id);
    } catch (error) {
      console.log(error);
    }
  };
  //  UPDATE INVOICE
  const updateInvoice = async (value) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `http://localhost:1337/api/form/update-invoice/${updateInvoiceId}`,
        {
          client: value.client,
          number: value.number,
          year: value.year,
          currency: value.currency,
          status: value.status,
          date: value.date,
          expireDate: value.expireDate,
          note: value.note,
          // Send items correctly
          items: value.items.map((item) => ({
            itemName: item.itemName,
            descriptionName: item.descriptionName,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price, // Calculate total for each item
          })),
          // Send invoice-level totals
          subTotal: value.subTotal,
          tax: value.tax,
          total: value.total,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/invoices");
      window.location.reload();
      console.log("Invoice Updated Successfully", value, id);
    } catch (error) {
      console.log(error);
    }
  };

  //           #########################################################################################          //

  // EXPENSE CATEGORY API

  // GET
  const getExpenseCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-expensecategory`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStoreExpenseCategory(data.message);
      console.log("INVOICES", storeExpenseCategory);
    } catch (error) {
      console.log(error);
    }
  };
  // POST
  const setExpenseCategory = async (expensecategory) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `http://localhost:1337/api/form/post-expensecategory`,
        expensecategory,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("EXPENSE CATEGORY submitted", result);
      setShowExpenseCategoryButton(!showExpenseCategoryButton);
      setShowExpenseCategoryForm(true);
      // getExpenseCategory();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteExpenseCategory = async (Id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:1337/api/form/delete-expensecategory/${Id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Invoice deleted successfully!");
      getExpenseCategory();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE

  const getSingleExpenseCategory = async (ExpenseCategory) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-expensecategory/${ExpenseCategory._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenExpensiveCategoryDetailPage(!openExpensiveCategoryDetailPage);
      setSingleExpenseCategory(data);
      setSingleExpenseUpdateId(data._id);
      console.log("Leaddata fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleExpenseCategoryUpdate = async (ExpenseCategory) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-expensecategory/${ExpenseCategory._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowExpenseCategoryForm(!showExpenseCategoryForm);
      setShowExpenseCategoryButton(true);
      setSingleExpenseCategory(data);
      setSingleExpenseUpdateId(data._id);
      console.log("Leaddata fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSingleExpenseCategory = async (val) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `http://localhost:1337/api/form/update-expensecategory/${singleExpenseUpdateId}`,
        {
          name: val.name,
          description: val.description,
          color: val.color,
          enabled: val.enabled,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //           #########################################################################################          //

  // PRODUCT CATEGORY API

  // GET
  const getProductCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-productcategory`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStoreProductCategory(data.message);
      console.log("INVOICES", storeProductCategory);
    } catch (error) {
      console.log(error);
    }
  };
  // POST
  const setProductCategory = async (Productcategory) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `http://localhost:1337/api/form/post-productcategory`,
        Productcategory,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product CATEGORY submitted", result);
      setShowProductCategoryButton(!showProductCategoryButton);
      setShowProductCategoryForm(true);
      // getProductCategory();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteProductCategory = async (Id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:1337/api/form/delete-productcategory/${Id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Invoice deleted successfully!");
      getProductCategory();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE

  const getSingleProductCategory = async (ProductCategory) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-productcategory/${ProductCategory._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenProductCategoryDetailPage(!openProductCategoryDetailPage);
      setSingleProductCategory(data);
      setSingleProductUpdateId(data._id);
      console.log("Leaddata fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleProductCategoryUpdate = async (ProductCategory) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-productcategory/${ProductCategory._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowProductCategoryForm(!showProductCategoryForm);
      setShowProductCategoryButton(true);
      setSingleProductCategory(data);
      setSingleProductUpdateId(data._id);
      console.log("Leaddata fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSingleProductCategory = async (val) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `http://localhost:1337/api/form/update-productcategory/${singleProductUpdateId}`,
        {
          name: val.name,
          description: val.description,
          color: val.color,
          enabled: val.enabled,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //           #########################################################################################          //

  //   ## EXPENSE

  // POST
  const setExpense = async (expense) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `http://localhost:1337/api/form/post-expense`,
        expense,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Expense submitted", result);
    } catch (error) {
      console.log(error);
    }
  };

  //   ## GET EXPENSE
  const getExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-expense`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStoreExpense(data.message);
      console.log("INVOICES", storeExpense);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE EXPENSE
  const deleteExpense = async (Id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:1337/api/form/delete-expense/${Id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Expense deleted successfully!");
      getExpense();
    } catch (error) {
      console.log(error);
    }
  };

  // ### UPDATE

  const getSingleExpense = async (Expense) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-expense/${Expense._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExpenseDetailShow(!expenseDetailShow), setSingleExpense(data);
      setSingleExpenseUpdatedId(data._id);
      console.log("Expense fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleExpenseUpdate = async (Expense) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-expense/${Expense._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenExpenseForm(!openExpenseForm);
      setShowExpenseButton(true);
      setSingleExpense(data);
      setSingleExpenseUpdatedId(data._id);
      console.log("Expense fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSingleExpense = async (val) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `http://localhost:1337/api/form/update-expense/${singleExpenseUpdatedId}`,
        {
          name: val.name,
          expensecategory: val.expensecategory,
          currency: val.currency,
          total: val.total,
          description: val.description,
          ref: val.ref,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //           #########################################################################################          //

  //   ## Product

  // POST
  const setProduct = async (Product) => {
    console.log(Product);
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `http://localhost:1337/api/form/post-product`,
        Product,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product submitted", result);
    } catch (error) {
      console.log(error);
    }
  };

  //   ## GET Product
  const getProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-product`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStoreProduct(data.message);
      console.log("INVOICES", storeProduct);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE Product
  const deleteProduct = async (Id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:1337/api/form/delete-product/${Id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Product deleted successfully!");
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  // ### UPDATE

  const getSingleProduct = async (Product) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-product/${Product._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductDetailShow(!productDetailShow), setSingleProduct(data);
      setSingleProductUpdatedId(data._id);
      console.log("Product fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleProductUpdate = async (Product) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-product/${Product._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenProductForm(!openProductForm);
      setShowProductButton(true);
      setSingleProduct(data);
      setSingleProductUpdatedId(data._id);
      console.log("Product fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSingleProduct = async (val) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `http://localhost:1337/api/form/update-product/${singleProductUpdatedId}`,
        {
          name: val.name,
          Productcategory: val.Productcategory,
          currency: val.currency,
          total: val.total,
          description: val.description,
          ref: val.ref,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //           #########################################################################################          //

  //  QUOTE FOR LEAd

  //  POST

  const setLeadQuotes = async (LeadQuotes) => {
    try {
      const token = localStorage.getItem("token");

      const result = await axios.post(
        `http://localhost:1337/api/form/post-quote-lead`,
        LeadQuotes,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("LeadQuotes submitted", result);
      getLeadQuotes();
      navigate("/quote-lead");
    } catch (error) {
      console.log(error);
    }
  };

  // GET
  const getLeadQuotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:1337/api/form/get-quote-lead",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStoreLeadQuotes(data);
      console.log("LeadQuotes", data);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("Request made but no response received:", error.request);
      } else {
        console.error("Error in setting up the request:", error.message);
      }
    }
  };

  //  DELETE
  const deleteLeadQuotes = async (LeadQuotes) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:1337/api/form/delete-lead-quotes/${LeadQuotes}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("LeadQuotes deleted successfully!");
      getLeadQuotes();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE

  const getSingleLeadQuotes = async (LeadQuotes) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-quote-lead/${LeadQuotes._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSingleLeadQuote(data);
      setUpdateLeadQuotesId(LeadQuotes._id);
      setShowInvoiceButton(true);
      navigate("/quote-lead-form");
      console.log(singleLeadQuote, "SINGLE Lead DETAIL");
      console.log("LEAD Quote data fetch sucessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLeadQuotes = async (value) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `http://localhost:1337/api/form/update-quote-lead/${updateLeadQuotesId}`,
        {
          client: value.client,
          number: value.number,
          year: value.year,
          currency: value.currency,
          status: value.status,
          date: value.date,
          expireDate: value.expireDate,
          note: value.note,
          // Send items correctly
          items: value.items.map((item) => ({
            itemName: item.itemName,
            descriptionName: item.descriptionName,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price, // Calculate total for each item
          })),
          // Send invoice-level totals
          subTotal: value.subTotal,
          tax: value.tax,
          total: value.total,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/quote-lead");
      window.location.reload();
      console.log("Quote Lead Updated Successfully", value, id);
    } catch (error) {
      console.log(error);
    }
  };

  //           #########################################################################################          //
  //   ## GET COUNTRY

  const getCountry = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/all`);
      setCountryData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPeople();
    getCompany();
    getCountry();
    getLead();
    getCustomerData();
    getInvoice();
    getExpenseCategory();
    getProductCategory();
    getExpense();
    getProduct();
    getLeadQuotes();
    getUsers()
  }, []);

  // 33333333333              AUTHENTICATION       3333333333333333


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUser({ role });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:1337/api/form/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setUser({ role: data.role });
      window.location.reload();  
    } catch (error) {
      console.log(error)
    }
    
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

// ## GET USERS
const getUsers = async ( ) =>{
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      "http://localhost:1337/api/form/get-users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAllUser(data);
    console.log("Users fetched successfully", data);
 
}

//  DELETE USERS
const deleteUser = async (user) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(
      `http://localhost:1337/api/form/delete-user/${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("user deleted successfully!");
    getUsers();
  } catch (error) {
    console.log(error);
  }
};


  // ######################################################################################################################################

  const contextValue = {
    mode,
    setMode,
    // #######################
    // ## PEOPLE
    setOpenPersonForm,
    openPersonForm,
    setPeople,
    storePeopleData,
    countryData,
    deletePeople,
    showButton,
    getSinglePeople,
    updatePeople,
    openPersonDetail,
    setOpenPersonDetail,
    getPeopleDetail,
    personDetail,
    searchTerm,
    setSearchTerm,

    // #######################
    // ## COMPANY

    setOpenCompanyForm,
    openCompanyForm,
    setCompanies,
    storeCompanyData,
    deleteCompany,
    cmpShowButton,
    getSingleCompany,
    updateCompany,
    openCompanyDetail,
    setOpenCompanyDetail,
    getCompanyDetail,
    companyDetail,
    storeCompanyData,
    cmpSearchTerm,
    setCmpSearchTerm,

    // #######################
    // Lead

    setOpenLeadForm,
    openLeadForm,
    setLeads,
    storeLeadData,
    deleteLead,
    leadShowButton,
    getSingleLead,
    updateLead,
    openLeadDetail,
    setOpenLeadDetail,
    getLeadDetail,
    leadDetail,
    leadSearchTerm,
    setLeadSearchTerm,

    // #######################
    // Customer

    setOpenCustomerForm,
    openCustomerForm,
    getSingleCompanyId,
    setGetSingleCompanyId,
    getSinglePeopleId,
    setGetSinglePeopleId,
    storeSingleCustomerCompany,
    storeSingleCustomerPeople,
    storeCustomerData,
    deleteCustomer,
    setOpenCUstomerDetail,
    openCustomerDetail,
    singleCustomerData,
    customerSearchTerm,
    setCustomerSearchTerm,
    getSingleCustomer,

    // #######################
    // Invoice
    showInvoiceButton,
    setShowInvoiceButton,
    setInvoice,
    storeInvoices,
    deleteInvoice,
    getSingleinvoice,
    singleInvoice,
    updateInvoicePayment,
    getSingleinvoiceDetail,
    updateInvoice,
    getSingleinvoiceDetail1,
    updateInvoice,
    invoiceSearchTerm,
    setInvoiceSearchTerm,

    // #######################
    // EXPENSE CATEGORY
    setExpenseCategory,
    showExpenseCategoryButton,
    showExpenseCategoryForm,
    setShowExpenseCategoryForm,
    storeExpenseCategory,
    deleteExpenseCategory,
    openExpensiveCategoryDetailPage,
    setOpenExpensiveCategoryDetailPage,
    getSingleExpenseCategory,
    SingleExpenseCategory,
    updateSingleExpenseCategory,
    getSingleExpenseCategoryUpdate,
    expenseCategorySearchTerm,
    setExpenseCategorySearchTerm,

    // #######################
    // PRODUCT CATEGORY
    setProductCategory,
    showProductCategoryButton,
    showProductCategoryForm,
    setShowProductCategoryForm,
    storeProductCategory,
    deleteProductCategory,
    openProductCategoryDetailPage,
    setOpenProductCategoryDetailPage,
    getSingleProductCategory,
    SingleProductCategory,
    updateSingleProductCategory,
    getSingleProductCategoryUpdate,
    productCategorySearchTerm,
    setProductCategorySearchTerm,

    // #######################
    // EXPENSE
    openExpenseForm,
    setOpenExpenseForm,
    setExpense,
    showExpenseButton,
    setShowExpenseButton,
    storeExpense,
    deleteExpense,
    expenseDetailShow,
    setExpenseDetailShow,
    getSingleExpense,
    singleExpense,
    getSingleExpenseUpdate,
    updateSingleExpense,
    expenseSearchTerm,
    setExpenseSearchTerm,

    // #######################
    // Product
    openProductForm,
    setOpenProductForm,
    setProduct,
    showProductButton,
    setShowProductButton,
    storeProduct,
    deleteProduct,
    productDetailShow,
    setProductDetailShow,
    getSingleProduct,
    singleProduct,
    getSingleProductUpdate,
    updateSingleProduct,
    productSearchTerm,
    setProductSearchTerm,
    // #######################

    // QUOTE FOR LEAD

    setLeadQuotes,
    storeLeadQuotes,
    deleteLeadQuotes,
    getSingleLeadQuotes,
    updateLeadQuotes,
    singleLeadQuote,
    quotesLeadSearchTerm,
    setQuotesLeadSearchTerm,

    // #############

    // Authentication
    user,
    setUser,
    login,
    logout,
    allUser,
    getUsers,
    openUserForm,setOpenUserForm,
    deleteUser

  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
