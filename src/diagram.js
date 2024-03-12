const { exec } = require("child_process");

function startContainer(userProgram, callback) {
  exec(
    "docker run --rm skcheongbrian/gen-step-info " + '"' + userProgram + '"',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        callback({ error: error.message });
        return;
      }
      console.log(stdout);
      console.log(stderr);
      callback(JSON.parse(stdout));
    }
  );
}

function runDockerDebugger(req, res) {
  const userProgram = req.body.program;
  startContainer(userProgram, (result) => {
    res.json(result);
  });
}

module.exports = {
  runDockerDebugger,
};
