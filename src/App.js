import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, deleteDoc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@heroicons/react/solid'
import Modal from "./modal";

function App() {

  const collref = collection(db, "customersData")

  const [customerName, setCustomerName] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [customersData, setCustomersData] = useState([]);
  const [updatedCustomerName, setUpdatedCustomerName] = useState("");
  const [updatedCustomerPassword, setUpdatedCustomerPassword] = useState("");
  const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");
  const [order, setorder] = useState("ASC")
  const [ordericon, setordericon] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setcurrentPage] = useState(0)
  const [modalOpen, setModalOpen] = useState(false);



  function Example() {
    return (
      <div className=" mx-auto max-w-4xl py-3  justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <a
            onClick={prevPage}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            onClick={nextPage}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{currentPage + 1}</span> to <span className="font-medium">{currentPage + 3}</span> of{' '}
              <span className="font-medium">{customersData.length}</span> result
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <a
                onClick={prevPage}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                onClick={nextPage}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    )
  }



  useEffect(() => {
    onSnapshot(collref, (snapshot) => {
      setCustomersData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })).sort((a, b) => b.data.date.timestamp - a.data.date.timestamp)
      );
    });
    console.log({ customersData })
  }, [])

  const filtered = () => {
    if (searchTerm.length === 0)
      return customersData.slice(currentPage, currentPage + 3)
    const filter = customersData.filter(val => val.data.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
    return filter.slice(currentPage, currentPage + 3)
  }

  const nextPage = () => {
    if (customersData.filter(val => val.data.name.toLowerCase().startsWith(searchTerm.toLowerCase())).length > currentPage + 3)
      setcurrentPage(currentPage + 3)

  }
  const prevPage = () => {
    if (currentPage > 0) setcurrentPage(currentPage - 3)
  }



  const submit = (e) => {
    e.preventDefault();

    addDoc(collref, {
      name: customerName,
      password: customerPassword,
      date: { timestamp: serverTimestamp(), datedisplay: Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.now()) }

    });

    setCustomerName("");
    setCustomerPassword("");
  };

  const updateData = (e) => {
    e.preventDefault();
    const docRef = doc(collref, dataIdToBeUpdated);
    updateDoc(docRef, {
      name: updatedCustomerName,
      password: updatedCustomerPassword,
      date: { timestamp: serverTimestamp(), datedisplay: Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.now()) }
    })

    setUpdatedCustomerPassword("");
    setUpdatedCustomerName("");
    setDataIdToBeUpdated("");
  };

  const deleteData = (id) => {
    deleteDoc(doc(collref, id))
  };



  const sorting = () => {
    if (order === "ASC") {
      const sorted = [...customersData].sort((a, b) =>
        a.data.name.toLowerCase() > b.data.name.toLowerCase() ? 1 : -1)
      setCustomersData(sorted)
      setorder("DSC")
      setordericon("▲")
    }
    if (order === "DSC") {
      const sorted = [...customersData].sort((a, b) =>
        a.data.name.toLowerCase() < b.data.name.toLowerCase() ? 1 : -1)
      setCustomersData(sorted)
      setorder("ASC")
      setordericon("▼")
    }
  }



  return (
    <div >
      {!dataIdToBeUpdated ? (
        <div class="border border-red-900">
          <input
            type="text"
            placeholder="Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            value={customerPassword}
            onChange={(e) => setCustomerPassword(e.target.value)}
          />
          <button onClick={submit}>Submit</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={updatedCustomerName}
            onChange={(e) => setUpdatedCustomerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            value={updatedCustomerPassword}
            onChange={(e) => setUpdatedCustomerPassword(e.target.value)}
          />
          <button onClick={updateData}>Update</button>
        </div>
      )}


      <div>
        <div>
          <input class="text-sm text-white bg-gray-900 rounded-md pl-5 focus:outline-none focus:bg-white focus:text-gray-900"
            type="text rounded"
            placeholder="search..."
            onChange={(e) => { setSearchTerm(e.target.value) }}>
          </input>
        </div>
        <table class='content-center max-w-4xl w-full rounded bg-white divide-y overflow-hidden'>
          <thead class="bg-gray-900">
            <tr class="text-white text-left">
              <th onClick={() => sorting()} class="font-semibold text-sm uppercase px-6 py-4">Name	&nbsp; {ordericon}</th>
              <th class="font-semibold text-sm uppercase px-6 py-4 text-center">Última modificación</th>
              <th class="font-semibold text-sm uppercase px-6 py-4 text-center">Update</th>
              <th class="font-semibold text-sm uppercase px-6 py-4 text-center">Delete</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 ">

            {filtered()?.map(({ id, data }) => (
              <tr key={id} class="hover:bg-gray-50">
                <td class="px-6 py-4">{data.name}</td>
                <td class="px-6 py-4 text-center">{data.date.datedisplay}</td>
                <td class="px-6 py-4 text-center">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={() => {
                      setDataIdToBeUpdated(id);
                      setUpdatedCustomerPassword(data.password);
                      setUpdatedCustomerName(data.name);
                    }}
                  >
                    Update
                  </button >
                </td>
                <td class="px-6 py-4 text-center">
                  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                    onClick={() => {
                      deleteData(id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Example />
        <div className="App">
          <h1>Hey, click on the button to open the modal.</h1>
          <button
            className="openModalBtn"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Open
          </button>

          {modalOpen && <Modal setOpenModal={setModalOpen} />}
        </div>
      </div>
    </div>
  );
}

export default App;
