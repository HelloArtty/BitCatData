import Pool from '../models/db.model.js'

export const testlocation = (req, res) => {
    res.json(
        {
            message: 'Api is work'
        });
}

export const createLocation = async (req, res, next) => {
    try {
        const { location, user_id } = req.body;
        const insertSQL = 'INSERT INTO location (location, user_id) VALUES (?, ?)'
        const insertValues = [location, user_id];
        await Pool.query(insertSQL, insertValues);
        const [result] = await Pool.query('SELECT * FROM location WHERE location_id = LAST_INSERT_ID()');
        const finalResult = result[0];
        // console.log(finalResult);
        return res.status(201).json(finalResult);
    } catch (error) {
        next(error);
    }
};