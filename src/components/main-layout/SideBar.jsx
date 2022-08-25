import {
  ChevronLeft,
  ExpandLess,
  ExpandMore,
  Subject,
} from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { sidebarStateAtom } from '@/recoil/atom/sidebar-state';
import { getSidebarItems } from './constant';
import { useStyles } from './style';

function ListItemLink({ icon, primary, to, className, parent, ...rest }) {
  const classes = useStyles();
  const [sidebarState] = useRecoilState(sidebarStateAtom);
  const { pathname } = useLocation();
  const isActive = to === pathname || (parent && pathname.includes(to));
  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <Tooltip title={!sidebarState ? primary : ''} arrow placement="right">
      <ListItem
        {...rest}
        button
        component={renderLink}
        className={classNames(className, {
          active: isActive,
        })}
        selected={isActive}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        {primary && sidebarState && (
          <ListItemText className={classes.listItem} primary={primary} />
        )}
      </ListItem>
    </Tooltip>
  );
}

function ListItemLinkCustom({ offerPl, icon, primary, to, parent }) {
  const { pathname } = useLocation();
  const isActive = to === pathname || (parent && pathname.includes(to));
  const [sidebarState, setSidebarState] = useRecoilState(sidebarStateAtom);

  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Tooltip title={!sidebarState ? primary : ''} arrow placement="right">
      <ListItem
        // component={to && Link}
        // to={`/${to}`} // Relative path
        onClick={() => {
          navigate(to);
          setSidebarState(true);
        }}
        button
        sx={{ pl: offerPl }}
        className={classNames(classes.childListCustom, {
          active: isActive,
        })}
        selected={isActive}
      >
        <ListItemIcon>{icon || <KeyboardArrowRightIcon />}</ListItemIcon>
        <ListItemText className={classes.listItem} primary={primary} />
      </ListItem>
    </Tooltip>
  );
}

function ItemParent({
  icon,
  primary,
  childItem,
  ClassName,
  offerPl = 4,
  rootPath,
  to,
}) {
  const [open, setOpen] = React.useState(true);
  const [sidebarState] = useRecoilState(sidebarStateAtom);
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (!sidebarState) {
      // setOpen(false); // set false to close all
    }
  }, [sidebarState]);

  const classes = useStyles();

  if (!childItem?.child?.length)
    return (
      <ListItemLinkCustom
        icon={icon}
        offerPl={offerPl}
        primary={primary}
        className={ClassName}
        rootPath={rootPath}
        to={childItem?.to}
      />
    );
  return (
    <>
      <Tooltip title={!sidebarState ? primary : ''} arrow placement="right">
        <ListItem
          sx={{ pl: offerPl }}
          className={ClassName}
          onClick={handleClick}
          button
        >
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          {primary && sidebarState && (
            <ListItemText className={classes.listItem} primary={primary} />
          )}
          {sidebarState && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
      </Tooltip>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {childItem?.child?.map((item, index) => {
            return (
              <ItemParent
                childItem={item}
                sidebarState={sidebarState}
                primary={item.label}
                isRecursive
                rootPath={rootPath}
                offerPl={offerPl + 2}
                icon={item.icon}
                to={childItem?.to}
                className={ClassName}
                // eslint-disable-next-line react/no-array-index-key
                key={`${childItem.to}-${index}`}
              />
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

function SideBar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const classes = useStyles();
  const [sidebarState, setSidebarState] = useRecoilState(sidebarStateAtom);

  const handleDrawerOpen = () => {
    setSidebarState(true);
  };

  const [_, rootPath] = pathname.split('/');

  const sideBarItemList = useMemo(() => {
    return getSidebarItems(t).filter((item) => {
      return item.to === `/${rootPath}`;
    });
  }, [pathname]);

  const handleDrawerClose = () => {
    setSidebarState(false);
  };

  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down('lg')
  );

  useEffect(() => {
    if (isMobileOrTablet) {
      setSidebarState(false);
      return;
    }
    setSidebarState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileOrTablet]);

  return (
    <Drawer
      variant="permanent"
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: sidebarState,
        [classes.drawerClose]: !sidebarState,
      })}
      classes={{
        paper: classNames(classes.drawerPaper, {
          [classes.drawerOpen]: sidebarState,
          [classes.drawerClose]: !sidebarState,
        }),
      }}
    >
      {sidebarState ? (
        <div
          className={classes.drawerCollapse}
          onClick={handleDrawerClose}
          role="button"
        >
          <ChevronLeft />
        </div>
      ) : (
        <div
          className="flex justify-center cursor-pointer py-2"
          onClick={handleDrawerOpen}
          role="button"
        >
          <Subject />
        </div>
      )}
      <div className={classes.drawerContainer}>
        <List disablePadding>
          {sideBarItemList.map((item, index) => {
            return (
              <React.Fragment key={`${item.label}-${item.to}`}>
                <ListItemLink
                  primary={item.label}
                  icon={item.icon}
                  to={item.to}
                  parent
                />
                {item.child?.map((childItem) => {
                  return childItem?.child?.length ? (
                    <ItemParent
                      sidebarState={sidebarState}
                      primary={childItem.label}
                      childItem={childItem}
                      icon={childItem.icon}
                      to={childItem.to}
                      className={classes.childList}
                      rootPath={rootPath}
                      key={`${childItem.label}-${childItem.to}`}
                    />
                  ) : (
                    <ListItemLink
                      primary={childItem.label}
                      icon={childItem.icon}
                      to={[item.to, childItem.to].join('/')}
                      className={classes.childList}
                      key={`${item.label}-${childItem.label}-${childItem.to}`}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </List>
      </div>
    </Drawer>
  );
}

export default SideBar;
