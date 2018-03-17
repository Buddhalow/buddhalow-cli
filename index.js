#!/usr/bin/env node

const CURR_DIR = process.cwd();
const inquirer = require('inquirer');
const fs = require('fs');
const handlebars = require('handlebars')
const mkpath = require('mkpath')
var program = require('commander');
var ejs = require('ejs')
const fse = require('fs-extra');
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
    
    fs.mkdirSync(`${projectName}`);
    
    let schema = JSON.parse(fs.readFileSync(schemaFilePath))

    createDirectoryContents(templatePath, projectName, schema);
  });

program.parse(process.argv);


function createDirectoryContents (templatePath, newProjectPath, schema) {
  const filesToCreate = fs.readdirSync(templatePath);
  console.log(schema)
  filesToCreate.forEach(file => {
    console.log(file)
    if (file == 'node_modules') return
    if (file.indexOf('.') == 0) return
    const origFilePath = `${templatePath}/${file}`;
    
    // get stats about the current file
    const stats = fs.statSync(origFilePath);
    
    if (stats.isFile()) {
    
      let contents = fs.readFileSync(origFilePath, 'utf8');
      const handleBarsExtension = '.ejs'
      let newFile = file
      // If the file has a handlebars extension, generate a common file instead
      if (origFilePath.indexOf(handleBarsExtension) == origFilePath.length - handleBarsExtension.length) {
       newFile = origFilePath.substr(0, origFilePath.length - handleBarsExtension.length)
       if (newFile.indexOf('.model') > 0) {
        for (let model of schema.models) {
          
          newFile = newFile.replace('.model', '.' + model.singular) 
        
          let contents = ejs.render(contents, model)

          const writePath = `${CURR_DIR}/${newProjectPath}/${newFile}`;
        
          fse.outputFileSync(writePath, contents);

        }
        return
       }
       contents = template(contents, schema)
      }
      
      const writePath = `${newProjectPath}/${newFile}`;
      fse.outputFileSync(writePath, contents);
    } else {
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      createDirectoryContents(origFilePath, writePath, schema)
    }
  });

}

