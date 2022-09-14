// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          textTransform: 'none',
          borderRadius: theme.shape.borderRadius,
          ...theme.typography.body2,
          fontWeight: 600,
          height: 55,
          '&:hover': {
            boxShadow: 'none'
          },
          '&.Mui-disabled': {
            background: '#BABABA!important',
            color: theme.palette.common.white
          }
        },
        sizeLarge: {
          height: 48
        },
        containedInherit: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.common.black,
          '&:hover': {
            // color: theme.palette.common.black,
            backgroundColor: theme.palette.primary.main
          }
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
          backgroundColor: theme.palette.main.pink,
          color: theme.palette.common.white,
          padding: '12px 62px',
          '&:hover': {
            backgroundColor: theme.palette.main.pink_hovered
          }
        },
        containedSecondary: {
          background: theme.palette.gradients.secondary,
          color: theme.palette.common.white,
          '&:hover': {
            background: theme.palette.primary.main
          }
        },
        containedSecondary1: {
          background: theme.palette.gradients.secondary1,
          color: theme.palette.common.white,
          '&:hover': {
            backgroundColor: theme.palette.primary.main
          }
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        outlinedDark: {
          border: `1px solid ${theme.palette.common.white}`,
          backgroundColor: 'transparent',
          color: theme.palette.common.white,
          padding: '12px 62px',
          '&:hover': {
            color: theme.palette.grey[1000],
            borderColor: theme.palette.grey[1000]
          }
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }
      }
    }
  };
}
