import { Types } from "mongoose";
import { Project } from "../../models/Project";
import { createProjectSchema, projectResponse } from "./types";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { getApiError } from "../../utils/error";
import { ApiErrorMessage } from "../../utils/types";

export const createProject = async (req: Request, res: Response) => {
    try {
      const createProjectRequest = createProjectSchema.parse(req.body);

      const existingTitle = await Project.exists(createProjectRequest)

      if(existingTitle){
        const apiError : ApiErrorMessage = {
            msg: "A project already exists with given title"
        }
        return res.status(400).json(apiError)
      }
  
      const { title, _id, createdAt } = await Project.create(
        createProjectRequest
      );
  
      const response: projectResponse = {
        id: _id as Types.ObjectId,
        title,
        createdAt
      };
  
      res.status(StatusCodes.CREATED).json(response);
    } catch (e) {
      const { status, apiError } = getApiError(e as Error);
      res.status(status).json(apiError);
    }
  };



  export const getProjects = async (req: Request, res: Response) => {
    try {
      const {userId} = req.body;
  
      const projects = await Project.find(
        {userId}
      );
  
      const response: projectResponse[] = projects.map(({_id, title, createdAt}) => ({
        id: _id as Types.ObjectId,
        title,
        createdAt
      }));
  
      res.status(StatusCodes.CREATED).json(response);
    } catch (e) {
      const { status, apiError } = getApiError(e as Error);
      res.status(status).json(apiError);
    }
  };