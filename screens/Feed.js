import React,{useState,useContext,useEffect} from 'react'
import { ScrollView, FlatList, View ,RefreshControl,Text} from 'react-native'
import Question from '../components/Question'
import Question_Gql from '../components/Question_Gql'
import Loading from '../components/Loading'
import Err from '../components/Err'
import Header from '../components/Header'
import {userContext} from '../App'
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';




function Feed(props) {
    const drawer_navigation = props.route.params.drawer_navigation
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [ids, setIds] = useState([Math.floor(Math.random()*300),Math.floor(Math.random()*300),Math.floor(Math.random()*300),Math.floor(Math.random()*300)]);
    const {user} = useContext(userContext)
    console.log(user)
    useEffect(()=>{
        //   setTimeout(() => {
        //       setIds([100, 200])
        //   }, 3000)
        if(refreshing || loading){
        // firestore().collection('Questions').orderBy('time','desc').limit(50).get().
        // then(async data=> {
        //     questions_data = data.docs.slice()
        //     questions_data = await Promise.all(questions_data.map(async (q) => {
        //         const question_id=q._ref._documentPath._parts[1]
        //         console.log(q)
        //         var imgUrl=''
        //             if (q._data.hasImage) {
        //                 try{
        //                     imgUrl = await storage().ref(`Questions_Images/${q._data.uid}/${question_id}`).getDownloadURL();
        //                 }catch{
        //                 }
        //             }
        //         return {...q._data,question_img:imgUrl,question_id:question_id}
        //         }))
        //     setQuestions(questions_data)
        //     setLoading(false)
        //     setRefreshing(false)
        //     setErr(false)
        // }).catch(err=>{
        //     setRefreshing(false)
        //     setErr(true)
        //     setLoading(false)
        //     console.log(err)
        // })
    }},[refreshing])

    const handleScroll=({nativeEvent:e})=>{
        const ratio=e.contentOffset.y / e.contentSize.height*100
        console.log(ratio)
        // if(ratio>85
    }
    const loadMore=(e)=>{
        console.log('11111111111111111')
        console.log(e)
        setIds((i)=>{
            let z=i;
            // z.push(100,200,300  );
            z.push(Math.floor(Math.random()*300),Math.floor(Math.random()*300),Math.floor(Math.random()*300),Math.floor(Math.random()*300));
            return z
        })
    }

    if(err) return <Err refreshing={refreshing} setRefreshing={setRefreshing}/>
    if(loading || refreshing) return <><Header drawer_navigation={drawer_navigation}/><Loading/></>
    return (
        <View>
            <Header drawer_navigation={drawer_navigation} />
            <FlatList
            // onScroll={handleScroll}
            data={ids}
            // data={[100,200,12,34,53,112,311,165,187, 222,190,98]}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setIds([Math.floor(Math.random()*300),Math.floor(Math.random()*300),Math.floor(Math.random()*300),Math.floor(Math.random()*300)])}} />}
            initialNumToRender={10}Z
            onEndReachedThreshold={0.9}
            onEndReached={loadMore}
            renderItem={(e)=><Question_Gql id={e.item} navigation={props.navigation}  key={e.index}/>}
            // keyExtractor={()=>uuid()}
            />
            {/* <ScrollView onScroll={handleScroll}>
                <Question_Gql key={235} id={100}/>
                <Question_Gql key={255} id={50}/>
                <Question_Gql key={15} id={17}/>
                <Question_Gql key={1514} id={19}/>
                <Question_Gql key={1155} id={157}/>
                <Question_Gql key={1521} id={247}/>
                <Question_Gql key={88475} id={55}/>
                <Question_Gql key={72458} id={21}/>
                <Question_Gql key={7123} id={211}/>
                <Question_Gql key={7242} id={350}/>
                <Question_Gql key={453359} id={82}/>
            </ScrollView> */}
            {/* <FlatList
                data={questions}
                renderItem={({item}) => <Question {...item} key={item.index*74}/>}
                style={{marginBottom:50}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}
            /> */}
        </View>
    )
}

export default Feed
