import fs from 'fs/promises';
import path from 'path';

export const readJSON = async (filePath: string) => {
  try {
    const absolutePath = path.resolve(__dirname, '../data', filePath);
    const data = await fs.readFile(absolutePath, 'utf-8');
    console.log(data);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
};

export const writeJSON = async (filePath: string, data: any) => {
  try {
    const absolutePath = path.resolve(__dirname, '../data', filePath);
    await fs.writeFile(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
  }
};
