import { createTheme } from '@mantine/core';
import styles from './theme.module.css';

const theme = createTheme({
  scale: 1.14285714,
  fontFamily: 'LXGW',
  black: '#303030',
  colors: {
    'main-color': [
      '#eaf7fd',
      '#e1e9ed',
      '#c5d0d5',
      '#a7b6bd',
      '#8da0a8',
      '#7c929c',
      '#728b97',
      '#5d7580',
      '#526b77',
      '#3f5d6a',
    ],
  },
  primaryShade: 7,
  primaryColor: 'main-color',
  lineHeights: 1,
  defaultRadius: '6px',
  headings: {
    fontWeight: 400,
    sizes: {
      h1: { fontSize: '2.57rem', margin: '0.5rem 0' },
    },
  },
  components: {
    Button: {
      defaultProps: {
        size: 'xs',
      },
      classNames: {
        root: styles.btnRoot,
      },
    },
    TextInput: {
      classNames: {
        error: styles.inputError,
      },
    },
    PasswordInput: {
      className: {
        error: styles.inputError,
      },
    },
  },
});

export default theme;
