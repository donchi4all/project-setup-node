const dayjs = require("dayjs");

module.exports = function (plop) {
    // Helpers for text formatting
    plop.setHelper("capitalize", (text) => text.charAt(0).toUpperCase() + text.slice(1));
    plop.setHelper("uppercase", (text) => text.toUpperCase()); // Add uppercase helper
    plop.setHelper("timestamp", () => dayjs().format("YYYY-MM-DD-HH-mm-ss"));

    plop.setGenerator("service", {
        description: "Generate a new service structure",
        prompts: [
            {
                type: "input",
                name: "service",
                message: "Enter the service name:",
            },
        ],
        actions: [
            {
                type: "add",
                path: "src/api/models/{{service}}/index.ts",
                templateFile: "templates/model.hbs",
            },
            {
                type: "add",
                path: "src/api/models/{{service}}/I{{capitalize service}}.ts",
                templateFile: "templates/modelInterface.hbs",
            },
            {
                type: "add",
                path: "src/migrations/{{timestamp}}-create-{{service}}.js",
                templateFile: "templates/modelMigrations.hbs",
            },
            {
                type: "add",
                path: "src/api/controllers/{{service}}/index.ts",
                templateFile: "templates/controller.hbs",
            },
            {
                type: "add",
                path: "src/api/services/{{service}}/repository/{{service}}.repository.ts",
                templateFile: "templates/serviceRepository.hbs",
            },
            {
                type: "add",
                path: "src/api/services/{{service}}/dtos/{{service}}.dto.ts",
                templateFile: "templates/serviceDto.hbs",
            },
            {
                type: "add",
                path: "src/api/services/{{service}}/index.ts",
                templateFile: "templates/serviceIndex.hbs",
            },
            {
                type: "add",
                path: "tests/{{service}}.test.ts",
                templateFile: "templates/test.hbs",
            },
        ],
    });
};
