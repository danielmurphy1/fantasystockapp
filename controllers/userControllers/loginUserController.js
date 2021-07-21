const login = require('../../services/userServices/loginUserService');

module.exports = async(request, response) => {
    const { body } = request;
    try {
        const token = await login(body.username, body.password);
        response.status(200).send(token);
    } catch (error) {
        response.status(500).send({error: 'there was an error'})
    }
};