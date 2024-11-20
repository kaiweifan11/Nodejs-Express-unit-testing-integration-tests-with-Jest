const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";
const nonExistingTodoId = "673d12fd8a5e90361ec26822";
const testData = { title: "Make integration test for PUT", done: true };
let firstTodo, newTodoId;

// Integration tests
describe(endpointUrl, () => {
    it("POST " + endpointUrl, async () =>{
        const response = await request(app)
            .post(endpointUrl)
                .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        newTodoId = response.body._id;
    });

    it("should return error 500 on malformed data with POST " + endpointUrl, 
        async () => {
            const response = await request(app)
                .post(endpointUrl)
                .send({ title: "Missing done property"})
            expect(response.statusCode).toBe(500);
            expect(response.body).toStrictEqual({
                message: "Todo validation failed: done: Path `done` is required."
            })
    })

    test("GET  " + endpointUrl, async () =>{
        const response = await request(app)
            .get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
    
        // get the first todo from db so that we can perform the next test
        firstTodo = response.body[0];
    });

    test("GET by id " + endpointUrl + ":todoId", async () =>{
        const response = await request(app)
            .get(endpointUrl + firstTodo._id);
            expect(response.statusCode).toBe(200);
            expect(response.body.title).toBe(firstTodo.title);
            expect(response.body.done).toBe(firstTodo.done);
    })

    test("GET todoBy Id doesnt exist " + endpointUrl + ":todoId", async () =>{
        const response = await request(app)
            .get(endpointUrl + nonExistingTodoId);
            expect(response.statusCode).toBe(404);
    })

    test("PUT " + endpointUrl + ":todoId", async () =>{
        const res = await request(app)
            .put(endpointUrl + newTodoId)
            .send(testData);
            expect(res.statusCode).toBe(200);
            expect(res.body.title).toBe(testData.title);
            expect(res.body.done).toBe(testData.done);
    })

    test("PUT Id doesnt exist " + endpointUrl + ":todoId", async () =>{
        const response = await request(app)
            .put(endpointUrl + nonExistingTodoId)
            .send(testData);
            expect(response.statusCode).toBe(404);
    })

    test("DELETE " + endpointUrl + ":todoId", async () =>{
        const res = await request(app)
            .delete(endpointUrl + newTodoId)
            .send();
            expect(res.statusCode).toBe(200);
            expect(res.body.title).toBe(testData.title);
            expect(res.body.done).toBe(testData.done);
    })

    test("DELETE Id doesnt exist " + endpointUrl + ":todoId", async () =>{
        const response = await request(app)
            .delete(endpointUrl + nonExistingTodoId)
            .send();
            expect(response.statusCode).toBe(404);
    })
})