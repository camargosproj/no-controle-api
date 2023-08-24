import { Request, Response, Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IController } from "./core/interfaces";

export default class AppController implements IController {
  path: string = "/";
  public router = Router();
  isPrivate: boolean = false;

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.path, this.findAll);
  }
  create(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    throw new Error("Method not implemented.");
  }
  findAll = (req: Request, res: Response) => {
    // Get memory usage stats
    const used = process.memoryUsage();

    // Get CPU usage stats
    const cpu = process.cpuUsage();

    // Get uptime
    const uptime = process.uptime();

    res.json({
      status: "API WORKING!",
      memoryUsage: `${Math.round((used["rss"] / 1024 / 1024) * 100) / 100} MB`,
      cpuUsage: `${
        Math.round(
          (cpu["user"] / 1024 / 1024 + cpu["system"] / 1024 / 1024) * 100
        ) / 100
      } MB`,
      uptime: `${Math.round(uptime / 60)} minutes`,
    });
  };
  findOne(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    throw new Error("Method not implemented.");
  }
}
