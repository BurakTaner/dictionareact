import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { Word } from "../data/models";
import { insertMock } from "../data/mockDictionary";
import cors from "cors";
const app: Application = express();

mongoose.connect(process.env.MONGOURI!)
  .then(() => console.log("Mongoose connected"))
  .catch(a => console.log(a));

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => res.json({ message: "It's working" }));

app.get("/getWords/:name", async (req: Request, res: Response) => {
  const name = req.params.name;
  const response = await Word.find({
    name: { $regex: new RegExp(name, "i") }
  });
  res.json(response);
});

app.post("/createWord", async (req: Request, res: Response) => {
  try {
    if (req.body.name) {
      await Word.create(req.body);
      res.sendStatus(201);
    }
    else
    throw new Error("Name must be non-empty.");
  }
  catch (e: any) {
    res.json([e.message]);
  }
});

app.post("/deleteWord", async (req: Request, res: Response) => {
  try {
    await Word.deleteOne({ name: req.body.name });
    res.sendStatus(204);
  }
  catch (e: any) {
    res.json([e.message]);
  }
});

app.get("/getWord/:name", async (req: Request, res: Response) => {
  try {
    const word = await Word.findOne({ name: req.params.name });
    res.json(word);
  }
  catch (e: any) {
    res.json([e.message]);
  }
});

app.post("/updateWord", async (req: Request, res: Response) => {
  try {
    if (req.body.name) {
      await Word.replaceOne({ name: req.body.name }, req.body);
      res.sendStatus(204);
    }
    else
    throw new Error("Name must be non-empty.");
  }
  catch (e: any) {
    res.json([e.message]);
  }
});

const PORT = process.env.PORT || 3000;
(async () => {
  const res = await Word.findOne();
  if (!res)
    insertMock();
})();

app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));
