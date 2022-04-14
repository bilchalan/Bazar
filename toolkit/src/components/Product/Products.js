import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from "react-redux";
import {toast} from 'react-toastify';
import Pagination from "react-js-pagination";

import Slider from '@mui/material/Slider';
import {Typography,TextField, Button} from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import {getProducts} from "../../redux/features/productsSlice";
import {getCategories} from "../../redux/features/categorySlice";
import ProductCard from "./ProductCard";
import HeadingWaveSkeleton from "../Skeleton/HeadingWaveSkeleton";
import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";
import "./Products.css";


const Products = () => {
  const [search,setSearch]=useState("");
  //price range state
  let minPrice=1;
  let maxPrice=100000;
  const [ priceRange, setPriceRange ] = useState([minPrice,maxPrice]);
  //rating range state
  const minRate=0;
  const maxRate=5;
  const defaultRate=0;
  const [ ratingsFilter, setRatingsFilter ] = useState(0);
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  //category state
  const [category,setCategory]=useState("");

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index, id) => {
    setSelectedIndex(index);
    setCategory(id);
  };

  const resetFilter=()=>{
    setSearch("");
    setPriceRange([minPrice,maxPrice]);
    setRatingsFilter(0);
    setCurrentPage(1);
    setCategory("");
  }
  const dispatch=useDispatch();
  const {loading,resultPerPage,products,filteredProductsCount}=useSelector((state)=>state.products.allProducts);
  const {categories}=useSelector(state=>state.categories.allCategories);
  
  useEffect(() => {
    dispatch(getCategories({toast}));
    dispatch(getProducts({search, currentPage, priceRange, category, ratingsFilter,toast}));
  }, [dispatch,search, currentPage, priceRange, category, ratingsFilter])
  
  return (
    <>
    <div className='wrapper'>

      <div className="filter-box">

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography sx={{display:'flex'}}><FilterAltIcon/>Filter products</Typography>
          </AccordionSummary>
          <AccordionDetails>        

          <div className="search-filter-box">            
          <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Search Products</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <TextField  margin="none" 
                          fullWidth
                          autoFocus  
                          id="search" 
                          label="Search" 
                          type="text" 
                          name="search" 
                          value={search} 
                          onChange={(e=>setSearch(e.target.value))}/>
              </AccordionDetails>
            </Accordion> 
          </div>

          <div className="category-filter-box">  
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Category</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component="nav" aria-label="main mailbox folders">
                        <ListItemButton 
                                          sx={{pb: 0,pt: 0}}  
                                          key={0} id={0} 
                                          selected={selectedIndex === 0} 
                                          onClick={(event) => handleListItemClick(event, 0, "")}>
                          <ListItemText primary="All" />
                        </ListItemButton>

                        {categories && categories.map((cat,index)=>
                          <ListItemButton sx={{pb:0,pt:0}} 
                                          key={cat._id} 
                                          id={cat._id} 
                                          selected={selectedIndex === index+1} 
                                          onClick={(event)=>handleListItemClick(event, index+1,cat._id)}>
                            <ListItemText primary={cat.name} />
                          </ListItemButton>
                        )}
                </List>  
              </AccordionDetails>
            </Accordion>                                            
          </div>        
        
          <div className="price-filter-box">            
          <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Price</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Slider
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange}
                        onChange={(e,newPriceRange)=>setPriceRange(newPriceRange)}
                        valueLabelDisplay="auto"
                    />
              </AccordionDetails>
            </Accordion> 
          </div>
        
          <div className="rating-filter-box">
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Rating</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Slider
                      name="rateFilter"
                      defaultValue={defaultRate}
                      valueLabelDisplay="auto"
                      onChange={(e)=>setRatingsFilter(e.target.value)}                                
                      step={0.5}
                      marks
                      min={minRate}
                      max={maxRate}
                      value={ratingsFilter}
                  />
              </AccordionDetails>
            </Accordion>   
          </div>

          <div className="filter-clear" style={{textAlign:'right',marginTop:'10px'}}>
            <Button color="error" 
                      variant="outlined" 
                      startIcon={<ClearAllIcon />} 
                      onClick={resetFilter}>
                      Reset All
              </Button>
          </div>
        
          </AccordionDetails>
        </Accordion>    
      </div>
      
      
      <div className='container'>
        {loading ? (
          <>
          <HeadingWaveSkeleton/>
          <div className='card-container'>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
            <ProductCardSkeleton/>
          </div>
          </>
          ) : (<>            
            <Typography variant="h4" component="div" sx={{ml:'10px',mb:'20px'}}>                
                {filteredProductsCount && filteredProductsCount>0 ? `In store ${filteredProductsCount} items : `: `No products found`}
            </Typography>
            
            <div className='card-container'>
              {products && products.map((product)=>
                <ProductCard product={product} key={product._id}/>
                )
              }
            </div> 
                
        </>)
        }
        {(resultPerPage<filteredProductsCount) && (
          <div className="paginate">
              <Pagination 
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={filteredProductsCount}
                  onChange={(e)=>setCurrentPage(e)}
                  nextPageText=""
                  prevPageText=""
                  firstPageText=""                                            
                  lastPageText=""
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive active"
                  activeLinkClass="pageLInkActive disabled"
                  itemClassFirst="itemClassFirst"
                  itemClassPrev="itemClassPrev"
                  itemClassNext="itemClassNext"
                  itemClassLast="itemClassLast"
              />
          </div>
        )}
      </div> 
    </div>
    </>
  )
}

export default Products