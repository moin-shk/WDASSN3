/**
 * Authentication Utilities
 *
 * This module exports authentication-related utility functions.
 * It provides functions to check user roles and authentication status.
 */
import { getSession } from "next-auth/react";

// Check if user is authenticated
export const isAuthenticated = async (req) => {
  const session = await getSession({ req });
  return !!session;
};

// Check if user is admin
export const isAdmin = async (req) => {
  const session = await getSession({ req });
  return session?.user?.role === "ADMIN";
};

// Middleware for protected routes
export const withAuth = (handler) => {
  return async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return handler(req, res, session);
  };
};

// Middleware for admin-only routes
export const withAdmin = (handler) => {
  return async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (session.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Forbidden - Admin access required" });
    }

    return handler(req, res, session);
  };
};
