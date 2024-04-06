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
  discountPercentage: number;
  brand: string;
  thumbnail: string;
  images: string[];
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('All');
  const [cart, setCart] = useState<Product[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showProductDetails, setShowProductDetails] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        const uniqueCategories = ['All', ...new Set(products.map((product: Product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching products:', error));

    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(['All', ...data]))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
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

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    if (!event.relatedTarget) {
      setAnchorEl(null);
    }
  };

  const handleHover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const handleSeeDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleBackToList = () => {
    setShowProductDetails(false);
    setSelectedProduct(null);
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
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <IconButton color="inherit" onClick={handleClick} onMouseEnter={handleHover} onMouseLeave={handleClose}>
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
              sx={{
                backgroundColor: '#333',
                color: '#fff',
              }}
              
            >
              <Box sx={{ p: 2, width: '200px', height: '300px', overflowY: 'auto' }}>
                <Typography variant="h6">Cart</Typography>
                {cart.length > 0 ? (
                  <List>
                    {cart.map(item => (
                      <ListItem key={item.id}>
                        <ListItemText primary={item.title} sx={{ typography: 'body2' }} />
                        <Button onClick={() => removeFromCart(item.id)} sx={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>Remove</Button>
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
          {selectedCategory && !showProductDetails && (
            <Typography variant="h2" gutterBottom>
              {selectedCategory}
            </Typography>
          )}
          {showProductDetails ? (
            <Box>
            <Button onClick={handleBackToList} sx={{ textDecoration: 'underline', cursor: 'pointer', marginBottom: '8px' }}>
                Back to List
            </Button>
            <Box sx={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
              <Typography variant="h5" gutterBottom>{selectedProduct?.title}</Typography>
              <Typography variant="body1" gutterBottom>{selectedProduct?.description}</Typography>
              <Typography variant="body1" gutterBottom>Price: ${selectedProduct?.price}</Typography>
              <Typography variant="body1" gutterBottom>Rating: {selectedProduct?.rating}</Typography>
              <Typography variant="body1" gutterBottom>Stock: {selectedProduct?.stock} items left</Typography>
              <Typography variant="body1" gutterBottom>Discount: {selectedProduct?.discountPercentage}%</Typography>
              <Typography variant="body1" gutterBottom>Brand: {selectedProduct?.brand}</Typography>
              <Typography variant="body1" gutterBottom>Category: {selectedProduct?.category}</Typography>
              <img src={selectedProduct?.thumbnail} alt={selectedProduct?.title} style={{ maxWidth: '100%', marginTop: '16px' }} />
              <Box sx={{ display: 'flex', marginTop: '16px' }}>
                {selectedProduct?.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} style={{ marginRight: '8px', maxWidth: '100px' }} />
                ))}
              </Box>
            </Box>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} addToCart={addToCart} onSeeDetails={handleSeeDetails} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Shop;
