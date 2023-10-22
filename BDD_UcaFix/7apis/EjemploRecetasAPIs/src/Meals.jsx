import React from "react"
import { View, Text, TouchableOpacity, Image, Modal, ScrollView } from "react-native"
import { FlatList } from "react-native-gesture-handler"

const API_URL = "http://www.themealdb.com/api/json/v1/1/"

const Meals = (props) => {
    const [meals, setMeals] = React.useState([])
    const [selectedMeal, setSelectedMeal] = React.useState(null)
    const [selectedMealDetails, setSelectedMealDetails] = React.useState(null)


    React.useEffect(() => {
        fetchMeals()
    }, [])

    React.useEffect(() =>{
        if(selectedMeal){
            fetchMeal(selectedMeal.idMeal)
        }
    }, [selectedMeal])

    const fetchMeals = async () => {
        let meals = await fetch(API_URL + "filter.php?c=" + props.route.params.categoryName)
        meals = await meals.json()
        setMeals(meals.meals)

        console.log(meals)
    }
    const fetchMeal = async (idMeal) => {
        let meal = await fetch(API_URL + "lookup.php?i=" + idMeal)
        meal = await meal.json()
        setSelectedMealDetails(meal.meals[0])
        console.log(meal)
    }


    return (
        <>
            <View style={{ display: 'flex', backgroundColor: 'lightgrey', width: '100%', height: '100%', padding: 10 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 36, textAlign: 'center', color: "black" }}>Meals</Text>
                </View>
                <View style={{ flex: 5 }}>
                    <FlatList
                        data={meals}
                        ListEmptyComponent={
                            <View>
                                <Text style={{ color: 'black' }}>No hay categorías cargadas</Text>
                            </View>
                        }
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: 'center', width: '100%', elevation: 7, backgroundColor: 'white', marginVertical: 5, borderRadius: 10 }}
                                onPress={() => setSelectedMeal(item)}
                            >
                                <Image style={{ width: 60, height: 60, flex: 1 }} source={{ uri: item.strMealThumb }} />
                                <View style={{ flex: 5, alignItems: 'center' }}>
                                    <Text style={{ color: 'black' }}> {item.strMeal} </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>
            {selectedMeal &&
                <Modal transparent={true}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', display: 'flex' }}>
                        <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex', width: "80%", height: "80%" }}>
                            <TouchableOpacity style={{ width: '100%', alignItems: "flex-end", padding: 10 }} onPress={() => setSelectedMeal(null)}>
                                <Text style={{ color: "black" }} >X</Text>
                            </TouchableOpacity>
                            <Image style={{ width: '100%', height: '30%' }} source={{ uri: selectedMeal.strMealThumb }} />
                            <Text style={{color: 'black'}}>{selectedMeal.strMeal}</Text>
                            <ScrollView>
                                <Text style={{color: 'black'}}>{selectedMealDetails? selectedMealDetails.strMeal : "Cargando" }</Text>
                                <Text style={{color: 'black'}}>{selectedMealDetails? selectedMealDetails.strInstructions : "Cargando" }</Text>

                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            }

        </>
    )
}

export default Meals