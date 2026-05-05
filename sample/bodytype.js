import React, { useState } from 'react';
import './BodyShapeForm.css';
import hourglass from './assets/images/hourglass.jpg';  
import rectangle from './assets/images/rectangle.jpg';  
import invtriangle from './assets/images/invtriangle.jpg';  
import triangle from './assets/images/triangle.jpg';  
import oval from './assets/images/oval.jpg'; 

const BodyShapeForm = () => {
  const [bust, setBust] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [error, setError] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState(null);
  const [bodyTypeImage, setBodyTypeImage] = useState('');

  const bodyTypes = [
    {
      id: 1,
      name: 'Hourglass',
      image: hourglass, // use the imported image here
      suggestions: {
        tops: ['T-shirt', 'Blouse', 'Sweater'],
        bottoms: ['Jeans', 'Skirt', 'Shorts'],
      },
    },
    {
      id: 2,
      name: 'Inverted Triangle (Apple)',
      image: invtriangle, // use the imported image here
      suggestions: {
        tops: ['Tank Top', 'Shirt', 'Jacket'],
        bottoms: ['Trousers', 'Leggings', 'Capris'],
      },
    },
    {
      id: 3,
      name: 'Rectangle',
      image: rectangle, // use the imported image here
      suggestions: {
        tops: ['Hoodie', 'Polo', 'Cardigan'],
        bottoms: ['Cargo Pants', 'Culottes', 'Chinos'],
      },
    },
    {
      id: 4,
      name: 'Oval',
      image: oval, // use the imported image here
      suggestions: {
        tops: ['Blazer', 'Camisole', 'Henley'],
        bottoms: ['Slacks', 'Joggers', 'Shorts'],
      },
    },
    {
      id: 5,
      name: 'Triangle (Pear)',
      image: triangle, // use the imported image here
      suggestions: {
        tops: ['Crop Top', 'Sweatshirt', 'Overalls'],
        bottoms: ['Bermuda Shorts', 'Palazzo Pants', 'Skirt'],
      },
    },
  ];

  const validateInputs = () => {
    // Clear previous error message
    setError('');
    setBodyType(''); // Reset body type when validating inputs

    // Check if inputs are positive numbers
    if (
      !bust ||
      !waist ||
      !hips ||
      isNaN(bust) ||
      isNaN(waist) ||
      isNaN(hips) ||
      parseFloat(bust) <= 0 ||
      parseFloat(waist) <= 0 ||
      parseFloat(hips) <= 0
    ) {
      setError('Please enter valid positive numbers for bust, waist, and hips.');
      return false;
    }

    return true;
  };

  const calculateBodyType = () => {
    if (!validateInputs()) return;

    const bustMeasurement = parseFloat(bust);
    const waistMeasurement = parseFloat(waist);
    const hipMeasurement = parseFloat(hips);

    let type = '';

    // Determine body type
    if (
      Math.abs(bustMeasurement - waistMeasurement) <= 2 &&
      Math.abs(waistMeasurement - hipMeasurement) <= 2 &&
      Math.abs(bustMeasurement - hipMeasurement) <= 2
    ) {
      type = 'Rectangle';
    } else if (
      Math.abs(bustMeasurement - hipMeasurement) <= 2 &&
      waistMeasurement <= (bustMeasurement * 0.75) &&
      waistMeasurement <= (hipMeasurement * 0.75)
    ) {
      type = 'Hourglass';
    } else if (hipMeasurement > bustMeasurement && waistMeasurement <= bustMeasurement) {
      type = 'Triangle (Pear)';
    } else if (bustMeasurement > hipMeasurement && waistMeasurement <= hipMeasurement) {
      type = 'Inverted Triangle (Apple)';
    } else if (
      Math.abs(bustMeasurement - waistMeasurement) <= 2 &&
      waistMeasurement > hipMeasurement
    ) {
      type = 'Oval';
    } else {
      type = 'Rectangle';
    }

    setBodyType(type);
    const selectedType = bodyTypes.find((body) => body.name === type);
    if (selectedType) {
      setSelectedBodyType(selectedType.suggestions);
      setBodyTypeImage(selectedType.image); // Set the corresponding image
    }
  };

  const resetForm = () => {
    setBust('');
    setWaist('');
    setHips('');
    setBodyType('');
    setError('');
    setSelectedBodyType(null);
  };

  return (
    <div className="body-shape">
      <h3>Embrace Your Body</h3>
      <p>
        Everyone is unique! At EcoFitStyle, we celebrate your individuality by empowering you to make informed choices that reflect not only your personal style but also your commitment to a sustainable environment.
      </p>

      <form className="body-shape-form" id="bodyshape">
        <h2>Determine Your Body Shape</h2>
        <label>
          Bust (in inches):
          <input
            type="number"
            value={bust}
            onChange={(e) => setBust(e.target.value)}
          />
        </label>
        <label>
          Waist (in inches):
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
          />
        </label>
        <label>
          Hips (in inches):
          <input
            type="number"
            value={hips}
            onChange={(e) => setHips(e.target.value)}
          />
        </label>
        <div className="button-container">
          <button type="button" onClick={calculateBodyType}>Calculate Body Type</button>
          <button type="button" onClick={resetForm}>Reset</button>
        </div>

        {error && <h2 className="error-message">{error}</h2>}
        {bodyType && <h2>Your Body Type: {bodyType}</h2>}
      </form>

      {selectedBodyType && (
        <div className="suggestions">
          <h2>Suggestions:</h2>
          <h3>Tops:</h3>
          <ul>
            {selectedBodyType.tops.map((top, index) => (
              <li key={index}>{top}</li>
            ))}
          </ul>
          <h3>Bottoms:</h3>
          <ul>
            {selectedBodyType.bottoms.map((bottom, index) => (
              <li key={index}>{bottom}</li>
            ))}
          </ul>
		  {/* Display the body type image */}
          <img src={bodyTypeImage} alt={bodyType} className="body-type-image" />
        </div>
      )}
    </div>
  );
};

export default BodyShapeForm;