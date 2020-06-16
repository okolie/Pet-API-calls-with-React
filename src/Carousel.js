import React from "react";

class Carousel extends React.Component {
  //to use this yet to be introduced syntax for state, a .babelrc file is created and configured with all the dependencies(babel-eslint,@babel/core,@babel/preset-env,@babel/plugin-proposal-class-properties,@babel/preset-react) also installed from NPM
  state = { photos: [], active: 0 };

  static getDerivedStateFromProps({ media }) {
    let photos = ["http://www.placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    return { photos }; // this object wil be merged with the state
  }
  handleIndexClick = (event) => {
    return this.setState({ active: +event.target.dataset.index });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            //eslint-disable-next-line
            <img
              key={`${photo}${index}`}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal-thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
