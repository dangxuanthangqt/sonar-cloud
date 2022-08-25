import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import { TEXT_COLOR } from '@/layouts/constant';
import WrapCollapse from './WrapCollapse';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    height: '100%',
    paddingRight: '10px',
    borderBottom: '1px solid #E5E5E5',
    color: TEXT_COLOR.BLUE.BLUE1,
  },
  title: {
    height: '100%',
    minWidth: '135px',
    background: '#EDF4FB',
    fontWeight: 600,
    padding: '0  0 0 10px',
    fontSize: '12px',
    color: TEXT_COLOR.BLUE.BLUE1,
  },
}));

function ItemData({ title, children }) {
  const classes = useStyles();
  return (
    <div className={classNames('flex', classes.item)}>
      <div
        className={classNames('flex flex-col justify-center', classes.title)}
      >
        {title}
      </div>
      <div className={classNames('text-xs p-4')}>{children}</div>
    </div>
  );
}

function InititalDescription({ data }) {
  const classes = useStyles();
  return (
    <WrapCollapse title="Initial Description">
      <Grid container>
        <Grid style={{ margin: '0px' }} item xs={12} md={12}>
          <ItemData title="Initial Description">{data}</ItemData>
        </Grid>
      </Grid>
    </WrapCollapse>
  );
}

export default InititalDescription;
