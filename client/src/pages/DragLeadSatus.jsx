import DropArea from "@/components/DropArea";
import axios from "axios";
import { useEffect, useState } from "react";

const DragLeadSatus = () => {
  const [draftData, setDraftData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [negociationData, setNegociationData] = useState([]);
  const [wonData, setWonData] = useState([]);
  const [looseData, setLooseData] = useState([]);
  const [cancelledData, setCancelledData] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const [onHoldData, setOnHoldData] = useState([]);

  const draftApi = async () => {
    try {
      const { data } = await axios.get(
        `
        http://localhost:1337/api/form/get-status-lead?status=Draft
        `
      );
      setDraftData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const newApi = async () => {
    try {
      const { data } = await axios.get(
        `
        http://localhost:1337/api/form/get-status-lead?status=New
        `
      );
      setNewData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const negociationApi = async () => {
    try {
      const { data } = await axios.get(
        `
        http://localhost:1337/api/form/get-status-lead?status=In Negociation
        `
      );
      setNegociationData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const wonApi = async () => {
    try {
      const { data } = await axios.get(
        `
        http://localhost:1337/api/form/get-status-lead?status=Won
        `
      );
      setWonData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const looseApi = async () => {
    try {
      const { data } = await axios.get(`
        http://localhost:1337/api/form/get-status-lead?status=Loose
        `);
      setLooseData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const cancelledApi = async () => {
    try {
      const { data } = await axios.get(
        `
        http://localhost:1337/api/form/get-status-lead?status=Cancled
        `
      );
      setCancelledData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const assignedApi = async () => {
    try {
      const { data } = await axios.get(
        `
        http://localhost:1337/api/form/get-status-lead?status=Assigned
        `
      );
      setAssignedData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onHoldApi = async () => {
    try {
      const { data } = await axios.get(
        `
        http://localhost:1337/api/form/get-status-lead?status=On Hold
        `
      );
      setOnHoldData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    draftApi();
    newApi();
    negociationApi();
    wonApi();
    looseApi();
    cancelledApi();
    assignedApi();
    onHoldApi();
  }, []);

  const [activeCard, setActiveCard] = useState(null);
  return (
    <div className="w-full bg-black h-auto flex flex-wrap justify-center gap-2">
      <div className="card-1 border border-white w-[300px] h-[420px]">
        <h1 className="text-white text-center font-bold italic pt-2 underline">
          Draft
        </h1>
        <DropArea />
        <div className="flex gap-2 mt-4">
          {draftData?.length > 0 &&
            draftData.map((item, index) => (
              <div key={index}>
                <div
                  draggable
                  onDragStart={() => setActiveCard(item._id)}
                  onDragEnd={() => setActiveCard(null)}
                  className="text-center font-bold italic py-2 px-2 rounded-lg text-white bg-red-300 mt-1 "
                >
                  {item?.name}
                </div>
                <DropArea />
              </div>
            ))}
        </div>
      </div>
      <div className="card-1 border border-white w-[300px] h-[420px] px-2">
        <h1 className="text-white text-center font-bold italic pt-2 underline">
          New
        </h1>
        <DropArea />
        <div className="flex gap-2 mt-4">
          {newData?.length > 0 &&
            newData.map((item, index) => (
              <div key={index}>
                <div
                  draggable
                  onDragStart={() => setActiveCard(item._id)}
                  onDragEnd={() => setActiveCard(null)}
                  className="text-center font-bold italic py-2 px-2 rounded-lg text-white bg-red-300 mt-1 "
                >
                  {item?.name}
                </div>
                <DropArea />
              </div>
            ))}
        </div>
      </div>
      <div className="card-1 border border-white w-[300px] h-[420px]">
        <h1 className="text-white text-center font-bold italic pt-2 underline">
          In Negociation
        </h1>
        <DropArea />
        <div className="flex gap-2 mt-4">
          {negociationData?.length > 0 &&
            negociationData.map((item, index) => (
              <div key={index}>
                <div
                  draggable
                  onDragStart={() => setActiveCard(item._id)}
                  onDragEnd={() => setActiveCard(null)}
                  className="text-center font-bold italic py-2 px-2 rounded-lg text-white bg-red-300 mt-1 "
                >
                  {item?.name}
                </div>
                <DropArea />
              </div>
            ))}
        </div>
      </div>
      <div className="card-1 border border-white w-[300px] h-[420px]">
        <h1 className="text-white text-center font-bold italic pt-2 underline">
          Won
        </h1>
        <DropArea />
        <div className="flex gap-2 mt-4">
          {wonData?.length > 0 &&
            wonData.map((item, index) => (
              <div key={index}>
                <div
                  draggable
                  onDragStart={() => setActiveCard(item._id)}
                  onDragEnd={() => setActiveCard(null)}
                  className="text-center font-bold italic py-2 px-2 rounded-lg text-white bg-red-300 mt-1 "
                >
                  {item?.name}
                </div>
                <DropArea />
              </div>
            ))}
        </div>
      </div>
      <div className="card-1 border border-white w-[300px] h-[420px]">
        <h1 className="text-white text-center font-bold italic pt-2 underline">
          Loose
        </h1>
        <DropArea />
        <div className="flex gap-2 mt-4">
          {looseData?.length > 0 &&
            looseData.map((item, index) => (
              <div key={index}>
                <div
                  draggable
                  onDragStart={() => setActiveCard(item._id)}
                  onDragEnd={() => setActiveCard(null)}
                  className="text-center font-bold italic py-2 px-2 rounded-lg text-white bg-red-300 mt-1 "
                >
                  {item?.name}
                </div>
                <DropArea />
              </div>
            ))}
        </div>
      </div>
      <div className="card-1 border border-white w-[300px] h-[420px]">
        <h1 className="text-white text-center font-bold italic pt-2 underline">
          Canceled
        </h1>
        <DropArea />
        <div className="flex gap-2 mt-4">
          {cancelledData?.length > 0 &&
            cancelledData.map((item, index) => (
              <div key={index}>
                <div
                  draggable
                  onDragStart={() => setActiveCard(item._id)}
                  onDragEnd={() => setActiveCard(null)}
                  className="text-center font-bold italic py-2 px-2 rounded-lg text-white bg-red-300 mt-1 "
                >
                  {item?.name}
                </div>
                <DropArea />
              </div>
            ))}
        </div>
      </div>
      <div className="card-1 border border-white w-[300px] h-[420px]">
        <h1 className="text-white text-center font-bold italic pt-2 underline">
          Assigned
        </h1>
        <DropArea />
        <div className="flex gap-2 mt-4">
          {assignedData?.length > 0 &&
            assignedData.map((item, index) => (
              <div key={index}>
                <div
                  draggable
                  onDragStart={() => setActiveCard(item._id)}
                  onDragEnd={() => setActiveCard(null)}
                  className="text-center font-bold italic py-2 px-2 rounded-lg text-white bg-red-300 mt-1 "
                >
                  {item?.name}
                </div>
                <DropArea />
              </div>
            ))}
        </div>
      </div>
      <div className="card-1 border border-white w-[300px] h-[420px]">
        <h1 className="text-white text-center font-bold italic pt-2 underline">
          On Hold
        </h1>
        <DropArea />
        <div className="flex gap-2 mt-4">
          {onHoldData?.length > 0 &&
            onHoldData.map((item, index) => (
              <div key={index}>
                <div
                  draggable
                  onDragStart={() => setActiveCard(item._id)}
                  onDragEnd={() => setActiveCard(null)}
                  className="text-center font-bold italic py-2 px-2 rounded-lg text-white bg-red-300 mt-1 "
                >
                  {item?.name}
                </div>
                <DropArea />
              </div>
            ))}
        </div>
      </div>
      {activeCard ? (
        <h1 className="text-white">{activeCard}</h1>
      ) : (
        <h1 className="text-white">Seleect</h1>
      )}
    </div>
  );
};

export default DragLeadSatus;
