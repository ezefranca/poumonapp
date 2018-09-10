// 
"use strict";

const express = require("express");
const cluster = require("cluster");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const os = require("os");
const apiRoutes = require("./routes/api");
const DefaultConfig = require("./config");

const numCPUs = os.cpus().length;

if (cluster.isMaster) {

	for (let i = 0; i < numCPUs; i++) {

		cluster.fork();
	}

	cluster.on("exit", worker => {

		console.log(`worker ${worker.process.pid} died`);
	});
	cluster.on("death", worker => {

		console.log(`Worker ${worker.pid} died.`);
	});
} else {

	const app = express();
	app.set("port", process.env.PORT || DefaultConfig.port);
	app.use(express.static("static"));
	app.use(logger("dev"));
	app.use(bodyParser.json({ limit: "10mb" }));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.raw());
	app.use(cors());

	process.on("unhandledRejection", (reason, p) => {

		console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
	});

	app.use("/api/", apiRoutes());
	app.use("/sensors/", apiRoutes());

	app.use((req, res) => {
		res.status(404).send("Não encontrado aqui..." + res);
	});

	app.use((req, res) => {
		res.status(500).send("Sorry! Something broke!");
	});

	app.listen(app.get("port"));
	console.log(`App listening on ${app.get("port")}`);
}