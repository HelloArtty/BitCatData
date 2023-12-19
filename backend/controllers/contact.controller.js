import Pool from '../models/db.model.js'

export const testcontact = (req, res) => {
    res.json(
        {
            message: 'Api is work'
        });
}

export const createContact = async (req, res, next) => {
    try {
        const { phone, user_id } = req.body;
        const insertSQL = 'INSERT INTO contact (phone, user_id) VALUES (?, ?)';
        const insertValues = [phone, user_id];
        await Pool.query(insertSQL, insertValues);
        const [result] = await Pool.query('SELECT * FROM contact WHERE contact_id = LAST_INSERT_ID()');
        const finalResult = result[0];
        return res.status(201).json(finalResult);
    } catch (error) {
        next(error);
    }
};
