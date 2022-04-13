import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import './Product.css';
import BoxShadowLoader from '../../Skeleton/BoxShadowLoader';

import { getCategories } from '../../../redux/features/categorySlice';
import {getProductDetails} from '../../../redux/features/productsSlice';
import {updateProduct} from '../../../redux/features/productsSlice';

import {Box,Typography,TextField, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import UpdateIcon from '@mui/icons-material/Update';
import CollectionsIcon from '@mui/icons-material/Collections';
import { styled } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';


const UpdateProduct = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const {categories}=useSelector(state=>state.categories.allCategories);
  const {loading, product}=useSelector(state => state.products.productDetails);
  const {loading:upLoading}=useSelector(state=>state.products.product);

  //for file type button 
  const Input = styled('input')({
    display: 'none',
  });

  //set initial state for input fields
  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [price,setPrice]=useState("");
  const [stock,setStock]=useState("");
  const [category,setCategory]=useState("");
  const [images,setImages]=useState([]);
  const [checkImages,setCheckImages]=useState("NotChanged");

  //upload image handler
  const createProductImageChange=(e)=>{
    const files=Array.from(e.target.files);

    setImages([]);

    files.forEach((file)=>{
        const reader=new FileReader();

        reader.onload=()=>{
            if(reader.readyState===2){
                setImages((old)=>[...old,reader.result]);
            }
        }

        reader.readAsDataURL(file);
    })
    setCheckImages("Changed");
  }


  const handleSubmit=(e)=>{
    e.preventDefault();

    if(images.length<1){
      toast.error("Please select product image.");
      return;
    }

    const formData=new FormData();
    formData.set("name",name);
    formData.set("description",description);
    formData.set("price",price);
    formData.set("stock",stock);
    formData.set("category",category);

    images.forEach((image)=>{
      formData.append("images",image)
    });
    formData.set("checkImages",checkImages);
    dispatch(updateProduct({id,formData,toast}));
  }

  useEffect(() => {
    dispatch(getCategories({toast}));
    dispatch(getProductDetails({id,toast}));      
  }, [dispatch,id]);

  useEffect(()=>{
    if(product){
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setCategory(product.category);
      setImages(product.images);
    }
  },[product]);


  return (
    <>
    {loading? <BoxShadowLoader/> : 
        <Box sx={{margin:'20px auto',display: 'flex',flexDirection: 'column',alignItems: 'center',maxWidth:'550px'}}>
          
          <Typography component="h1" variant="h5">Update product</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

              <TextField  margin="normal" 
                          required  
                          fullWidth
                          autoFocus  
                          id="name" 
                          label="Name" 
                          type="text" 
                          name="name" 
                          value={name || ""} 
                          onChange={(e=>setName(e.target.value))}/>

              <TextareaAutosize required
                                aria-label="description"
                                minRows={5}
                                placeholder="Description"
                                style={{ width: '100%' }}
                                value={description || ""} 
                                onChange={(e=>setDescription(e.target.value))}/>

              <Box style={{display:'flex', justifyContent:'space-between',width:'100%'}}>
              <TextField  margin="normal"
                          style={{width:'49%'}}
                          required  
                          id="price" 
                          label="Price" 
                          type="number" 
                          name="description" 
                          value={price || ""} 
                          onChange={(e=>setPrice(e.target.value))}/>

              <TextField style={{width:'49%'}}
                          margin="normal"
                          required  
                          id="stock" 
                          label="Stock" 
                          type="number" 
                          name="stock" 
                          value={stock || ""} 
                          onChange={(e=>setStock(e.target.value))}/>  
              
                </Box>
                <Box style={{display:'flex', justifyContent:'space-between',width:'100%'}}>
                  <FormControl sx={{width:'49%'}}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select required
                            labelId="category"
                            id="category"
                            value={category || ""}
                            label="Category"
                            onChange={(e)=>setCategory(e.target.value)}>

                            {categories && categories.map((cat,index)=>
                              <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                              )
                            }
                    </Select>                    
                  </FormControl>

                  <label htmlFor="productImage" style={{width:'49%'}}>
                    <Input  accept="image/*" 
                            id="productImage" 
                            multiple 
                            type="file"
                            name="productImage"
                            onChange={createProductImageChange}/>
                    <Button sx={{display:'flex',alignItems:'center',height:'100%'}} 
                            variant="outlined" 
                            component="span" 
                            startIcon={<CollectionsIcon />}>
                            Upload Photo
                    </Button>
                  </label>
                </Box>

              {images && (
                  <div className='galleryback'>
                    {images.map((image,index)=>(
                        image.url?
                          <img  style={{maxWidth:'90px',maxHeight:'80px',padding:'0 5px'}}
                                key={index} 
                                src={image.url} 
                                alt={product.name} />
                              :
                          <img  style={{maxWidth:'90px',maxHeight:'80px',padding:'0 5px'}}
                                key={index} 
                                src={image} 
                                alt="product images" />
                      ))
                    }                    
                  </div> 
                  )             
              }                            

              <Box sx={{marginTop: 2,display: 'flex',justifyContent: 'center',}}>
                <Button type="submit" sx={{display:'flex',alignItems:'normal',p:'15px 80px'}}
                        variant="contained"  
                        disabled={upLoading?true:false} 
                        startIcon={<UpdateIcon/>}>Update</Button>
              </Box>

          </Box>

        </Box>        
    }
    </>
  )
}

export default UpdateProduct