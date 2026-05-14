import React, { useState, type ChangeEvent } from "react";

import Portal from "../Portal/UserPortal";

interface CreatedData {
  title: string;
  description: string;
}
const CRUD: React.FC = () => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [provider, setProvider] = useState<CreatedData>({
    title: "",
    description: "",
  });
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!provider.title || !provider.description)
      return alert("Please fill all the fields");

    const response = await fetch(
      "https://vercel-crud-backhend.vercel.app/api/createdata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: provider.title,
          description: provider.description,
        }),
      },
    );

    const result = await response.json();
    console.log(result);
    if (result.success) {
      setIsPortalOpen(false);
    }
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setProvider({ ...provider, title: e.target.value });
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProvider({ ...provider, description: e.target.value });
  };

  return (
    <div>
      <div className=" flex flex-col justify-center   mx-auto p-4 md:p-0 mt-25  max-w-sm   ">
        <button
          onClick={() => setIsPortalOpen(true)}
          className="py-3 px-4 bg-red-700 max-w-40 mx-auto rounded-2xl text-white cursor-pointer"
        >
          + Add New Note
        </button>
        <Portal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)}>
          <div className="px-4 py-3 text-3xl text-white tracking-wider text-center">
            <h1>Your Note</h1>
          </div>
          <form onSubmit={handleOnSubmit}>
            <div className="px-3 py-4 flex flex-col space-y-2 text-xl ">
              <label className="block  font-bold md:text-base text-white ">
                Title :
              </label>

              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                outline-none transition duration-200 bg-white   "
                value={provider.title}
                onChange={handleTitle}
              />
            </div>
            <div className="px-3 py-4 flex flex-col space-y-2 ">
              <label className="block text-sm font-bold text-white md:text-base">
                Description :
              </label>

              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                outline-none transition duration-200 bg-white mb-10 min-h-40"
                value={provider.description}
                onChange={handleDescription}
              ></textarea>
              <div className=" text-white mx-auto  rounded-2xl">
                <button className="px-4 py-3 bg-red-600 w-full tracking-wider text-xl rounded-2xl cursor-pointer">
                  Create{" "}
                </button>
              </div>
            </div>
          </form>
        </Portal>
      </div>
    </div>
  );
};

export default CRUD;
