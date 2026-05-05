import React, { useState } from 'react';
import './DonationForm.css';

const DonationForm = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        productName: '',
        quantity: '',
        images: [],
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

   // Function to reset messages
    const resetMessages = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
		console.log(name, value, files); // Log the name, value, and files
        setFormData({
            ...formData,
            [name]: name === 'images' ? Array.from(files) : value,
        });
    };

    const handleAddProduct = () => {
        const { productName, quantity, images } = formData;

        // Reset messages before adding a product
        resetMessages();
		
        // Validate form fields when adding products
        if (!productName || !quantity || images.length === 0) {
            setErrorMessage('Please fill in all fields: Product Name, Quantity, and Images.');
            return; // Prevent adding product if validation fails
        }


        const newProduct = { ...formData, id: Date.now() }; // Adding an id for each product
        setProducts([...products, newProduct]);
        
        // Reset form data and clear images
        setFormData({ productName: '', quantity: '', images: [] });
        document.querySelector('input[type="file"]').value = ''; // Clear the file input
    };

    const handleEditProduct = (id) => {
        const productToEdit = products.find((product) => product.id === id);
		        // Reset messages before adding a product
        resetMessages();
        setFormData(productToEdit);
        setProducts(products.filter((product) => product.id !== id)); // Remove the product to edit
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset messages before adding a product
        resetMessages();


    console.log('Form data before submission:', formData); // Log the entire form data
    
  


		
		        // Check if all fields are empty and no products are added
        const { productName, quantity, images } = formData;
        if (products.length === 0) {
			if (!productName || !quantity || images.length === 0) {
            setErrorMessage('Please add a product or fill out the fields before submitting.');
            return; // Prevent submission if all fields are empty and no products are added
        }}else {
			if (!productName && !quantity && images.length === 0) {}else{
				setErrorMessage('Please fill in all fields before submitting.');
            return; // Prevent submission if all fields are empty and no products are added
        }}

        const formDataToSend = new FormData();

        // Check if products are added
        if (products.length > 0) {
            products.forEach((product) => {
                formDataToSend.append('productName', product.productName);
                formDataToSend.append('quantity', product.quantity);
                product.images.forEach((image) => {
                    formDataToSend.append('images', image); // Use 'images' for multiple files
                });
            });
        } else {
            // If no products are added, submit the current form data
            const { productName, quantity, images } = formData;

            // Append current form data to FormData
            if (productName) formDataToSend.append('productName', productName);
            if (quantity) formDataToSend.append('quantity', quantity);
            images.forEach((image) => {
                formDataToSend.append('images', image);
            });
        }

        try {
            const response = await fetch('http://localhost:5000/api/donate', {
                method: 'POST',
                body: formDataToSend,
            });
            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setProducts([]); // Clear the product list after successful submission
                setFormData({ productName: '', quantity: '', images: [] }); // Reset form data
                document.querySelector('input[type="file"]').value = ''; // Clear the file input
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('There was an error submitting your donation.');
        }
    };

    return (
        <div>
            <form className="donation-form" id="donate" onSubmit={handleSubmit}>
                <h2>Donate Your Products</h2>
                {errorMessage && <p2 className="error">{errorMessage}</p2>}
                <label>
                    Product Name:
                    <input type="text" name="productName" value={formData.productName} onChange={handleChange} />
                </label>
                <label>
                    Quantity:
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                </label>
                <label>
                    Images:
                    <input type="file" name="images" onChange={handleChange} accept="image/*" multiple />
                </label>
                <div className="button-container">
                    <button type="button" onClick={handleAddProduct}>Add Product</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
            {successMessage && <p1>{successMessage}</p1>}
            <div>
                <h3>Products to Donate</h3>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <p><strong>Product Name:</strong> {product.productName}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                            {product.images.map((image, index) => (
                                <img key={index} src={URL.createObjectURL(image)} alt={product.productName} width="100" />
                            ))}
                            <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DonationForm;
