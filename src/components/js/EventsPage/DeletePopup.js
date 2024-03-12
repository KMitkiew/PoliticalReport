import React, { useEffect } from 'react';
import '../../css/DeletePopup.css';

const DeletePopup = (props) => {
    
    const deleteData = async () => {
        try {
            console.log(props.replyId)
            const res = await fetch(`/api/comment/${props.replyId}`, {
                'method': 'DELETE',
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })

            if(!res.ok) {
                console.log('Network response was not ok')
                return
            }
            props.deleteComment(props.replyId);

        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        const handleClick = () => {
            props.setDeleteCommentPopup(false);
            deleteData()
        };

        const handleReject = () => {
            props.setDeleteCommentPopup(false);
        };

        const acceptDeleteBtn = document.getElementById('accept-delete-btn');
        const rejectDeleteBtn = document.getElementById('reject-delete-btn');

        if (acceptDeleteBtn) {
            acceptDeleteBtn.addEventListener('click', handleClick);
        }

        if (rejectDeleteBtn) {
            rejectDeleteBtn.addEventListener('click', handleReject);
        }

        return () => {
            if (acceptDeleteBtn) {
                acceptDeleteBtn.removeEventListener('click', handleClick);
            }

            if (rejectDeleteBtn) {
                rejectDeleteBtn.removeEventListener('click', handleReject);
            }
        };
    }, [props.deleteCommentPopup]);

    return (
        <div className='delete-popup-container'>
            <div className='delete-popup'>
                <p className='delete-popup-info'>Czy jesteś pewien, że chcesz usunąć ten komentarz?</p>
                <div className='delete-btns-container'>
                    <button id='accept-delete-btn' className='accept-delete'>Tak</button>
                    <button id='reject-delete-btn' className='reject-delete'>Nie</button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;