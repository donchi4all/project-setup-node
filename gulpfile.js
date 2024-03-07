'use strict';
const gulp = require('gulp');

const _ = require('lodash');

const fs = require('fs');
const argv = require('minimist');
const { renderFile } = require('ejs');
const { join } = require('path');

gulp.task('service', function (done) {
  let args = argv(process.argv.slice(2));
  let name;

  name = args.name;

  if (!name) {
    name = args.n;
  }

  if (!name) {
    throw new Error(
      'Please, pass the service name using the "-n" argument or "--name" argument'
    );
  }
  // name = name.toLowerCase();
  name = name;
  var namePlural = name;
  console.log(name);

  // create model
  renderFile('./template/model.ejs', { service: name }, (err, rendered) => {
    if (err) throw err;
    fs.mkdirSync(
      './src/api/models/' + namePlural,
      { recursive: true },
      (err) => {
        if (err) throw err;
      }
    );
    fs.writeFile(
      './src/api/models/' + namePlural + '/index.ts',
      rendered,
      function (err) {
        if (err) {
          throw err;
        }
        console.log('Model created at /api/models/' + namePlural + 'index.ts');
      }
    );
  });

  // create model interface

  renderFile(
    './template/modelInterface.ejs',
    { service: name },
    (err, rendered) => {
      if (err) throw err;
      fs.writeFile(
        './src/api/models/' +
          namePlural +
          `/I${namePlural.charAt(0).toUpperCase() + namePlural.slice(1)}.ts`,
        rendered,
        function (err) {
          if (err) {
            throw err;
          }
          console.log('Interface created at /api/models/' + namePlural + '.ts');
        }
      );
    }
  );

  // create migration
  renderFile(
    './template/modelMigrations.ejs',
    { service: name },
    (err, rendered) => {
      if (err) throw err;
      fs.writeFile(
        `./src/migrations/${Date.now()}-create-${namePlural}.js`,
        rendered,
        function (err) {
          if (err) {
            throw err;
          }
          console.log(
            `migration created at /migrations/${Date.now()}-create-${namePlural}.js`
          );
        }
      );
    }
  );

  // create controller
  renderFile(
    './template/controller.ejs',
    { service: name },
    (err, rendered) => {
      if (err) throw err;
      fs.mkdirSync(
        './src/api/controllers/' + namePlural,
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
      fs.writeFile(
        './src/api/controllers/' + namePlural + '/index.ts',
        rendered,
        function (err) {
          if (err) {
            throw err;
          }
          console.log(
            'Controller created at ./controllers/' + namePlural + '/index.ts'
          );
        }
      );
    }
  );

  // create repository

  renderFile(
    './template/serviceRepository.ejs',
    { service: name },
    (err, rendered) => {
      if (err) throw err;

      fs.mkdirSync(`./src/api/services/${namePlural}/repository`, {
        recursive: true,
      });

      fs.writeFile(
        `./src/api/services/${namePlural}/repository/${
          namePlural + '.repository'
        }.ts`,
        rendered,
        function (err) {
          if (err) {
            throw err;
          }
          console.log(
            `Repository created at ./api/services/${namePlural}/repository/${
              namePlural + '.repository'
            }.ts`
          );
        }
      );
    }
  );

  // create DTO
  renderFile(
    './template/serviceDto.ejs',
    { service: name },
    (err, rendered) => {
      if (err) throw err;
      fs.mkdirSync(`./src/api/services/${namePlural}/dtos`, {
        recursive: true,
      });
      fs.writeFile(
        `./src/api/services/${namePlural}/dtos/${namePlural + '.dto'}.ts`,
        rendered,
        function (err) {
          if (err) {
            throw err;
          }
          console.log(
            `DTO created at ./src/services/${namePlural}/dtos/${
              namePlural + '.dto'
            }.ts`
          );
        }
      );
    }
  );

  // Create service index
  renderFile(
    './template/serviceIndex.ejs',
    { service: name },
    (err, rendered) => {
      if (err) throw err;

      fs.writeFile(
        `./src/api/services/${namePlural}/index.ts`,
        rendered,
        function (err) {
          if (err) {
            throw err;
          }
          console.log(
            `service created at ./api/services/${namePlural}/${namePlural}/index.ts`
          );
        }
      );
    }
  );

  renderFile("./template/test.ejs", { service: name }, (err, rendered) => {
  	if (err) throw err;

  	fs.writeFile(
  		"./tests/" + namePlural + ".test.ts",
  		rendered,
  		function (err) {
  			if (err) {
  				throw err;
  			}
  			console.log("test created at ./tests/" + namePlural + ".test.ts");
  		}
  	);
  });

  return done();
});
