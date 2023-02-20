const addButton = document.querySelector("#add");

const updatLSData = () => {
	const textAreaData = document.querySelectorAll("textarea");
	const notes = [];
	// console.log(textAreaData);
	textAreaData.forEach((note) => {
		return notes.push(note.value);
	});
	// console.log(notes);

	localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
	// creating new div using JS
	const note = document.createElement("div");
	// adding a class in that div
	note.classList.add("note");
	const htmlData = `
    <div class="operation">
	    <button class="edit">
			<i class="fa-solid fa-pen-to-square"></i>
    	</button>
		<button class="delete">
			<i class="fa-solid fa-trash-can"></i>
		</button>
	</div>
    <div class="sevedText ${text ? "" : "hidden"}"> </div>
	<textarea class="${text ? "hidden" : ""}"></textarea>
	
    `;

	note.insertAdjacentHTML("afterbegin", htmlData);
	// console.log(note);

	// getting the Referances
	const editButton = note.querySelector(".edit");
	const deleteButton = note.querySelector(".delete");
	const mainDiv = note.querySelector(".sevedText");
	const textarea = note.querySelector("textarea");

	// Delete note
	deleteButton.addEventListener("click", () => {
		note.remove();
		updatLSData();
	});

	// toggle using edit button
	textarea.value = text;
	mainDiv.innerHTML = text;

	editButton.addEventListener("click", () => {
		mainDiv.classList.toggle("hidden");
		textarea.classList.toggle("hidden");
	});

	textarea.addEventListener("change", (event) => {
		const value = event.target.value;
		mainDiv.innerHTML = value;

		updatLSData();
	});

	document.body.appendChild(note);
};

// getting data back from localstorage
const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
	notes.forEach((note) => addNewNote(note));
}
addButton.addEventListener("click", () => addNewNote());
