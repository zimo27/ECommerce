import React, { useEffect, useState } from 'react';
import { Grid, Typography, IconButton, Box, List, ListItem, ListItemText, Button, Menu, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import WebHeader from './WebHeader';
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
  const [categories, setCategories] = useState<string[]>(['All']); // Include 'All' category
  const [selectedCategory, setSelectedCategory] = useState<string | null>('All'); // Set 'All' as default category
  const [cart, setCart] = useState<Product[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
      fetch('https://dummyjson.com/products')
          .then(res => res.json())
          .then(data => {
              setProducts(data.products);
              // Extract categories from products
              const uniqueCategories = ['All', ...new Set(products.map((product: Product) => product.category))];
              setCategories(uniqueCategories);
          })
          .catch(error => console.error('Error fetching products:', error));

      fetch('https://dummyjson.com/products/categories')
          .then(res => res.json())
          .then(data => setCategories(['All', ...data])) // Include 'All' category
          .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (category: string) => {
      setSelectedCategory(category);
  };

  const addToCart = (product: Product) => {
      setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (productId: number) => {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleSearch = () => {
      fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
          .then(res => res.json())
          .then(data => setProducts(data.products))
          .catch(error => console.error('Error searching products:', error));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  const filteredProducts = selectedCategory !== 'All' ? products.filter(product => product.category === selectedCategory) : products;

  return (
      <Box>
          <WebHeader />
          <Box sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1, padding: '16px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" component="div">
                      Shop
                  </Typography>
                  <TextField
                      label="Search"
                      variant="outlined"
                      value={searchTerm}
                      onChange={event => setSearchTerm(event.target.value)}
                      InputProps={{
                          endAdornment: (
                              <IconButton onClick={handleSearch}>
                                  <SearchIcon />
                              </IconButton>
                          ),
                      }}
                      onKeyPress={event => {
                          if (event.key === 'Enter') {
                              handleSearch();
                          }
                      }}
                  />
                  <IconButton color="inherit" onClick={handleClick}>
                      <ShoppingCartIcon />
                  </IconButton>
                  <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                      }}
                      transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                      PaperProps={{
                          sx: {
                              backgroundColor: '#333',
                              color: '#fff',
                          },
                      }}
                  >
                      <Box sx={{ p: 2 }}>
                          <Typography variant="h6">Cart</Typography>
                          {cart.length > 0 ? (
                              <List>
                                  {cart.map(item => (
                                      <ListItem key={item.id}>
                                          <ListItemText primary={item.title} />
                                          <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
                                      </ListItem>
                                  ))}
                              </List>
                          ) : (
                              <Typography variant="body1">Cart is empty</Typography>
                          )}
                      </Box>
                  </Menu>
              </Box>
          </Box>

          <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '15%', padding: '16px', overflowY: 'auto', height: '100vh' }}>
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

              <Box sx={{ width: '85%', marginLeft: '2%', padding: '16px' }}>
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
