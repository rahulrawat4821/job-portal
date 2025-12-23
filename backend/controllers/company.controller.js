import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

/**
 * REGISTER COMPANY
 */
export const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({
        message: "You can't register the same company again.",
        success: false,
      });
    }

    const company = await Company.create({
      name,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

/**
 * GET ALL COMPANIES
 */
export const getCompany = async (req, res) => {
  try {
    if (!req.id) {
      return res.status(401).json({
        message: "Unauthorized, no user ID",
        success: false,
      });
    }

    const companies = await Company.find({ userId: req.id });

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Get companies error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

/**
 * GET COMPANY BY ID
 */
export const getCompanyByID = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error("Get company by ID error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

/**
 * UPDATE COMPANY
 */
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    const updateData = { name, description, website, location };

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const uploadRes = await cloudinary.uploader.upload(
        fileUri.content,
        { folder: "company_logos" }
      );
      updateData.logo = uploadRes.secure_url;
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};
