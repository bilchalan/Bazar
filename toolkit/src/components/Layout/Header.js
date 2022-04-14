import React from 'react';
import {NavLink,Link} from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css";
import AuthenticatedMenu from "./AuthenticatedMenu.js";
import logo from '../../images/bazar1.svg';

import HomeIcon from '@mui/icons-material/Home';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DrawerMenu from './DrawerMenu';
import {Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



function Header() {

    const { products } = useSelector((state) => state.cart.cartItems);
    const {isAuthenticated}=useSelector((state)=>state.auth.userDetails);

    //style for cart
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `2px solid #007aff`,
          padding: '0 4px',
        },
      }));


    return (
        <header className='site-header'>
            <div className='primary-menu'>
                <div className='logo-area'><img src={logo} alt='bazar eccomerce site' style={{maxWidth:'100px'}}/></div>
                <div className='pages-area'>
                    <NavLink to="/"><HomeIcon/>Home</NavLink>
                    <NavLink to="/">Products</NavLink>
                    <NavLink to="/about-us">About Us</NavLink>
                    <NavLink to="/contact-us">Contact Us</NavLink>
                </div>
                <div className='mobile-menu'><DrawerMenu/></div>
            </div>
            <div className='secondary-menu'>            
                <div className='search-area'>
                                  
                </div>
                <div className='cart-area'>
                    <NavLink to = '/cart'>
                    <StyledBadge badgeContent={products.length>0?products.length:'0'} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                    </NavLink>
                </div>
                {isAuthenticated? 
                    <div className='auth-area'>
                        <AuthenticatedMenu/>                 
                    </div>
                :
                    <div className='unauth-area'>
                        <div>
                            <Typography variant="button" display="block" sx={{mr:'5px'}}>
                                <Link to='/auth'>Login or Registration</Link>
                            </Typography>
                            <AccountCircleIcon/> 
                        </div>
                    </div>
                }  
            </div>
        </header>
    )
}

export default Header
