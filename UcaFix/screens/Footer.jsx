import React from 'react';
import styles from './styles'; // Import the styles for the footer
import { useNavigation } from '@react-navigation/native';
import {
    TouchableOpacity,
    Image,
    View
  } from 'react-native';

  
const Footer = (props) => {
    const navigation = useNavigation();
  return (  
    <View style={styles.footerContainer}>
        <TouchableOpacity
            onPress={() => navigation.navigate('MainScreen')}>
            <Image
              style={styles.tinyLogoFooter}
              source={{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACKklEQVR4nO2Yz0tVQRTHP0JakbXoB9QiaCNChPWgZYu3SKNw5d+gLnUpGEjLwBYuWrQI2rhs5y5CnyVFCa4jUAoxLBfiw4Wm+WLoXBgO0/OOb+Z2q/nA2dw58z3ne+/M3PseJBKJxL/ISeARsAF8Aybl2l/BJeAd0FCxBFym5PQAnxzNZ7EG3KSkDADbVrN7wIjEnnV9W3JdXAFuA7eAjqIabwPGgQOryU2g18rplWvZ+IHMabNyqsroiyKaPwFMq2XyEeh25HbLmJ07LRqGCTX2I3bz54F5VfQ1cKHJnLPASzXnLXAReODYM9G4DnxWxZ4A7TnmtkuuPddoPS/KwF1gyyqyD4wdQWcY+N7kxIpiYFTWZlagDvS3oNenNnc0A+ZIe6bEl4GrAbS7gA8xDZhNuaCEa8C5UAX4pVVzGGh2IOTiGrCiRJ9GeskcAx6rWqtApZX1WS/yaBN0vbr04s2Xok4Ghaum6cWbNzJZL6HYNKzIaps96M1peXSdf9DAGeCO9BBMNDaNGLX+GwOngCH5tHDFoOSEqOVFHlFzji8e8m1j4r3ktlLLmzyilRzNZ1Epo4GqlbMOPFTx1Rqvlt3AnGPcXEsGjkp6AqQlFG4JdUTcxMdjnUI7luj4b0zc8zBgcjVG876VY2oG45XHS8rErENj1lOjFtKAeXPuehSfcmhMeczfBW6ENJCZmFfLyVV4Rv6Bc/1wnznkRuzInQ/efCKRSCQSlJGfzJeMUP7NW3sAAAAASUVORK5CYII="
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.tinyLogoFooter}

                source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADyklEQVR4nO2ZS0tVURTHf+nNsm6RqUXqB6hpL/sCFWFNJKJJDyeZENWozCgnltNErUmRJI0qiPoAGRUNepEImZplRWoPB73MIowN68Jis++9ex+P3YL7hwWXs/dae61z1l6vC3nkkUccKAA2AE3ANaAPmAB+Ck3Is6vAMaBaeHKOKqAVeAtMB9Ib4DRQmQvFS4FzwFQExW36AXQCS/+W8juBjw5F3gHngV3AajFyrlAZsAbYDVwARh38H4Ads6l4Qt66ffAtoAYoDJS1FehxyOuQ9VhRDNy0DhoANsUgewswaMm+IWfGgoRD+S5gYVwHAEngksOIWL6E7TYnmD2ctM5qj+PChipv3uZx4BHwVeih5IhkBCO2R1W+1Io2xm2yYRUwkiFkvgJWesjpVjzvgZKZus6Ah88vBoY94v4LYFEWWUlgaCauVGUlqc0ePE1q/2egDlguVCfPUuuNntFpWiW7ihADWq0474PHimefY32/Wjd3wge3Fc8pX+ULrdrGJCkffFM85Y71ZWrdXGwfbFU8I74F4AarPEjk0IAEMKb41hPoy6a2IYIL1cfkQgYXFd9RPHBNMZjCzBfHrEu8V6LNIscl9lJEsEfxXcEDfYrBVJW+WCwhMo4wqrFW8fbigU+KwSSzEJgk9TKD8sOeiUyj3Cq5s0LH/yLCsVDc6QHwReiBxP4oBeA8Kx/MugFxY16oATNxodlAeagL6Uts2sB0mAM0AP3Ab4/La5Ph6ZeQa2Slw7rQS6zDqOlh06EhgtLpqD7DOXtDw6hvInseowHPMpzTpfYd8TGgWjGMZigltNtEaf3MtEK7kwtG7rjaZ3JCVhTI0ClbMfdd7YnSgC9Q/EaWC9uiFHPIxCzFaEYfLjxRew5FMOCw4jd1lAt31J6WEOGVEnNTzKa5sHFQrf+S+sYnbxTJXsOT4j/g2Fej1idDGxpk3JcSMOhoyE2CuWddxhH5ehuBFcB8oQp51urome+KLI2kVVe1EQGlkjhSQszcxpVkdNcUSj0ydrRxWe0Zj9rUI7NKfaAZebgixSErWmSjMeFJOOQ1W3trmSE6PIxI+baJGmeB+xKCJ4VG5VmntInp7kqzddYZYkBCxnxacLfnkMoXScttDF0PHBhnRLHDiKE00SkUNY5G6Hqcw139Jdod/nxb3CIkGyfE3e445LXF+eZd2J7mwo5JA75HUn6Z+HqR/F4rhVlXBv5a/hJK5GvoZBeVJuWtLyEHqJCJ2esIipuE1iIJL+cokKFTo9TsvdLZTQmZ309l7ag0Kf/E36x55MF/jj+gwS6O/MYeYwAAAABJRU5ErkJggg=="}}/>
        
        </TouchableOpacity>
        </View>
  );
};

export default Footer;
