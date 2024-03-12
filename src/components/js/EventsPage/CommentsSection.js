import React from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import CommentForm from './CommentForm';
import DeletePopup from './DeletePopup';
import '../../css/CommentsSection.css';

export default function CommentsSection() {
	const [showInput, setShowInput] = React.useState(false);
	const [text, setText] = React.useState('');
	const [replyId, setReplyId] = React.useState(null); //sets id for an updateComment function as well
	const [backendComments, setBackendComments] = React.useState([]);
	const [editComment, setEditComment] = React.useState(false);
	const [deleteCommentPopup, setDeleteCommentPopup] = React.useState(false);
	const { id } = useParams();
	const rootComments = backendComments.filter(
		(backendComment) => !backendComment.parentId
	);

	//sending request to API
	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch(`/api/comment/${id}`, {
				method: 'GET',
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();

			if (data) {
				setBackendComments(data.data);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const addCommentToDb = async (comment) => {
		try {
			const formattedComment = {
				body: comment.body,
				createdAt: comment.createdAt,
				parentId: comment.parentId,
			};

			const res = await fetch(`/api/comment/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
				body: JSON.stringify(formattedComment),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			fetchData();
		} catch (error) {
			console.log(error);
		}
	};

	const updateCommentToDb = async (updatedComment, updatedArrayOfComments) => {
		try {
			const res = await fetch('/api/comment', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
				body: JSON.stringify(updatedComment),
			});

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			
			setBackendComments(updatedArrayOfComments);
		} catch (error) {
			console.log(error);
		}
	};

	//scrolls the selected comment up to the visible part of container
	const scrollToElement = (elementId) => {
		const element = document.getElementById(elementId);
		if (element) {
			const container = document.querySelector('.comments-container');
			container.scrollTop = element.offsetTop - container.offsetTop;
		}
	};

	//sorting replies by date of appearance
	function getReplies(commentId) {
		return backendComments
			.filter(
				(backendComment) =>
					backendComment.parentId && backendComment.parentId === commentId
			)
			.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);
	}

	//adds comment, or reply
	const addComment = (text, parentId = null) => {
		const newComment = {
			body: text,
			parentId: parentId,
			createdAt: new Date().toISOString(),
		};
		addCommentToDb(newComment);
	};

	//updates comment
	const updateComment = (text, replyId) => {
		const updatedComments = backendComments.map((backendComment) => {
			if (backendComment._id === replyId) {
				return { ...backendComment, body: text };
			}
			return backendComment;
		});
		const updatedComment = backendComments.find(
			(backendComment) => backendComment._id === replyId
		);

		const dataToSend = { ...updatedComment, body: text };
		updateCommentToDb(dataToSend, updatedComments);
	};

	//deletes comment
	const deleteComment = (commentId) => {
		const commentToDelete = backendComments.filter(
			(backendComment) => backendComment._id !== commentId
		);
		setBackendComments(commentToDelete);
	};

	return (
		<div className='comments-section'>
			<div className='title-bar'>
				<h3>sekcja komentarzy</h3>
			</div>
			{deleteCommentPopup && (
				<DeletePopup
					setDeleteCommentPopup={setDeleteCommentPopup}
					deleteCommentPopup={deleteCommentPopup}
					replyId={replyId}
					deleteComment={deleteComment}
				/>
			)}
			<div
				className={`comments-container ${
					showInput && 'shrink-comments-container'
				}`}>
				{rootComments.map((rootComment) => (
					<Comment
						key={rootComment._id}
						data={rootComment}
						replies={getReplies(rootComment._id)}
						setShowInput={setShowInput}
						setText={setText}
						setDeleteCommentPopup={setDeleteCommentPopup}
						editComment={editComment}
						setEditComment={setEditComment}
						replyId={replyId}
						setReplyId={setReplyId}
						scrollToElement={scrollToElement}
					/>
				))}
			</div>
			<CommentForm
				handleSubmit={editComment ? updateComment : addComment}
				setShowInput={setShowInput}
				showInput={showInput}
				setText={setText}
				text={text}
				setEditComment={setEditComment}
				replyId={replyId}
				setReplyId={setReplyId}
			/>
		</div>
	);
}
