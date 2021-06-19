const form = document.getElementById("form-submit");
const copy_btn = document.getElementById("copy");

function setStorage(data) {
  const lsData = localStorage.getItem("url-shortner-data");
  let links;
  if (lsData == null) {
    links = [];
  } else {
    links = JSON.parse(lsData);
  }
  links.push({
    url: data.result.url,
    link: "http://localhost:/5000/" + data.result.link,
  });
  localStorage.setItem("url-shortner-data", JSON.stringify(links));
}
function showData() {
  const table = document.getElementById("table-body");
  const links = JSON.parse(localStorage.getItem("url-shortner-data"));
  console.log(links);
  if(!links){
    return;
  }
  for (let i = 0; i < links.length; i++) {
    const tr = document.createElement("tr");
    const data_to_append = `
    
  <td scope="col" class="long">
    ${links[i].url}
  </td>
  <td scope="col" class="shortned" >
  <a id="link"  href="${links[i].link}">${links[i].link}</a>
  </td>
  <td scope="col" >
  <button id="copy">copy</button>
  </td>
    
  `;
    tr.innerHTML = data_to_append;
    table.prepend(tr);
  }
}
(()=>{
  showData();
})();
form.addEventListener("click", async (event) => {
  event.preventDefault();
  let re =
    /(http(s)?:\/\/.)?(ftp(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{0,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  //check if its valid url
  let url = document.getElementById("form-url").value;
  // const validity = document.getElementById("form-validity").value;
  const validity = "d";
  console.log(new Date(document.getElementById("form-cal").value));
  // console.log(re.test(url));
  if (!re.test(url)) {
    const error = document.getElementById("error");
    error.style.display = "inline-block";
    error.innerHTML = "INVALID URL";
  } else {
    console.log(url.slice(0, 7));
    console.log(url.slice(0, 8));
    if (!(url.slice(0, 7) !== "http://") && !(url.slice(0, 8) !== "https://")) {
      url = "http://" + url;
    }
    // else if (url.slice(0, 8) !== "https://") {
    //   url = "http://" + url;
    // }
    try {
      const result = await fetch("/postUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          validity: validity,
        }),
      });
      console.log(result);
      const data = await result.json();
      console.log(data);
      setStorage(data);
      showData();
      // window.location.href = "http://localhost:5000/";
      // const table = document.getElementById("table-body");
      // const tr = document.createElement("tr");
      // const data_to_append = `

      // <td scope="col" class="long">
      //   ${data.result.url}
      // </td>
      // <td scope="col" class="shortned" >
      // <a id="link"  href="http://localhost:5000/${data.result.key}">http://localhost:5000/${data.result.key}</a>
      // </td>
      // <td scope="col" >
      // <button id="copy">copy</button>
      // </td>

      // `;
      // tr.innerHTML = data_to_append;
      // table.prepend(tr);
    } catch (error) {
      console.log("index.js");
      console.log(error);
    }
  }
});
// copy_btn.addEventListener("click", () => {
//   const copyText = document.getElementById("link");
//   copyText.text.select();
//   copyText.setSelectionRange(0, 99999);
//   document.execCommand("copy");
//   // copy_btn.innerText = "copied";
//   // setTimeout(() => {
//   //   copy_btn.innerText = "copy";
//   // }, 2000);
// });
