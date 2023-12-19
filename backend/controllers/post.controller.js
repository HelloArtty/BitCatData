
import Pool from '../models/db.model.js'

export const createPost = async (req, res, next) => {
    try {
        const { user_id, imageUrls, title, age, description, catBreed, sex, location } = req.body;
        const imageUrlsJSON = JSON.stringify(imageUrls);

        const insertSQL = 'INSERT INTO post (user_id, imageUrls, title, age, description, catBreed, sex, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const insertValues = [user_id, imageUrlsJSON, title, age, description, catBreed, sex, location];
        await Pool.query(insertSQL, insertValues);
        const [getResult] = await Pool.query('SELECT * FROM post WHERE post_id = LAST_INSERT_ID()');
        const finalResult = getResult[0];

        return res.status(201).json(finalResult);
    } catch (error) {
        next(error);
    }
}


export const deletePost = async (req, res, next) => {
    const [result] = await Pool.query('SELECT * FROM post WHERE post_id = ?', [req.params.id]);
    const post = result[0];
    if (!post) {
        return next(errorHandler(404, 'Post not found'));
    }
    if (req.user.id !== post.user_id) {
        return next(errorHandler(404, 'You are not authorized to delete this post'));
    }
    try {
        await Pool.query('DELETE FROM post WHERE post_id = ?', [req.params.id]);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const updatePost = async (req, res, next) => {
    const [result] = await Pool.query('SELECT * FROM post WHERE post_id = ?', [req.params.id]);
    const post = result[0];
    if (!post) {
        return next(errorHandler(404, 'Post not found!'));
    }
    if (req.user.id !== post.user_id) {
        return next(errorHandler(401, 'You can only update your own Posts!'));
    }
    try {
        
        const { imageUrls, title, age, description, catBreed, sex, location } = req.body;
        const updateSQL = "UPDATE post SET imageUrls = ?, title = ?, age = ?, description = ?, catBreed = ?, sex = ?, location = ? WHERE post_id = ?";
        const updateValues = [imageUrls, title, age, description, catBreed, sex, location, req.params.id];
        await Pool.query(updateSQL, updateValues);
        const [result] = await Pool.query("SELECT * FROM post WHERE post_id = ?", [req.params.id]);
        const updatedPost = result[0];
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};

export const getPost = async (req, res, next) => {
    try {
        const [result] = await Pool.query('SELECT * FROM post WHERE post_id = ?', [req.params.id]);
        const post = result[0];
        if (!post) {
            return next(errorHandler(404, 'Post not found!'));
        }
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};


export const getPosts = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let sex = req.query.sex;
        let catBreed = req.query.catBreed;

        const searchTerm = req.query.searchTerm || '';

        let sort;
        if(req.query.sort === 'postDate'){
            sort = 'post_date';
        }else{
            sort = req.query.sort || 'post_date';
        }
        // const sort = req.query.sort || 'post_date';
        const order = req.query.order || 'desc';

        const selectSQL = `
            SELECT *
            FROM post
            WHERE title LIKE ? 
                AND ((sex = ? OR ? = '')
                    AND (catBreed = ? OR ? = '')
                )
            ORDER BY ${sort} ${order}
            LIMIT ?, ?
        `;

        const selectValues = [
            `%${searchTerm}%`,
            sex || '',
            sex || '',
            catBreed || '',
            catBreed || '',
            startIndex,
            limit
        ];
        const [posts] = await Pool.query(selectSQL, selectValues);

        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};