import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

const ContextProvider = (props) => {
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState([]);
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

  // ## INVOICES
  const [showInvoiceButton, setShowInvoiceButton] = useState(false);
  const [storeInvoices, setStoreInvoices] = useState([]);
  const [singleInvoice, setSingleInvoice] = useState({});

  // ## EXPENSE CATEGORY
  const [storeExpenseCategory, setStoreExpenseCategory] = useState([]);
  const [showExpenseCategoryButton, setShowExpenseCategoryButton] =
    useState(false);
  const [showExpenseCategoryForm, setShowExpenseCategoryForm] = useState(false);
  const [SingleExpenseCategory, setSingleExpenseCategory] = useState({});
  const [openExpensiveCategoryDetailPage, setOpenExpensiveCategoryDetailPage] =
    useState(false);
 const [singleExpenseUpdateId,setSingleExpenseUpdateId] = useState("") 

  // ## PRODUCT CATEGORY
  const [storeProductCategory, setStoreProductCategory] = useState([]);
  const [showProductCategoryButton, setShowProductCategoryButton] =
    useState(false);
  const [showProductCategoryForm, setShowProductCategoryForm] = useState(false);
  const [SingleProductCategory, setSingleProductCategory] = useState({});
  const [openProductCategoryDetailPage, setOpenProductCategoryDetailPage] =
    useState(false);
 const [singleProductUpdateId,setSingleProductUpdateId] = useState("")   

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
      setShowExpenseCategoryButton(true)
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
      window.location.reload()
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
      setShowProductCategoryButton(true)
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
  }, []);

  // ######################################################################################################################################

  const contextValue = {
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
    storeLeadData,
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
    getSingleProductCategoryUpdate
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
