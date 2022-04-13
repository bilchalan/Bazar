import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import BoxShadowLoader from '../../Skeleton/BoxShadowLoader';

import {Box,Typography,TextField, Button } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';


import {getCategoryDetails, updateCategory} from '../../../redux/features/categorySlice';

const UpdateCategory = () => {
  const {id}=useParams();  
  const dispatch=useDispatch();

  //state for load category
  const {loading:catLoading, category}=useSelector(state=>state.categories.categoryDetails);
  //state for update category
  const {loading:upLoading}=useSelector(state=>state.categories.category);

  const [catName,setCatName]=useState("");
  const [catDescription,setCatDescription]=useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
      const formData=new FormData();
      formData.set("name",catName);
      formData.set("description",catDescription);
      dispatch(updateCategory({id, formData, toast}));
  }
  useEffect(() => {
      dispatch(getCategoryDetails({id, toast}));
  }, [dispatch, id]);

  useEffect(()=>{
    if(category){
      setCatName(category.name);
      setCatDescription(category.description);  
    }  
  },[category]);
  
  return (
    <>    
    {catLoading? <BoxShadowLoader/> : (
        <Box sx={{marginTop: 2,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
          
          <Typography component="h1" variant="h5">Update category</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>            
              <TextField  margin="normal" 
                          required  
                          fullWidth
                          id="name" 
                          label="Name" 
                          type="text" 
                          name="name" 
                          value={catName || ""} 
                          onChange={(e=>setCatName(e.target.value))}/>
              
              <TextField  margin="normal" 
                          required  
                          fullWidth 
                          id="description" 
                          label="Description" 
                          type="text" 
                          name="description" 
                          value={catDescription || ""} 
                          onChange={(e=>setCatDescription(e.target.value))}/>

              <Box sx={{marginTop: 2,display: 'flex',justifyContent: 'center',}}>
                <Button type="submit" sx={{display:'flex',alignItems:'normal'}}
                        disabled={upLoading?true:false} 
                        variant="contained"  
                        startIcon={<UpdateIcon />}>Update</Button>
              </Box>

          </Box>

        </Box>
    )}
    </>
  )
}

export default UpdateCategory