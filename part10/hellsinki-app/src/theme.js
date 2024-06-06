import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';
const IosFont = "Arial"
const AndroidFont = "Roboto"
const fontFamily = isAndroid ? AndroidFont : IosFont

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: fontFamily,
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
};
  
export default theme;