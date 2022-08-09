module.exports = (app) => {
    const Ctrl = require('./auth.controller');

    app.route('/auth/register')
    .post(Ctrl.register);

    app.route('/auth/login')
    .post(Ctrl.login);

    app.route('/auth/validation')
    .post(Ctrl.validation);

    app.route('/users')
    .get(Ctrl.list);
}