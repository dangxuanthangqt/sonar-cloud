import styled from '@emotion/styled';
import ArchiveIcon from '@mui/icons-material/Archive';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DownloadIcon from '@mui/icons-material/Download';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ShareIcon from '@mui/icons-material/Share';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Tooltip,
  tooltipClasses,
} from '@mui/material';
import React, { useState } from 'react';

const TooltipCustom = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    // color: '#12293E',
    color: 'transparent',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#12293E',
    color: 'white',
  },
}));

export default function ActionCustom({ rowId = null, apiRef = null }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openTooltip, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDownload = () => {
    apiRef?.current?.exportDataAsCsv({
      //   fields: ['actions'],
      getRowsToExport: () => [rowId],
    });
  };
  // eslint-disable-next-line consistent-return
  const copyToClipboard = () => {
    const text = JSON.stringify(apiRef?.current?.getRow(rowId));
    handleTooltipOpen();
    setTimeout(() => handleTooltipClose(), 1000);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
      }
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <IconButton onClick={handleDownload} sx={{ color: '#2E7D32' }}>
        <DownloadIcon sx={{ fontSize: '20px' }} />
      </IconButton>
      <TooltipCustom
        PopperProps={{
          disablePortal: true,
        }}
        sx={{ background: 'gray' }}
        placement="right"
        onClose={handleTooltipClose}
        open={openTooltip}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="Copied !"
      >
        <IconButton onClick={copyToClipboard} sx={{ color: '#1976D2' }}>
          <FileCopyIcon sx={{ fontSize: '20px' }} />
        </IconButton>
      </TooltipCustom>
      <IconButton sx={{ color: '#D2A919' }}>
        <StickyNote2OutlinedIcon sx={{ fontSize: '20px' }} />
      </IconButton>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          aria-label="contacts"
        >
          <ListItem disablePadding>
            <ListItemButton onClick={copyToClipboard}>
              <ListItemIcon sx={{ color: '#1976D2' }}>
                <FileCopyIcon sx={{ fontSize: '20px' }} />
              </ListItemIcon>
              <ListItemText primary="Copy" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#DE4A0A' }}>
                <ArchiveIcon sx={{ fontSize: '20px' }} />
              </ListItemIcon>
              <ListItemText primary="Archive" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleDownload}>
              <ListItemIcon sx={{ color: '#2E7D32' }}>
                <DownloadIcon sx={{ fontSize: '20px' }} />
              </ListItemIcon>
              <ListItemText primary="Download" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#D2A919' }}>
                <StickyNote2OutlinedIcon sx={{ fontSize: '20px' }} />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#7A3779' }}>
                <ShareIcon sx={{ fontSize: '20px' }} />
              </ListItemIcon>
              <ListItemText primary="Share" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
}
