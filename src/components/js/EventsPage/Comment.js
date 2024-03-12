import React from 'react';
import '../../css/Comment.css';
// import profilePicture from '../../img/aaaa.png';
import { FaUserCircle } from "react-icons/fa";

export default function Comment(props) {
	const canEdit = props.currentUserId === props.data.userId;
	const canDelete = props.currentUserId === props.data.userId;
	const createdAt = new Date(props.data.createdAt).toLocaleDateString();
	const [isHide, setIsHide] = React.useState(false);

	//opens textarea if edit or answer button is clicked
	function handleClick(event) {
		props.scrollToElement(`comment-${props.data._id}`);
		props.setReplyId(props.data._id);
		if (event.target.id === 'edit') {
			props.setShowInput(true);
			props.setEditComment(true);
			props.setText(`${props.data.body} `);
		} else if (event.target.id === 'delete') {
			props.setDeleteCommentPopup(true);
		} else {
			props.setShowInput(true);
			props.setText(`@${props.data.userName} ${props.data.userSurname}`);
			props.setReplyId(props.data.parentId ?? props.data._id);
		}
	}

	const showReplies = () => {
		setIsHide(!isHide);
	};

	return (
		<div
			className='comment-container'
			id={`comment-${props.data.id}`}>
			<div className='comment'>
				{/* <img
					className='user-picture'
					alt='user profile'
					src={profilePicture}></img> */}
				<FaUserCircle className='user-picture' color='#9b9898'/>
				<div className={`content-container`}>
					<p className='user-name'>
						{props.data.userName
							? `${props.data.userName} ${props.data.userSurname}`
							: props.data.userEmail}
					</p>
					<p className='content'>{props.data.body}</p>
				</div>
			</div>
			<div className='action-container'>
				<p className='time-since'>{createdAt}</p>
				<p
					className='answer-btn'
					id='answer'
					onClick={handleClick}>
					odpowiedz
				</p>
				{canEdit && (
					<p
						className={`edit-btn`}
						id='edit'
						onClick={handleClick}>
						edytuj
					</p>
				)}
				{canDelete && (
					<p
						className='delete-btn'
						id='delete'
						onClick={handleClick}>
						usuń
					</p>
				)}
			</div>
			{props.replies.length > 0 && (
				<div className='replies'>
					{isHide &&
						props.replies.map((reply) => (
							<Comment
								key={reply._id}
								data={reply}
								replies={[]}
								currentUserId={props.currentUserId}
								setShowInput={props.setShowInput}
								setText={props.setText}
								setDeleteCommentPopup={props.setDeleteCommentPopup}
								editComment={props.editComment}
								setEditComment={props.setEditComment}
								replyId={props.replyId}
								setReplyId={props.setReplyId}
								scrollToElement={props.scrollToElement}
							/>
						))}
					<p
						className='toggle-replies-btn'
						onClick={showReplies}>
						{props.replies.length === 0
							? ''
							: isHide
							? 'Ukryj odpowiedzi'
							: `Wyświetl ${
									props.replies.length > 1
										? `${props.replies.length} odpowiedzi`
										: '1 odpowiedź'
							  }`}
					</p>
				</div>
			)}
		</div>
	);
}
