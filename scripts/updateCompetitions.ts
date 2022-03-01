import fs from "fs";
import cli from "cli-ux";
import request from "superagent";
import dotenv from "dotenv";

dotenv.config();

const URL = `${process.env.NEXT_PUBLIC_HYENA_URL}competitions`;

cli.action.start("Fetch competitions");
request
  .get(URL)
  .set("Accept", "application/json")
  .then((res) => {
    cli.action.stop();

    let searchIndex = res.body;
    searchIndex = searchIndex.map((item) => ({
      competition_id: item["competition_id"],
      name: item["name"],
      teamtype: item["teamtype"],
      area_name: item["area_name"],
    }));

    const fileName = `${__dirname}/../data/competitions.json`;
    const fileContent = JSON.stringify(searchIndex, null, 2);

    cli.action.start("Save competitions");
    fs.writeFile(fileName, fileContent, function (err) {
      if (err) return console.log(err);
      cli.action.stop();
      console.log(`Saved to ${fileName}`);
    });
  })
  .catch((err) => {
    cli.action.stop(`ERR: ${err.message}`);
  });

export {};
