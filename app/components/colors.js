
import {StyleSheet} from 'react-native';



export default StyleSheet.create({

    homePage:{
        height:'100%'
    },
    imageStyle:{
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    infoTextTitle:{
        fontSize:25,
        textAlign: 'left',
        fontWeight: 'bold',
        color: "#2ABAFF"
    },
    infoText: {
        color: 'gray',
        textAlign: 'left',
        fontSize: 20
    },
    linkText:{
        textAlign:'left',
        fontSize:12

    },
    contentContainer: {
        alignItems:'center',
        padding:25,
        backgroundColor: "white",
      },
      hostedByText:{
        color: 'black',
        fontSize: 25,
      },
      whiteTextBold: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold'
      },
      whiteTextReg: {
        color: 'black',
        fontSize: 20,
        
      },
      gray_whiteTextBold: {
        color: 'grey',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: "italic",
        padding: 20,
    
      },
      grayTextReg: {
        color: 'gray',
        fontSize: 18,
        fontStyle: "italic",
      },
      blackTextBold: {
        color: 'black',
        fontSize: 27,
        fontWeight: 'bold'
      },
      white_smallTextReg: {
        color: 'black',
        fontSize: 15,
        
      },
      black_smallTextBold: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
      },
      menu:{
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column", 
        backgroundColor: "white",
        borderWidth: 2,
        width:"80%",
        borderRadius:15
      },
      menuTitle:{
        color: 'black',
        fontSize: 27,
        fontWeight: 'bold',
        textDecorationLine:'underline'
      },
      locationBox:{
        flexDirection: "row", 
        alignItems: "left",
        backgroundColor: "white",
        borderWidth: 2,
        width:"80%",
        borderRadius:15
      },
      container: {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: '15%',
        width: '85%',
        height: "85%",
        justifyContent: 'space-evenly',
        padding:'10%',
    },
    textHeader:{
        fontSize:22,
        color: 'black',
        paddingBottom:'2%'
        
    },
    textInput: {
        borderColor: 'gray',
        borderWidth:'1%',
        width: '100%',
        borderRadius:'4%',
        padding:'2%',
       
    },
    textComponent: {
        //paddingBottom: '5%',
        padding:'2%'
    }
    

});
