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
        const insertSQL = 'INSERT INTO contact (phone) VALUES (?)'
        const insertValues = [phone];
        await Pool.query(insertSQL, insertValues);
        const [result] = await Pool.query('SELECT * FROM contact WHERE contact_id = LAST_INSERT_ID()');
        await Pool.query('INSERT INTO user_contact (user_id, contact_id) VALUES (?, ?)', [user_id, result[0].contact_id])
        const [getResult] = await Pool.query('SELECT * FROM user_contact WHERE contact_id = LAST_INSERT_ID()');
        const finalResult = getResult[0];
        // console.log(finalResult);
        return res.status(201).json(finalResult);
    } catch (error) {
        next(error);
    }
};
