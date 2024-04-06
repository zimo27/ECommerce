import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {product.title}
        </Typography>
        {/* <Typography variant="body1" gutterBottom>
          {product.description}
        </Typography> */}
        <Typography variant="body1" gutterBottom>
          ${product.price}
        </Typography>
        <Rating
          name="customized-icons"
          value={product.rating}
          getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
          precision={0.5}
          icon={<StarIcon sx={{ color: 'black' }} />}
        />
        <Typography variant="body1" gutterBottom>
          {product.stock} items left
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
