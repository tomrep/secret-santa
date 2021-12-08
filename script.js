// const names = [
//   { name: "Tomas", id: "tomas" },
//   { name: "Rasto", id: "rasto" },
//   { name: "Patka", id: "patka" },
//   { name: "Olinko", id: "olinko" },
//   { name: "Hanka", id: "hanka" },
//   { name: "Zuzka", id: "zuzka" },
//   { name: "Marko", id: "marko" },
// ];

function handleSubmit() {
  const warning = document.getElementById("warning");
  const code = document.getElementById("code");

  const splitCode = code.value.match(/.{1,2}/g);
  const converetedCode = splitCode
    .map((number) => String.fromCharCode(number))
    .join("")
    .toLowerCase();

  let openRequest = indexedDB.open("santa");

  openRequest.onsuccess = function () {
    const db = openRequest.result;
    const transaction = db.transaction("people", "readwrite");
    const people = transaction.objectStore("people");

    const request = people.getAll();
    request.onsuccess = function () {
      const names = request.result;
      const myIndex = request.result.findIndex(
        ({ id }) => id === converetedCode
      );

      if (myIndex > -1) {
        warning.classList = "hidden";
        const giftIndex = (myIndex + 4) % names.length;
        const { name } = names[giftIndex];

        const info = document.getElementById("info");
        info.classList = "";
        info.getElementsByTagName("span")[0].innerHTML = name;
      } else {
        code.value = "";
        warning.classList = "error";
      }
    };
    request.onerror = function () {
      console.log("Error", request.error);
    };
  };
}

function insertData() {
  const data = document.getElementById("new-person").value;

  let openRequest = indexedDB.open("santa");

  openRequest.onupgradeneeded = function () {
    const db = openRequest.result;
    if (!db.objectStoreNames.contains("people")) {
      console.log("Creating database");
      db.createObjectStore("people", { keyPath: "id" });
    }
  };

  openRequest.onsuccess = function () {
    const db = openRequest.result;
    const transaction = db.transaction("people", "readwrite");
    const people = transaction.objectStore("people");
    const id = data.toLowerCase();
    const newPerson = {
      id,
      name: id.slice(0, 1).toUpperCase() + id.slice(1),
    };
    const request = people.add(newPerson);
    request.onsuccess = function () {
      console.log("Person added to the store", request.result);
    };
    request.onerror = function () {
      console.log("Error", request.error);
    };
  };
}
