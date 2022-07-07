const express = require("express");

const StudenteController = require("../controllers/studentes");
const ReunionController = require("../controllers/reunions");
const ViewController = require("../controllers/view");

const routes = express.Router();

routes.get("/" , ViewController.index);
routes.get("/student/wednesday", StudenteController.index);
routes.post("/student/creat", StudenteController.store);
routes.post("/reunion/creat", ReunionController.store);

module.exports = routes