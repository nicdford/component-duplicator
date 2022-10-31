#! /usr/bin/env node
const path = require("path")
const fse = require("fs-extra")
const cwd = process.cwd()

/*
 * Component Duplicator
 * @param {string} srcComponentName - The name of the component to duplicate
 * @param {string} destComponentName - The name of the component to be created
 * `npx duplicate Button Chip`
 */
const args = process.argv.slice(2)
const srcComponentName = args[0]
const destComponentName = args[1]

const srcDir = path.join(cwd, "src/components", srcComponentName)
const destDir = path.join(cwd, "src/components", destComponentName)

// Copy the component directory
try {
  fse.copySync(srcDir, destDir, { overwrite: true })
} catch (err) {
  console.error(err)
}

// Rename the component files
fse.readdirSync(destDir).forEach((file) => {
  if (file.includes(srcComponentName)) {
    const newFileName = file.replace(srcComponentName, destComponentName)
    const srcFile = path.join(destDir, file)
    const destFile = path.join(destDir, newFileName)

    fse.rename(srcFile, destFile, (error) => {
      if (error) console.log(error)

      // List all the filenames after renaming
      console.log(`🎉  ${newFileName} Renamed Successfully!`)
    })
  }
})
