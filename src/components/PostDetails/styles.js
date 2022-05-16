import { makeStyles } from "@mui/styles";


export default makeStyles((theme) => ({
  media: {
    borderRadius: '10px',
    objectFit: 'cover',
    // width: '100%',
    maxHeight: '600px',
    maxWidth: '360px',
    [theme.breakpoints.down('sm')]: {
     maxWidth: '300px',
     maxHeight: '400px'
    },

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    marginLeft: '100px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      margin: '10px',
      flex: 1,
    },
  },
  section2: {
    borderRadius: '20px',
    marginTop: '30px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  recomandedPost: {
    margin: '20px',
    cursor: 'pointer',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#e2f9ffaf',
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentOuterContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },

  },
  commentInnerContainer: {
      maxHeight: '420px',
      overflowY: 'auto',
      marginRight: '30px',
      paddingRight: '30px'
  },

}));

