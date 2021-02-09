let capture;
let locationData;
const button = document.getElementById('submit');
const input = document.querySelector('.mood-input');
const coords = document.querySelector('.coords');
const locationSpinner = document.querySelector('.spinner');
const toast = document.querySelector(".toast");

function setup() {
  createCanvas(200, 200).parent("#video");
  capture = createCapture(VIDEO);
  capture.hide()
  capture.size(width, height);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(capture,width/2,height/2, width*1.3, height)
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(async position => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = long;
    locationSpinner.style.display = 'none';
    coords.style.display = 'block';
    button.disabled = false;
  })
} else {
  console.log('geo unavail')
}

function toggleToastMessage() {
  toast.style.display = 'block';
  setTimeout(function(){ toast.style.display = 'none'; }, 5000);
}

button.addEventListener('click', async event => {
  button.disabled = true;
  const mood = document.getElementById('mood').value;
  const last_img = get()
  const image64 = last_img.canvas.toDataURL()
  const data = { lat, long, mood, image64 };
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch('/api', options);
  const responseData = await response.json();
  document.getElementById('mood').value = '';
  button.disabled = false;
  toggleToastMessage();
})