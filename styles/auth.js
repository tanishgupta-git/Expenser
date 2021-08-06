import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor : '#fcfcfc',   
    },
    logHeader : {
        flexDirection : 'row',
        justifyContent :'space-between',
        alignItems :'center',
        padding:20,
        borderColor:'#ffffff',
        borderWidth:1,
        borderStyle :'solid',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        backgroundColor:'#ffffff'
    },
    name : {
        color: '#6A6D76',
        fontSize : 22,
        fontWeight : '900'
    },
    linkPage : {
        fontSize : 15,
        color : '#FF3378'
    },
    formContainer : {
        flex:1,
        padding: 20
    },
    formInputContainer:{
      marginVertical:20
    },
    formPasswordContainer:{
        marginVertical:20,
        flexDirection:'row',
        alignItems:'center',
    
    }, 
    formPasswordInput :{
        flex: 1,
        marginRight:20
    },
    formInput : {
        padding: 10,
        paddingLeft:0,
        borderBottomWidth:2,
        borderColor:'#E3E4E5',
        fontSize:20,
        fontWeight:'bold'

    },
    textHeading : {
        fontSize :25,
        marginVertical:10,
        fontWeight:'bold',
        color: '#000000',

    },
    formsubmitButton : {
        backgroundColor:'#FF3378',
        padding: 12,
        borderRadius:15,
        marginHorizontal:5
    },
    formInputLabel : {
        color: '#afb2b6',
        fontWeight:'bold'
    },
    dashSvgContainer : {
    
        alignItems:'center'
    }
})
