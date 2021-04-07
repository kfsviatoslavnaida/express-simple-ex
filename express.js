const express = require("express");
const app = express();
const router = express.Router();

app.use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use("/api", router)
    .listen(3000, function () {
        console.log("server is running on port 3000");
    })

router.post('/v1/parse', (request, response) => {
    const { data } = request.body;

    const result = {
        firstName: data.slice(0, 8),
        lastName: data.slice(8, 18),
        clientId: data.slice(18, data.length)
    }
    response.send({
        statusCode: 200,
        data: result
    });
});


router.post('/v2/parse', (request, response) => {
    const { data } = request.body;
    const clientId = data.slice(18, data.length);

    const result = {
        firstName: data.slice(0, 8).replace(/0/g, ''),
        lastName: data.slice(8, 18).replace(/0/g, ''),
        clientId: clientId.substring(0,3) + '-' + clientId.substring(3,7)
    }
    response.send({
        statusCode: 200,
        data: result
    });
});
