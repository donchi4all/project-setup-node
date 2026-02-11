const dayjs = require("dayjs");
const { v4: uuidv4 } = require("uuid");
const pluralize = require("pluralize");

module.exports = function (plop) {

    /* -------------------------------------------------------------------------- */
    /*                                HELPERS                                     */
    /* -------------------------------------------------------------------------- */

    plop.setHelper("capitalize", (text) =>
        pluralize.singular(text).charAt(0).toUpperCase() +
        pluralize.singular(text).slice(1)
    );

    plop.setHelper("uppercase", (text) => text.toUpperCase());

    plop.setHelper("plural", (text) => pluralize(text));

    plop.setHelper("singular", (text) => pluralize.singular(text));

    plop.setHelper("capitalizePlural", (text) =>
        pluralize(text).charAt(0).toUpperCase() +
        pluralize(text).slice(1)
    );

    plop.setHelper("capitalizeSingular", (text) =>
        pluralize.singular(text).charAt(0).toUpperCase() +
        pluralize.singular(text).slice(1)
    );

    plop.setHelper("timestamp", () =>
        dayjs().format("YYYY-MM-DD-HH-mm-ss")
    );

    /* -------------------------------------------------------------------------- */
    /*                             SERVICE GENERATOR                              */
    /* -------------------------------------------------------------------------- */

    plop.setGenerator("service", {
        description: "Generate a new service structure",

        prompts: [
            {
                type: "input",
                name: "service",
                message: "Enter the service name (singular):",
            },
        ],

        actions: [
            {
                type: "add",
                path: "src/api/models/{{singular service}}/index.ts",
                templateFile: "templates/model.hbs",
            },
            {
                type: "add",
                path: "src/api/models/{{singular service}}/I{{capitalizeSingular service}}.ts",
                templateFile: "templates/modelInterface.hbs",
            },
            {
                type: "add",
                path: "src/migrations/{{timestamp}}-create-{{plural service}}.js",
                templateFile: "templates/modelMigrations.hbs",
            },
            {
                type: "add",
                path: "src/api/controllers/{{singular service}}/index.ts",
                templateFile: "templates/controller.hbs",
            },
            {
                type: "add",
                path: "src/api/services/{{singular service}}/repository/{{singular service}}.repository.ts",
                templateFile: "templates/serviceRepository.hbs",
            },
            {
                type: "add",
                path: "src/api/services/{{singular service}}/dtos/{{singular service}}.dto.ts",
                templateFile: "templates/serviceDto.hbs",
            },
            {
                type: "add",
                path: "src/api/services/{{singular service}}/index.ts",
                templateFile: "templates/serviceIndex.hbs",
            },
            {
                type: "add",
                path: "tests/{{singular service}}.test.ts",
                templateFile: "templates/test.hbs",
            },
        ],
    });

    /* -------------------------------------------------------------------------- */
    /*                                SEED GENERATOR                              */
    /* -------------------------------------------------------------------------- */

    plop.setGenerator("seed", {
        description: "Generate a new seed file",

        prompts: [
            {
                type: "input",
                name: "service",
                message: "Enter the table name (singular):",
            },
            {
                type: "input",
                name: "email",
                message: "Enter the email (if applicable):",
                default: "user@example.com",
            },
            {
                type: "input",
                name: "plainPassword",
                message: "Enter the plain text password:",
                default: "Password@1",
            },
            {
                type: "input",
                name: "status",
                message: "Enter the status:",
                default: "active",
            },
        ],

        actions: [
            {
                type: "add",
                path: "src/seeders/{{timestamp}}-seed-{{plural service}}.js",
                templateFile: "templates/modelSeed.hbs",

                data: {
                    uuid: uuidv4(),
                    hashedPassword:
                        "28f6a5f5ac65a9adaf5693efbfa7c05e5bff31bafbc4f66063989af6d9f142c0",
                },
            },
        ],
    });
};