const { emailActions } = require('../constants');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome to me'
    },

    [emailActions.USER_BLOCKED]: {
        templateName: 'blocked',
        subject: 'Your account was blocked'
    },
};
