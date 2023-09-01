// get elements

// functions
function handleKeyDown(e) {
  const userInput = document.querySelector("input");
  const word = userInput.value;
  const enter = "Enter";
  // exeptions
  if (e.key !== enter) {
    return;
  } else if (word === "") {
    return;
  } else {
    // if input is not '' and Enter key is pressed
    e.preventDefault();
    getData(word);
  }
}

async function getData(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    const definition = data[0].meanings[0].definitions[0].definition;
    const audioSample = data[0].phonetics[0].audio;
    document.querySelector("audio").src = `${audioSample}`;
    document.querySelector("audio").classList.remove("hidden");
    document.querySelector(".word-info").classList.remove("hidden");
    document.querySelector("#title").textContent = word;
    document.querySelector("#definition").textContent = definition;
    document.querySelector("#suggestion").classList.add("hidden");
    document.querySelector("input").value = word;
  } catch (err) {
    console.error(err);
    document.querySelector(".word-info").classList.remove("hidden");
    document.querySelector("#title").textContent = word;
    document.querySelector("#definition").textContent = "N/A";
    document.querySelector("#suggestion").classList.add("hidden");
    document.querySelector("input").value = word;
    document.querySelector("audio").classList.add("hidden");
  }
}

// event listeners
document.addEventListener("keydown", handleKeyDown);
