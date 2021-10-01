import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : '#FCFCFC'
    },
    header: {
     flexDirection:'row',   
     alignItems:'center',
     padding:10,
     paddingLeft:20,
     backgroundColor:'#ffffff',
     borderBottomRightRadius:20,
     borderBottomLeftRadius:20
    },
    headingPage:{
       fontSize:25,
       marginLeft:15,
       fontWeight:'bold'
    },
   svgContainer : {
       alignItems : 'center',
       marginBottom:20
   },
   questionHead : {
       fontSize:25,
       fontWeight : 'bold',
       width:260,
       marginLeft:20
   },
   formQuestions : {
       flex:1
   },
   transboxContainer:{ 
       flexDirection : 'row',
       justifyContent:'space-around',
       paddingVertical:30
   },
   transbox : {
       width: 140,
       height: 170,
       backgroundColor:'#ffffff',
       borderRadius:20,
       elevation:2,
       padding: 20,
       justifyContent:'space-between'
   },
   transboxText:{
       fontSize:20,
       fontWeight:'bold'
   },
   transDetails : {
     justifyContent : 'space-between'
   },
   transTextContainer : {
       justifyContent : 'space-between',
       marginLeft : 20
   },
   transDetail : {
       flexDirection : 'row',   
       alignItems:'center',
       marginBottom : 30
   },
   transTextHead : {
       color: '#bfbfbf',
       fontWeight : 'bold',
       marginBottom : 5
   },
   transText : {
       fontWeight : 'bold',
       fontSize : 22
   },
   inputFormContainer : {
       flexDirection : 'row',
       alignItems:'center'
   },
   textInputContainer : {
       flex: 1
   },
   textInput : {
    paddingVertical:5,
    fontSize : 22,
    fontWeight : 'bold',
    borderBottomWidth : 2,
    color: '#000000',
    borderColor: '#DFE0E3'
   },
   textInputLabel :{
    color: '#bfbfbf',
    fontWeight : 'bold',
    marginBottom : 5       
   },
   formsubmitButton : {
    backgroundColor:'#FF3378',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    marginHorizontal:5,
    width: 50,
    height: 50
   },
   transCatimageContainer : {
       width: 50,
       height:50,
       backgroundColor :'#cccccc',
       justifyContent : 'center',
       alignItems : 'center',
       borderRadius:30
       
   },
   transCatimage : {
       width: 30,
       height: 30
   },
   transCatimagePlaceholder:{
    width: 50,
    height:50,
    backgroundColor :'#EFEFF0',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius:25,
    borderWidth : 2,
    borderColor : '#cccccc',
    borderStyle:'dashed'
   },
   amountButtontext : {
       color:'#ffffff',
       fontSize:19,
       fontWeight:'bold' 
    }
})
