const form = document.getElementById("form-submit");


async function  setStorage(data) {
  const lsData = localStorage.getItem("url-shortner-data");
  let links;
  if (lsData == null) {
    links = [];
  } else {
    links = JSON.parse(lsData);
  }
  console.log("SETSTORAGE unpushed link ",links);
  links.push({
    url: data.url,
    link: data.link,
    expireAt:data.expireAt,
    key:data.key
  });
  console.log("SETSTORAGE pushed link ",links);
  console.log(JSON.stringify(links));
  // console.log(JSON.parse(links));
  localStorage.setItem("url-shortner-data", await JSON.stringify(links));
  localStorage.setItem("checking",true);
}
async function showData() {
  const table = document.getElementById("table-body");
  table.innerHTML=``;
  const links = JSON.parse(await localStorage.getItem("url-shortner-data"));
  console.log("SHOWDATA parsed link ",links);
  if(!links){
    console.log("RETURN");
    return;
  }
  // const filtered=links.filter((a)=>{
  //     return new Date().getTime()<new Date(a.expireAt).getTime()
  // });
  const filtered=links;
  console.log("SHOWDATA FILTERED ",filtered);
  // localStorage.setItem("url-shortner-data",JSON.stringify(filtered))
  for (let i = 0; i < filtered.length; i++) {
    const tr = document.createElement("tr");
    const data_to_append = `
    
  <td scope="col" class="long">
    ${filtered[i].url}
  </td>
  <td scope="col" class="shortned" >
  <a id="link" target="_blank"  href="${filtered[i].link}">${filtered[i].link}</a>
  </td>
  <td scope="col" class="btn-copy">
  <button class="copy ${filtered[i].key}">copy</button>
  </td>
    
  `;
    tr.innerHTML = data_to_append;
    table.prepend(tr);
    const copy_btn = document.getElementsByClassName(`copy ${filtered[i].key}`)[0];
    console.log(copy_btn);
    copy_btn.addEventListener("click", async () => {
    
      const something=copy_btn.parentNode.parentNode.children[1].children[0].getAttribute("href");
      
      console.log(something);
     
      await navigator.clipboard.writeText(something);
      copy_btn.innerText = "copied!!";
      setTimeout(() => {
        copy_btn.innerText = "copy";
      }, 500);
    });
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
  let url = document.getElementById("form-url").value.trim();
  const validity = new Date(document.getElementById("form-cal").value);


  if (!re.test(url)) {
    const error = document.getElementById("error");
    error.style.display = "inline-block";
    error.innerHTML = "INVALID URL";
  } else {
    
    if (!(url.slice(0, 7).toLowerCase() !== "http://") && !(url.slice(0, 8).toLowerCase() !== "https://")) {
      url = "http://" + url;
    }else if(url.slice(0,3).toLowerCase()==="www"){
      url = "http://" + url;
    }
    
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
      const  data = await result.json();
      const setData={
          url:data.result.url,
          link:"http://localhost:5000/"+data.result.key,
          expireAt:data.result.expireAt,
          key:data.result.key
      }
      console.log("DATABASE RESPONSE ",setData);
      await setStorage(setData);
      await showData();
      
    } catch (error) {
      console.log("index.js");
      console.log(error);
    }
  }
});

