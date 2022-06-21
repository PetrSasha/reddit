import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Post from '../../components/Post'
import { GET_POST_BY_POST_ID } from '../../graphql/queries'
import {SubmitHandler, useForm} from 'react-hook-form'
import { ADD_COMMENT } from '../../graphql/mutations'
import toast from 'react-hot-toast'
import Avatar from '../../components/Avatar'
import TimeAgo from 'react-timeago'
import { Jelly } from '@uiball/loaders'

type FormData = {
    comment: string
}

const PostPage = () => {
    const router = useRouter()

    const {data: session} = useSession()

    const [addCommet] = useMutation(ADD_COMMENT,{
        refetchQueries:[GET_POST_BY_POST_ID,'getPostListByPostId']
    })

    const {data} = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            post_id: router.query.postId
        }
    })

    const post: Post = data?.getPostListByPostId

    const {register, handleSubmit, watch, setValue, formState: {errors}} = useForm<FormData>()
    

    const onSubmit: SubmitHandler<FormData> = async(data) => {
        //post comment
        console.log(data)

        const notification = toast.loading('Posting your comment')

        await addCommet({
            variables: {
                post_id: router.query.postId,
                username: session?.user?.name,
                text: data.comment
                }
        })

        setValue('comment', '')

        toast.success('Comment Successfully Posted', {
            id: notification,
        })
    }

   console.log(data)

   if(!post) return <div className='flex w-full items-center justify-center p-10 text-xl'><Jelly size={50} color="#b765e6"/></div>

  return (
    <div className='mx-auto my-7 max-w-5xl'>
        <Post  post={post}/>

        <div className='-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16'>
            <p className='text-sm'>Comment as <span className='text-red-500'>{session?.user?.name}</span> </p>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  space-y-2'>
                <textarea 
                 {...register('comment')}
                 disabled={!session}
                 className='h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50' 
                 placeholder={session ? 'What are your thouts' : 'Please sign in to comment'}></textarea>
                 <button type='submit' className='rounded-full  bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200'>Comment</button>
            </form>

        </div>

        <div className='-my-5 rounded-b-mb border border-t-0 border-gray-300 bg-white py-5 px-10'>
            <hr className='py-2'/>
            
            {post?.commentList.map((comment) => (
                <div  className="relative flex item-center space-x-3 space-y-5"
                    key={comment.id}>

                    <hr className='absolute top-10 left-7 z-0 h-20 border' />

                    <div className='z-50'>
                        <Avatar seed={comment.username}/>
                    </div>
                    
                    <div className='flex flex-col'>
                        <p className='py-2 text-xs text-gray-400'>
                            <span className='fony-semibold text-gray-600'>
                                {comment.username} -{' '}
                                <TimeAgo date={comment.created_at}/>
                            </span>
                        </p>
                        <p >{comment.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PostPage