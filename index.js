#!/usr/bin/env node

const CURR_DIR = process.cwd();
const inquirer = require('inquirer');
const fs = require('fs');
const handlebars = require('handlebars')

var program = require('commander');

program
  .version('0.2.8')
  .command('init [projectName] [schemaFilePath] [template]')
  .action(function (projectName, schemaFilePath, templateName) {
    console.log("Creating app")
    if (!projectName) {
      console.error('Project dir not specified')
      return
    }
    if (!schemaFilePath) {
      console.log('Schema file path not specified')
    }
    if (!templateName) {
      console.error('Template not defined')
    }
    const templatePath = `${__dirname}/templates/${templateName}`;
    
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    
    createDirectoryContents(templatePath, projectName, schemaFilePath);
  });

program.parse(process.argv);


function createDirectoryContents (templatePath, newProjectPath, schemaFileName) {
  const filesToCreate = fs.readdirSync(templatePath);
    
  let schema = fs.readFileSync(schemaFileName, 'utf8')

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;
    
    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');

      const handleBarsExtension = '.handlebars'
      let newFile = file
      // If the file has a handlebars extension, generate a common file instead
      if (origFilePath.indexOf(handlebars) == origFilePath.length - handleBarsExtension.length) {
       newFile = origFilePath.substr(0, origFilePath.length - handleBarsExtension.length)
       let template = handlebars.compile(contents)
       contents = template(schema)
      }
      
      const writePath = `${CURR_DIR}/${newProjectPath}/${newFile}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else {
      createDirectoryContents(origFilePath, writePath, schema)
    }
  });

}

