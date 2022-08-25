import makeStyles from '@mui/styles/makeStyles';
import { DefaultSidebarWidth } from '@/common/constants';

export const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },

  drawerPaper: {
    top: 192,
    '& .MuiList-root': {
      '& .MuiListItem-root': {
        boxSizing: 'border-box',
        borderBottom: `1px solid ${theme.palette.primary.light}`,
        '&:not(.Mui-selected)': {
          '& .MuiTypography-root': {
            fontWeight: 500,
          },
        },
      },
    },
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiTypography-root': {
        color: theme.colors.white,
        fontWeight: 700,
      },
      '& .MuiListItemIcon-root': {
        color: theme.colors.white,
      },
    },
    '& .MuiListItemIcon-root': {
      minWidth: 'auto',
      marginRight: theme.spacing(1.75),
      color: theme.palette.primary.main,
    },
    '&.MuiDrawer-paperAnchorDockedLeft': {
      borderTop: `1px solid ${theme.palette.primary.light}`,
      borderRight: `1px solid ${theme.palette.primary.light}`,
    },
  },

  drawerOpen: {
    width: DefaultSidebarWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(6),
    '& .MuiListItem-root': {
      paddingLeft: theme.spacing(2),
      justifyContent: 'center',
      '& .MuiListItemIcon-root': {
        marginRight: 0,
      },
      '&.active': {
        '&:after': {
          content: 'none',
        },
      },
    },
  },

  childList: {
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.light,
      '& .MuiTypography-root': {
        color: theme.palette.primary.main,
        fontWeight: 700,
      },
      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
    },
    paddingLeft: theme.spacing(4),
    '&.active': {
      '&:after': {
        content: '" "',
        width: 0,
        height: 0,
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent',
        borderLeft: `8px solid ${theme.palette.primary.light}`,
        position: 'fixed',
        left: 261,
      },
    },
  },

  childListCustom: {
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.light,
      '& .MuiTypography-root': {
        color: theme.palette.primary.main,
        fontWeight: 700,
      },
      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
    },
    '&.active': {
      '&:after': {
        content: '" "',
        width: 0,
        height: 0,
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent',
        borderLeft: `8px solid ${theme.palette.primary.light}`,
        position: 'fixed',
        left: 261,
      },
    },
  },
  drawerCollapse: {
    width: 20,
    height: 20,
    position: 'fixed',
    top: 196,
    left: DefaultSidebarWidth,
    transform: 'translate(-50%, 50%)',
    zIndex: 10000,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  listItem: {
    '& .MuiTypography-root': {
      fontSize: '14px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
}));
