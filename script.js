function ottieniTestoH1(event) {
  event.preventDefault();

  const url = document.getElementById("urlInput").value;

  axios
    .post("http://localhost:3000/text-content", { url: url })
    .then((response) => {
      const flattenedArray = [].concat(...response.data);
      const cleanedArray = flattenedArray.map((item) =>
        typeof item === "string" ? item.trim() : ""
      );
      const validStrings = cleanedArray.filter((item) => item !== "");
      const firstResult = validStrings.join(", ");
      console.log(firstResult);
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
}

document.getElementById("urlForm").addEventListener("submit", ottieniTestoH1);
