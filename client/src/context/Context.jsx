import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

const ContextProvider = (props) => {
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState([]);

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('mode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Update localStorage whenever mode changes
  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
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

  // ## INVOICES
  const [showInvoiceButton, setShowInvoiceButton] = useState(false);
  const [storeInvoices, setStoreInvoices] = useState([]);
  const [singleInvoice, setSingleInvoice] = useState({});
  const [updateInvoiceId, setUpdateInvoiceId] = useState("");


  // ## EXPENSE CATEGORY
  const [storeExpenseCategory, setStoreExpenseCategory] = useState([]);
  const [showExpenseCategoryButton, setShowExpenseCategoryButton] =
    useState(false);
  const [showExpenseCategoryForm, setShowExpenseCategoryForm] = useState(false);
  const [SingleExpenseCategory, setSingleExpenseCategory] = useState({});
  const [openExpensiveCategoryDetailPage, setOpenExpensiveCategoryDetailPage] =
    useState(false);
  const [singleExpenseUpdateId, setSingleExpenseUpdateId] = useState("");

  // ## PRODUCT CATEGORY
  const [storeProductCategory, setStoreProductCategory] = useState([]);
  const [showProductCategoryButton, setShowProductCategoryButton] =
    useState(false);
  const [showProductCategoryForm, setShowProductCategoryForm] = useState(false);
  const [SingleProductCategory, setSingleProductCategory] = useState({});
  const [openProductCategoryDetailPage, setOpenProductCategoryDetailPage] =
    useState(false);
  const [singleProductUpdateId, setSingleProductUpdateId] = useState("");

  // ## EXPENSE
  const [openExpenseForm, setOpenExpenseForm] = useState(false);
  const [showExpenseButton, setShowExpenseButton] = useState(false);
  const [storeExpense, setStoreExpense] = useState([]);
  const [expenseDetailShow, setExpenseDetailShow] = useState(false);
  const [singleExpense, setSingleExpense] = useState({});
  const [singleExpenseUpdatedId, setSingleExpenseUpdatedId] = useState("");

  // ## Product
  const [openProductForm, setOpenProductForm] = useState(false);
  const [showProductButton, setShowProductButton] = useState(false);
  const [storeProduct, setStoreProduct] = useState([]);
  const [productDetailShow, setProductDetailShow] = useState(false);
  const [singleProduct, setSingleProduct] = useState({});
  const [singleProductUpdatedId, setSingleProductUpdatedId] = useState("");

  // ## QUOTES FOR LEAD
const [storeLeadQuotes,setStoreLeadQuotes] = useState([])
const [singleLeadQuote,setSingleLeadQuote] = useState({})
const [updateLeadQuotesId,setUpdateLeadQuotesId] = useState("")


  // ### PEOPLE FORM API ###

  // post

  const setPeople = async (val) => {
    try {
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-people`
      );
      setStorePeopleData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const deletePeople = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:1337/api/form/delete-people/${id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-people/${people._id}`
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
      const result = await axios.put(
        `http://localhost:1337/api/form/update-people/${updateId}`,
        {
          firstName: value.firstName,
          lastName: value.lastName,
          company: value.company,
          country: value.country,
          phone: value.phone,
          email: value.email,
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
    const result = await axios.get(
      `http://localhost:1337/api/form/get-single-people/${id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-company`
      );
      setStoreCompanyData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const deleteCompany = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:1337/api/form/delete-company/${id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-company/${company._id}`
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
      const result = await axios.put(
        `http://localhost:1337/api/form/update-company/${cmpUpdateId}`,
        {
          name: val.name,
          contact: val.contact,
          website: val.website,

          country: val.country,
          phone: val.phone,
          email: val.email,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // detailpageInfo
  const getCompanyDetail = async (id) => {
    const result = await axios.get(
      `http://localhost:1337/api/form/get-single-company/${id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-lead`
      );
      setStoreLeadData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const deleteLead = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:1337/api/form/delete-lead/${id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-lead/${Lead._id}`
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
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // detailpageInfo
  const getLeadDetail = async (id) => {
    const result = await axios.get(
      `http://localhost:1337/api/form/get-single-lead/${id}`
    );
    setLeadDetail(result.data);
    console.log(result.data);
    setOpenLeadDetail(true);
  };

  //           #########################################################################################          //

  // CUSTOMER FORM API

  const storeSingleCustomerCompany = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-company/${getSingleCompanyId}`
      );
      data
        ? await axios.post(`http://localhost:1337/api/form/post-customer`, {
            name: data.name,
            country: data.country,
            phone: data.phone,
            email: data.email,
            type: data.type,
          })
        : console.log("null");
    } catch (error) {
      console.log("Error fetching company data:", error);
    }
  };
  const storeSingleCustomerPeople = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-people/${getSinglePeopleId}`
      );
      data
        ? await axios.post(`http://localhost:1337/api/form/post-customer`, {
            name: data.firstName + data.lastName,
            country: data.country,
            phone: data.phone,
            email: data.email,
            type: data.type,
          })
        : console.log("null");
    } catch (error) {
      console.log(error);
    }
  };

  // ## GET DATA
  const getCustomerData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-customer`
      );
      setStoreCustomerData(data.message);
      console.log("customer data", storeCustomerData);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCustomer = async (customerId) => {
    try {
      const result = await axios.delete(
        `http://localhost:1337/api/form/delete-customer/${customerId}`
      );
      getCustomerData();
      console.log("Customer delete successFully!", result);
    } catch (error) {
      console.log(error);
    }
  };

  //  UPDATE

  const getSingleCustomer = async (people) => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-customer/${people.name}`
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
      const result = await axios.post(
        `http://localhost:1337/api/form/post-invoice`,
        invoice
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-invoice`
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
      await axios.delete(
        `http://localhost:1337/api/form/delete-invoice/${invoiceId}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-invoice/${invoice._id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-invoice/${invoice}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-invoice/${invoice._id}`
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
      const result = await axios.put(
        `http://localhost:1337/api/form/update-invoice/${id}`,
        {
          paidAmount: value.amount,
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-expensecategory`
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
      const result = await axios.post(
        `http://localhost:1337/api/form/post-expensecategory`,
        expensecategory
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
      await axios.delete(
        `http://localhost:1337/api/form/delete-expensecategory/${Id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-expensecategory/${ExpenseCategory._id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-expensecategory/${ExpenseCategory._id}`
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
      const result = await axios.put(
        `http://localhost:1337/api/form/update-expensecategory/${singleExpenseUpdateId}`,
        {
          name: val.name,
          description: val.description,
          color: val.color,
          enabled: val.enabled,
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-productcategory`
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
      const result = await axios.post(
        `http://localhost:1337/api/form/post-productcategory`,
        Productcategory
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
      await axios.delete(
        `http://localhost:1337/api/form/delete-productcategory/${Id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-productcategory/${ProductCategory._id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-productcategory/${ProductCategory._id}`
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
      const result = await axios.put(
        `http://localhost:1337/api/form/update-productcategory/${singleProductUpdateId}`,
        {
          name: val.name,
          description: val.description,
          color: val.color,
          enabled: val.enabled,
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
      const result = await axios.post(
        `http://localhost:1337/api/form/post-expense`,
        expense
      );
      console.log("Expense submitted", result);
    } catch (error) {
      console.log(error);
    }
  };

  //   ## GET EXPENSE
  const getExpense = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-expense`
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
      await axios.delete(`http://localhost:1337/api/form/delete-expense/${Id}`);
      console.log("Expense deleted successfully!");
      getExpense();
    } catch (error) {
      console.log(error);
    }
  };

  // ### UPDATE

  const getSingleExpense = async (Expense) => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-expense/${Expense._id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-expense/${Expense._id}`
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
      const result = await axios.put(
        `http://localhost:1337/api/form/update-expense/${singleExpenseUpdatedId}`,
        {
          name: val.name,
          expensecategory: val.expensecategory,
          currency: val.currency,
          total: val.total,
          description: val.description,
          ref: val.ref,
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
      const result = await axios.post(
        `http://localhost:1337/api/form/post-product`,
        Product
      );
      console.log("Product submitted", result);
    } catch (error) {
      console.log(error);
    }
  };

  //   ## GET Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-product`
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
      await axios.delete(`http://localhost:1337/api/form/delete-product/${Id}`);
      console.log("Product deleted successfully!");
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  // ### UPDATE

  const getSingleProduct = async (Product) => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-product/${Product._id}`
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
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-single-product/${Product._id}`
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
      const result = await axios.put(
        `http://localhost:1337/api/form/update-product/${singleProductUpdatedId}`,
        {
          name: val.name,
          Productcategory: val.Productcategory,
          currency: val.currency,
          total: val.total,
          description: val.description,
          ref: val.ref,
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
      const result = await axios.post(
        `http://localhost:1337/api/form/post-quote-lead`,
        LeadQuotes
      );
      console.log("LeadQuotes submitted", result);
      getLeadQuotes()
      navigate("/quote-lead");
    } catch (error) {
      console.log(error);
    }
  };

   // GET
   const getLeadQuotes = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1337/api/form/get-quote-lead`
      );
      setStoreLeadQuotes(data);
      console.log("LeadQuotes", storeLeadQuotes);
    } catch (error) {
      console.log(error);
    }
  };

   //  DELETE
   const deleteLeadQuotes = async (LeadQuotes) => {
    try {
      await axios.delete(
        `http://localhost:1337/api/form/delete-lead-quotes/${LeadQuotes}`
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
    const { data } = await axios.get(
      `http://localhost:1337/api/form/get-single-quote-lead/${LeadQuotes._id}`
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
  }, []);

  // ######################################################################################################################################

  const contextValue = {

    mode,setMode,
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

    // #######################

    // QUOTE FOR LEAD

    setLeadQuotes,
    storeLeadQuotes,
    deleteLeadQuotes,
    getSingleLeadQuotes,
    updateLeadQuotes,
    singleLeadQuote
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
