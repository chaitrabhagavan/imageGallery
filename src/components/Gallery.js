import React from "react";
function Gallery(props) {
  const url = "https://live.staticflickr.com/";
  return (
    <div className="gallery">
      {props.photos.map((photo,key) => {
        let pic = photo.photo;
        return (
          <div key={pic.title._content+key}>
            <img
              className="image"
              src={`${url}${pic.server}/${pic.id}_${pic.secret}.jpg`}
              alt={`${pic.title._content}`}
            />
            <h5>{pic.title._content}</h5>
          </div>
        );
      })}
    </div>
  );
}

export default Gallery;
