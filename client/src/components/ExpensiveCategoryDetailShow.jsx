import { Context } from "@/context/Context";
"use client";
import { useContext } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import { Switch } from "./ui/switch";
const ExpensiveCategoryDetailShow = () => {
  const { SingleExpenseCategory, openExpensiveCategoryDetailPage,setOpenExpensiveCategoryDetailPage } =
    useContext(Context);
  return (
    <Dialog
      open={openExpensiveCategoryDetailPage}
      onClose={setOpenExpensiveCategoryDetailPage}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpenExpensiveCategoryDetailPage(!openExpensiveCategoryDetailPage)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <X aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>

              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl px-4">
                <h1 className="text-2xl  font-bold italic mt-[-1rem] underline">
                  Expensive Category DETAIL
                </h1>
                <hr className="border border-gray-300 mt-6" />
                <h1 className="mt-4 font-bold text-4xl italic text-gray-600">{`${SingleExpenseCategory?.name}`}</h1>
                <hr className="border border-gray-300 mt-6" />
                <div className="flex flex-col justify-around w-full h-[50%] mt-10">
                  <div className="flex  items-center gap-4">
                    <label className="block text-md font-bold italic text-gray-700 min-w-[100px] max-w-[100px]">
                      Name:
                    </label>
                    <p className=" text-lg font-bold italic text-gray-600">
                      {SingleExpenseCategory?.name}
                    </p>
                  </div>
                  <div className="flex  items-center gap-4">
                    <label className="block text-md font-bold italic text-gray-700 min-w-[100px] max-w-[100px]">
                      Description:
                    </label>
                    <p className=" text-lg font-bold italic text-gray-600">
                      {SingleExpenseCategory?.description}
                    </p>
                  </div>
                  <div className="flex  items-center gap-4">
                    <label className="block text-md font-bold italic text-gray-700 min-w-[100px] max-w-[100px]">
                      Color:
                    </label>
                    <p className=" text-lg font-bold italic text-gray-600">
                      {SingleExpenseCategory?.color || "Null"}
                    </p>
                  </div>
                  <div className="flex  items-center gap-4">
                    <label className="block text-md font-bold italic text-gray-700 min-w-[100px] max-w-[100px]">
                      Enabled:
                    </label>
                    <Switch
          checked={SingleExpenseCategory.enabled} 
          onCheckedChange={() => {} /* No action if it's already enabled */}
          disabled={SingleExpenseCategory.enabled} 
        />
                  </div>
                  
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ExpensiveCategoryDetailShow;
