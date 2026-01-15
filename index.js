let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {document.body.classList.toggle("dark-mode");}

themeButton.addEventListener("click", toggleDarkMode);

const signNowButton = document.getElementById('sign-now-button');

const addSignature = (person) => {
  event.preventDefault();
  let newSignature = document.createElement('p');
  newSignature.textContent = `🖊 ${person.name} supports this cause.`;
  const signaturesSection = document.querySelector('.signatures');
  signaturesSection.appendChild(newSignature);
}

const validateForm = () => {

  let containsErrors = false;

  var petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    name: petitionInputs[0].value, // accesses and saves value of first input
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value,
  }

  for (let i = 0; i < petitionInputs.length; i++) {
    if (person.hometown.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }

  if (containsErrors == false) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
  
}

signNowButton.addEventListener('click', validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
};

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } 
    else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

const toggleModal = (person) => {
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('thanks-modal-content');
  
  modal.style.display = 'flex';
  intervalId = setInterval(scaleImage, 500)
  
  modalContent.textContent = `Thank you so much, ${person.name}!`;

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000)

}

let scaleFactor = 1;
let intervalId;
const modalImage = document.getElementById("modal-img")

const scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  }
  else {
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
}