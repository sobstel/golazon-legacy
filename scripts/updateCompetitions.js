const fs = require("fs");
const request = require("superagent");

const URL =
  "https://75sgwy2tr3.execute-api.eu-west-2.amazonaws.com/prod/hyena?func=competitions";

request
  .get(URL)
  .set("Accept", "application/json")
  .then((res) => {
    let searchIndex = res.body;
    searchIndex = searchIndex.map((item) => ({
      competition_id: item["competition_id"],
      name: item["name"],
      teamtype: item["teamtype"],
      area_name: item["area_name"],
    }));

    const fileName = `${__dirname}/../data/competitions.json`;
    const fileContent = JSON.stringify(searchIndex, null, 2);

    fs.writeFile(fileName, fileContent, function (err) {
      if (err) return console.log(err);
      console.log(`Saved to ${fileName}`);
    });
  })
  .catch((err) => console.log(err));
