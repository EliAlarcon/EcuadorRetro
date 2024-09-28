import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root:{
        flex: 1,
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 20
    },
    text:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textRout:{
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    rootHeader:{
        gap: 10,
    },
    modalProfile:{
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        gap: 12
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconHeader:{
        flex: 1,
        alignItems:'flex-end'
    }
})

export default styles;