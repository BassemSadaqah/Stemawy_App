import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, TextInput, View, Text, Image, FlatList, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import Question from '../components/Question'
import Loading from '../components/Loading'
import Err from '../components/Err'
import Header from '../components/Header'
import {userContext} from '../App'
import { gql, useQuery } from '@apollo/client'
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';


const GET_FEED_QUESTIONS = gql`
query FeedQuestions($limit:Int){
    feedQuestions(limit:$limit){
        id
        question
        img
        choices
        answer
        time
        user{
            id
            first_name
            last_name
            profile_pic
        }
    }
}`
function Feed(props) {
    const { loading, error, data,refetch,fetchMore } = useQuery(GET_FEED_QUESTIONS);
    const [refreshing, setRefreshing] = useState(false);
    const [fetchingMore, setFetchingMore] = useState(false);


    const updateQuery = (previousResult, { fetchMoreResult }) => {
        setFetchingMore(false)
        return {...previousResult,feedQuestions:[...previousResult.feedQuestions,...fetchMoreResult.feedQuestions]}
    }

    const loadMore = (fetchMore) => {
        if (!loading && !fetchingMore) {
            setFetchingMore(true)
            // fetchMore({updateQuery, variables: { id: user_id, offset } })
            fetchMore({updateQuery,variables:{limit:3}});
        }
    }

    if(error) return <Err refreshing={refreshing} setRefreshing={setRefreshing}/>
    if(loading || refreshing) return <Loading/>
    return(
        <FlatList
            style={{ width: '100%', backgroundColor: 'white' }}
            // ListHeaderComponent={() => <ProfileHeader user={data.user} />}
            ListFooterComponent={() => <ActivityIndicator style={{ marginVertical: 15 }} size="large" animating={fetchingMore} color="#0000ff" />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { refetch() }} />}
            data={(data.feedQuestions.map(q => ({ ...q,...q.user })))}
            renderItem={(e) =>{ return(<Question {...e.item}  navigation={props.navigation} isFeed={true}/>)}}
            listKey="Feed"
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.85}
            onEndReached={() => loadMore(fetchMore)}
        />
    )
    
}

export default Feed
// export default React.memo(Feed)