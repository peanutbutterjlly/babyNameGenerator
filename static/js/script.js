const button = document.querySelector('#new-name');
const avatar = document.querySelector('.avatar');
const babyName = document.querySelector('.babyName');
const genderSpan = document.querySelector('.gender');

let isFetching = false;

/**
 * Asynchronously fetches advice from a random user API.
 *
 * @return {Promise<Object|Error>} A promise that resolves with the fetched data
 * or rejects with an error.
 */
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

/**
 * Asynchronously updates the advice data and updates the DOM elements.
 *
 * @return {Promise<void>} A Promise that resolves when the function completes.
 */
async function updateAdvice() {
  const adviceData = await getAdvice();
  const { gender, name, picture } = adviceData.results[0];

  babyName.innerHTML = `"${name.first}"`;
  genderSpan.innerHTML = gender;
  handleGenderChange(gender);
  avatar.src = picture.large;
}

/**
 * Updates genderSpan class to match the gender parameter.
 *
 * @param {string} gender - The gender to update the class to.
 * @return {void} This function does not return anything.
 */
function handleGenderChange(gender) {
  const removeClass = gender === 'female' ? 'male' : 'female';
  const addClass = gender === 'female' ? 'female' : 'male';

  genderSpan.classList.remove(removeClass);
  genderSpan.classList.add(addClass);
}

button.addEventListener('click', updateAdvice);

updateAdvice();
