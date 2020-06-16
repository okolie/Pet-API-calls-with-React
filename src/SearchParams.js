import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState( "Seattle, WA" );
  
  const [breeds, setBreeds] = useState([]);

  const [animal, AnimalDropdown] = useDropdown( "Animal", "dog", ANIMALS );
  
  const [breed, BreedDropdown, setBreed] = useDropdown( "Breed", "", breeds );
  
  const [pets, setPets] = useState( [] );
  
  const [theme, setTheme] = useContext(ThemeContext);
  // breeds populate the option dropdown to create individual breed subject to onchange or onblur events
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []); //set the pet state
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(
      function ({ breeds }) {
        const breedStrings = breeds.map(({ name }) => name);
        setBreeds(breedStrings);
      },
      (error) => console.error(error)
    );
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <h1>{location}</h1>
      {/* <h2>{animal}</h2> */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="location"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        {/* <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(event) => setAnimal(event.target.value)}
            onBlur={(event) => setAnimal(event.target.value)}
          >
            <option>All</option>
            {ANIMALS.map((animall) => (
              <option key={animal} value={animall}>
                {animall}
              </option>
            ))}
          </select>
        </label> */}

        {/* <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(event) => setBreed(event.target.value)}
            onBlur={(event) => setBreed(event.target.breed)}
            disabled={breeds.length === 0}
            // diasabled = {!breeds.length}
          >
            <option>All</option>
            {breeds.map((breedString) => (
              <option key={breedString}>{breedString}</option>
            ))}
          </select>
        </label> */}
        <AnimalDropdown />
        <BreedDropdown />
        <label>
          Theme
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            onBlur={(event) => setTheme(event.target.value)}
          >
            <option value="darkblue">Default - Dark Blue</option>
            <option value="red">Red</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chart Reuse</option>
            <option value="peru">Peru</option>
          </select>
        </label>

        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
