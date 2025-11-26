const express = require("express");
const serviceController = require("../controllers/service.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// Create service
router.post(
  "/create",
  authenticateToken,
  roleMiddleware,
  serviceController.createService
);

// Get all Services
router.get("/", authenticateToken, serviceController.getAllServices);

//get service by id
router.get("/:id", authenticateToken, serviceController.getServiceById);

// delete service by id only by vendor who created it
router.delete(
  "/:id",
  authenticateToken,
  roleMiddleware,
  serviceController.deleteServiceById
);

module.exports = router;
