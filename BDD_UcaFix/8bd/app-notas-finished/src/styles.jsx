import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        display: 'flex', backgroundColor: 'lightgrey', width: '100%', height: '100%', padding: 10
    },
    titleContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    titleText: {
        fontSize: 36, textAlign: 'center', color: "black"
    },
    button: {
        backgroundColor: 'white', borderRadius: 10, alignItems: 'center'
    },
    buttonText: {
        color: 'black', margin: 5, elevation: 5, padding: 7
    },
    largePurpleButton: {
        backgroundColor: 'purple', borderRadius: 10, width: '60%', margin: 5
    },
    largePurpleButtonText: {
        margin: 5, elevation: 5, padding: 7, textAlign: 'center', fontSize: 30, color: 'white'
    },
    textInputContainer: {
        backgroundColor: "white", borderRadius: 10, paddingHorizontal: 5, margin: 5, width: '80%', alignSelf: 'center'
    },
    postsInputContainer: {
        backgroundColor: "white", width: '100%', height: '100%', borderBottomStartRadius: 20, borderBottomEndRadius: 20
    },
    midContainer: {
        flex: 5, justifyContent: 'center', alignItems: 'stretch', backgroundColor: 'rgb(200,200,200)', margin: 10, borderRadius: 20
    },
    bottomContainer: {
        flex: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(200,200,200)', margin: 10, borderRadius: 20
    },
    flatlistItemText: {
        color: 'black'
    },
    flatlistItemContainer: {
        flexDirection: "row", alignItems: 'center', width: '100%', elevation: 7, backgroundColor: 'white', marginVertical: 5, borderRadius: 10
    },
    postItemContainer: {
        flexDirection: "row", alignItems: 'center', width: '100%', elevation: 7, backgroundColor: 'white', marginVertical: 5, borderRadius: 10
    },
    postItemText: {
        color: 'black',
        marginVertical: 5
    },
    flatlistContentContainer: {
        marginHorizontal: 5
    },
    flatlistContainer: {
        borderColor: 'red',
        borderWidth: 1,
        margin: 1,
        height: '100%'
    }
})

export { styles }