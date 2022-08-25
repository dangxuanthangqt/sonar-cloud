import { Chip } from '@mui/material';
import { Box, margin } from '@mui/system';

function SummaryChip({ name }) {
  const handleDelete = (item) => {};
  return (
    // <Box}>
    <Chip
      sx={{ margin: 1 }}
      label={name}
      color="primary"
      className="text-sm font-medium mr-1 mt-[3px]"
      onDelete={handleDelete}
    />
    // </Box>
  );
}

export default SummaryChip;
