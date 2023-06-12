import ohriLogoLight from './images/ohri_logo_lightbg.svg';
import ohriLogoDark from './images/ohri_logo_darkbg.svg';

export default {
  '@openmrs/esm-login-app': {
    logo: {
      src: ohriLogoLight,
    },
  },
  '@openmrs/esm-primary-navigation-app': {
    logo: {
      src: ohriLogoDark,
    },
  },
  '@openmrs/esm-dispensing-app': {
    'appName': 'Dispensing'
  },
};
