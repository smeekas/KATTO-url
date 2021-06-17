const form = document.getElementById("form-submit");

form.addEventListener("click", async (event) => {
  event.preventDefault();
  let re =
    /(http(s)?:\/\/.)?(ftp(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{0,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  //check if its valid url
  const url = document.getElementById("form-url").value;
  const validity = document.getElementById("form-validity").value;
  // console.log(re.test(url));
  if (!re.test(url)) {
    const error = document.getElementById("error");
    error.innerHTML = "INVALID URL";
  } else {
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
      // window.location.href = "http://localhost:5000/";
      document.getElementById("division").innerHTML = `${data.result.key}`;
    } catch (error) {
      console.log("index.js");
      console.log(error);
    }
  }
});
