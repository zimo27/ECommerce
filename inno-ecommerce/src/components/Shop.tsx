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
  category: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prevCategory => (prevCategory === category ? null : category));
  };

  const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

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
              <ListItem
                button
                key={category}
                onClick={() => handleCategoryClick(category)}
                sx={{
                  margin: '-14px 0',
                  backgroundColor: selectedCategory === category ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                }}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ width: '75%', marginLeft: '25%', padding: '16px' }}>
          {selectedCategory && (
            <Typography variant="h2" gutterBottom>
              {selectedCategory}
            </Typography>
          )}
          <Grid container spacing={3}>
            {filteredProducts.map(product => (
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
