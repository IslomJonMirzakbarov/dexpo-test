// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: theme.shape.borderRadius,
          ...theme.typography.body2,
          '&:hover': {
            boxShadow: 'none'
          }
        },
        sizeLarge: {
          height: 48
        },
        containedInherit: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.main.pink,
          '&:hover': {
            backgroundColor: theme.palette.main.pink_hovered
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
          color: theme.palette.common.white
        },
        containedSecondary1: {
          background: theme.palette.gradients.secondary1,
          color: theme.palette.common.white
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
