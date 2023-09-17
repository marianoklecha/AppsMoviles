import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

export function MainScreen(props) {
    const onTap = (nextScreen) => {
      console.log('Button touched!');
      //props.navigation.navigate(nextScreen);
    };
    return (
      
      // 
      <View style={styles.back}>
        <View style={styles.TitleContainer}>
        <Image
              style={styles.UcaLogo}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Universidad_Cat%C3%B3lica_Argentina.png'
              }}
            />
            <Text style={[styles.title]}>UCA FIX</Text>
        </View>
        <SafeAreaView style={styles.container}>
          <Text style={[styles.text]}>BIENVENIDO/A</Text> 
          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#2277ee' }]}
            onPress={onTap}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD2klEQVR4nO2aS0tVURTHfw7yQUVYfYFUNEmzjJKaFJUJKTUoMJolln6BMBs1LRUdlA0aVRSRNSsrpAaaSPYYZ/aQnJU6SIUs09iwAtmsI95z9z733jx/2KDX63+tvc8+6w0xYsSIESOGb5QATcB14DnwEZgCfsmaks/M37rlu8VkOLYDHcA4sBhyfQXahSsjkAXUAoNJbDpovQSOioy0xC7glYeN22sIqCSNkAt0AfPLKP0DeAy0AHViE/KBNbLy5bM6+U4vML0Mn5HVCeSkevNFwLsAJReAR8CJkIqagz0pB7cQIOMtUEiKsBeYDNj4PaDMoaxy4H7AIUwAVUSMI8CMosx74IBHuQeBEUWu0aWaiLAnYPO3gHURyM8DbijyZ4F9Ubzzk8qVP0/0uKDYhu9AgS+BuYrBMwo0kjqcVQ7htS/v0KVcu1Q8eRstil4menQe5MxbQm6G5NqBe9y2dPvtUk6WEuEZa782BNcl4A/QgFsY4/tBCZ2doFa5YsYdhdn8UtvRjFvsV+xBjQviQYvUBDmJYqc8+aU8Pm5CjyWjP1nCMsXqh43wziiH4PombFNkmCgyNDosMhPbJ4OGCG5Cr8V/JRmycYvMJCek+SHUW9xjYYlKlJTWVYDh8xDylFDdRLAJo9kiMWmpS/g8hKcW77kwJN0WiYm4yJBDaLU4r4YheWGRmHjAB3x4h2MWX18Yki8Wic8yteubsNXi+hSGZMIi2YRfBB2CuSGJYrOSJieMOYskG//QXgfz++kEeXIsjp9hlJlb7Qcwsdpfgc//kRE0fcek3WAdmeMGj7twg92rPRBqskhMlpUpofAzi9cUTxNGsUUyLZXhTEiGZl0kQ0h/ftWmw0h5OdMKIk8s/suuS2LlaVwSq1AKo0mVxJDy8lJC06VN16LoQ9dFUWQsZdFBWbzFc1n8sKKn6WI7aYwMWcQjITvBvhoj64FRS8cBlwIqldaYaUelS2vsrtIaM/bAKTqVK2Za1KnGRUWvNh+CcoA3ihUPVXB0hCbF6g/7TN0LlTR5wVOesJInb2/+G7DFt+DdASNsD4ANvoWLwbujyJ+Vwa1IUB0wJ2Ra1Ic8y7Wt/b88xbjBSFEllZZFZfU4nu+tUIKcpdfeDG6lBAUyk6MptiApdL1kaInC/M8pie2DBiWHo3jnV+Id2sX3LgasGWlXtUrTohTYKNY6W34ulUpOq+Tzdkpr+/m2iAq1CQU4dt7gYw34CHJcokaSENcb73cV20eFMhlOGEti02OSz7ucO04JiqQud00qtKMycTona1JcaJ98pzGZMlaMGDFixIjBivAXHPTf+GkCkskAAAAASUVORK5CYII=',
              }}
            />
            <Text style={styles.buttonText}>Mis Pedidos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#2277ee' }]}
            onPress={onTap}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD2klEQVR4nO2aS0tVURTHfw7yQUVYfYFUNEmzjJKaFJUJKTUoMJolln6BMBs1LRUdlA0aVRSRNSsrpAaaSPYYZ/aQnJU6SIUs09iwAtmsI95z9z733jx/2KDX63+tvc8+6w0xYsSIESOGb5QATcB14DnwEZgCfsmaks/M37rlu8VkOLYDHcA4sBhyfQXahSsjkAXUAoNJbDpovQSOioy0xC7glYeN22sIqCSNkAt0AfPLKP0DeAy0AHViE/KBNbLy5bM6+U4vML0Mn5HVCeSkevNFwLsAJReAR8CJkIqagz0pB7cQIOMtUEiKsBeYDNj4PaDMoaxy4H7AIUwAVUSMI8CMosx74IBHuQeBEUWu0aWaiLAnYPO3gHURyM8DbijyZ4F9Ubzzk8qVP0/0uKDYhu9AgS+BuYrBMwo0kjqcVQ7htS/v0KVcu1Q8eRstil4menQe5MxbQm6G5NqBe9y2dPvtUk6WEuEZa782BNcl4A/QgFsY4/tBCZ2doFa5YsYdhdn8UtvRjFvsV+xBjQviQYvUBDmJYqc8+aU8Pm5CjyWjP1nCMsXqh43wziiH4PombFNkmCgyNDosMhPbJ4OGCG5Cr8V/JRmycYvMJCek+SHUW9xjYYlKlJTWVYDh8xDylFDdRLAJo9kiMWmpS/g8hKcW77kwJN0WiYm4yJBDaLU4r4YheWGRmHjAB3x4h2MWX18Yki8Wic8yteubsNXi+hSGZMIi2YRfBB2CuSGJYrOSJieMOYskG//QXgfz++kEeXIsjp9hlJlb7Qcwsdpfgc//kRE0fcek3WAdmeMGj7twg92rPRBqskhMlpUpofAzi9cUTxNGsUUyLZXhTEiGZl0kQ0h/ftWmw0h5OdMKIk8s/suuS2LlaVwSq1AKo0mVxJDy8lJC06VN16LoQ9dFUWQsZdFBWbzFc1n8sKKn6WI7aYwMWcQjITvBvhoj64FRS8cBlwIqldaYaUelS2vsrtIaM/bAKTqVK2Za1KnGRUWvNh+CcoA3ihUPVXB0hCbF6g/7TN0LlTR5wVOesJInb2/+G7DFt+DdASNsD4ANvoWLwbujyJ+Vwa1IUB0wJ2Ra1Ic8y7Wt/b88xbjBSFEllZZFZfU4nu+tUIKcpdfeDG6lBAUyk6MptiApdL1kaInC/M8pie2DBiWHo3jnV+Id2sX3LgasGWlXtUrTohTYKNY6W34ulUpOq+Tzdkpr+/m2iAq1CQU4dt7gYw34CHJcokaSENcb73cV20eFMhlOGEti02OSz7ucO04JiqQud00qtKMycTona1JcaJ98pzGZMlaMGDFixIjBivAXHPTf+GkCkskAAAAASUVORK5CYII=',
              }}
            />
            <Text style={styles.buttonText}>Pedidos Resueltos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#2277ee' }]}
            onPress={onTap}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD2klEQVR4nO2aS0tVURTHfw7yQUVYfYFUNEmzjJKaFJUJKTUoMJolln6BMBs1LRUdlA0aVRSRNSsrpAaaSPYYZ/aQnJU6SIUs09iwAtmsI95z9z733jx/2KDX63+tvc8+6w0xYsSIESOGb5QATcB14DnwEZgCfsmaks/M37rlu8VkOLYDHcA4sBhyfQXahSsjkAXUAoNJbDpovQSOioy0xC7glYeN22sIqCSNkAt0AfPLKP0DeAy0AHViE/KBNbLy5bM6+U4vML0Mn5HVCeSkevNFwLsAJReAR8CJkIqagz0pB7cQIOMtUEiKsBeYDNj4PaDMoaxy4H7AIUwAVUSMI8CMosx74IBHuQeBEUWu0aWaiLAnYPO3gHURyM8DbijyZ4F9Ubzzk8qVP0/0uKDYhu9AgS+BuYrBMwo0kjqcVQ7htS/v0KVcu1Q8eRstil4menQe5MxbQm6G5NqBe9y2dPvtUk6WEuEZa782BNcl4A/QgFsY4/tBCZ2doFa5YsYdhdn8UtvRjFvsV+xBjQviQYvUBDmJYqc8+aU8Pm5CjyWjP1nCMsXqh43wziiH4PombFNkmCgyNDosMhPbJ4OGCG5Cr8V/JRmycYvMJCek+SHUW9xjYYlKlJTWVYDh8xDylFDdRLAJo9kiMWmpS/g8hKcW77kwJN0WiYm4yJBDaLU4r4YheWGRmHjAB3x4h2MWX18Yki8Wic8yteubsNXi+hSGZMIi2YRfBB2CuSGJYrOSJieMOYskG//QXgfz++kEeXIsjp9hlJlb7Qcwsdpfgc//kRE0fcek3WAdmeMGj7twg92rPRBqskhMlpUpofAzi9cUTxNGsUUyLZXhTEiGZl0kQ0h/ftWmw0h5OdMKIk8s/suuS2LlaVwSq1AKo0mVxJDy8lJC06VN16LoQ9dFUWQsZdFBWbzFc1n8sKKn6WI7aYwMWcQjITvBvhoj64FRS8cBlwIqldaYaUelS2vsrtIaM/bAKTqVK2Za1KnGRUWvNh+CcoA3ihUPVXB0hCbF6g/7TN0LlTR5wVOesJInb2/+G7DFt+DdASNsD4ANvoWLwbujyJ+Vwa1IUB0wJ2Ra1Ic8y7Wt/b88xbjBSFEllZZFZfU4nu+tUIKcpdfeDG6lBAUyk6MptiApdL1kaInC/M8pie2DBiWHo3jnV+Id2sX3LgasGWlXtUrTohTYKNY6W34ulUpOq+Tzdkpr+/m2iAq1CQU4dt7gYw34CHJcokaSENcb73cV20eFMhlOGEti02OSz7ucO04JiqQud00qtKMycTona1JcaJ98pzGZMlaMGDFixIjBivAXHPTf+GkCkskAAAAASUVORK5CYII=',
              }}
            />
            <Text style={styles.buttonText}>Nuevo Pedido</Text>
          </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.footerContainer}>
          <Image style={styles.tinyLogo}
              source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACKklEQVR4nO2Yz0tVQRTHP0JakbXoB9QiaCNChPWgZYu3SKNw5d+gLnUpGEjLwBYuWrQI2rhs5y5CnyVFCa4jUAoxLBfiw4Wm+WLoXBgO0/OOb+Z2q/nA2dw58z3ne+/M3PseJBKJxL/ISeARsAF8Aybl2l/BJeAd0FCxBFym5PQAnxzNZ7EG3KSkDADbVrN7wIjEnnV9W3JdXAFuA7eAjqIabwPGgQOryU2g18rplWvZ+IHMabNyqsroiyKaPwFMq2XyEeh25HbLmJ07LRqGCTX2I3bz54F5VfQ1cKHJnLPASzXnLXAReODYM9G4DnxWxZ4A7TnmtkuuPddoPS/KwF1gyyqyD4wdQWcY+N7kxIpiYFTWZlagDvS3oNenNnc0A+ZIe6bEl4GrAbS7gA8xDZhNuaCEa8C5UAX4pVVzGGh2IOTiGrCiRJ9GeskcAx6rWqtApZX1WS/yaBN0vbr04s2Xok4Ghaum6cWbNzJZL6HYNKzIaps96M1peXSdf9DAGeCO9BBMNDaNGLX+GwOngCH5tHDFoOSEqOVFHlFzji8e8m1j4r3ktlLLmzyilRzNZ1Epo4GqlbMOPFTx1Rqvlt3AnGPcXEsGjkp6AqQlFG4JdUTcxMdjnUI7luj4b0zc8zBgcjVG876VY2oG45XHS8rErENj1lOjFtKAeXPuehSfcmhMeczfBW6ENJCZmFfLyVV4Rv6Bc/1wnznkRuzInQ/efCKRSCQSlJGfzJeMUP7NW3sAAAAASUVORK5CYII="}}/>
          <Image style={styles.tinyLogo}
              source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADyklEQVR4nO2ZS0tVURTHf+nNsm6RqUXqB6hpL/sCFWFNJKJJDyeZENWozCgnltNErUmRJI0qiPoAGRUNepEImZplRWoPB73MIowN68Jis++9ex+P3YL7hwWXs/dae61z1l6vC3nkkUccKAA2AE3ANaAPmAB+Ck3Is6vAMaBaeHKOKqAVeAtMB9Ib4DRQmQvFS4FzwFQExW36AXQCS/+W8juBjw5F3gHngV3AajFyrlAZsAbYDVwARh38H4Ads6l4Qt66ffAtoAYoDJS1FehxyOuQ9VhRDNy0DhoANsUgewswaMm+IWfGgoRD+S5gYVwHAEngksOIWL6E7TYnmD2ctM5qj+PChipv3uZx4BHwVeih5IhkBCO2R1W+1Io2xm2yYRUwkiFkvgJWesjpVjzvgZKZus6Ah88vBoY94v4LYFEWWUlgaCauVGUlqc0ePE1q/2egDlguVCfPUuuNntFpWiW7ihADWq0474PHimefY32/Wjd3wge3Fc8pX+ULrdrGJCkffFM85Y71ZWrdXGwfbFU8I74F4AarPEjk0IAEMKb41hPoy6a2IYIL1cfkQgYXFd9RPHBNMZjCzBfHrEu8V6LNIscl9lJEsEfxXcEDfYrBVJW+WCwhMo4wqrFW8fbigU+KwSSzEJgk9TKD8sOeiUyj3Cq5s0LH/yLCsVDc6QHwReiBxP4oBeA8Kx/MugFxY16oATNxodlAeagL6Uts2sB0mAM0AP3Ab4/La5Ph6ZeQa2Slw7rQS6zDqOlh06EhgtLpqD7DOXtDw6hvInseowHPMpzTpfYd8TGgWjGMZigltNtEaf3MtEK7kwtG7rjaZ3JCVhTI0ClbMfdd7YnSgC9Q/EaWC9uiFHPIxCzFaEYfLjxRew5FMOCw4jd1lAt31J6WEOGVEnNTzKa5sHFQrf+S+sYnbxTJXsOT4j/g2Fej1idDGxpk3JcSMOhoyE2CuWddxhH5ehuBFcB8oQp51urome+KLI2kVVe1EQGlkjhSQszcxpVkdNcUSj0ydrRxWe0Zj9rUI7NKfaAZebgixSErWmSjMeFJOOQ1W3trmSE6PIxI+baJGmeB+xKCJ4VG5VmntInp7kqzddYZYkBCxnxacLfnkMoXScttDF0PHBhnRLHDiKE00SkUNY5G6Hqcw139Jdod/nxb3CIkGyfE3e445LXF+eZd2J7mwo5JA75HUn6Z+HqR/F4rhVlXBv5a/hJK5GvoZBeVJuWtLyEHqJCJ2esIipuE1iIJL+cokKFTo9TsvdLZTQmZ309l7ag0Kf/E36x55MF/jj+gwS6O/MYeYwAAAABJRU5ErkJggg=="}}/>
  
          </View>
          
      </View>
      
    );
  };
  
  const styles = StyleSheet.create({
    back:{
      width:'100%',
      height:'100%',
      backgroundColor: 'lightgrey'
  
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 36,
      // backgroundColor: '#021B6F'
    },
    button: {
      padding: 12,
      marginBottom: 30,
      flexDirection: 'row',
      borderRadius: 6
    },
    buttonText: {
      marginTop: 10,
      marginLeft: 20,
      fontSize: 20,
      color: "black"
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    text :{
      fontSize: 25,
      marginBottom:20,
      color: 'black',
    },
    title :{
      fontSize: 45,
      marginTop:20,
      color: 'black',
      fontWeight: 'bold',
      marginBottom:'2%'
  
    },
    TitleContainer:{
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2277ee',
      padding:'3%'
    },
    UcaLogo:{
      width: 50,
      height: 50,
      marginTop:15,
    },
    footerContainer:{
      flexDirection: 'row', 
      justifyContent: 'space-between',  // Align items to the right
      backgroundColor: '#2277ee',
      padding:'2%',
      
    }
  });