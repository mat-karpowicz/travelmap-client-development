import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getPlaces, checkIfCorrectData } from "./helperFunctions";
import Legend from "./components/Legend";

import food from "./assets/food.png";
import history from "./assets/history.png";
import view from "./assets/view.png";

const obj = {
  food,
  history,
  view,
};

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 50.414549,
    longitude: 18.130087,
    zoom: 4,
  });
  const [places, setPlaces] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [showAddPopup, setShowAddPopup] = useState({});
  const getPlacesList = async () => {
    const places = await getPlaces();
    setPlaces(places);
  };

  useEffect(() => {
    getPlacesList();
  }, []);

  return (
    <>
      <Legend />
      <ReactMapGL
        {...viewport}
        mapStyle={process.env.REACT_APP_MAP_STYLE}
        doubleClickZoom={false}
        onDblClick={({ lngLat }) => {
          setShowPopup({});
          setShowAddPopup({
            display: true,
            longitude: lngLat[0],
            latitude: lngLat[1],
          });
        }}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {places.map((place) => {
          return (
            <React.Fragment key={place._id}>
              <Marker
                latitude={place.latitude}
                longitude={place.longitude}
                className={place.type}
              >
                <img
                  src={obj[`${place.type}`]}
                  style={{
                    height: `${4 * viewport.zoom}px`,
                    width: `${3 * viewport.zoom}px`,
                  }}
                  onClick={() => {
                    setShowAddPopup({});
                    setShowPopup({ [place._id]: true });
                  }}
                  className="marker"
                  alt="marker"
                />
              </Marker>

              {showPopup[place._id] ? (
                <Popup
                  latitude={place.latitude}
                  longitude={place.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => {
                    setShowPopup({});
                  }}
                  anchor="top"
                >
                  <div className="popup">
                    <h2>{place.title}</h2>
                    <h4>{place.comment}</h4>
                    {place.img === null ? (
                      <h4>No photo yet</h4>
                    ) : (
                      <img className="popup-img" src={place.img} alt="img" />
                    )}
                    {place.url === null ? null : (
                      <a href={place.url}>More info here</a>
                    )}
                  </div>
                </Popup>
              ) : null}
            </React.Fragment>
          );
        })}
        {showAddPopup.display ? (
          <Popup
            latitude={showAddPopup.latitude}
            longitude={showAddPopup.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowAddPopup({})}
            anchor="top"
          >
            <div className="popup">
              <form className="popup-form">
                <label htmlFor="title">Title</label>
                <input id="title" type="text" />
                <label htmlFor="comment">Comment</label>
                <input id="comment" type="text" />
                <label htmlFor="rating">Rating</label>
                <select id="rating">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <label htmlFor="type">Type</label>
                <select id="type">
                  <option value="view">View</option>
                  <option value="food">Food</option>
                  <option value="history">History</option>
                </select>
                <label htmlFor="img">website</label>
                <input id="web" type="text" />
                <label htmlFor="img">IMG URL</label>
                <input id="img" type="text" />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    checkIfCorrectData(
                      showAddPopup.longitude,
                      showAddPopup.latitude,
                      setPlaces,
                      places
                    );
                  }}
                >
                  SAVE
                </button>
              </form>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </>
  );
}

export default App;
