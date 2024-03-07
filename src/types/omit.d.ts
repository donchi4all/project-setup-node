/**
 * JUST FOR "tsoa" NPM PACKAGE
 * ---
 * This type we need to implement in necessary files like a duplicate!
 * Do not use it from a global declaration!
 * ---
 * If the type OmitCustom comes from a dependency ("src/types/omit.d.ts"),
 * we have to create an interface or a type in our own code that has the same structure.
 * Tsoa can not utilize interfaces or types from external dependencies.
 * Read more at https://github.com/lukeautry/tsoa/blob/master/docs/ExternalInterfacesExplanation.MD
 */

declare type OmitCustom<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;