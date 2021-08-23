
function loadEvent() {

	console.log("Frontend loaded");

	const rootElement = document.getElementById("root");

	rootElement.insertAdjacentHTML("beforeend", `

		<form id="form">

			<h1>Welcome</h1>

			<input name="firstName" class="inputField" type="text" autocomplete="off" placeholder="First Name"/>
			<input name="lastName" class="inputField" type="text" autocomplete="off" placeholder="Last Name"/>
			<input name="email" class="inputField" type="email" autocomplete="off" placeholder="E-mail address"/>
			<textarea name="message" class="inputField" autocomplete="off" placeholder="Message"></textarea>		
			<div id="droparea">
				<input id="userFile" type="file" multiple/> 
				<h2 id="dropzoneText"> Click & Select <br/> or <br/> Drop your file here </h2>
			</div>

			<button id="send" type="submit">Send</button>

		</form>

		<div class='box'>
			<div class='wave -one'></div>
			<div class='wave -two'></div>
			<div class='wave -three'></div>
		</div>
	`);

	const fileInput = document.getElementById("userFile");
	const dropzoneText = document.getElementById("dropzoneText")

	fileInput.addEventListener("change", fileAdded);

	// FILE ADDED FUNCTION

	function fileAdded(event) {

		let fileNames = [];

		for (let file of event.target.files) {
			fileNames.push(file.name)
		}

		dropzoneText.innerHTML = fileNames;
	};

	// SUBMIT FUNCTION

	function submitEvent(e) {

		e.preventDefault();

		const inputs = e.target.querySelectorAll(".inputField"), values = {}, files = [];

		// UPLOADING VALUES OBJECT WITH INPUT FIELD VALUES (a kulcsok az inputuk nevei, a valuek pedig az értékei)

		for (const input of inputs) {
			values[`${input.name}`] = input.value;
		};

		// UPLOADING FILES ARRAY WITH SELECTED FILES NAMES

		for (let file of fileInput.files) {
			files.push(file)
		}

		// CREATE FROMDATA TO USE IN FETCH BODY

		const formData = new FormData();

		formData.append('userJson', JSON.stringify(values));

		for (let i = 0; i < files.length; i++) {
			formData.append(files[i].name, files[i])
		}

		// FETCH

		fetch('/', {
			method: 'Post',
			/* headers: {
					'Content-Type': 'multipart/form-data' 	--> nincs rá szükség, automatikuan kezeli
			},*/
			body: formData
		})
			.then(response => response.text())
			.then(data => console.log(data));
	};

	window.addEventListener("submit", submitEvent);

};

window.addEventListener("load", loadEvent);