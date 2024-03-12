import React from 'react';
// import profilePicture from '../../img/aaaa.png';
import { FaUserCircle } from "react-icons/fa";
import '../../css/CommentsSection.css';
import { LuSendHorizonal } from 'react-icons/lu';

export default function CommentForm(props) {
	const showInputRef = React.useRef();
	const isTextAreaDisabled = props.text.length === 0;

	//handle input value changes
	const handleChange = (event) => {
		props.setText(event.target.value);
	};

	//makes textArea bigger
	const handleClick = () => {
		props.setShowInput(true);
	};

	//handle confirming data with enter button
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
		  event.preventDefault();
		  if(props.text.length>0){
			props.handleSubmit(props.text, props.replyId, props.userId);
		  	resetSetStates();
		  }
		}
	  }

	//resetes all important states
	const resetSetStates = () => {
		props.setShowInput(false);
		props.setText('');
		props.setReplyId(null);
		props.setEditComment(false);
	};

	//closes the input window
	React.useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				!showInputRef.current.contains(e.target) &&
				e.target.id !== 'edit' &&
				e.target.id !== 'answer'
			) {
				resetSetStates();
			}
		};

		if (props.showInput) {
			showInputRef.current.querySelector('textarea').focus();
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [props.showInput]);

	//modifies form behavior
	const onSubmit = (event) => {
		event.preventDefault();
		props.handleSubmit(props.text, props.replyId, props.userId);
		resetSetStates();
	};

	return (
		<form
			className={`comment-add ${props.showInput && 'show-input'}`}
			onSubmit={onSubmit}
			ref={showInputRef}>
			{/* <img
				src={profilePicture}
				className='comment-profile-picture'></img> */}
			<FaUserCircle className='comment-profile-picture' color='#23eac6' />
			<textarea
				type='text'
				className='comment-message'
				placeholder='Napisz komentarz...'
				maxLength={325}
				value={props.text}
				onChange={handleChange}
				onClick={handleClick}
				onKeyDown={handleKeyDown}></textarea>
			<button
				className='send-comment-btn'
				disabled={isTextAreaDisabled}>
				<LuSendHorizonal
					size='1.5em'
					className={`send-comment-btn-icon ${
						!isTextAreaDisabled && 'enabled-btn'
					}`}
				/>
			</button>
		</form>
	);
}
