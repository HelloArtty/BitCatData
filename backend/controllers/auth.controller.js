
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import pool from '../models/db.model.js'


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const selectQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
        const [selectResults] = await pool.query(selectQuery, [username, email]);

        if (selectResults && selectResults.length > 0) {
            const existingField = selectResults[0].username === username ? 'Username' : 'Email';
            return res.status(400).json({ success: false, message: `${existingField} is already taken.` });
        }

        const insertSQL = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const insertValues = [username, email, hashedPassword];
        const [insertResult] = await pool.query(insertSQL, insertValues);

        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error creating user.' });
    }
};


export const signin = async (req, res, next) => {
    const { username, password } = req.body;
    const selectQuery = 'SELECT * FROM users WHERE username = ?';
    try {
        const [selectResults] = await pool.query(selectQuery, [username]);

        if (selectResults && selectResults.length > 0) {
            const validUser = selectResults[0];
            const validPassword = bcrypt.compareSync(password, validUser.password);

            if (!validPassword) {
                return next(errorHandler(401, 'Incorrect password!'));
            }

            const token = jwt.sign({ id: validUser.user_id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = validUser;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            return next(errorHandler(404, 'User not found'));
        }
    } catch (error) {
        next(error);
    }
};

// export const signup = async (req, res, next) => {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     pool.query(
//         'SELECT * FROM users WHERE username = ? OR email = ?',
//         [username, email],
//         (selectErr, selectResults) => {
//             if (selectErr) {
//                 return res.status(500).json({ success: false, message: 'Error checking user existence.' });
//             }

//             if (selectResults.length > 0) {
//                 // User with provided username or email already exists
//                 const existingField = selectResults[0].username === username ? 'Username' : 'Email';
//                 return res.status(400).json({ success: false, message: `${existingField} is already taken.` });
//             }

//             // If username and email are not taken, proceed with the insertion
//             const insertSQL = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//             const insertValues = [username, email, hashedPassword];

//             pool.query(insertSQL, insertValues, (insertErr, insertResult) => {
//                 if (insertErr) {
//                     return res.status(500).json({ success: false, message: 'Error creating user.' });
//                 }

//                 res.status(201).json({ success: true, message: 'User created successfully' });
//             });
//         }
//     );
// };

// export const signin = async (req, res, next) => {
//     const { username, password } = req.body;
//     const selectQuery = 'SELECT * FROM users WHERE username = ?';
//     try {
//         pool.query(selectQuery, [username],
//             (selectErr, selectResults) => {
//                 if (selectErr) {
//                     return res.status(500).json({ success: false, message: 'Error checking user existence.' });
//                 }

//                 if (selectResults.length > 0) {
//                     const validUser = selectResults[0];
//                     const validPassword = bcrypt.compareSync(password, validUser.password);
//                     if (!validPassword) return next(errorHandler(401, 'Enter the wrong password!'));
//                     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//                     const { password: pass, ...rest } = validUser;
//                     res
//                         .cookie('access_token', token, { httpOnly: true })
//                         .status(200)
//                         .json(rest);
//                 }else {
//                     return next(errorHandler(404, 'User not found'));
//                 }
//             }
//         );
//     } catch (error) {
//         next(error);
//     }
// };

export const google = async(req, res, next) => {
    try {
        const [row] = await pool.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
        if(row.length > 0) {
            const user = row[0];
            const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const username = req.body.name.split("").join("").toLowerCase() + Math.random().toString(36).slice(-4);
            const [result] = await pool.query('INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)', [username, req.body.email, hashedPassword, req.body.photo]);
            if(result.insertId) {
                const newUser = { id: result.insertId, username, email: req.body.email, avatar: req.body.photo };
                const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET);
                const { password: pass, ...rest } = newUser;
                res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
            } else {
                throw new Error('Failed to create user');
            }
        }
    } catch (error) {
        console.error("Database error:", error);
        next(error);
    }
};

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error)
    }
};
