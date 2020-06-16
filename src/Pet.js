import React from "react";
import { Link } from "@reach/router";
// // export const Pet = ( { name, animal, breed } ) => {
// //   return React.createElement("div", {}, [
// //     React.createElement("h1", {}, name),
// //     React.createElement("h2", {}, animal),
// //     React.createElement("h2", {}, breed),
// //   ]);
// // };

// // export default function Pet({ name, animal, breed }) {
// //   return React.createElement("div", {}, [
// //     React.createElement("h1", {}, name),
// //     React.createElement("h2", {}, animal),
// //     React.createElement("h2", {}, breed),
// //   ]);
// // }
const Pet = (props) => {
  const { name, animal, breed, location, id, media } = props;

  let petImage;

  if (media == undefined || media.length == 0) {
    petImage = "http://placecorgi.com/300/300";
  } else {
    petImage = media[0].small;
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={petImage} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
