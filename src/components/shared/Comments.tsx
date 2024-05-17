import { multiFormatDateString } from '@/lib/utils'
import { IComment } from '@/types'
import { Link } from 'react-router-dom'

type CommentsProps = {
  comments: IComment[]
}

function Comments({ comments }: CommentsProps) {

  if(comments?.length > 0){
    return (
    <>
      <ul className='flex flex-col gap-8'>
        {comments.map((comment) => (
          <li key={comment.id} >
            <Link to={`/profile/${comment?.user_id}`} className="flex items-center gap-3">
              <img 
                src={comment.imageurl || '/assets/icons/profile-placeholder.svg'} 
                alt="comment_creator"
                className='w-9 h-9 rounded-full' 
              />

              <div className='flex flex-col'>
                <div className='flex flex-row max-w-[340px]'>
                  <span className='small-semibold text-light-3 '>
                      {comment.name}  
                  <span className='subtle-medium text-light-1 ml-2'>{comment?.descr}</span>
                  </span>
                </div>
                  
                <div className='gap-2 text-light-3'>
                    <p className='tiny-medium '>
                        {multiFormatDateString(comment?.created_at) }
                    </p>
                </div>
              </div>
              
            </Link>
          </li>
        ))}
      </ul>
    </>  
    )
  }
}

export default Comments