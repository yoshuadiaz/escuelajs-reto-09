const assert = require("assert")
const proxyquire = require("proxyquire")

const { productsMock, ProductsServiceMock } = require("../utils/mocks")
const testServer = require("../utils/testServer")

describe("routes - platziStore", function() {
  const route = proxyquire("../routes", {
    "../services": ProductsServiceMock
  })
  const request = testServer(route)

  describe("GET /api/products", () => {
    it("should respond with status 200", done => {
      request.get("/api/products").expect(200, done)
    })

    it("should respond with the product list", done => {
      request.get("/api/products").end((err, res) => {
        assert.deepEqual(res.body, [...productsMock])

        done()
      })
    })
  })

  describe("GET /api/products/1", () => {
    it("should respond with status 200", done => {
      request.get("/api/products/1").expect(200, done)
    })

    it("should respond with the product list", done => {
      request.get("/api/products/1").end((err, res) => {
        assert.deepEqual(res.body, {...productsMock[0]})

        done()
      })
    })
  })
})
