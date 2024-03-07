# README

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for?

- Quick summary: An API generator that helps in generating crud endpoints from the terminal
- Version: 2.0.0

### How do I get set up?

## Installation

$ git clone to clone the template
$ cd <projectName>
$ npm install
$ npm install -g gulp
$ create a .env file and add your database credentials

## Generate your first API endpoint

```
$ gulp service --name yourFirstEndpoint // This command will create a CRUD endpoint for yourFirstEndpoint.
```

- `[POST] http://localhost:8080/yourFirstEndpoint` Create yourFirstEndpoint resources
- `[GET] http://localhost:8080/yourFirstEndpoint` Get yourFirstEndpoint resources. Supports limit, pagination, search and date range
- `[GET] http://localhost:8080/yourFirstEndpoint/:id` Get a yourFirstEndpoint resource
- `[PUT] http://localhost:8080/yourFirstEndpoint` Update yourFirstEndpoint resources
- `[PATCH] http://localhost:8080/yourFirstEndpoint/:id` Update one yourFirstEndpoint resource
- `[DELETE] http://localhost:8080/yourFirstEndpoint/:id` Delete one yourFirstEndpoint resource
- `[DELETE] http://localhost:8080/yourFirstEndpoint` Delete many yourFirstEndpoint resource

## Configuration

# Versioning your API endpoints

The template comes with route versioning. You can put the version name in front of the route eg. `resource.v1.ts` will put a version of the resource on the `/v1/resource` endpoint. `resource.v2.ts` will put a version of the resource resources on the `/v2/resource` endpoint. The latest version of the resources will always be available at the `/resource` endpoint.

> NOTE: Routes will be loaded automatically.

## File Structure

- src
  - api
  - config
  - interfaces
  - middleware
  - migrations
  - modules
  - seeders
  - types
  - utils
- templates
- tests

## Start template in development

run npm run dev

## Start template in production

run

- npm run build
- npm start

* TODO: Add background workers
* TODO: Complete test
* Add deployment instruction using circleCI and docker

<!-- * How to run tests
* Deployment instructions -->

### Contribution guidelines

- Writing tests
- Code review
- Other guidelines

### Who do I talk to?

- Repo owner or admin
- Other community or team contact
