const names = [
  { name: "Tomas", id: "tomas" },
  { name: "Rasto", id: "rasto" },
  { name: "Patka", id: "patka" },
  { name: "Olinko", id: "olinko" },
  { name: "Hanka", id: "hanka" },
  { name: "Zuzka", id: "zuzka" },
  { name: "Marko", id: "marko" },
];

function handleSubmit() {
  const warning = document.getElementById("warning");
  const code = document.getElementById("code");

  const splitCode = code.value.split("-");
  const converetedCode = splitCode
    .map((number) => String.fromCharCode(number))
    .join("")
    .toLowerCase();

  console.log(converetedCode);
  const myIndex = names.findIndex(({ id }) => id === converetedCode);

  console.log(myIndex);
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
}
