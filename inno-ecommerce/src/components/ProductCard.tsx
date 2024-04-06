import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import dummyImage from '../media/dummy-product.jpg';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string; // Include the category property
}


interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void; // Function to add product to cart
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <img
          src={dummyImage}
          alt={product.title}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            marginBottom: '12px'
          }}
        />
        <Typography variant="h5" gutterBottom>
          {product.title}
        </Typography>
        {/* <Typography variant="body1" gutterBottom>
          {product.description}
        </Typography> */}
        <Rating
          name="customized-icons"
          value={product.rating}
          getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
          precision={0.5}
          icon={<StarIcon sx={{ color: 'black' }} />}
        />
        <Typography variant="body1" gutterBottom>
          ${product.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {product.stock} items left
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: 'black' }} onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
