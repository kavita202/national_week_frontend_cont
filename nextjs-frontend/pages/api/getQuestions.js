import { table, minifyRecords } from "./utils/index.js";

export default async (req, res) => {
  try {
    const records = await table
      .select({
        maxRecords: 6,
        view: "Grid view",
        // filterByFormula: "{Topic} = 'frontend'",
      })
      .firstPage();
    const minifiedRecords = minifyRecords(records);
    // console.log(minifiedRecords);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong 😕" });
  }
};
