import { gql } from "@apollo/client";

export const GET_ALL_VOTES_BY_POST_ID = gql`
query MyQuery($post_id: ID!){
    getVotesByPostId(post_id: $post_id) {
        created_at
        id
        post_id
        upvote
        username
    }
}`

export const GET_POST_BY_POST_ID = gql`
    query MyQuery($post_id: ID!) {
        getPostListByPostId(post_id: $post_id) {
            body
            created_at
            id
            image
            title
            subreddit_id
            username
            commentList {
                created_at
                id
                post_id
                text
                username
            }
            subreddit{
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
        }
    }
`

export const GET_ALL_POSTS = gql`
    query MyQuery {
        getPostList {
            body
            created_at
            id
            image
            title
            subreddit_id
            username
            commentList {
                created_at
                id
                post_id
                text
                username
            }
            subreddit{
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
        }
    }
`

export const GET_ALL_POST_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getPostListByTopic(topic: $topic) {
            body
            commentList {
                created_at
                post_id
                id
                text
                username
            }
            created_at
            id
            image
            subreddit {
                created_at
                id
                topic
            }
            title
            subreddit_id
            username
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
        }
    }


`

export const GET_SUBREDDIT_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getSubredditListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`