const button = document.querySelector('#new-name');
const avatar = document.querySelector('.avatar');
const babyName = document.querySelector('.babyName');
const genderSpan = document.querySelector('.gender');

let isFetching = false;

async function getAdvice() {

  if (isFetching) return;

  isFetching = true;
  button.disabled = true;

  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  } finally {
    isFetching = false;
    setTimeout(() => (button.disabled = false), 500);
  }
}

async function updateAdvice() {
  const adviceData = await getAdvice();
  const { gender, name, picture } = adviceData.results[0];
  babyName.innerHTML = `"${name.first}"`;
  genderSpan.innerHTML = gender;
  handleGenderChange(gender);
  avatar.src = picture.large;
}

function handleGenderChange(gender) {
  const removeClass = gender === 'female' ? 'male' : 'female';
  const addClass = gender === 'female' ? 'female' : 'male';

  genderSpan.classList.remove(removeClass);
  genderSpan.classList.add(addClass);
}

button.addEventListener('click', updateAdvice);

updateAdvice();
