import React, { useEffect, useState } from 'react';
import { Grid, Typography, IconButton, Box, List, ListItem, ListItemText, Button } from '@mui/material';
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
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

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

  const addToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const toggleCartVisibility = () => {
    setIsCartOpen(prevState => !prevState);
  };

  const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

  return (
    <Box>
      <Box sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1, padding: '16px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Shop
          </Typography>
          <IconButton color="inherit" onClick={toggleCartVisibility}>
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Box>

      {isCartOpen && (
        <Box sx={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, backgroundColor: '#fff', zIndex: 1, padding: '16px' }}>
          <Typography variant="h6" component="div">
            Cart
          </Typography>
          <List>
            {cart.map(item => (
              <ListItem key={item.id}>
                <ListItemText primary={item.title} />
                <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

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
                <Button onClick={() => addToCart(product)}>Add to Cart</Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Shop;
