import React, { useState, useEffect } from "react";
import { userLike, userUnlike } from "../../api/user"

const Like = (props) => {
  const likes = props.likes
  const address = props.address
  const collectionId = props.collectionId
  const likes_count = props.likes_count
  const add_class = props.addClass
  const isCollectionPage = props.isCollectionPage ? props.isCollectionPage : props.isCollectionPage
  const isLikedByMe = props.liked;
  const [liked, setLiked] = useState(isLikedByMe);
  const [likesCount, setlikesCount] = useState(likes_count);
  


  const like = async () => {
    const token = document.querySelector('[name=csrf-token]').content
    if (address) {
      await userLike(address, collectionId, token)
      setLiked(true)
      setlikesCount(likesCount+1);
    } else {
      toastr.error('Please connect your wallet to proceed.')
    }
  }

  const unlike = async () => {
    const token = document.querySelector('[name=csrf-token]').content
    if (address) {
      await userUnlike(address, collectionId, token)
      setLiked(false)
      setlikesCount(likesCount-1);
    } else {
      toastr.error('Please connect your wallet to proceed.')
    }
    
  }

  const initLike = async () => {
    if (liked) {
      await unlike()
    } else {
      await like()
    }
  }


  return (
    <React.Fragment>
      {!isCollectionPage &&
          <button  onClick={initLike} className={`card__likes heart ${add_class ? add_class : ''} ${liked ? 'is-active' : ''}`}>
                       <i className="far fa-heart"></i>
                       <i className="fas fa-heart"></i>
                             <span>{likesCount}</span>
              </button>
      }

      {isCollectionPage &&
        <button  onClick={initLike} className={`card__likes heart ${add_class ? add_class : ''} ${liked ? 'is-active' : ''}`}>
                              <i className="far fa-heart"></i>
                              <i className="fas fa-heart"></i>
                                    <span>{likesCount} </span>
                     </button>
      }
    </React.Fragment>
  );
}


export default Like