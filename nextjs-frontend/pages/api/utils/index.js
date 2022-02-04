import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base(process.env.AIRTABLE_TABLE_NAME);
const getminifiedRecords = (record) => {
  record.fields.incorrect = record.fields.incorrect.trim().split("\n");
  return {
    id: record.id,
    fields: record.fields,
  };
};
const minifyRecords = (records) => {
  return records.map((record) => getminifiedRecords(record));
};

export { table, getminifiedRecords, minifyRecords };
