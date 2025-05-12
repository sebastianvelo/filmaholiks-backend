import express, { Request, Response } from "express";
import { hasResourceAccess, isAuthenticated } from "../../common/app/middleware/authMiddleware";
import Controller from "../../common/controller/Controller";
import UserService from "../service/UserService";

class UserController extends Controller {
  constructor(app: express.Application) {
    super(app, "/user");
  }

  setEndpoints() {
    // Get user by userName - public endpoint but with error handling
    this.setEndpoint("/:userName").get((req: Request, res: Response) => {
      try {
        UserService.getUser(req.params.userName, req.query.userLoggedIn as string)
          .then((page) => {
            if (page) {
              res.status(200).send(page);
            } else {
              res.status(404).send({ error: "User not found" });
            }
          })
          .catch(error => {
            console.error("Get user error:", error);
            res.status(500).send({ error: "Error retrieving user" });
          });
      } catch (error) {
        res.status(400).send({ error: "Invalid request" });
      }
    });

    // Get user by email - should be protected, only for authenticated users
    this.setEndpoint("/email/:email")
      .get(isAuthenticated, (req: Request, res: Response) => {
        try {
          UserService.getUserByEmail(req.params.email)
            .then((user) => {
              if (user) {
                res.status(200).send(user);
              } else {
                res.status(404).send({ error: "User not found" });
              }
            })
            .catch(error => {
              console.error("Get user by email error:", error);
              res.status(500).send({ error: "Error retrieving user" });
            });
        } catch (error) {
          res.status(400).send({ error: "Invalid request" });
        }
      });

    // Create a new user - protected endpoint
    this.setEndpoint("/")
      .post(isAuthenticated, (req: Request, res: Response) => {
        try {
          // Input validation
          if (!req.body.email) {
            return res.status(400).send({ error: "Email is required" });
          }

          UserService.save(req.body.email, req.user!.uid)
            .then((user) => {
              res.status(201).send(user);
            })
            .catch(error => {
              console.error("Create user error:", error);
              res.status(500).send({ error: "Error creating user" });
            });
        } catch (error) {
          res.status(400).send({ error: "Invalid request" });
        }
      });

    // Update user - protected endpoint requiring resource access
    this.setEndpoint("/:userName")
      .put(isAuthenticated, hasResourceAccess("userName"), (req: Request, res: Response) => {
        try {
          // Input validation should be done here
          if (!req.body) {
            return res.status(400).send({ error: "User data is required" });
          }

          UserService.update(req.params.userName, req.body)
            .then((user) => {
              if (!user) {
                return res.status(404).send({ error: "User not found" });
              }
              res.status(200).send(user);
            })
            .catch(error => {
              console.error("Update user error:", error);
              res.status(500).send({ error: "Error updating user" });
            });
        } catch (error) {
          res.status(400).send({ error: "Invalid request" });
        }
      });

    // Delete user - protected endpoint requiring resource access
    this.setEndpoint("/:userName")
      .delete(isAuthenticated, hasResourceAccess("userName"), (req: Request, res: Response) => {
        try {
          UserService.delete(req.params.userName)
            .then((success) => {
              if (!success) {
                return res.status(404).send({ error: "User not found" });
              }
              res.status(200).send({ message: "User deleted successfully" });
            })
            .catch(error => {
              console.error("Delete user error:", error);
              res.status(500).send({ error: "Error deleting user" });
            });
        } catch (error) {
          res.status(400).send({ error: "Invalid request" });
        }
      });

    return this.app;
  }
}

export default UserController;