let text = document.getElementById("theform").elements["inputText"];
let form = document.getElementById("theform");

form.addEventListener('submit', function (event) {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${text.value}`)
        .then(request => request.json())
        .then(pokemon => insertPokemon(pokemon))
        .catch(rejected => console.log(rejected))
});


function insertPokemon(pokemon){
    console.log("Running insert");
    // Basic variable attributes for pokemon
    let image_url = pokemon.sprites.front_default;
    let name = pokemon.name;
    let id = pokemon.id;
    let randomHeaderInt = Math.floor(Math.random() * 100);
    let randomImageInt = Math.floor(Math.random() * 100);

    // Header
    let header = document.createElement("h1");
    header.textContent = `${name} - ${id}`;
    header.setAttribute("id",`${randomHeaderInt}`)

    // Image 
    let image = document.createElement("img");
    image.setAttribute("src", image_url);
    image.setAttribute("alt", `front view of ${name}`);
    image.setAttribute("id",`${randomImageInt}`)

    // Update Form, button, text
    let updateForm = document.createElement("form");
    updateForm.setAttribute("id",Date.now().toString());
    // Event listener for updateForm
    updateForm.addEventListener('submit', function (event){
        event.preventDefault();
        console.log("Update");
        fetch(`https://pokeapi.co/api/v2/pokemon/${updateText.value}`)
            .then(request => request.json())
            .then(pokemon => {
                // Here, it gets the special ids generated randomly for this section's
                // image and header, then changes them using object methods
                let imgPlaceholder = document.getElementById(image.getAttribute("id"));
                imgPlaceholder.setAttribute("src",pokemon.sprites.front_default);
                imgPlaceholder.setAttribute("alt", `front view of ${pokemon.name}`);

                let headPlaceholder = document.getElementById(header.getAttribute("id"));
                headPlaceholder.textContent = `${pokemon.name} - ${pokemon.id}`;
            })
            .catch(rejected => console.log(rejected))
    })

    let updateButton = document.createElement("button");
    updateButton.setAttribute("name","updateButton");
    updateButton.textContent = "Update";

    let updateText = document.createElement("input");
    updateText.type = "text";
    updateText.name = "updateText";
    
    // Create styled div for all children, append to body
    let div = document.createElement("div");
    div.setAttribute("id","pokeball");
    div.setAttribute("class","pokeBall")
    if(document.body.childElementCount != 4) document.body.appendChild(div)
    
    // Add children
    document.getElementById("pokeball").appendChild(image);
    document.getElementById("pokeball").appendChild(header);
    document.getElementById("pokeball").appendChild(updateForm);
    document.getElementById(updateForm.getAttribute("id")).appendChild(updateText);
    document.getElementById(updateForm.getAttribute("id")).appendChild(updateButton);
    console.log(pokemon);
}