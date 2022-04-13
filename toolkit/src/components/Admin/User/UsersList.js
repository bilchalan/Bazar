import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import { DataGrid } from '@mui/x-data-grid';
import {Box,Typography} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import CircularProgress from '@mui/material/CircularProgress';

import {getAllUsers,deleteUser} from '../../../redux/features/authSlice';
import BoxShadowLoader from '../../Skeleton/BoxShadowLoader';

const UsersList = () => {
  const dispatch=useDispatch();
  const {users, loading}=useSelector(state=>state.auth.allUsers);
  const {isDeleted, loading:deleting}=useSelector(state=>state.auth.profile);

  const deleteHandler=(id)=>{
    dispatch(deleteUser({id, toast}));
}
  //for grid rows and column-----------------------
  const columns=[    
    {field:"picture",headerName:"Avatar",headerClassName:'gridHeader',minWidth:60,flex: .7,
        renderCell:(params)=>{
          return (
            params.value==="" ?<NoAccountsIcon sx={{background:'#bdbdbd',color:'#fff',width:40,height:40}}/> :
              <img src={params.value} alt="avatar" height="100%"/>            
          )
        }
    },

    {field:"name",headerName:"Name",headerClassName:'gridHeader',minWidth:170,flex: 1,},
    {field:"email",headerName:"Email",headerClassName:'gridHeader',minWidth:170,flex: 1,},
    {field:"role",headerName:"Role",headerClassName:'gridHeader',minWidth:80,flex: .5,},

    {
        field:"actions",
        headerName:"Actions",
        headerClassName:'gridHeader',
        minWidth:85,
        flex: .5,
        type:'number',
        sortable:false,
        renderCell:(params)=>{
            return (
                <>
                  {deleting?
                    <Box sx={{display:'flex'}}>
                      <Tooltip title="Deleting" placement="top">
                        <CircularProgress size={30} />
                      </Tooltip>
                    </Box>
                  :
                    <Tooltip title="Delete" placement="top">
                      <IconButton color='error' component="span"
                          onClick={()=>deleteHandler(params.getValue(params.id,"id"))}>
                          <DeleteForeverIcon sx={{width:'30px', height:'30px'}} />
                      </IconButton>
                    </Tooltip>
                  }

                  <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                    <Tooltip title="Edit" placement="top">
                      <EditIcon sx={{width:'30px', height:'30px', color:'#1976d2'}} />
                    </Tooltip>
                  </Link>
                </>
            )
        }
    },
  ];
  const rows=[];
  let picture="";
  users && users.forEach(user => {
      if(user.avatar){
        picture=user.avatar.url;
      }else{
        picture="";
      }
      rows.push({
          id:user._id,
          name:user.name,
          email:user.email,
          role:user.role,
          picture:picture          
      })
  });
//end for grid rows and column-----------------------



  useEffect(() => {
    dispatch(getAllUsers());
    if(isDeleted){
      toast.success("User deleted successfully.");
    }
  }, [dispatch,isDeleted]);

  return (
    <>
    {loading ? <BoxShadowLoader/> :
      <div style={{display:'flex',flexDirection:'column',width:'100%',marginTop:'15px', textAlign:'center'}}>
        <Typography component="h1" variant="h5" sx={{m:'15px 0'}}>Full list of users</Typography>
        <DataGrid rows={rows} columns={columns} sx={{ m: 2 }} autoHeight/>
      </div>
    }
    </>
  )
}

export default UsersList