import React from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { FlatList } from "react-native-gesture-handler"

const API_URL = "http://www.themealdb.com/api/json/v1/1/"

const Categories = (props) => {
    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        fetchCategories()
    }, [])

   const fetchCategories = async () => {
        let categories = await fetch(API_URL + "categories.php")
        categories = await categories.json()
        setCategories(categories.categories)

        console.log(categories)
    }


    return(
        <View style={{display: 'flex', backgroundColor: 'lightgrey', width: '100%', height:'100%', padding: 10}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 36, textAlign: 'center', color: "black"}}>Categories</Text>
            </View>
            <View style={{flex: 5}}>
                <FlatList 
                    data={categories}
                    ListEmptyComponent={
                        <View>
                            <Text style={{color: 'black'}}>No hay categorías cargadas</Text>
                        </View>
                    }
                    renderItem={ ({item}) => 
                    <TouchableOpacity 
                    style={{flexDirection: "row", alignItems: 'center', width: '100%', elevation: 7, backgroundColor: 'white', marginVertical: 5, borderRadius: 10}}
                    onPress={() => props.navigation.navigate("Meals", {categoryName: item.strCategory})}
                    >
                        <Image style={{width: 60, height: 60, flex: 1}} source={{uri: item.strCategoryThumb}}/>
                        <View style={{flex: 5, alignItems: 'center'}}>
                            <Text style={{color: 'black'}}> {item.strCategory} </Text>
                        </View>
                    </TouchableOpacity>

                }
                />
            </View>
        </View>
    )
}

export default Categories