import { Request, Response, NextFunction } from "express";

export const fileValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors: Record<string, string> = {};

    if (!req.file) {
        errors["image"] = "Please upload an image";
    } else {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(req.file.mimetype)) {
            errors["image"] = "Unsupported file format. Allowed: jpg, jpeg, png";
        }
        if (req.file.size > 2 * 1024 * 1024) {
            errors["image"] = "File too large, must be less than 2MB";
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors,
        });
    }

    next();
};
