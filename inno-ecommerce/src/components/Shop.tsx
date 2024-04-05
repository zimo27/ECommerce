import React, { useEffect, useState } from 'react';
import { Grid, Typography, IconButton, Box, List, ListItem, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));

    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <Box>
      <Box sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1, padding: '16px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Shop
          </Typography>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '25%', padding: '16px', position: 'fixed', overflowY: 'auto', height: '100vh' }}>
          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>
          <List sx={{ padding: 0 }}>
            {categories.map(category => (
              <ListItem button key={category} sx={{ padding: 0 }}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ width: '75%', marginLeft: '25%', padding: '16px' }}>
          <Typography variant="h2" gutterBottom>
            Shop
          </Typography>
          <Grid container spacing={3}>
            {products.map(product => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Shop;
