import { useState } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  ListItemButton,
  Paper,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AddCircleOutlined, ExpandMore } from '@mui/icons-material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { useDataSourceSummary } from 'hooks/use-data-source-summary';
import SummaryChip from '@/components/Summary-chip';

const useCriteriaStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    height: '24px',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& .MuiTypography-root': {
      color: theme.palette.primary.main,
      fontSize: 16,
      fontWeight: 700,
    },
  },
  label: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
    marginBlock: 4,
  },
  additional_label: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: 400,
  },
  customIcon: {
    fontSize: 20,
    borderRadius: '50%',
    backgroundColor: '#0F81C0',
    color: '#FFFFFF',
  },
  data_source: {
    padding: 10,
    backgroundColor: theme.palette.primary.light,
    fontSize: 11,
    borderRadius: 4,
    color: theme.palette.secondary.mian,
    fontWeight: 400,
    line_height: 19,
    marginBlock: 2,
    textTransform: 'uppercase',
  },
  heading: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
    marginBlock: 12,
  },
}));

function AdditionalOptionalField({ data }) {
  const classes = useCriteriaStyles();

  const [open, setOpen] = useState(true);

  const dataSourceSummary = useDataSourceSummary('keywords');
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Typography className={classes.label}>
        Additional optional fields
      </Typography>
      <Typography className={classes.additional_label}>
        Below are some data sources that can have additional parameters.
      </Typography>
      <Paper className="rounded-lg overflow-hidden " sx={{ marginBlock: 2 }}>
        <ListItemButton
          sx={{
            backgroundColor: '#EDF4FB',
            display: 'flex',
            width: '100%',
            alignItems: 'center',
          }}
          onClick={handleClick}
        >
          <div className={classes.header}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {open ? (
                <ExpandLessRoundedIcon className={classes.customIcon} />
              ) : (
                <ExpandMore className={classes.customIcon} />
              )}
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '700',
                  alignSelf: 'center',
                  marginLeft: '10px',
                }}
              >
                Labels
              </Typography>
            </Box>
            <Box sx={{ display: 'inherit', alignItems: 'center' }}>
              <IconButton color="primary" size="small">
                <AddCircleOutlined color="primary" />
              </IconButton>
              <Typography
                sx={{
                  padding: '0.05rem 0.2rem',
                  marginTop: '0.2rem',
                  marginBottom: '0.2rem',
                }}
              >
                Review
              </Typography>
            </Box>
          </div>
        </ListItemButton>
        <Collapse sx={{ marginTop: 1 }} in={open} timeout="auto" unmountOnExit>
          {['label1', 'label2', 'label3']?.map((i, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <SummaryChip key={index} name={i} />;
          })}
        </Collapse>
      </Paper>
    </div>
  );
}
export default AdditionalOptionalField;
