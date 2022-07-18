import {
  parse,
  SourceUnit,
  ImportDirective,
  ContractDefinition,
} from "solidity-parser-antlr";
import httpStatus from "http-status";
import ExtendedError from "./extendedError";

interface Dictionary {
  imports: string[];
  contracts: string[];
}

const solidityAnalyzer = (code: string): Dictionary => {
  let dictionary: Dictionary = { imports: [], contracts: [] };
  try {
    const parsedCode = parse(code, {});

    if (isSourceUnit(parsedCode)) {
      parsedCode.children.forEach((c) => {
        if (isImportDirective(c)) {
          dictionary.imports.push(c.path);
        }

        if (isContractDefinition(c)) {
          dictionary.contracts.push(c.name);
        }
      });
    }
  } catch (error) {
    throw new ExtendedError(
      "the input string is not parsable.",
      httpStatus.BAD_REQUEST
    );
  }

  return dictionary;
};

const isSourceUnit = (object: any): object is SourceUnit =>
  "children" in object;

const isImportDirective = (object: any): object is ImportDirective =>
  "path" in object;

const isContractDefinition = (object: any): object is ContractDefinition =>
  "name" in object;

export default solidityAnalyzer;
