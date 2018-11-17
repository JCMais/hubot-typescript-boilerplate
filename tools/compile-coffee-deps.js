// This is necessary so we don't have coffeescript files being required
const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

const scriptsToCheck = require('../external-scripts.json')

const cwd = path.join(__dirname, '..')

const getModulePackageJson = npmModule =>
  path.join(cwd, 'node_modules', npmModule, 'package.json')

const compileCoffeeFilesInsidePackage = npmModule => {
  console.log(`Compilling .coffee files inside module ${npmModule}`)
  try {
    execSync(`yarn coffee -c node_modules/${npmModule}`, {
      cwd,
    })
  } catch (err) {
    console.error(
      `Error while trying to compile coffee files on package ${npmModule}`,
    )
    console.error(err)
    return false
  }

  return true
}

function compileSlackAdapter() {
  console.log('Compilling .coffee files inside slack adapter')

  const packageJsonPath = getModulePackageJson('hubot-slack')

  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`No package.json file found for hubot slack adapter.`)
    console.warn(
      `If this package does exists you will have to compile the .coffee files on it by running:`,
    )
    console.warn(`  $ yarn coffeescript -c node_modules/slack-adapter`)
    console.warn(
      `If you are not using that adapter you can safely ignore this warning and remove this call on:`,
    )
    console.warn(`  tools/compile-coffee-deps.js`)
    return
  }

  const hasCompiled = compileCoffeeFilesInsidePackage('hubot-slack')

  // no need to change package.json, since main there does not have an extension.
}

function compileExternalScripts() {
  scriptsToCheck.forEach(npmModule => {
    const packageJsonPath = getModulePackageJson(npmModule)

    if (!fs.existsSync(packageJsonPath)) {
      console.warn(
        `No package.json file found for hubot script package ${npmModule}.`,
      )
      console.warn(
        `If this package does exists you will have to compile the .coffee files on it by running:`,
      )
      console.warn(`yarn coffeescript -c node_modules/${npmModule}`)
      return
    }

    const packageJson = require(`${npmModule}/package.json`)

    const mainFile = path.parse(packageJson.main)
    const ext = path.extname(packageJson.main)

    const shouldCompile = mainFile.ext === '.coffee'

    if (shouldCompile) {
      const hasCompiled = compileCoffeeFilesInsidePackage(npmModule)

      if (!hasCompiled) return

      packageJson.main = path.format({
        ...mainFile,
        ext: '.js',
        base: null,
      })

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
    }
  })
}

;(function run() {
  compileSlackAdapter()
  compileExternalScripts()
})()
