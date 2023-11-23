const fs = require("fs");

const content = "This is solution for exercise.";

const filePath = "solution.txt";

fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.error("Error occurred while writing the file:", err);
  } else {
    console.log(`File '${filePath}' has been written successfully.`);
  }
});
