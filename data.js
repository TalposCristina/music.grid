const URL = "https://randomuser.me/api/";

async function getRandomPicture()
{
const result = await fetch(URL);
const data = (await result).json();
console.log(data);
document.getElementById("person").setAttribute('src', data.message);
}

async function getRandomName()
{
    const result = await fetch(URL);
    const data = (await result).json();
    console.log(data);

}

document.getElementById('fetch').addEventListener('click', getRandomPicture);
document.getElementById('fetch').addEventListener('click', getRandomName);