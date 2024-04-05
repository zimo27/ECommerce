import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

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
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {product.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price: ${product.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Rating: {product.rating}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Stock: {product.stock}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
