import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate } from "@reach/router";
// import { Redirect } from "@reach/router";
import Modal from "./Modal";

class Details extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       loading: true,
  //     };
  //   }
  state = { loading: true, showModal: false }; //to use this yet to be introduced syntax, a .babelrc file is created and configured with all the dependencies(babel-eslint,@babel/core,@babel/preset-env,@babel/plugin-proposal-class-properties,@babel/preset-react) also installed from NPM
  componentDidMount() {
    // throw new Error("lol");
    //eslint-disable-next-line
    pet
      .animal(Number(this.props.id))
      .then(({ animal }) => {
        return this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      })
      .catch((error) => JSON.stringify(error));
  }
  toggleModal = () => {
    return this.setState({ showModal: !this.state.showModal });
  };

  adopt = () => navigate(this.state.url);

  // adopt = () => <Redirect to={this.state.url}/>

  render() {
    const {
      name,
      animal,
      location,
      description,
      breed,
      media,
      showModal,
    } = this.state;

    if (this.state.loading) {
      return <h1 className="details">Loading...</h1>;
    }
    return (
      <div className="details">
        <Carousel media={media} />;
        <div>
          <h1>Name: {name}</h1>
          {/* <h2>{`${animal}-${breed}-${location}`}</h2> */}
          <h2>Animal: {animal}</h2>
          <h2>Breed: {breed}</h2>
          <h2>Location: {location}</h2>
          <ThemeContext.Consumer>
            {(themeHook) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: themeHook[0] }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>
                    No, Some other time
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

//{
// "path": "/details/:id",
// "id": "kmk",
// "uri": "/details/kmk",
// "location": {
//     "pathname": "/details/kmk",
//     "search": "",
//     "hash": "",
//     "href": "http://localhost:1234/details/kmk",
//     "origin": "http://localhost:1234",
//     "protocol": "http:",
//     "host": "localhost:1234",
//     "hostname": "localhost",
//     "port": "1234",
//     "state": null,
//     "key": "initial"
// }
// }
// };

// class Details extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true,
//     };
//   }
//   render() {
//     return (
//       <pre>
//         <code>{JSON.stringify(this.props, null, 4)}</code>
//       </pre>
//     );
//   }
// }

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
