
import Pool from '../models/db.model.js'

export const createPost = async (req, res, next) => {
    try {
        // console.log(req.body);
        const { user_id, imageUrls, title, age, description, catBreed, sex } = req.body;
        const imageUrlsJSON = JSON.stringify(imageUrls);

        const insertSQL = 'INSERT INTO post (user_id, imageUrls, title, age, description, catBreed, sex) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const insertValues = [user_id, imageUrlsJSON, title, age, description, catBreed, sex];
        const [result] = await Pool.query(insertSQL, insertValues);

        // const lastInsertedId = result.insertId;
        const getResult = await Pool.query('SELECT * FROM post WHERE post_id = LAST_INSERT_ID()');
        
        const lastResult = getResult[0][0];
        // console.log("====");
        // console.log(lastResult.user_id);
        // console.log("====");
        return res.status(201).json(lastResult);
    } catch (error) {
        next(error);
    }
}