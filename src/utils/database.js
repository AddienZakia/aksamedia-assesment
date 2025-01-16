// db name: admin-db (localstorage)
import { DataProducts } from "../constants/DataProducts";

function GetDatabase() {
  const data = localStorage.getItem("admin-db");

  if (data) {
    return JSON.parse(data);
  } else {
    const loadData = JSON.stringify(DataProducts);

    localStorage.setItem("admin-db", loadData);
    return DataProducts;
  }
}

function AddDatabase(db, data) {
  const newData = [...db, { ...data, id: crypto.randomUUID() }];

  localStorage.setItem("admin-db", JSON.stringify(newData));
}

function RemoveDatabase(db, id) {
  const findData = db.filter((x) => x.id !== id);

  localStorage.setItem("admin-db", JSON.stringify(findData));
}

function UpdateDatabase(db, id, data) {
  const findData = db.map((x) => {
    return x.id === id ? data : x;
  });

  localStorage.setItem("admin-db", JSON.stringify(findData));
}

export { GetDatabase, AddDatabase, RemoveDatabase, UpdateDatabase };
