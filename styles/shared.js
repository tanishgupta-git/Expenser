import { StyleSheet} from 'react-native';

export default SharedStyles = StyleSheet.create({
      loadingContainer : {
        position:'absolute',
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent:'center',
        alignItems : 'center',
        backgroundColor : '#cccccc',
        opacity: 0.7,
        zIndex :100          
      },
      uploadingText : {
        color: '#ffffff',
        fontSize : 20,
        marginBottom : 20
      },
      dateButton : {
        width: 150,
        backgroundColor : '#FF3378',
        padding: 15,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center',
        marginHorizontal:20,
        marginVertical:10
      },
      dateButtonText : {
       color: '#FFFFFF',
       fontSize : 18
      }
});
