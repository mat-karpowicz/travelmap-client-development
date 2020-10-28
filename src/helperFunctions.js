export const getPlaces = async () => {
  const response = await fetch(
    "https://travelmap-server.herokuapp.com/api/places"
  );
  return response.json();
};

const savePlace = async (place) => {
  const response = await fetch(
    "https://travelmap-server.herokuapp.com/api/places",
    {
      method: "POST",
      body: JSON.stringify(place),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const checkIfCorrectData = async (lon, lat, setPlaces, places) => {
  const title = document.getElementById("title").value;
  const comment = document.getElementById("comment").value;
  const rating = document.getElementById("rating").value;
  const type = document.getElementById("type").value;
  const webURL = document.getElementById("web").value;
  const imgURL = document.getElementById("img").value;

  if (title.trim() === "") return alert("Title is needed");
  if (comment.trim() === "") return alert("Comment is needed");

  const objToSave = {
    title,
    comment,
    rating,
    type,
    url: webURL.trim() === "" ? null : webURL.trim(),
    img: imgURL.trim() === "" ? null : imgURL.trim(),
    longitude: lon,
    latitude: lat,
  };

  const response = await savePlace(objToSave);
  console.log(response);
  setPlaces([...places, response]);
};
