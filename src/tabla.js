import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, deleteDoc, onSnapshot, updateDoc, connectFirestoreEmulator } from "firebase/firestore";
import { db } from "./firebase";


export default function App1() {

  const employees = [
    {id: 4, name: 'Dean', country: 'Denmark'},
    {id: 3, name: 'Carl', country: 'Canada'},
    {id: 2, name: 'Bob', country: 'Belgium'},
    {id: 1, name: 'Alice', country: 'Austria'},
    {id: 5, name: 'Ethan', country: 'Egypt'},
  ];
  //console.log("data",employees)

  const collref = collection(db, "customersData")
  const [customersData, setCustomersData] = useState([]);

  useEffect(() => {
    onSnapshot(collref, (snapshot) => {
      setCustomersData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    //console.log("data1",customersData)
  }, [])
  console.log(customersData)

  // 👇️ sort by Numeric property ASCENDING (1 - 100)
  const numAscending = [...employees].sort((a, b) => a.id - b.id);
  //console.log(numAscending);

  // 👇️ sort by Numeric property DESCENDING (100 - 1)
  const numDescending = [...employees].sort((a, b) => b.id - a.id);
  //console.log(numDescending);

  // 👇️ sort by String property ASCENDING (A - Z)
  const strAscending = [...customersData].sort((a, b) =>
    a.data.name.toLowerCase() > b.data.name.toLowerCase() ? 1 : -1,
  );
  console.log(strAscending);

  // 👇️ sort by String property DESCENDING (Z - A)
  const strDescending = [...employees].sort((a, b) =>
    a.name > b.name ? -1 : 1,
  );
  //console.log(strDescending);

  return (
    <div>
      {numAscending.map(employee => {
        return (
          <div key={employee.id}>
            <h2>id: {employee.id}</h2>
            <h2>name: {employee.name}</h2>
            <h2>country: {employee.country}</h2>

            <hr />
          </div>
        );
      })}
    </div>
  );
}
