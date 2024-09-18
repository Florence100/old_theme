function cutString (str, n) {
	const symb = '...';
	const punctuationMarks = ['.', ',', '!', '?', ':', ';', '-'];
	let result;

	if (str.length > n - symb.length) {
	
		let lastSimbol = str.substr(0, n - symb.length)[n - symb.length - 1];
		let penultimateSimbol = str.substr(0, n - symb.length)[n - symb.length - 2];

		if ((punctuationMarks.includes(penultimateSimbol)) || lastSimbol !== ' ')  {
			n = n - 1;
			return cutString (str, n);
		} else {
			result = str.substr(0, n - 1 - symb.length) + symb;
		}
		return result;
	} else {
		result = str;
		return result;
	}
}

function textHidden () {
	const productDescriptions = document.querySelectorAll('.Products .Description');

	for (let i = 0; i < productDescriptions.length; i++) {
		let stringWithoutSpaces = productDescriptions[i].textContent.replace(/\s+/g, ' ').trim();
		let cutText = cutString(stringWithoutSpaces, 65);
		productDescriptions[i].innerHTML = cutText + ' <a href="#" class="ReadMore">[read more]</a>';
	}

	const aboutDescription = document.querySelector('.About .Description');
	const stringWithoutSpaces = aboutDescription.textContent.replace(/\s+/g, ' ').trim();
	const cutText = cutString(stringWithoutSpaces, 300);
	aboutDescription.innerHTML = cutText + ' <a href="#" class="ReadMore">[read more]</a>';

	const eventDescriptions = document.querySelectorAll('.Event .Description');

	for (let i = 0; i < eventDescriptions.length; i++) {
		let stringWithoutSpaces = eventDescriptions[i].textContent.replace(/\s+/g, ' ').trim();
		let cutText = cutString(stringWithoutSpaces, 120);
		eventDescriptions[i].innerHTML = cutText;
	}
}

textHidden ();

//SubmitBox
SubmitBox.init();


//Burger Menu
const burgerMenu = document.querySelector('.BurgerMenu');
const burgerButton = document.querySelector('.BurgerMenu button');
burgerButton.addEventListener('click', burgerButtonToggle);

function burgerButtonToggle() {
	burgerMenu.classList.toggle('Opened');

	const menuItems = burgerMenu.querySelectorAll('li');
	menuItems.forEach((menuItem) => {
		menuItem.addEventListener('click', burgerItemToggle);
	})

	if (burgerMenu.classList.contains('Opened')) {
		document.addEventListener('click', documentClickToggle);
	}
}

function burgerItemToggle() {
	burgerMenuClose();
}

function documentClickToggle(e) {
	if (!burgerMenu.contains(e.target)) {
		burgerMenuClose();
	}
}

function burgerMenuClose() {
	burgerMenu.classList.remove('Opened');
	document.removeEventListener('click', documentClickToggle);
}