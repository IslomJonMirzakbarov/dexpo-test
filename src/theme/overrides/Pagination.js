// ----------------------------------------------------------------------

import { alpha } from '@mui/system';

export default function Pagination(theme) {
  return {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            fontWeight: theme.typography.fontWeightBold
          }
        },
        textPrimary: {
          color: theme.palette.grey[1000],
          '&.Mui-selected': {
            color: theme.palette.common.black,
            backgroundColor: theme.palette.grey[1300],
            '&:hover, &.Mui-focusVisible': {
              backgroundColor: `${theme.palette.grey[1300]} !important`
            }
          }
        },
        outlined: {
          border: `1px solid ${theme.palette.grey[500_32]}`
        },
        outlinedPrimary: {
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`
          }
        }
      }
    }
  };
}
