import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import BoxShadowLoader from '../../Skeleton/BoxShadowLoader';

import { DataGrid } from '@mui/x-data-grid';
import {Typography} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { getCategories, deleteCategory} from '../../../redux/features/categorySlice';

const CategoryList = () => {
  const dispatch=useDispatch();
  const {loading,categories}=useSelector(state=>state.categories.allCategories);
  const {loading:delLoading,isDeleted}=useSelector(state=>state.categories.category);


  const deleteHandler=(id)=>{
    dispatch(deleteCategory({id,toast}));
}
  //for grid rows and column-----------------------
  const columns=[
    {field:"id",headerName:"Category ID",headerClassName:'gridHeader',minWidth:100,flex: 1,},
    {field:"name",headerName:"Category Name",headerClassName:'gridHeader',minWidth:170,flex: 1,},
    {field:"description",headerName:"Description",headerClassName:'gridHeader',minWidth:250,flex: 1.5,},
    
    {
        field:"actions",
        headerName:"Actions",
        headerClassName:'gridHeader',
        minWidth:80,
        flex: .5,
        type:'number',
        sortable:false,
        renderCell:(params)=>{
            return (
                <>
                  <Link to={`/admin/category/${params.getValue(params.id,"id")}`}>
                    <Tooltip title="Edit" placement="top">
                      <EditIcon sx={{width:'30px', height:'30px', color:'#1976d2'}} />
                    </Tooltip>
                  </Link>

                  <Tooltip title="Delete" placement="top">
                  <IconButton color='error' component="span"
                      disabled={delLoading?true:false}
                      onClick={()=>deleteHandler(params.getValue(params.id,"id"))}>
                      <DeleteForeverIcon sx={{width:'30px', height:'30px'}} />
                  </IconButton>
                  </Tooltip>
                </>
            )
        }
    },
  ];
  const rows=[];
  categories && categories.forEach(category => {
      rows.push({
          id:category._id,
          name:category.name,
          description:category.description
      })
  });
//end for grid rows and column-----------------------

  useEffect(() => {
    if(isDeleted){
      toast.success("Category deleted successfully.");
    }
    dispatch(getCategories({toast}));
  }, [dispatch,isDeleted]);

  return (
    <>
      {loading?<BoxShadowLoader/>:
      <div style={{display:'flex',flexDirection:'column',width:'100%',marginTop:'15px', textAlign:'center'}}>
        <Typography component="h1" variant="h5" sx={{m:'15px 0'}}>Full list of categories</Typography>
        <DataGrid rows={rows} columns={columns} sx={{ m: 2 }} autoHeight/>
      </div>
      }
    </>
  )
}

export default CategoryList