import { useState } from 'react';

const LocationFilter = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleCityChange = (event: any) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event: any) => {
    setState(event.target.value);
  };

  return (
    <div>
      <label htmlFor="city">City:</label>
      <input id="city" type="text" onChange={handleCityChange} />
      <label htmlFor="state">State:</label>
      <input id="state" type="text" onChange={handleStateChange} />
    </div>
  );
};

export default LocationFilter;