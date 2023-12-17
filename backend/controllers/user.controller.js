import bcryptjs from 'bcryptjs';
// import Post from '../models/post.model.js';
import pool from '../models/db.model.js';
import { errorHandler } from "../utils/error.js";
import { Console } from 'console';

export const updateUser = async (req, res, next) => {
    if (req.user.id !== Number(req.params.id)) return next(errorHandler(401, 'You can only update your own account'));
    try {
        const [existingUser] = await pool.query("SELECT * FROM users WHERE user_id = ?", [req.params.id]);
        const { username, email, password, avatar } = req.body;

        const updatedUser = {
            ...existingUser[0],
            username: username || existingUser[0].username,
            email: email || existingUser[0].email,
            password: password ? bcryptjs.hashSync(password, 10) : existingUser[0].password,
            avatar: avatar || existingUser[0].avatar,
        };
        
        const updateSQL = "UPDATE users SET username = ?, email = ?, password = ?, avatar = ? WHERE user_id = ?";
        const updateValue = [updatedUser.username, updatedUser.email, updatedUser.password, updatedUser.avatar, req.params.id];
        await pool.query(updateSQL, updateValue);
        const { password: updatedPassword, ...rest } = updatedUser;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== Number(req.params.id)) return next(errorHandler(401, 'You can only delete your own account!'));
    try {
        const deleteSQL = "DELETE FROM users WHERE user_id = ?";
        const value = [req.params.id];
        const deleteUser = await pool.query(deleteSQL, value);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!')
    } catch (error) {
        next(error)
    }
}

// export const getUserPost = async (req, res, next) => {
//     if (req.user.id === req.params.id) {
//         try {
//             const post = await Post.find({ userRef: req.params.id });
//             res.status(200).json(post);
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         return next(errorHandler(401, 'You can only view your own Post!'));
//     }
// };