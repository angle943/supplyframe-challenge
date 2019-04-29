module.exports = {
    'My first test case'(browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisibile('.project-0')
            .assert.containsText(".project-0", "Hack Chat")
    }
}