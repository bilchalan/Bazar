import * as React from 'react';
import owner from '../../images/owner.png';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Contactus = () => {
  return (
   <>
   <List sx={{ width: '100%', maxWidth: 320, bgcolor: 'background.paper',m:'0 auto' }} className="contactList">

        <ListItem>
            <ListItemAvatar><Avatar>
            <img style={{width:'100%',height:'100%'}} src={owner} alt='Monir U Zaman'/>
                </Avatar></ListItemAvatar>
            <ListItemText primary="Monir U Zaman" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
            <ListItemAvatar><Avatar><EmailIcon /></Avatar></ListItemAvatar>
            <ListItemText primary={<a href='mailto:bilchalan@gmail.com'>bilchalan@gmail.com</a>} /> 
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
            <ListItemAvatar><Avatar><PhoneIcon /></Avatar></ListItemAvatar>
            <ListItemText primary="+8801724441513" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
            <ListItemAvatar><Avatar><WhatsAppIcon/></Avatar></ListItemAvatar>
            <ListItemText primary="+8801724441513" />
        </ListItem>
        <Divider variant="inset" component="li" />  
        <ListItem>
            <ListItemAvatar><Avatar><LocationOnIcon/></Avatar></ListItemAvatar>
            <ListItemText primary="Bahadurpur, Chamari, Singra, Natore, Bangladesh" />
        </ListItem>
        <Divider variant="inset" component="li" />    
        <ListItem>
            <ListItemAvatar><Avatar><TwitterIcon/></Avatar></ListItemAvatar>
            <ListItemText primary={<a href='https://www.twitter.com/bilchalan' target="_blank">https://www.twitter.com/bilchalan</a>} />
        </ListItem>
        <Divider variant="inset" component="li" />  
        <ListItem>
            <ListItemAvatar><Avatar><GitHubIcon/></Avatar></ListItemAvatar>
            <ListItemText primary={<a href='https://bilchalan.github.io/webian' target="_blank">https://bilchalan.github.io/webian/</a>} />            
        </ListItem>
        <Divider variant="inset" component="li" />  
        <ListItem>
            <ListItemAvatar><Avatar><LinkedInIcon/></Avatar></ListItemAvatar>
            <ListItemText primary={<a href='https://www.linkedin.com/in/bilchalan/' target="_blank">https://www.linkedin.com/in/bilchalan/</a>} />
        </ListItem>
        <Divider variant="inset" component="li" />   
        <ListItem>
            <ListItemAvatar><Avatar><FacebookIcon/></Avatar></ListItemAvatar>
            <ListItemText primary={<a href='https://www.facebook.com/bilchalan' target="_blank">https://www.facebook.com/bilchalan</a>} />
        </ListItem>
        <Divider variant="inset" component="li" />    
        <ListItem>
            <ListItemAvatar><Avatar><InstagramIcon/></Avatar></ListItemAvatar>
            <ListItemText primary={<a href='https://www.instagram.com/bilchalan' target="_blank">https://www.instagram.com/bilchalan</a>} />
        </ListItem>
        <Divider variant="inset" component="li" />    

    </List>
   </>
  )
}

export default Contactus