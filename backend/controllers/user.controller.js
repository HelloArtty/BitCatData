const test = (req, res) => {
    res.send
        ({
            message :'Greetings from the Test controller!'
    });
}

module.exports = {
    test,
};