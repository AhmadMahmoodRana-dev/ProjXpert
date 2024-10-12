import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
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
      setPersonDetail(data)
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
      setCompanyDetail(data)
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
    setLeadDetail(data)
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

  // ## GET DATA

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
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
