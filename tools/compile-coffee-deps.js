// This is necessary so we don't have coffeescript files being required
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process')

const scriptsToCheck = require('../external-scripts.json');

const cwd = path.join(__dirname, '..');

scriptsToCheck.forEach((npmModule) => {

  const packageJsonPath = path.join(cwd, 'node_modules', npmModule, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`No package.json file found for hubot script package ${npmModule}.`)
    console.warn(`If this package does exists you will have to compile the .coffee files on it by running:`)
    console.warn(`yarn coffeescript -c node_modules/${npmModule}`)
    return;
  }

  const packageJson = require(`${npmModule}/package.json`);

  const mainFile = path.parse(packageJson.main)
  const ext = path.extname(packageJson.main)

  const shouldCompile = mainFile.ext === '.coffee';

  if (shouldCompile) {
    console.log(`Compilling .coffee files inside module ${npmModule}`)
    try {
      execSync(`yarn coffee -c node_modules/${npmModule}`, {
        cwd,
      })
    } catch (err) {
      console.error(`Error while trying to compile coffee files on package ${npmModule}`)
      console.error(err);
      return;
    }

    packageJson.main = path.format({
      ...mainFile,
      ext: '.js',
      base: null,
    });

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  }
})
