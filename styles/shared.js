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
      },
      contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      content: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 70,
      },
      confirmButton: {
        padding: 15,
        margin: 10,
        borderRadius: 5,
        backgroundColor : '#FF3378',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      selectedDate : {
        marginHorizontal : 20,
        marginTop : 20,
        fontSize : 16,
        color:'#808080'
      }, 
});
