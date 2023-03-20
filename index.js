const port = 3000;
const app = require('./app');

const main = () => {
    try {
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

main();