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
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    season: '',
    occasion: '',
    material: '',
    price: '',
    ecoFriendly: '',
  });
  
  const bodyTypes = [
    {
      id: 1,
      name: 'Hourglass',
      image: hourglass,
      suggestions: {
        tops: ['T-shirt', 'Blouse', 'Sweater'],
        bottoms: ['Jeans', 'Skirt', 'Shorts'],
      },
    },
    {
      id: 2,
      name: 'Heart',
      image: invtriangle,
      suggestions: {
        tops: ['Tank Top', 'Shirt', 'Jacket'],
        bottoms: ['Trousers', 'Leggings', 'Capris'],
      },
    },
    {
      id: 3,
      name: 'Rectangle',
      image: rectangle,
      suggestions: {
        tops: ['Hoodie', 'Polo', 'Cardigan'],
        bottoms: ['Cargo Pants', 'Culottes', 'Chinos'],
      },
    },
    {
      id: 4,
      name: 'Oval',
      image: oval,
      suggestions: {
        tops: ['Blazer', 'Camisole', 'Henley'],
        bottoms: ['Slacks', 'Joggers', 'Shorts'],
      },
    },
    {
      id: 5,
      name: 'Pear',	
      image: triangle,
      suggestions: {
        tops: ['Crop Top', 'Sweatshirt', 'Overalls'],
        bottoms: ['Bermuda Shorts', 'Palazzo Pants', 'Skirt'],
      },
    },
  ];

  const validateInputs = () => {
    setError('');
    setBodyType('');

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
      type = 'Pear';
    } else if (bustMeasurement > hipMeasurement && waistMeasurement <= hipMeasurement) {
      type = 'Heart';
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
      setBodyTypeImage(selectedType.image);
    }
  };

  const resetForm = () => {
    setBust('');
    setWaist('');
    setHips('');
    setBodyType('');
    setError('');
    setSelectedBodyType(null);
    setBodyTypeImage('');
  };
  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setModalVisible(true);
  };
    const handleModalSubmit = async () => {
    // Integrate with backend to fetch relevant dress links based on userPreferences
    const response = await fetch('/api/getDressSuggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        suggestion: selectedSuggestion,
        preferences: userPreferences,
      }),
    });

    const data = await response.json();
    console.log(data); // Handle the response data, which should contain product links

    setModalVisible(false);
    setUserPreferences({
      season: '',
      occasion: '',
      material: '',
      price: '',
      ecoFriendly: '',
    });
  };

  const handleImageClick = (bodyType) => {
    const selectedType = bodyTypes.find((body) => body.name === bodyType);
    if (selectedType) {
      setSelectedBodyType(selectedType.suggestions);
      setBodyTypeImage(selectedType.image);
    }
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

      <div className="body-type-images">
        {bodyTypes.map((body) => (
          <div key={body.id} className="image-container" onClick={() => handleImageClick(body.name)}>
            <img src={body.image} alt={body.name} className="body-type-image" />
            <p>{body.name}</p>
          </div>
        ))}
      </div>

      {selectedBodyType && (
        <div className="suggestions">
          <h3>Suggestions</h3>
          <h3>Tops</h3>
          <ul>
            {selectedBodyType.tops.map((top, index) => (
              <h1 key={index}onClick={() => handleSuggestionClick(top)}>{top}</h1>
            ))}
          </ul>
          <h3>Bottoms</h3>
          <ul>
            {selectedBodyType.bottoms.map((bottom, index) => (
              <h1 key={index}onClick={() => handleSuggestionClick(bottom)}>{bottom}</h1>
            ))}
          </ul>
          <img src={bodyTypeImage} alt={bodyType} className="body-type-image" />
        </div>
      )}
	  
      {modalVisible && (
        <div className="modal">
          <h2>{selectedSuggestion}</h2>
          <form>
            <label>
              Season:
              <select
                value={userPreferences.season}
                onChange={(e) => setUserPreferences({ ...userPreferences, season: e.target.value })}
              >
                <option value="">Select a season</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
              </select>
            </label>
            <label>
              Occasion:
              <select
                value={userPreferences.occasion}
                onChange={(e) => setUserPreferences({ ...userPreferences, occasion: e.target.value })}
              >
                <option value="">Select an occasion</option>
                <option value="Formals">Formals</option>
                <option value="Casual">Casual</option>
				<option value="Party">Party</option>
                <option value="Workout">Workout</option>
              </select>
            </label>
            <label>
              Material:
              <select
                value={userPreferences.material}
                onChange={(e) => setUserPreferences({ ...userPreferences, material: e.target.value })}
              >
                <option value="">Select a material</option>
                <option value="Cotton">Cotton</option>
                <option value="Linen">Linen</option>
                <option value="Polyester">Polyester</option>
                <option value="Wool">Wool</option>
              </select>
            </label>
            <label>
              Price:
              <input
                type="text"
                value={userPreferences.price}
                onChange={(e) => setUserPreferences({ ...userPreferences, price: e.target.value })}
                placeholder="Enter price range"
              />
            </label>
            <label>
              Eco-Friendly:
              <select
                value={userPreferences.ecoFriendly}
                onChange={(e) => setUserPreferences({ ...userPreferences, ecoFriendly: e.target.value })}
              >
                <option value="">Select eco-friendliness</option>
                <option value="Sustainable">Sustainable</option>
                <option value="Chemical-free">Chemical-free</option>
				<option value="Animal-free">Animal-free</option>
				<option value="New Products">New Products</option>
              </select>
            </label>
            <button type="button" onClick={handleModalSubmit}>Get Suggestions</button>
            <button type="button" onClick={() => setModalVisible(false)}>Cancel</button>
          </form>
        </div>
      )}
	  
    </div>
  );
};

export default BodyShapeForm;
