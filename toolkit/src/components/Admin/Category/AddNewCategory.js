import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import {Box,Typography,TextField, Button } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import {addNewCategory} from '../../../redux/features/categorySlice';


const AddNewCategory = () => {
  const dispatch=useDispatch();
  const {loading:catLoading}=useSelector(state=>state.categories.newCategory)
  const [name,setName]=useState("");
  const [description,setDescription]=useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.set("name",name);
    formData.set("description",description);
    dispatch(addNewCategory({formData,toast}));
  }
  
  return (
    <>
        <Box sx={{marginTop: 2,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
          
          <Typography component="h1" variant="h5">Add new category</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

              <TextField  margin="normal" 
                          required  
                          fullWidth
                          autoFocus  
                          id="name" 
                          label="Name" 
                          type="text" 
                          name="name" 
                          value={name} 
                          onChange={(e=>setName(e.target.value))}/>

              <TextField  margin="normal" 
                          required  
                          fullWidth 
                          id="description" 
                          label="Description" 
                          type="text" 
                          name="description" 
                          value={description} 
                          onChange={(e=>setDescription(e.target.value))}/>

              <Box sx={{marginTop: 2,display: 'flex',justifyContent: 'center',}}>
                <Button type="submit" sx={{display:'flex',alignItems:'normal'}}
                        disabled={catLoading?true:false}
                        variant="contained"  
                        startIcon={<AddBoxOutlinedIcon />}>Add Category</Button>
              </Box>

          </Box>

        </Box>
    
    </>
  )
}

export default AddNewCategory