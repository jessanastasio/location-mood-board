getData();
async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  const listContainer = document.querySelector('.list-container');
  
  if (data.length < 1) {
    listContainer.textContent = 'No moods inputted yet!';
  }

  for (item of data) {
    const parent = document.createElement('div');
    parent.className = 'list-item';
    const mood = document.createElement('div');
    const geo = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');

    date.textContent = new Date(item.timestamp).toLocaleString();
    mood.textContent = `mood: ${item.mood}`;
    geo.textContent = `${item.lat}°, ${item.long}°`;
    geo.className = 'geo';
    image.src = item.image64;

    parent.append(image, mood, geo, date);
    listContainer.append(parent);
  }
}
