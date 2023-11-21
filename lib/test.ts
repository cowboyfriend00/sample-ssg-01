import fs, { readdirSync, statSync } from "fs";
import { resolve } from "path";

export type GenericObject = Record<string, unknown>;

export const getListOfFilesInDirectory = (dirPath: string): string[] => {
  return readdirSync(dirPath).filter((entry) =>
    statSync(resolve(dirPath, entry)).isFile()
  );
};

export const getListOfDirectoriesInDirectory = (dirPath: string): string[] => {
  return readdirSync(dirPath).filter((entry) =>
    statSync(resolve(dirPath, entry)).isDirectory()
  );
};

export const describeDirStructure = (dirPath: string): GenericObject => {
  // console.log('dirPath',dirPath);
  // console.log('readdirSync',readdirSync(dirPath));
  // To-Do 성능 개선 배열에서 md파일은 하나만 남도록 하고, else 에서 currentPointer -> getListOfFilesInDirectory 하면 성능 개선

  return readdirSync(dirPath).reduce(
    (acc: GenericObject, currentPointer: string) => {
      // console.log('===================');
      // console.log('dirPath',dirPath);
      // console.log('currentPointer',currentPointer);
      // console.log('acc',acc);
      if (statSync(resolve(dirPath, currentPointer)).isDirectory()) {
        const files: string[] = getListOfFilesInDirectory(
          resolve(dirPath, currentPointer)
        );
        const dirs: string[] = getListOfDirectoriesInDirectory(
          resolve(dirPath, currentPointer)
        );
        // console.log('files',files);
        // console.log('dirs',dirs);
        if (files.length > 0 && dirs.length > 0) {
          const innerStructure = {
            [currentPointer]: {
              files,
              ...describeDirStructure(resolve(dirPath, currentPointer)),
            },
          };
          acc = {
            ...acc,
            ...innerStructure,
          };
          return acc;
        }
        if (dirs.length === 0 && files.length > 0) {
          acc = {
            ...acc,
            ...{ [currentPointer]: files },
          };
        } else {
          acc = {
            ...acc,
            ...{
              [currentPointer]: describeDirStructure(
                resolve(dirPath, currentPointer)
              ),
            },
          };
        }
      } else {
        // const a= ;
        // console.log('acc.filess === undefined',acc.filess === undefined)
        const files =
          (acc.files as string[]) === undefined
            ? [currentPointer]
            : [...(acc.files as string[]), currentPointer];
        acc = {
          ...acc,
          ...{ files },
        };
        // console.log('acc',acc)
      }

      return acc;
    },
    {}
  );
};
