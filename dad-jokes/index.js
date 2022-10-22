const jokes = document.querySelector("#jokes");
const button = document.querySelector("button");
const getDadJokes = async () => {
  try {
    const config = { headers: { Accept: "application/json" } };
    const res = await axios.get(`https://icanhazdadjoke.com`, config);
    return res.data.joke;
  } catch (err) {
    return "NO JOKES AVAILABLE! SORRY :(";
  }
};

const addNewJoke = async () => {
  const jokeText = await getDadJokes();
  console.log(jokeText);
  const newLI = document.createElement("LI");
  newLI.classList.add("list-group-item", "list-group-item-danger");
  newLI.append(jokeText);
  jokes.append(newLI);
};
button.addEventListener("click", addNewJoke);
