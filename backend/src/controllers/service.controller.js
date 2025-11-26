const serviceModel = require("../models/service.model");

async function getAllServices(req, res) {
  try {
    const services = await serviceModel.find();
    return res.status(200).json(services);
  } catch (error) {
    console.log("Error fetching services:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createService(req, res) {
  try {
    const vendorId = req.user.id;
    const userRole = req.userRole;
    if (userRole === "vendor") {
      const { serviceType, title, description, price } = req.body;

      const newService = new serviceModel({
        serviceType,
        title,
        description,
        price,
        vendorId,
      });

      await newService.save();
      res.status(201).json({
        newService: {
          id: newService._id,
          serviceType: newService.serviceType,
          title: newService.title,
          description: newService.description,
          price: newService.price,
          vendorId: newService.vendorId,
        },
        message: "Service created successfully",
      });
    } else {
      res.status(403).json({ message: "Only vendors can create services" });
    }
  } catch (error) {
    console.log("Error creating service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getServiceById(req, res) {
  try {
    const serviceId = req.params.id;
    const service = await serviceModel.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    console.log("Error fetching service :", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function deleteServiceById(req, res) {
  try {
    const userRole = req.userRole;
    if (userRole === "vendor") {
      const serviceId = req.params.id;
      const service = await serviceModel.findById(serviceId);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      if (service.vendorId.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "You can only delete your own services" });
      }

      await serviceModel.findByIdAndDelete(serviceId);
      return res.status(200).json({ message: "Service deleted successfully" });
    } else {
      return res
        .status(403)
        .json({ message: "Only vendors can delete services" });
    }
  } catch (error) {
    console.log("Error Deleting Service :", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAllServices,
  createService,
  getServiceById,
  deleteServiceById,
};
