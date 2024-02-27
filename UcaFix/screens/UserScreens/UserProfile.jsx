import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export function UserProfile (props) { 
  const propsUserData = props.route.params.userData;
  const userName = propsUserData.name;
  const userEmail = propsUserData.email;

  return (
    <>
      <View style={styles.TitleContainer}>
        <Image
          style={styles.UcaLogo}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Universidad_Cat%C3%B3lica_Argentina.png'
          }}/>
        <Text style={[styles.title]}>UCA FIX</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{userEmail}</Text>

        <TouchableOpacity
          style={[styles.button]}
          onPress={() => props.navigation.navigate('PedidosResueltos')}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD2klEQVR4nO2aS0tVURTHfw7yQUVYfYFUNEmzjJKaFJUJKTUoMJolln6BMBs1LRUdlA0aVRSRNSsrpAaaSPYYZ/aQnJU6SIUs09iwAtmsI95z9z733jx/2KDX63+tvc8+6w0xYsSIESOGb5QATcB14DnwEZgCfsmaks/M37rlu8VkOLYDHcA4sBhyfQXahSsjkAXUAoNJbDpovQSOioy0xC7glYeN22sIqCSNkAt0AfPLKP0DeAy0AHViE/KBNbLy5bM6+U4vML0Mn5HVCeSkevNFwLsAJReAR8CJkIqagz0pB7cQIOMtUEiKsBeYDNj4PaDMoaxy4H7AIUwAVUSMI8CMosx74IBHuQeBEUWu0aWaiLAnYPO3gHURyM8DbijyZ4F9Ubzzk8qVP0/0uKDYhu9AgS+BuYrBMwo0kjqcVQ7htS/v0KVcu1Q8eRstil4menQe5MxbQm6G5NqBe9y2dPvtUk6WEuEZa782BNcl4A/QgFsY4/tBCZ2doFa5YsYdhdn8UtvRjFvsV+xBjQviQYvUBDmJYqc8+aU8Pm5CjyWjP1nCMsXqh43wziiH4PombFNkmCgyNDosMhPbJ4OGCG5Cr8V/JRmycYvMJCek+SHUW9xjYYlKlJTWVYDh8xDylFDdRLAJo9kiMWmpS/g8hKcW77kwJN0WiYm4yJBDaLU4r4YheWGRmHjAB3x4h2MWX18Yki8Wic8yteubsNXi+hSGZMIi2YRfBB2CuSGJYrOSJieMOYskG//QXgfz++kEeXIsjp9hlJlb7Qcwsdpfgc//kRE0fcek3WAdmeMGj7twg92rPRBqskhMlpUpofAzi9cUTxNGsUUyLZXhTEiGZl0kQ0h/ftWmw0h5OdMKIk8s/suuS2LlaVwSq1AKo0mVxJDy8lJC06VN16LoQ9dFUWQsZdFBWbzFc1n8sKKn6WI7aYwMWcQjITvBvhoj64FRS8cBlwIqldaYaUelS2vsrtIaM/bAKTqVK2Za1KnGRUWvNh+CcoA3ihUPVXB0hCbF6g/7TN0LlTR5wVOesJInb2/+G7DFt+DdASNsD4ANvoWLwbujyJ+Vwa1IUB0wJ2Ra1Ic8y7Wt/b88xbjBSFEllZZFZfU4nu+tUIKcpdfeDG6lBAUyk6MptiApdL1kaInC/M8pie2DBiWHo3jnV+Id2sX3LgasGWlXtUrTohTYKNY6W34ulUpOq+Tzdkpr+/m2iAq1CQU4dt7gYw34CHJcokaSENcb73cV20eFMhlOGEti02OSz7ucO04JiqQud00qtKMycTona1JcaJ98pzGZMlaMGDFixIjBivAXHPTf+GkCkskAAAAASUVORK5CYII=',
            }}
          />
          <Text style={styles.buttonText}>Ver mis pedidos</Text>
        </TouchableOpacity>
          
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => console.log("Sesión cerrada")}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZElEQVR4nO2ZTUoDQRCFv1WOkfi7nwhewIleSMWFa8UTxOQEuYFnMUESY7YGjQpuAiMDvSgGxCxedyzoD5rs3qvXM11paiCTyWT+OzvAEFgAa6ASrHXQGwCdmMWfAR+ion9bK6AXa+djF1+ZEG11gKExmAInQEukXeuUwMx43CNmYcTr4mNQGo+5WtweWNXON2kB38HjSy1u39GY3ACf4ddlgGjkABuyD1wABzh9AuPgsQSOPAZ4ND7SEKkCdEPh8hApD3EBvBq/N+DYWxcq1CG20UYLZYi/AtTt7xy4Eq9Rw3sZzok8wFOiq3YFTLwHGMcIsAdcA3fi9ZDqFXJ/iNUUntto4fmPrOv9KjHxfpmber9OHwKXwK5aeBttVEoOsCG3scYq7gdbLwlGiz3j8awWHxjxWTBTDndPG8PdPmI6Yeyd4rr8HmO8Ttj1VYLiSyLSDo93Lv7EVOv1Y+18JpPJkIQfKpKPLTg0kzEAAAAASUVORK5CYII=',
            }}
          />
          <Text style={styles.buttonText}>Cerrar sesión     </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color:"black"
  },
  email: {
    fontSize: 16,
    marginTop: 5,
    color:"black"
  },
  TitleContainer:{
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'left',
    //backgroundColor: '#3FA7D6',
    padding:'3%',
  },UcaLogo: {
    width: 35,
    height: 35,
    marginLeft: '5%',
  },
  title: {
    fontSize: 30,
    marginTop: 5,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: '2%',
  },
  button: {
    padding: 12,
    margin: 30,
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: '#2F61AF'
  },
  buttonText: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  tinyLogo: {
    width: 50,
    height: 50,
    tintColor: 'black'
  }
});

