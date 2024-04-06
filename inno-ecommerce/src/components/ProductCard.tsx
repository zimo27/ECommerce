import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  discountPercentage: number;
  brand: string;
  thumbnail: string;
  images: string[];
}


interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void; // Function to add product to cart
  onSeeDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, onSeeDetails }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleSeeDetails = () => {
    onSeeDetails(product); // Call onSeeDetails callback when "See Details" is clicked
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <img
          src={product.thumbnail}
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
        
        <Typography variant="body1" sx={{ textDecoration: 'underline', cursor: 'pointer', marginBottom: '8px' }} onClick={handleSeeDetails}>
          See Details
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: 'black', '&:hover': {backgroundColor: 'grey'} }} onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
