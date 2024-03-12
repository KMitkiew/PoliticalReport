const Comment = require('../db/models/comment.model');
const User = require('../db/models/user.model');
const mongoose = require('mongoose');

const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const commentData = await Comment.find({ event: id });

    if (commentData.length < 1) {
      return res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json({ success: true, data: commentData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteComment = async (req, res) => {
	try {
		const { id } = req.params;
		const comment = await Comment.findOne({ _id: id });
		
		if (!comment) {
			return res
				.status(404)
				.json({ success: false, message: `no comment with such id` });
		}

    await Comment.deleteOne({ _id: id });

		res.status(200).json({ success: true, message: 'data was successfully deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

const addComment = async (req, res) => {
	try {
		const userId = req.user._id
		const userData = await User.findOne({ _id: userId });
		const { parentId } = req.body
		const {id} = req.params
		let constructorParams = {
			event: id, 
			parentId: parentId, 
			userName: userData.name,
			userSurname: userData.surname,
			userEmail: userData.email
		};

		if (userId) {
			const relatedUser = await User.findById(userId);
			constructorParams.user = relatedUser.id;
		}

		if (req.body.parentCommentId) {
			const commentObjectId = new mongoose.Types.ObjectId(
				req.body.parentCommentId
			);
			const parentComment = await Comment.findById(commentObjectId);
			constructorParams.parentComment = parentComment.id;
		}

		const comment = new Comment({ ...req.body, ...constructorParams });

		await comment.save();
		return res.status(200).json({ success: true, message: 'comment was added' });
	} catch (error) {
		console.error('Error occured during comment creation');
		res.status(404).send('Error occured during comment creation');
	}
};

const putComment = async (req, res) => {
	try {
  
	  const { _id: id, body } = req.body;
		

	  if (!body) {
		return res
		  .status(400)
		  .json({ success: false, message: 'No text was received' });
	  }
  
	  const existingComment = await Comment.findOne({ _id: id });
  
	  if (!existingComment) {
		return res
		  .status(404)
		  .json({ success: false, message: 'No comment with such id' });
	  }
  
	  await Comment.findByIdAndUpdate(id, { body: body}, { new: true });
  
	  res
		.status(200)
		.json({ success: true, message: 'Comment was successfully updated' });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
  };
module.exports = { getComments, deleteComment, addComment, putComment };
