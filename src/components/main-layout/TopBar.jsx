import {
  Avatar,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  SvgIcon,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import {
  ArrowDropDown,
  AutoAwesomeMosaic,
  CardMembership,
  DriveFileMove,
  Mail,
  Notifications,
  Person,
  Summarize,
  Tune,
} from '@mui/icons-material';
import AvatarGroup from '@mui/material/AvatarGroup';
import { findLastIndex, values } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { appRoutes, reportsRoutes } from '@/routes/constants';
import { ReactComponent as Logout } from '../../assets/svg/logout.svg';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

const useStyles = makeStyles((theme) => ({
  appName: {
    display: 'flex',
    '& .MuiTypography-root': {
      fontSize: theme.spacing(2),
      fontWeight: theme.typography.fontWeightBold,
      textTransform: 'uppercase',
      marginLeft: theme.spacing(0.5),
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.colors.white,
  },
  personalHeader: {
    display: 'flex',
    alignItems: 'end',
    '& .notification': {
      marginLeft: theme.spacing(2),
    },
    '& .avatar': {
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(3),
    },
  },
  tabToolbar: {
    backgroundColor: '#12293E',
    justifyContent: 'space-between',
  },
  tabs: {
    '& .MuiTab-labelIcon': {
      minHeight: 64,
      color: theme.colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      textTransform: 'none',
      '& .MuiSvgIcon-root': {
        marginBottom: 0,
        marginRight: 12,
      },
    },
    zIndex: theme.zIndex.drawer + 1,
    '& .MuiTab-wrapper': {
      color: '#fff',
      fontSize: 16,
      textTransform: 'none',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        marginBottom: 0,
        width: 18,
        height: 18,
        marginRight: 12,
      },
    },
    '& .MuiTabs-indicator': {
      height: theme.spacing(0.75),
    },
  },
  viewerContainer: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiTypography-root': {
      color: theme.colors.white,
      marginRight: theme.spacing(2),
      fontWeight: 600,
      fontSize: theme.typography.fontSize,
    },
    '& .MuiAvatarGroup-avatar': {
      border: 'none',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      width: 30,
      height: 30,
    },
    '& .MuiSvgIcon-root': {
      color: theme.colors.white,
    },
  },
  rootProfile: {
    '& .MuiListItemIcon-root': {
      minWidth: 'auto',
      marginRight: theme.spacing(2),
      color: '#000',
    },
    '& .MuiTypography-root': {
      fontSize: theme.typography.fontSize,
    },
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#24FF00',
    color: '#24FF00',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))(Badge);

const TabRoutes = {
  0: appRoutes.dashboardRoute,
  1: appRoutes.dataRequestRoute,
  2: reportsRoutes.cairDetailedReport,
};

function TopBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
    navigate(TabRoutes[newValue]);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const profileDropdownItem = [
    { icon: <Person />, primary: t('profile') },
    { icon: <Tune />, primary: t('setting') },
    { icon: <CardMembership />, primary: t('subscriptions') },
    {
      icon: <SvgIcon component={Logout} />,
      primary: t('logout'),
    },
  ];

  useEffect(() => {
    const tabIdx = findLastIndex(values(TabRoutes), (route) =>
      pathname.includes(route)
    );
    if (tabIdx !== -1) {
      setValue(tabIdx);
    }
  }, [pathname]);

  return (
    <>
      <Toolbar className={classes.header}>
        <div className={classes.appName}>
          <SvgIcon
            component={Logo}
            width="28"
            height="28"
            viewBox="0 0 28 28"
          />
          <Typography>Request management</Typography>
        </div>
        <div className={classes.personalHeader}>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={4} color="error" className="notification">
            <Notifications />
          </Badge>
          <div className="avatar" role="button" onClick={handleClick}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
            >
              <Avatar alt="Remy Sharp" src="">
                ND
              </Avatar>
            </StyledBadge>
            <ArrowDropDown />
          </div>
        </div>
      </Toolbar>
      <Toolbar className={classes.tabToolbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          classes={{ root: classes.tabs }}
        >
          <Tab
            label={t('top_bar.dashboard')}
            icon={<AutoAwesomeMosaic color="primary" />}
            value={0}
          />
          <Tab
            label={t('top_bar.data_request')}
            icon={<DriveFileMove color="primary" />}
            value={1}
          />
          <Tab
            label={t('top_bar.categorization')}
            icon={<Summarize color="primary" />}
            value={2}
          />
        </Tabs>
        <div className={classes.viewerContainer}>
          <Typography>Current viewers :</Typography>
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
          <ArrowDropDown />
        </div>
      </Toolbar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List
          component="nav"
          aria-label="main mailbox folders"
          classes={{ root: classes.rootProfile }}
        >
          {profileDropdownItem.map((el, idx) => (
            <div key={el.primary}>
              {idx > 0 && <Divider />}
              <ListItem button>
                <ListItemIcon>{el.icon}</ListItemIcon>
                <ListItemText primary={el.primary} />
              </ListItem>
            </div>
          ))}
        </List>
      </Popover>
    </>
  );
}

export default TopBar;
